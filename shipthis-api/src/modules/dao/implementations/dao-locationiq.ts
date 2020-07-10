import { CheckPoint } from './../../ordersheet/entities/check-point.entity';
import { Trajectory } from './../../ordersheet/entities/trajectory.entity';
import { Place } from './../../ordersheet/entities/place.entity';
import { isArray } from 'util';
import { Configuration } from 'src/config/config.keys';
import { AppLoggerService } from 'src/log/applogger.service';
import { ConfigService } from 'src/config/config.service';
import { IDaoLocation } from './../interfaces/dao-location.interface';
import axios from 'axios';
export class DaoLocationIq implements IDaoLocation {
  async generateTrajectory(
    origin: { long: number; lat: number },
    destination: { long: number; lat: number },
  ): Promise<Trajectory> {
    const _configService: ConfigService = new ConfigService(
      new AppLoggerService(),
    );
    let route = { middle_points: null, distance: null };
    let trajectory: Trajectory = null;

    await this.wait(
      Number(_configService.get(Configuration.LOCATION_IQ_DELAY)),
    );

    await axios
      .get(
        `https://us1.locationiq.com/v1/directions/driving/${origin.long},${
          origin.lat
        };${destination.long},${destination.lat}?key=${_configService.get(
          Configuration.LOCATION_IQ_TOKEN,
        )}&steps=${true}&annotations=${true}&geometries=geojson`,
      )
      .then(res => {
        const possible_point = res.data.routes[0].legs[0].steps;
        route.middle_points = [];
        possible_point.map(point => {
          if (point.name) route.middle_points.push(point);
        });
        route.distance = res.data.routes[0].distance;
      })
      .catch();

    if (route.middle_points) {
      let ratio = 1;
      let step = 0;
      const cpArray: CheckPoint[] = [];
      let cpPlace: Place;
      let cpCheckPoint: CheckPoint;
      if (route.middle_points.length - 2 > 8) {
        ratio = (route.middle_points.length - 2) / 8;
      }
      for (let i = 1; i < route.middle_points.length - 1; i += ratio) {
        cpPlace = new Place();
        cpPlace.address = route.middle_points[Math.trunc(i)].name;
        cpPlace.position_long =
          route.middle_points[Math.trunc(i)].maneuver.location[0];
        cpPlace.position_lat =
          route.middle_points[Math.trunc(i)].maneuver.location[1];
        cpCheckPoint = new CheckPoint();
        cpCheckPoint.place = cpPlace;
        cpCheckPoint.check_point_order = step + 1;
        step++;
        cpArray.push(cpCheckPoint);
      }

      trajectory = new Trajectory();
      trajectory.distance = route.distance;
      trajectory.check_points = cpArray;
    }

    return trajectory;
  }

  async validateAddress(address: string): Promise<Place> {
    const _configService: ConfigService = new ConfigService(
      new AppLoggerService(),
    );
    await this.wait(
      Number(_configService.get(Configuration.LOCATION_IQ_DELAY)),
    );
    const api_key = _configService.get(Configuration.LOCATION_IQ_TOKEN);
    let place: Place = null;
    try {
      await axios
        .get(
          `https://us1.locationiq.com/v1/search.php?key=${api_key}&q=${address}&format=json`,
        )
        .then(async res => {
          if (isArray(res.data)) {
            const location = res.data[0];

            await axios
              .get(
                `https://us1.locationiq.com/v1/reverse.php?key=${api_key}&lat=${location.lat}&lon=${location.lon}&format=json`,
              )
              .then(res => {
                const loc_info = res.data;
                if (loc_info.address.country_code === 'us') {
                  place = new Place();
                  place.address = location.display_name;
                  place.position_lat = location.lat;
                  place.position_long = location.lon;
                }
              })
              .catch();
          }
        })
        .catch();
    } catch (error) {}

    return place;
  }

  private async wait(time: number): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  }
}

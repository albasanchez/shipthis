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
    let route = { geometry: null, distance: null };
    let trajectory: Trajectory = null;
    await axios
      .get(
        `https://us1.locationiq.com/v1/directions/driving/${origin.long},${
          origin.lat
        };${destination.long},${destination.lat}?key=${_configService.get(
          Configuration.LOCATION_IQ_TOKEN,
        )}&steps=${true}&annotations=${true}&geometries=geojson`,
      )
      .then(res => {
        route.geometry = res.data.routes[0].geometry;
        route.distance = res.data.routes[0].distance;
      })
      .catch();

    if (route.geometry) {
      let ratio = 1;
      let step = 0;
      const cpArray: CheckPoint[] = [];
      let cpPlace: Place;
      let cpCheckPoint: CheckPoint;
      if (route.geometry.coordinates.length - 2 > 8) {
        ratio = (route.geometry.coordinates.length - 2) / 8;
      }
      for (let i = 1; i < route.geometry.coordinates.length - 1; i += ratio) {
        cpPlace = new Place();
        cpPlace.position_long = route.geometry.coordinates[Math.trunc(i)][0];
        cpPlace.position_lat = route.geometry.coordinates[Math.trunc(i)][1];
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
}

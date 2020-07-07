<template>
  <div id="map"></div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import moment from "moment";

export default {
  name: "Map",
  props: {
    route: Array,
  },
  data: () => ({
    markers: [],
  }),
  methods: {
    formatDate(date) {
      return moment(date).format("YYYY-MM-DD HH:mm");
    },
    setMarkers() {
      for (let i = 0; i < this.route.length; i++) {
        this.markers.push({
          type: "Feature",
          properties: {
            stop: this.route[i].check_point_order,
            direction: this.route[i].place.address,
            date: this.route[i].time_mark,
          },
          geometry: {
            type: "Point",
            coordinates: [
              this.route[i].place.position_long,
              this.route[i].place.position_lat,
            ],
          },
        });
      }
    },
    getPopUp(marker) {
      return new mapboxgl.Popup().setHTML(
        `<b>${this.$i18n.t("map.stop")}:</b> ${marker.properties.stop}<br>
          <b>${this.$i18n.t("map.address")}:</b> ${
          marker.properties.direction
        }<br>
          <b>${this.$i18n.t("map.date")}:</b> ${
          marker.properties.date
            ? this.formatDate(marker.properties.date)
            : this.$i18n.t("tracking.notReached")
        }`
      );
    },
    getLineColor(date) {
      if (date == null) {
        return "grey";
      } else {
        return "#3f48cc";
      }
    },
    getMarkerClass(date, stop) {
      if (!isNaN(stop)) {
        return "marker marker-stop";
      } else if (date == null) {
        return "marker marker-disabled";
      } else {
        return "marker marker-active";
      }
    },
    getLayer(markerNumber, lineColor) {
      return {
        id: "route " + markerNumber,
        type: "line",
        source: {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: [
                this.markers[markerNumber - 1].geometry.coordinates,
                this.markers[markerNumber].geometry.coordinates,
              ],
            },
          },
        },
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": lineColor,
          "line-width": 4,
        },
      };
    },
    getMap() {
      var map = new mapboxgl.Map({
        container: "map",
        attributionControl: false,
        style: process.env.VUE_APP_MAP_STYLE_URL,
      });
      map.addControl(
        new mapboxgl.ScaleControl({
          maxWidth: 80,
          unit: "metric",
        })
      );

      this.markers.forEach((marker, i) => {
        const el = document.createElement("div");
        el.className = this.getMarkerClass(
          marker.properties.date,
          marker.properties.stop
        );
        el.style.padding = "0 0 90px 0";

        const popup = this.getPopUp(marker);

        new mapboxgl.Marker(el)
          .setLngLat(marker.geometry.coordinates)
          .setPopup(popup)
          .addTo(map);

        if (this.markers[i - 1] !== undefined) {
          map.on("load", () => {
            map.addLayer(
              this.getLayer(i, this.getLineColor(marker.properties.date))
            );
          });
        }
      });

      const bounds = new mapboxgl.LngLatBounds();
      this.markers.forEach(function (feature) {
        bounds.extend(feature.geometry.coordinates);
      });
      map.fitBounds(bounds, {
        padding: { top: 50, bottom: 10, left: 30, right: 30 },
      });
    },
  },
  async mounted() {
    this.setMarkers();
    await this.getMap();
  },
};
</script>

<style lang="scss">
@import "../../styles/main.scss";
.marker {
  display: block;
  border: none;
  cursor: pointer;
  padding: 0;
  background-size: contain;
  width: 30px;
  height: 50px;
  padding-bottom: 20px;
}
.marker-active {
  background-image: url("../../assets/tracking/active-marker.png");
}
.marker-disabled {
  background-image: url("../../assets/tracking/disabled-marker.png");
}
.marker-stop {
  background-image: url("../../assets/tracking/marker.png");
}
#map {
  width: 100%;
  height: 100%;
}
</style>

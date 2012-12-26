/*global L, geoff */

window.Route = function (url) {
  this.url = url;
};

window.Route.prototype.display = function (map) {
  var that = this;

  $.ajax(this.url, {
    dataType: "json",
    success: function(data) {
      _.each(data.features, function (feature) {
        if (feature.geometry.type === "Point") {
          if (feature.properties.start) {
            that._displayStartMarker(feature, map);

          } else if (feature.properties.end) {
            that._displayEndMarker(feature, map);

          }
        } else if (feature.geometry.type === "LineString") {
            var layer = L.geoJson(feature, { style: that._getLineOptions() });
            layer.addTo(map);
            layer.bringToBack();
            map.fitBounds(layer.getBounds());
        }
      });
    }
  });
};

window.Route.prototype._displayStartMarker = function (feature, map) {
  var markerOptions = this._getDefaultMarkerOptions();
  markerOptions.fillColor = "rgb(0, 169, 81)";

  L.geoJson(feature, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, markerOptions);
    }
  }).addTo(map);
};

window.Route.prototype._displayEndMarker = function (feature, map) {
  var markerOptions = this._getDefaultMarkerOptions();
  markerOptions.fillColor = "rgb(238, 28, 36)";

  L.geoJson(feature, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, markerOptions);
    }
  }).addTo(map);
};

window.Route.prototype._getDefaultMarkerOptions = function () {
  return {
    radius: 10,
    color: "#000",
    weight: 2,
    opacity: 1,
    fillOpacity: 0.7,
    clickable: false
  };
};

window.Route.prototype._getLineOptions = function () {
  return {
    stroke: true,
    color: "rgb(237, 0, 140)",
    weight: 4,
    opacity: 0.5,
    fill: false,
    dashArray: [5, 5]
  };
};

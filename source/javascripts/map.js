/*global L, d3 */

window.MapManager = function (id) {
  this.id = id;
  this.routes = [];
};

window.MapManager.prototype.bootstrap = function () {
  this.map = new L.Map(this.id, { scrollWheelZoom: false, attributionControl: false })
      .setView(new L.LatLng(51.5073, 0.1276), 8)
      .addLayer(new L.TileLayer("http://{s}.tiles.mapbox.com/v3/examples.map-4l7djmvo/{z}/{x}/{y}.png", { detectRetina: true }));
};

window.MapManager.prototype.addRoute = function (route) {
  route.display(this.map);
};

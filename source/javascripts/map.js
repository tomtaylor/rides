/*global L, d3 */

window.MapManager = function (id) {
  this.id = id;
  this.routes = [];
};

window.MapManager.prototype.bootstrap = function () {
  this.map = new L.Map(this.id, { scrollWheelZoom: false, attributionControl: false })
      .setView(new L.LatLng(51.5073, 0.1276), 8)
      .addLayer(new L.TileLayer("http://{s}.tiles.mapbox.com/v3/tomtaylor.map-q0kbynb9/{z}/{x}/{y}.png",
         { 
           detectRetina: true,
           attribution: "Base map by <a href='http://www.openstreetmap.org/'>OpenStreetMap</a> (<a href='http://www.openstreetmap.org/copyright' title='ODbL'>ODbL</a>)"
         }));
};

window.MapManager.prototype.addRoute = function (route) {
  route.display(this.map);
};

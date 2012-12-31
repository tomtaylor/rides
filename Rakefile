namespace :geo do
  desc "Converts all the .json files in source/routes to GPX/KML equivalents"
  task :convert do
    Dir.chdir(File.join(File.dirname(__FILE__), 'source', 'routes'))

    Dir.glob('*.json').each do |filename|
      basename = File.basename(filename, '.json')
      `mkdir tmp`
      `ogr2ogr tmp/points.shp #{filename} -sql "select * from OGRGeoJSON where OGR_GEOMETRY = 'POINT'"`
      `ogr2ogr tmp/lines.shp #{filename} -sql "select * from OGRGeoJSON where OGR_GEOMETRY = 'LINESTRING'"`
      `ogr2ogr -f GPX #{basename}.gpx tmp points lines`
      `ogr2ogr -f KML #{basename}.kml tmp points lines`
      `rm -r tmp`
    end
  end
end

desc "Build and deploy"
task :sync do
  `middleman build -c && rsync --delete -ave ssh build/ zino:/srv/www/rides.tomtaylor.co.uk/`
end

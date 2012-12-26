helpers do
  def route_resources
    sitemap.resources.select do |r|
      r != current_page && r.ext == '.html'
    end.sort_by do |r|
      r.metadata[:page]['added']
    end.reverse  
  end
end

configure :build do
  activate :minify_javascript
end

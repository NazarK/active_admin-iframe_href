$:.push File.expand_path('../lib', __FILE__)

require './lib/active_admin/iframe_href/version'

Gem::Specification.new do |spec|
  spec.name        = 'active_admin-iframe_href'
  spec.version     = ActiveAdmin::IframeHref::Version::STRING
  spec.authors     = ['Nazar Kuliyev']
  spec.email       = ['nazar.kuliev@gmail.com']

  spec.summary     = 'Open edit, create, new links in iframe.'
  spec.description = spec.summary
  spec.homepage    = 'http://github.com/NazarK/active_admin-iframe_href'
  spec.license     = 'MIT'

  spec.files       = `git ls-files -z`.split("\x0").reject { |f| f.match(%r{^(test|spec|features)/}) }

  spec.add_dependency 'activeadmin'
end

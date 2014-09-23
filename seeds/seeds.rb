#!/usr/bin/ruby

require 'multi_json'
require 'faraday'
require 'elasticsearch/api'
require 'json'
require 'jbuilder'


class MySimpleClient
  include Elasticsearch::API
  
  #'https://th02mi1u:9o9a8huzciaq6tc5@fir-3586464.us-east-1.bonsai.io'

  CONNECTION = ::Faraday::Connection.new url: 'http://localhost:9200'

  def perform_request(method, path, params, body)
    puts "--> #{method.upcase} #{path} #{params} #{body}"

    CONNECTION.run_request \
      method.downcase.to_sym,
      path,
      ( body ? MultiJson.dump(body): nil ),
      {'Content-Type' => 'application/json'}
  end
end

client = MySimpleClient.new




100000.times {
  lonlat = JSON.parse(File.read('seeds/data/address.json')).sample
  property = {
    property: {
      title:       JSON.parse(File.read('seeds/data/title.json')).sample,
      description: JSON.parse(File.read('seeds/data/description.json')).sample,
      price:       JSON.parse(File.read('seeds/data/price.json')).sample.to_i,
      bedroomcount:JSON.parse(File.read('seeds/data/bedroomcount.json')).sample.to_i,
      surface:     JSON.parse(File.read('seeds/data/surface.json')).sample,
      address:     JSON.parse(File.read('seeds/data/address.json')).sample,
      location: {
        lat: JSON.parse(File.read('seeds/data/lat.json')).sample,
        lon: JSON.parse(File.read('seeds/data/lon.json')).sample
      },
      agency: {
        title: JSON.parse(File.read('seeds/data/agency_title.json')).sample,
        logo: "agency_logo.png",
        contact: "T. 061/29.24.14 F. 061/.29.24.15 contact@email.com"
      }
    }
  }
  client.index  index: 'geotest', type: 'property', body:  property
}


#json = Jsonify::Builder.compile do |json|
#  json.property do
#    json.title 'Ceci est un titre'
#    json.description 'Ceci est une longue description'
#    json.price '200 000'
#  end
#end 

#p property

# json.compile!.to_s
#p client.index  index: 'hub', type: 'property', body:  property
p client.search index: 'hub', type: 'property'

#p client.cluster.health
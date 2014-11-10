#!/usr/bin/ruby

require 'multi_json'
require 'faraday'
require 'elasticsearch/api'
require 'json'
require 'jbuilder'


class MySimpleClient
  include Elasticsearch::API
  
  #'https://th02mi1u:9o9a8huzciaq6tc5@fir-3586464.us-east-1.bonsai.io'
  #http://localhost:9200

  CONNECTION = ::Faraday::Connection.new url: 'https://th02mi1u:9o9a8huzciaq6tc5@fir-3586464.us-east-1.bonsai.io'

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

  property = {
    property: {
      ref_agence:  JSON.parse(File.read('seeds/data/prospect_ref_agence.json')).sample,
      description: JSON.parse(File.read('seeds/data/prospect_description.json')).sample,
      budget_min:  JSON.parse(File.read('seeds/data/prospect_budget_min.json')).sample.to_i,
      budget_max:  JSON.parse(File.read('seeds/data/prospect_budget_max.json')).sample.to_i,
      bedroomcount:JSON.parse(File.read('seeds/data/bedroomcount.json')).sample.to_i,
      surface:     JSON.parse(File.read('seeds/data/surface.json')).sample,
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
  client.index  index: 'geotest', type: 'prospects', body:  property
}


#1.times {
#    properties = [];
#    2.times {
#        properties.push({
#          index:
#              {
#              index: 'geotest',
#              type: 'property',
#              body: {
#                    property: {
#                          title:       JSON.parse(File.read('seeds/data/title.json')).sample,
#                          description: JSON.parse(File.read('seeds/data/description.json')).sample,
#                          price:       JSON.parse(File.read('seeds/data/price.json')).sample.to_i,
#                          bedroomcount:JSON.parse(File.read('seeds/data/bedroomcount.json')).sample.to_i,
#                          surface:     JSON.parse(File.read('seeds/data/surface.json')).sample,
#                          address:     JSON.parse(File.read('seeds/data/address.json')).sample,
#                          location: {
#                            lat: JSON.parse(File.read('seeds/data/lat.json')).sample,
#                            lon: JSON.parse(File.read('seeds/data/lon.json')).sample
#                          },
#                          agency: {
#                            title: JSON.parse(File.read('seeds/data/agency_title.json')).sample,
#                            logo: "agency_logo.png",
#                            contact: "T. 061/29.24.14 F. 061/.29.24.15 contact@email.com"
#                          }
#                        }
#                    }
#              }
#          }
#        )
#    }
#    p properties;
#    #client.bulk( { body: properties});
#}

#client.bulk({
#  body: [
#    // action description
#    { index:  { _index: 'myindex', _type: 'mytype', _id: 1 } },
#     // the document to index
#    { title: 'foo' },
#    // action description
#    { update: { _index: 'myindex', _type: 'mytype', _id: 2 } },
#    // the document to update
#    { doc: { title: 'foo' } },
#    // action description
#    { delete: { _index: 'myindex', _type: 'mytype', _id: 3 } },
#    // no document needed for this delete
#  ]
#}
#
#client.index({
#  index: 'myindex',
#  type: 'mytype',
#  id: '1',
#  body: {
#    title: 'Test 1',
#    tags: ['y', 'z'],
#    published: true,
#  }
#}
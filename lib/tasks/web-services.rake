# todo: pass arguments (https://cobwwweb.com/4-ways-to-pass-arguments-to-a-rake-task) such as: 
# ☐ pull(single_widget) 
# ☐ pull(1colwidgets, 2colwidgets, 3colwidgets)
# ☐ push changes back

desc "Updates dev Chapman.edu/_cascade/blocks/html/cascade-assets with dist/staging/cascade-assets.xml"
task edit_cascade_assets: :environment do
   # * 1) BASE URL 
   base_url = 'https://dev-cascade.chapman.edu/api/v1/'.to_s

   # * 2) REST API ACTION
   # https://wimops.chapman.edu/wiki/WWW#Key_Links
   # https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/rest-api/index.html
   rest_action = "read/".to_s # ! KEEP TRAILING SLASH
 
   # * 3) ASSET TYPE
   # this is easy to find in cascade's edit/preview url.
   # ie https://dev-cascade.chapman.edu/entity/open.act?id=7f74b81ec04d744c7345a74906ded22a&type=page
   asset_type = 'block/' # ! KEEP TRAILING SLASH 
 
   # * 4) ASSET PATH OR ID
   # you can also use its path (ie "Chapman.edu/_cascade/formats/modular/widgets/1-column")... but.. whitespace.
   asset_path = "Chapman.edu/_cascade/blocks/html/cascade-assets" # ! NO TRAILING SLASH
 
   # * 5) SECRETS
   # set these in application.yml (a la figaro 🐈)
   cascade_username = '?u=' + ENV['CASCADE_USERNAME']
   cascade_password = '&p=' + ENV['CASCADE_PASSWORD']
 
   # the constructed url should look something like:
   # https://dev-cascade.chapman.edu/api/v1/read/folder/Chapman.edu/_cascade/formats/modular/widgets/foldername?u=username&p=password
 
   url = base_url + rest_action + asset_type + asset_path + cascade_username + cascade_password
   puts url
 
  # Inspect response for required details below 👇
   response = HTTParty.get(url)
   puts response.body

   response_xml = response["asset"]["xmlBlock"]["xml"]
   puts response_xml

  cascade_assets_changes='dist/staging/cascade-assets.xml'
  data = File.read(cascade_assets_changes)
  puts data
  response_body = data

  # Change URL for edit request
  url_post = base_url + 'edit/' + asset_type + asset_path + cascade_username + cascade_password

  # 👹Editing assets unfortunately requires PATH, SITENAME, ID. This can be obtained by reading the asset's response.body 👆
  HTTParty.post(url_post, body: { asset: { xmlBlock: { xml: data, path: "_cascade/blocks/html/0-write-test", parentFolderId: "8516f0a9c04d744c610b81da2d21be44", siteName: "Chapman.edu", id: "365ae5dec0a81e8a20b1d746fd3e0778" } } }.to_json)
end

desc "Pulls staging velocity formats to local machine"
task pull: :environment do
  # * 1) BASE URL 
  base_url = 'https://dev-cascade.chapman.edu/api/v1/'

  # * 2) REST API ACTION
  # https://wimops.chapman.edu/wiki/WWW#Key_Links
  # https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/rest-api/index.html
  rest_action = "read/" # ! KEEP TRAILING SLASH

  # * 3) ASSET TYPE
  # this is easy to find in cascade's edit/preview url.
  # ie https://dev-cascade.chapman.edu/entity/open.act?id=7f74b81ec04d744c7345a74906ded22a&type=page
  asset_type = 'folder/' # ! KEEP TRAILING SLASH 

  # * 4) ASSET PATH OR ID
  # you can also use its path (ie "Chapman.edu/_cascade/formats/modular/widgets/1-column")... but.. whitespace.
  asset_path = "a8975632c0a81e4b22b523b84ee99921" # ! NO TRAILING SLASH

  # * 5) SECRETS
  # set these in application.yml (a la figaro 🐈)
  cascade_username = '?u=' + ENV['CASCADE_USERNAME']
  cascade_password = '&p=' + ENV['CASCADE_PASSWORD']

  # the constructed url should look something like:
  # https://dev-cascade.chapman.edu/api/v1/read/folder/Chapman.edu/_cascade/formats/modular/widgets/foldername?u=username&p=password

  url = base_url + rest_action + asset_type + asset_path + cascade_username + cascade_password

  puts url

  response = HTTParty.get(url)
  response = response.parsed_response

  widgets = response["asset"]["folder"]["children"]
  🔑 = response["asset"]["folder"]["children"]

  # # CREATE BACKUPS
  # TO DO: MIRROR CASCADE'S ACTUAL STRUCTURE AND PROGRAMMATICALLY ORGANIZE THESE INSTEAD OF DUMPING THEM INTO THE SAME FOLDER
  one_column_widgets_dir = "../../.cascade-code/Chapman.edu/_cascade/formats/modular/widgets/one_column/"
  backup_dir = "../../.cascade-code/Chapman.edu/_cascade/formats/modular/widgets/one_column/"
  FileUtils.mkdir_p(backup_dir) unless File.directory?(backup_dir)

  timestamp = Time.now.strftime('%H-%M-%S_%Y-%m-%d').to_s
  one_column_widgets_dir_backup = "../../.cascade-code/Chapman.edu/_cascade/formats/modular/widgets/one_column-".concat(timestamp)

  FileUtils.cp_r one_column_widgets_dir, one_column_widgets_dir_backup
  
  response['asset']['folder']["children"].each do |child|
    # IDENTIFIERS
    id = child['id']
    format_url = 'https://dev-cascade.chapman.edu/api/v1/read/format/' + id + cascade_username + cascade_password
    puts "format_url: " + format_url

    # GET EACH FORMAT'S VELOCITY CODE FROM JSON RESPONSE - AKA "script"
    # See https://dev-cascade.chapman.edu/api/v1/read/format/a897589cc0a81e4b22b523b8d1b3a0af?u=USERNAME&p=PASSWORD
    response = HTTParty.get(format_url)
    response = response.parsed_response
    puts response["asset"]["scriptFormat"]["script"]
    format_name = response["asset"]["scriptFormat"]["name"]
    puts "format_name: " + format_name
    format_path = response["asset"]["scriptFormat"]["path"]
    puts "format_path: " + format_path

    current_formats_directory = format_path
    FileUtils.mkdir_p(current_formats_directory) unless File.directory?(current_formats_directory)

    filetype = ".vtl"
    # WRITE EACH TO A LOCAL FILE
    open(current_formats_directory + format_name + ".vtl", 'w') { |f|
      f.puts response["asset"]["scriptFormat"]["script"]
    }
    puts format_name.upcase!
  end

  system %(open "../../.cascade-code/Chapman.edu/_cascade/formats/modular/widgets/one_column/")

end
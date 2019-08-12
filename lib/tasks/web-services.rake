# todo: pass arguments (https://cobwwweb.com/4-ways-to-pass-arguments-to-a-rake-task) such as: 
# ☐ pull(single_widget) 
# ☐ pull(1colwidgets, 2colwidgets, 3colwidgets)
# ☐ push changes back

desc "Pulls staging velocity formats to local machine"
task pull: :environment do
  # * 1) BASE URL 
  base_url = 'https://dev-cascade.chapman.edu/api/v1/'

  # * 2) REST API ACTION
  # https://wimops.chapman.edu/wiki/WWW#Key_Links
  # https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/rest-api/index.html
  rest_action = "read/" # ! keep trailing slash

  # * 3) ASSET TYPE
  # this is easy to find in cascade's edit/preview url
  # ie https://dev-cascade.chapman.edu/entity/open.act?id=7f74b81ec04d744c7345a74906ded22a&type=page
  asset_type = 'folder/' # ! keep trailing slash 

  # * 4) ASSET PATH
  # you can also use its id... but the path is unambiguous
  asset_path = "Chapman.edu/_cascade/formats/modular/widgets/nick-1-col" # ! NO TRAILING SLASH

  # * 5) SECRETS
  # set these in application.yml (a la figaro 🐈)
  cascade_username = '?u=' + ENV['CASCADE_USERNAME']
  cascade_password = '&p=' + ENV['CASCADE_PASSWORD']

  # the constructed url should look something like:
  # "https://dev-cascade.chapman.edu/api/v1/read/folder/Chapman.edu/_cascade/formats/modular/widgets/foldername?u=username&p=password"

  url = base_url + rest_action + asset_type + asset_path + cascade_username + cascade_password

  puts url

  response = HTTParty.get(url)
  response = response.parsed_response

  widgets = response["asset"]["folder"]["children"]
  🔑 = response["asset"]["folder"]["children"]

  # # CREATE BACKUPS
  # TO DO: MIRROR CASCADE'S ACTUAL STRUCTURE AND PROGRAMMATICALLY ORGANIZE THESE INSTEAD OF DUMPING THEM INTO THE SAME FOLDER
  backup_dir = "../../.cascade-code/Chapman.edu/_cascade/formats/modular/widgets/one_column/format_backups/"
  FileUtils.mkdir_p(backup_dir) unless File.directory?(backup_dir)



  response['asset']['folder']["children"].each do |child|

    # IDENTIFIERS
    id = child['id']
    format_url = 'https://dev-cascade.chapman.edu/api/v1/read/format/' + id + cascade_username + cascade_password
    # puts format_url

    # GET EACH FORMAT'S VELOCITY CODE FROM JSON RESPONSE - AKA "script"
    response = HTTParty.get(format_url)
    response = response.parsed_response
    puts response["asset"]["scriptFormat"]["script"]
    format_name = response["asset"]["scriptFormat"]["name"]
    filetype = ".vtl"
    # WRITE EACH TO A LOCAL FILE
    open(backup_dir + format_name + ".vtl", 'w') { |f|
      f.puts response["asset"]["scriptFormat"]["script"]
    }
    puts format_name.upcase!
  end
  system %(open "../../.cascade-code/Chapman.edu/_cascade/formats/modular/widgets/one_column/format_backups/")
end
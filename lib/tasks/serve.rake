# frozen_string_literal: true

desc "Runs forman start"
task serve: :environment do
  system("bundle exec foreman start")
end

desc "Starts serveo tunnel"
task serveo: :environment do
  login = Etc.getlogin
  local_tunnel = system("ssh -R #{login}:80:localhost:5000 serveo.net")
  puts local_tunnel
end

desc "Pulls staging velocity formats to local machine"
task pull: :environment do
  # 1) BASE URL 
  base_url = 'https://dev-cascade.chapman.edu/api/v1/'

  # 2) REST API ACTION
  # https://wimops.chapman.edu/wiki/WWW#Key_Links
  # https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/rest-api/index.html
  rest_action = "read/" # keep trailing slash

  # 3) ASSET TYPE
  # THIS IS EASY TO FIND IN CASCADE'S EDIT/PREVIEW URL
  # IE 
  asset_type = 'folder/'

  # 4) ASSET PATH
  # YOU CAN ALSO USE ITS ID... BUT THE PATH IS UNAMBIGUOUS
  asset_path = "Chapman.edu/_cascade/formats/modular/widgets/nick-1-col" # NO TRAILING SLASH

  # SET THESE IN APPLICATION.YML (A LA FIGARO 🐈)
  cascade_username = '?u=' + ENV['CASCADE_USERNAME']
  cascade_password = '&p=' + ENV['CASCADE_PASSWORD']

  # THE CONSTRUCTED URL SHOULD LOOK SOMETHING LIKE:
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

    # GET EACH FORMAT'S VELOCITY CODE - AKA "script"
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

# Alias
task server: :environment do
  Rake::Task["serve"].invoke
  Rake::Task["serveo"].invoke
end

task :confirm do
  confirm_token = rand(36**6).to_s(36)
  STDOUT.puts "Confirm [ACTION]? Enter '#{confirm_token}' to confirm:"
  input = STDIN.gets.chomp
  raise "Aborting [ACTION]. You entered #{input}" unless input == confirm_token
end

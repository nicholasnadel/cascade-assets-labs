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
  # SET THIS IN APPLICATION.YML (A LA FIGARO 🐈) 
  cascade_username = 'u=' + ENV['CASCADE_USERNAME']
  cascade_password = '&p=' + ENV['CASCADE_PASSWORD']

  url = 'https://dev-cascade.chapman.edu/api/v1/read/folder/Chapman.edu/_cascade/formats/modular/widgets/nick-1-col?'
  full_url = url + cascade_username + cascade_password


  response = HTTParty.get(url)
  response = response.parsed_response

  widgets = response["asset"]["folder"]["children"]
  # 🔑 = response["asset"]["folder"]["children"][0].keys
  🔑 = response["asset"]["folder"]["children"]

  # # CREATE BACKUPS
  # TO DO: MIRROR CASCADE'S ACTUAL STRUCTURE AND PROGRAMMATICALLY ORGANIZE THESE INSTEAD OF DUMPING THEM INTO THE SAME FOLDER
  backup_dir = "../../.cascade-code/Chapman.edu/_cascade/formats/modular/widgets/one_column/format_backups/"
  FileUtils.mkdir_p(backup_dir) unless File.directory?(backup_dir)

  response['asset']['folder']["children"].each do |child|
    # IDENTIFIERS
    id = child['id']
    format_url = 'https://dev-cascade.chapman.edu/api/v1/read/format/' + id + '?u=username &p=pass'
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

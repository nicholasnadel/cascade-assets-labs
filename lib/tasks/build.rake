require 'zip_file_generator'

# rubocop:enable Metrics/BlockLength

desc "Build assets for deployment to Cascade."
task build: :environment do
  if Rails.env.development?
    puts "Please specify build environment"
    puts "Examples:"
    puts "  rake build RAILS_ENV=staging"
    puts "  rake build RAILS_ENV=production"
  else
    # FIXME
    # This is only needed here (AFAICT) and breaks things in test and elsewhere because it
    # overrides the behavior of render. For more info, see
    # http://stackoverflow.com/q/39396601/1093087.
    #
    # Bigger question: do we really need this gem just for this one call? Can't we leverage
    # something already in Rails?
    require 'render_anywhere'
    include RenderAnywhere

    prep_dist
    zip rails_asset_path, dist_assets_path
    extract_zip('dist/netlify/_assets.zip', 'dist/netlify/_assets')

    Rake::Task['changelog'].invoke
    File.write(dist_cascade_block_path, render(file: 'layouts/cascade-assets.xml', layout: false))
  
  end
end

task do_precompile: :environment do
  Rake::Task['assets:clobber'].invoke
  Rake::Task['assets:precompile'].invoke
end

desc "Log Git Changes."
task :changelog do
  dist_folder = "./dist"

  git_log = './dist/changelog.log'
  current_branch = `git rev-parse --abbrev-ref HEAD`

  puts "👀👀👀 LOGGING CHANGES 👀👀👀"
  File.delete(git_log) if File.exist?(git_log)
  open(git_log, 'w') { |f|
    f.puts "--------------------------------------------------------------------------"
    f.puts "Comparing commits from current branch <![CDATA[#protect #{current_branch} #protect]]> to MASTER "
    f.puts "--------------------------------------------------------------------------"
    f.puts `git --no-pager diff --name-only FETCH_HEAD $(git merge-base FETCH_HEAD master)`
    f.puts "--------------------------------------------------------------------------"
    puts
    puts
    f.puts "Uncommitted local changes:"
    f.puts "--------------------------------------------------------------------------"
    f.puts `git status`
    }
end 

####################
# HELPER FUNCTIONS #
####################

def prep_dist
  FileUtils.mkdir('dist') unless File.directory?('dist')
  FileUtils.rm_rf dist_folder
  FileUtils.mkdir dist_folder
  prep_assets
  # netlify_move_index
end

def prep_assets
  File.write(netlify_erb, render(file: 'layouts/netlify.html.erb', layout: false))
  File.rename(netlify_erb, netlify_index)
  puts "moving netlify index.html to _assets"
  # FileUtils.mv(netlify_index, './dist/netlify/_assets/')
end

def netlify_erb
  Rails.root.join('dist', Rails.env, 'netlify.html.erb')
end

def netlify_index
  Rails.root.join('dist', Rails.env, 'index.html')
end

def netlify_move_index
  FileUtils.mv(netlify_index, 'dist/netlify/_assets/')
  netlify_rename_asset_paths
end

def netlify_rename_asset_paths
  full_path_to_read = File.expand_path('dist/netlify/_assets/index.html')
  
  # File.open(full_path_to_read) do |source_file|
  #   contents = source_file.read
  #   contents.gsub!(/chapman.edu/, 'BAR')
  #   File.open(full_path_to_read, "w+") { |f| f.write(contents) }
  # end

end

def rails_asset_path
  Rails.root.join('public', '_assets')
end

def dist_folder
  Rails.root.join('dist', Rails.env)
end

def dist_assets_path
  Rails.root.join('dist', Rails.env, '_assets.zip')
end


def dist_cascade_block_path
  Rails.root.join('dist', Rails.env, 'cascade-assets.xml')
end


def preload_js_link(*sources)
  options = sources.extract_options!.stringify_keys
  path_options = options.extract!('protocol').symbolize_keys

  sources.uniq.map { |source|
    tag_options = {
      "rel" => "script",
      "media" => "all",
      "href" => path_to_javascript(source, path_options)
    }.merge!(options)
    tag(:link, tag_options)
  }.join("\n").html_safe
end

def zip(input_folder, output_name)
  zf = ZipFileGenerator.new(input_folder, output_name)
  zf.write
end

def extract_zip(file, destination)
  FileUtils.mkdir_p(destination)

  Zip::File.open(file) do |zip_file|
    zip_file.each do |f|
      fpath = File.join(destination, f.name)
      FileUtils.mkdir_p(File.dirname(fpath))
      zip_file.extract(f, fpath) unless File.exist?(fpath)
    end
  end

  netlify_move_index
end

task netlify: :environment do
  `rake build RAILS_ENV=netlify`
  `git add dist/netlify/ .`
  `git commit -m 'add updated CDN assets'`
  `git push`
  # system %(git push)
  puts "deploying assets to https://cucdn.xyz/"
end

task nick: :environment do 
end

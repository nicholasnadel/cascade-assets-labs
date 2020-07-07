require 'zip_file_generator'

# rubocop:disable Metrics/BlockLength
namespace :build do
  namespace :omninav do
    #
    # Build static version: rake build:omninav:static
    #
    desc "Build static OmniNav navbar assets and markup."
    task static: :environment do
      # Params
      target = 'static'

      # Prep Builder
      builder = Omninav::Builder.new(target: target)
      builder.prep_build
      builder.deploy_map = {
        'omni-nav-*.css' => 'omni-nav.min.css',
        'omni-nav-*.js' => 'omni-nav.min.js',
        'omni-nav-*.css.gz' => 'omni-nav.css.gz',
        'omni-nav-*.js.gz' => 'omni-nav.js.gz',
        'omni-nav.html' => 'omni-nav.html'
      }
      puts format("\nBuilding OmniNav %s version:%s\n", target, builder.build_version)

      # Why this? Setting Rails.env or ENV['RAILS_ENV'] didn't work.
      # See http://stackoverflow.com/a/1090319/6763239.
      system("rake build:omninav:assets RAILS_ENV=production")

      builder.generate_markup_file
      builder.move_output_files_to_build_directory
      builder.cleanup

      # Report
      puts format("\nBuild complete. Find files in %s.", builder.output_dir)
    end

    #
    # Build blogs version: rake build:omninav:blogs
    #
    # Blogs expects files here:
    # https://github.com/chapmanu/blogs/tree/development/content/plugins/cu-wp-customization/omni-nav
    #
    # Loaded at runtime here:
    # https://github.com/chapmanu/blogs/blob/development/content/plugins/cu-wp-customization/cu-wp-customization.php#L243
    #
    desc "Build OmniNav navbar assets and markup for Blogs site."
    task blogs: :environment do
      # Params
      target = 'blogs'

      # Prep Builder
      builder = Omninav::Builder.new(target: target)
      builder.prep_build
      puts format("\nBuilding OmniNav %s version:%s\n", target, builder.build_version)

      # Why this? Setting Rails.env or ENV['RAILS_ENV'] didn't work.
      # See http://stackoverflow.com/a/1090319/6763239.
      system("rake build:omninav:assets RAILS_ENV=production")

      builder.generate_markup_file
      builder.move_output_files_to_build_directory
      builder.cleanup

      # Report
      puts format("\nBuild complete. Find files in %s.", builder.output_dir)
    end

    #
    # Build inside version: rake build:omninav:inside
    #
    # Inside expects files here:
    # https://github.com/chapmanu/inside/tree/development/lib/assets/omni-nav
    #
    # Loaded at runtime here:
    # https://github.com/chapmanu/inside/blob/development/app/assets/javascripts/inside.js#L23
    # https://github.com/chapmanu/inside/blob/development/app/assets/stylesheets/inside.css.scss#L2
    #
    desc "Build OmniNav navbar assets and markup for Inside site."
    task inside: :environment do
      # Params
      target = 'inside'

      # Prep Builder
      builder = Omninav::Builder.new(target: target)
      builder.prep_build
      puts format("\nBuilding OmniNav %s version:%s\n", target, builder.build_version)

      # Why this? Setting Rails.env or ENV['RAILS_ENV'] didn't work.
      # See http://stackoverflow.com/a/1090319/6763239.
      system("rake build:omninav:assets RAILS_ENV=production")

      builder.generate_markup_file
      builder.move_output_files_to_build_directory
      builder.cleanup

      # Report
      puts format("\nBuild complete. Find files in %s.", builder.output_dir)
    end

    desc "Build OmniNav navbar assets."
    task assets: :environment do
      # Configure the asset pipeline to compile minified files.
      # NOTE: Sprockets only minifies files in production environment so this assumes
      # RAILS_ENV is set to production on the command line.
      Rails.application.config.assets.prefix = "../build/omninav/staging"
      Rails.application.config.assets.paths = [Rails.root.join('app', 'assets', 'javascripts'),
                                               Rails.root.join('app', 'assets', 'stylesheets')]
      Rails.application.config.assets.precompile -= ['master.js', 'master.css']
      Rails.application.config.assets.precompile += ['omni-nav.js', 'omni-nav.css']

      # Let it rip.
      Rake::Task['assets:clobber'].invoke
      Rake::Task['assets:precompile'].invoke
    end
  end

  #
  # Build all versions: rake build:omninav
  #
  desc "Build OmniNav navbar assets and markup for various Chapman websites."
  task omninav: :environment do
    Rake::Task['build:omninav:static'].invoke
    Rake::Task['build:omninav:blogs'].invoke
    Rake::Task['build:omninav:inside'].invoke
  end
end
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
  `open -g #{git_log}`
  system %(open -g "./dist")
end 

####################
# HELPER FUNCTIONS #
####################

def prep_dist
  FileUtils.mkdir('dist') unless File.directory?('dist')
  FileUtils.rm_rf dist_folder
  FileUtils.mkdir dist_folder
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

desc "Trigger Netlify deploy"
task netlify: :environment do
end

require 'zip_file_generator'

namespace :build do
  namespace :omninav do
    desc "Build static OmniNav navbar assets and markup."
    task static: :environment do
      target = 'static'
      deploy_files = ['omni-nav.css',
                      'omni-nav.css.gz',
                      'omni-nav.js',
                      'omni-nav.js.gz',
                      'omninav.html']

      # Prep staging and output directories.
      puts format("\nBuilding OmniNav %s version.\n", target)
      staging_dir = Rails.root.join('build', 'omninav', 'staging')
      output_dir = Rails.root.join('build', 'omninav', 'static')
      FileUtils.rm_rf output_dir
      [staging_dir, output_dir].each{ |d| FileUtils::mkdir_p d unless File.exists?(d) }

      # Build Asset files.
      Rails.application.config.assets.prefix = "../build/omninav/staging"
      Rails.application.config.assets.digest = false
      Rails.application.config.assets.paths = [Rails.root.join('/app/assets/javascripts'),
                                               Rails.root.join('/app/assets/stylesheets/omni_nav')]
      Rails.application.config.assets.precompile = ['omni-nav.js', 'omni-nav.css']
      Rake::Task['assets:precompile'].invoke

      # Build HTML file.
      html_file = staging_dir.join 'omninav.html'
      builder = Omninav::Builder.new(target: target)
      omninav_html = builder.build

      # Write to file
      File.open(html_file, 'w') { |file| file.write(omninav_html) }

      # Move selected files from staging to output directory.
      deploy_files.each do |file|
        staging_file = staging_dir.join(file)
        deploy_file = output_dir.join(file)
        FileUtils.mv staging_file, deploy_file
        puts format('Writing %s.', deploy_file)
      end

      # Clean Up
      FileUtils.rm_rf staging_dir

      # Report
      puts format("\nBuild complete. Find files in %s.", output_dir)
    end
  end

  desc "Build OmniNav navbar assets and markup for various Chapman websites."
  task omninav: :environment do
    Rake::Task['build:omninav:static'].invoke
  end
end

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
    File.write(dist_cascade_block_path, render(file: 'layouts/cascade-assets.xml', layout: false))
    FileUtils.cp instructions, dist_folder
  end
end

task build_omni_nav: :environment do
  if Rails.env.development?
    puts "Please specify build environment"
    puts "Examples:"
    puts "  rake build_omni_nav RAILS_ENV=staging"
    puts "  rake build_omni_nav RAILS_ENV=production"
  else
    prep_dist

    # Setup Rails asset paths for just omni-nav assets & compile them
    Rails.application.config.assets.paths = [File.join(Rails.root, "/app/assets/javascripts"),
                                             File.join(Rails.root, "/app/assets/stylesheets")]
    Rails.application.config.assets.precompile -= ['master.js', 'master.css']
    Rails.application.config.assets.precompile += ['omni-nav.js', 'omni-nav.css']

    Rake::Task['assets:precompile'].invoke

    zip rails_asset_path, dist_assets_path
    puts "Assets saved to public/_assets"
  end
end

task do_precompile: :environment do
  Rake::Task['assets:clobber'].invoke
  Rake::Task['assets:precompile'].invoke
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

def instructions
  Rails.root.join('lib', 'instructions.txt')
end

def zip(input_folder, output_name)
  zf = ZipFileGenerator.new(input_folder, output_name)
  zf.write
end

class Cascade < Thor
    require 'httparty'
    desc "publish asset_type asset_path", "Publish any Cascade Asset via CLI!!! 🖕Remember to `export CASCADE_USERNAME=foo` and `export CASCADE_PASSWORD=bar"
    # method_option :asset_type, :aliases => "-t", :desc => "page/block/structureddatadefinition/etc | NOTE: KEEP trailing slash"
    # method_option :asset_path, :aliases => "-p", :desc => "eg Chapman.edu/_cascade/formats/modular/widgets/1-column | NOTE: no trailing slash"

    # ---------------------------------------------------------------------------- #
    #                                    PUBLISH                                   #
    # ---------------------------------------------------------------------------- #
    # USAGE: thor cascade:publish page Chapman.edu/test-section/nick-test/test-publish
    def publish(asset_type, asset_path)
        puts "asset type: #{asset_type}"
        puts "asset type: #{asset_path}"

        # * 1) BASE URL 
        base_url = 'https://dev-cascade.chapman.edu/api/v1/'.to_s

        # * 2) REST API ACTION
        # https://wimops.chapman.edu/wiki/WWW#Key_Links
        # https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/rest-api/index.html
        rest_action = "publish/".to_s # ! KEEP TRAILING SLASH
        
        # * 3) ASSET TYPE
        # this is easy to find in cascade's edit/preview url.
        # ie https://dev-cascade.chapman.edu/entity/open.act?id=7f74b81ec04d744c7345a74906ded22a&type=page
        # asset_type = 'page/' # ! KEEP TRAILING SLASH 
        # asset_type = #{asset_type}
        
        # * 4) ASSET PATH OR ID
        # you can also use its path (ie "Chapman.edu/_cascade/formats/modular/widgets/1-column")... but.. whitespace.
        # asset_path = "Chapman.edu/test-section/nick-test/test-publish" # ! NO TRAILING SLASH
        # asset_path = #{asset_path}
        # * 5) SECRETS
        # set these in application.yml (a la figaro 🐈)
        cascade_username = '?u=' + `ruby -e 'p ENV["CASCADE_USERNAME"]'`.to_s
        cascade_password = '&p=' +`ruby -e 'p ENV["CASCADE_PASSWORD"]'`
        puts 'cascade username ' + `ruby -e 'p ENV["CASCADE_USERNAME"]'`

        # the constructed url should look something like:
        # https://dev-cascade.chapman.edu/api/v1/read/folder/Chapman.edu/_cascade/formats/modular/widgets/foldername?u=username&p=password
        
        url = base_url + rest_action + asset_type  + '/' + asset_path + cascade_username.delete('"') + cascade_password.delete('"')
        puts 'url ' + url
        
        # Inspect response for required details below 👇
        response = HTTParty.get(url)
        puts response.body
    end
end



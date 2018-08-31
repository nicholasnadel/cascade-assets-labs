require 'test_helper'

class SimplifyControllerTest < ActionController::TestCase
  test "should get masthead" do
    get :masthead
    assert_response :success
  end

end

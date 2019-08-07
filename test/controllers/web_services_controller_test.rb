require 'test_helper'

class WebServicesControllerTest < ActionController::TestCase
  test "should get page" do
    get :page
    assert_response :success
  end

  test "should get format" do
    get :format
    assert_response :success
  end

  test "should get block" do
    get :block
    assert_response :success
  end

end

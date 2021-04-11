class ApplicationController < ActionController::API
	before_action :configure_params, if: :devise_controller?

	def configure_params
		devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :avatar, :uid, :phone_number])
		devise_parameter_sanitizer.permit(:account_update, keys: [:name, :avatar, :phone_number])
	end
end
    
Rails.application.routes.draw do
  devise_for :users, path: 'users',
  	path_names: {
  		sign_in: 'login',
  		sign_out: 'log_out',
  		registration: 'signup'
  	},
  	controllers: {
  		sessions: 'users/sessions',
  		registrations: 'users/registrations',
  		passwords: 'users/passwords',
  		confirmations: 'users/confirmations'
  	}

  	resources :properties
  	resources :aminities
  	resources :property_types
  	resources :slots
  	resources :rent_details
  	resources :verications
end
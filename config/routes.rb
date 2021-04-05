Rails.application.routes.draw do
  devise_for :users, defaults: { format: :json}, path: '',
  	path_names: {
  		sign_in: 'login',
  		sign_out: 'log_out',
  		registration: 'signup'
  	},
  	controllers: {
  		sessions: 'sessions',
  		registrations: 'registrations',
  		passwords: 'passwords',
  		confirmations: 'confirmations'
  	}

  	resources :properties
  	resources :aminities
  	resources :property_types
  	resources :slots
  	resources :rent_details
  	resources :verications
end

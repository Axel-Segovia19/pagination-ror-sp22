Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  

  namespace :api do
    resources :users, except: [:index, :show, :create, :destroy, :update] do
      resources :languages
    end
  end

end

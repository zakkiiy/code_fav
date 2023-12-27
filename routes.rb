Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  post 'auth/:provider/callback', to: 'api/v1/users#create'
  namespace :api do
    namespace :v1 do
      resources :posts, only: [:index, :create, :show, :update, :destroy]
    end
  end
end

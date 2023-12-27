# controllers/api/v1/posts_controller.rb

class Api::V1::PostsController < ApplicationController
  before_action :set_post, only: [:show, :update, :destroy]
  before_action :authenticate_user!, only: [:create, :update, :destroy]

  # 全ての投稿を取得
  def index
    posts = Post.all
    render json: posts
  end

  # 特定の投稿を取得
  def show
    render json: @post
  end

  # 新しい投稿を作成
  def create
    post = current_user.posts.build(post_params)
    if post.save
      render json: post, status: :created
    else
      render json: post.errors, status: :unprocessable_entity
    end
  end

  # 投稿を更新
  def update
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # 投稿を削除
  def destroy
    @post.destroy
    head :no_content
  end

  private

  def authenticate_user!
    # ヘッダーからトークンを取得
    token = request.headers['Authorization']&.split(' ')&.last
    return unless token
    
    # トークンを検証し、current_userを設定
    user_id = decode_token(token)
    @current_user = User.find_by(id: user_id) if user_id
    head :unauthorized unless @current_user
  end

  def current_user
    @current_user
  end

  def decode_token(token)
    # ここでトークンをデコードし、ユーザーIDを取得するロジックを実装
    # 例: JWT.decode(token, secret_key).first['user_id']
  end
end

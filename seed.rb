10.times do |i|
  User.find_or_create_by(id: i+1) do |u|
    u.provider = "github"
    u.uid = "unique-uid-#{i+1}"  # ユニークなUID
    u.name = "User #{i+1}"  # ユーザー名
  end
end

# 投稿データの追加
10.times do |i|
  Post.find_or_create_by(title: "Post Title #{i+1}") do |post|
    post.user_id = i+1  # ユーザーID
    post.start_date = "2023-01-#{i+1}T00:00:00Z"  # 開始日時（ISOフォーマット）
    post.end_date = "2023-01-#{i+2}T00:00:00Z"  # 終了日時（ISOフォーマット）
    post.recruiting_count = i+1  # 募集人数
    post.description = "This is a description for post #{i+1}."
  end
end

4.times do |i|
  Post.find_or_create_by(title: "Additional Post for User 1 - #{i+1}") do |post|
    post.user_id = 1  # user_idは1
    post.start_date = "2023-02-#{i+1}T00:00:00Z"
    post.end_date = "2023-02-#{i+2}T00:00:00Z"
    post.recruiting_count = 10  # 任意の数
    post.description = "This is an additional post for user 1, number #{i+1}."
  end
end

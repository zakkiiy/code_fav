"use client";
import React, { useState } from "react";
import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import axios from 'axios';
import { getSession } from 'next-auth/react';
import { Button } from "@/components/ui/button"

// 認証トークンをヘッダーに付加するfetcher関数
const fetcherWithAuth = async (path) => {
  const session = await getSession();
  const token = session?.user?.accessToken;  // next-authセッションからトークンを取得
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:';  // デフォルトURLを提供
  const url = `${apiUrl}${path}`;
  console.log(session)
  console.log('11111111111111111')
  console.log(url)
  console.log('11111111111111111')
  console.log(token)
  console.log('22222222222222222')
  console.log(headers)
  console.log('33333333333333333')
  return axios.get(url, { headers }).then((res) => res.data);
  
};

export default function Home() {

  const { data: session, status } = useSession();
  console.log(useSession());
  const { data: posts, error } = useSWR('/api/v1/posts', fetcherWithAuth); // fetcherWithAuthを使用
  const [newTitle, setNewTitle] = useState("");  // 新しい投稿のタイトルを管理するstate

  // 新しい投稿を作成する関数
  const createPost = async () => {
    if (!newTitle) return;  // タイトルが空の場合は投稿しない
    const url = '/api/v1/posts';  // ここに正しいAPIエンドポイントを設定
    try {
      const response = await axios.post(url, { title: newTitle }, { headers: { Authorization: `Bearer ${session?.user?.accessToken}` } });
      console.log(response.data);  // 成功した場合の処理
      setNewTitle('');  // タイトルをリセット
    } catch (error) {
      console.error("投稿に失敗しました", error);  // エラー処理
    }
  }

  if (status === 'loading') return <p>ローディング中...</p>;
  if (error) return <p>エラーが発生しました。</p>;

  return (
    <>
      {status === 'authenticated' ? (
        <div>
          <h1>投稿一覧</h1>
          {posts?.map(post => (  // データが存在する場合のみマッピング
            <div key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
            </div>
          ))}
          <div>
            <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
            <button onClick={() => createPost()}>投稿</button>
          </div>
        </div>
      ) : (
        <h1>ログインしてください</h1>
      )}
    </>
  );
}

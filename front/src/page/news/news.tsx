import React, { useState } from "react";
import { useGetPostsQuery, useCreatePostMutation } from "../../store/api";
import { Link } from "react-router-dom";
import Navigation from "../../components/navigation/navigation";
import { useSelector } from "react-redux";
import { HOST } from "../../settings";
import s from "./news.module.scss";

function News() {
  const { data: posts = [], error, isLoading } = useGetPostsQuery("getPosts");
  const idUser = useSelector((state: any) => state.auth.id);
  const [createPost] = useCreatePostMutation();

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className={s.wrapper}>
      <Navigation />
      <ul>
        {posts.map((post: any, key: number) => (
          <div key={key} className={s.item}>
            <Link to={"/news/" + post._id}>
              {post.title}
              <div className={s.title}>
                <li>{post.title}</li>
                {post.photo && <img src={HOST + 'uploads/' + post.photo} />}
              </div>
              <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
            </Link>
            {post.author == idUser && (
              <Link to={"/newsEdit/" + post._id}>редактировать_статью</Link>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
}

export default News;

import { useSelector } from "react-redux";
import {
  useGetPostEditContentMutation,
  useGetPostEditMutation,
  useGetPostIdQuery,
} from "../../store/api";
import { FC, FormEvent, useEffect, useState } from "react";
import s from "./editNews.module.scss";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";

const EditNews: FC = ({}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const newsId = window.location.pathname.split("/")[2];

  useEffect(() => {
    setTitle(newsContent?.title);
    setContent(newsContent?.content);
  }, [newsId]);

  const {
    data: newsContent = {},
    error,
    isLoading,
  } = useGetPostIdQuery(newsId);

  const id = useSelector((state: any) => state.auth.id);
  const [getPostEdit] = useGetPostEditMutation();
  const [getPostEditContent] = useGetPostEditContentMutation();

  const changeContent = async () => {
    console.log(newsId, 'newsId')
    await getPostEditContent({ post_id: newsId, title, content }).unwrap();
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("id", id);
    formData.append("newsId", newsId);
    const pictureInput = (e.target as HTMLFormElement).elements.namedItem(
      "picture"
    ) as HTMLInputElement;
    if (pictureInput && pictureInput.files && pictureInput.files[0]) {
      formData.append("picture", pictureInput.files[0]);
      getPostEdit(formData).unwrap();
    }
  };

  const handleTextChange = (value: any) => {
    setContent(value);
  };

  return (
    <>
      <Link to="/news">перейти к новостям</Link>
      <hr />
      <div className={s.wrapper}>
        <h2>добавить фотку к статье</h2>
        <form id="formElem" onSubmit={onSubmit}>
          Картинка: <input type="file" name="picture" accept="image/*" />
          <button type="submit">добавить фото</button>
        </form>
      </div>
      <br />
      <div>
        {/* <input type="text" value={newsContent.title}/> */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <ReactQuill
          // value={newsContent.content}
          value={content}
          onChange={handleTextChange}
          className="h-[300px]"
        />
      </div>
        <button onClick={changeContent} className='mt-[90px]'>поменять тело и заголовок</button>
    </>
  );
};

export default EditNews;

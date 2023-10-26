import { useSelector } from "react-redux";
import { useGetPostEditMutation } from "../../store/api";
import { FC, FormEvent } from "react";
import s from "./editNews.module.scss";
import { Link } from "react-router-dom";

const EditNews: FC = ({}) => {
  const newsId = window.location.pathname.split("/")[2];
  const id = useSelector((state: any) => state.auth.id);
  const [getPostEdit] = useGetPostEditMutation();

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
    </>
  );
};

export default EditNews;

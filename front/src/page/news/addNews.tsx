import { useState } from "react";
import { useSelector } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import ReactQuill from "react-quill";

import { useCreatePostMutation } from "../../store/api";
import Navigation from "../../components/navigation/navigation";

// import 'react-quill/dist/quill.snow.css';
import s from "./addNews.module.scss";

const ArticleForm = () => {
  const [createPost, { data, error }] = useCreatePostMutation();
  const token = useSelector((state: any) => state.auth.accessToken);
  const [text, setText] = useState("");

  const handleTextChange = (value: any) => {
    setText(value);
  };

  type Inputs = {
    title: string;
    content: string;
    file: any;
    otherData: string;
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    console.log("Отправка данных:", values);
    try {
      await createPost({
        ...values,
        content: text,
        token: token,
        availableDate: "2023-11-02T12:00:00.000Z",
      });
      console.log("Новость успешно создана.");
    } catch (error) {
      console.error("Ошибка при создании новости:", error);
    }
    setText("");
    reset();
  };

  return (
    <div className={s.wrapper}>
      <Navigation />
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="flex gap-20">
          <span>заголовок: </span>
          <input
            {...register("title", { required: true })}
            className={s.title}
          />
        </div>
        {errors.content && <span>This field is required</span>}
        <div className="flex gap-20">
          <span>контент :::: </span>
          <ReactQuill
            value={text}
            onChange={handleTextChange}
            className="h-[300px]"
          />
        </div>
        <input type="submit" value="опубликовать" className={s.submit} />
      </form>
    </div>
  );
};

export default ArticleForm;

import Navigation from "../../components/navigation/navigation";
import s from "./main.module.scss";

const Main = () => {
  return (
    <div className={s.wrapper}>
      <Navigation />
      <div className="mt-[50px]">
        <br />
        <p>Зарегистрируйтесь или войдите в аккаунт.</p>
        <hr />
        <p>Для редактирования доступны только те новости, где вы являетесь автором.</p>
      </div>
    </div>
  );
};

export default Main;

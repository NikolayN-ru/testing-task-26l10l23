import { FC, useEffect, useState } from "react";
import s from "./enterModal.module.scss";
import { useUserloginMutation } from "../../store/userApi";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../../store/store";

const EnterModal: FC<any> = ({ close }) => {
  const dispatch = useDispatch();
  const [login, setLogin] = useState<string>("user2@gamil.com");
  const [password, setPassword] = useState<string>("133");

  const [userLogin, { data, error }] = useUserloginMutation();

  const loginFunc = async () => {
    const result = await userLogin({
      email: login,
      password: password,
    }).unwrap();
    setLogin("");
    setPassword("");
    dispatch(setAccessToken(result));
    close();
  };

  return (
    <div className={s.wrapper}>
      <div className={s.modalContent}>
        <div>
          <span>логин</span>
          <input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>
        <div>
          <span>пароль</span>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <hr />
        <button onClick={loginFunc}>войти</button>
        <button className={s.closeButton} onClick={close}>
          закрыть
        </button>
      </div>
    </div>
  );
};

export default EnterModal;



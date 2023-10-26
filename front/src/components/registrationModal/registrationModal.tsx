import { FC, useEffect, useState } from "react";
import s from "../enterModal/enterModal.module.scss";
import { useUserRegistrationMutation } from "../../store/userApi";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../../store/store";

const RegistrationsModal: FC<any> = ({ close }) => {
  const dispatch = useDispatch();
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [userLogin, { data, error }] = useUserRegistrationMutation();

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
        <button onClick={loginFunc}>зарегистрироваться</button>
        <button className={s.closeButton} onClick={close}>
          закрыть
        </button>
      </div>
    </div>
  );
};

export default RegistrationsModal;

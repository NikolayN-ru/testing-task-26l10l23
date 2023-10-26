import { useState } from "react";
import EnterModal from "../enterModal/enterModal";
import { useDispatch, useSelector } from "react-redux";
import { clearAccessToken } from "../../store/store";
import s from "./header.module.scss";
import RegistrationModal from "../registrationModal/registrationModal";

const Header = () => {
  const [state, setState] = useState<boolean>(false);
  const [registration, setRegistration] = useState<boolean>(false);
  const accessToken = useSelector((state: any) => state.auth.accessToken);
  const dispatch = useDispatch();

  const toogle = () => {
    setState((prev) => !prev);
  };

  const toogle2 = () => {
    setRegistration((prev) => !prev);
  };



  return (
    <div>
      <br />
      {!accessToken ? (
        <div>
          <button onClick={toogle} className={s.button}>войти</button>
          <button onClick={toogle2} className={s.button}>зарегистироваться</button>
        </div>
      ) : (
        <button onClick={() => dispatch(clearAccessToken())}>выйти</button>
      )}

      {state && <EnterModal close={toogle} />}
      {registration && <RegistrationModal close={toogle2} />}
      <hr />
    </div>
  );
};

export default Header;

import React from "react";
import Navigation from "../../components/navigation/navigation";
import { useSelector } from "react-redux";

const Account = () => {
//   const idUser = useSelector((state: any) => state.auth.id);

//    const { data: posts = [], error, isLoading } = useGetPostsEditQuery(idUser);

//   if (isLoading) {
    // <p>Loading...</p>;
//   }

//   console.log(posts, "posts");
  return (
    <div>
      <Navigation />
      <div>Account</div>
      <h1>список новостей созданных пользователем</h1>
      <p>возможность отредактировать</p>
      <hr />
      {/* <div>{idUser}</div> */}
    </div>
  );
};

export default Account;

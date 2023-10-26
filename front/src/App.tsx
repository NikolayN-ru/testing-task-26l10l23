import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Contact from "./components/contact";
import News from "./page/news/news";
import Header from "./components/header/header";
import NewsItem from "./page/news/newsItem";
import AddNews from "./page/news/addNews";
import Main from "./page/main/main";
import Account from "./page/account/account";
import EditNews from "./page/editNews/editNews";

const router = createBrowserRouter([
  {
    path: "/newsEdit/:new",
    element: <EditNews />,
  },
  {
    path: "news/:new",
    element: <NewsItem />,
  },
  {
    // path: "contacts/:contactId",
    path: "contacts/",
    element: <Contact />,
  },
  { path: "login/", element: <p>asdasd</p> },
  { path: "add/", element: <AddNews /> },
  {
    path: "/news",
    element: <News />,
  },
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/lk",
    element: <Account />,
  },
]);

function App() {
  return (
    <div className="App">
      <Header />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

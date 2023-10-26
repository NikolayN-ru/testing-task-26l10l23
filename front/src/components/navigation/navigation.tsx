import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const link = [
  { route: "/", title: "главная" },
  { route: "/news", title: "список новостей" },
  { route: "/add", title: "добавить новость" },
  // { route: "/lk", title: "личный кабинет" },
];

const Navigation = () => {
  // const token = useSelector((state: any) => state.auth.accessToken);

  return (
    <div>
      {/* {token && <Link to="/lk">личный кабинет</Link>} */}
      <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
        <div
          className="inline-flex flex-col w-full rounded-md shadow-sm md:w-auto md:flex-row"
          role="group"
        >
          {link.map(({ route, title }) => (
            <Link to={route}>
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200  hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-2 focus:ring-primary-700 focus:text-primary-700"
              >
                {title}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navigation;

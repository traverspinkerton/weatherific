import { useAuth } from "react-use-auth";

export default function Nav() {
  const { logout } = useAuth();

  return (
    <nav>
      <ul className="flex justify-between items-center space-x-4 p-4 md:px-0">
        <li>
          <h3 className="text-xl font-extrabold text-yellow-800 dark:text-yellow-500 italic">
            Weatherific
          </h3>
        </li>
        <li>
          <button
            className="text-yellow-800 hover:text-yellow-900 dark:text-yellow-500  hover:bg-yellow-500 font-bold"
            onClick={logout}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}

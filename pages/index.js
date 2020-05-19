import { useRouter } from "next/router";
import Head from "next/head";
import { useAuth } from "react-use-auth";

export default function IndexPage() {
  const router = useRouter();
  const { login, isAuthenticated, signup } = useAuth();

  return (
    <div>
      <Head>
        <title>Weatherific</title>
      </Head>
      <div className="pt-40 pb-10 mx-auto">
        <img
          className="mx-auto"
          src="http://openweathermap.org/img/wn/02d@2x.png"
          alt="cloud with sun coming up behind"
        />
        <h1 className="text-6xl text-center font-extrabold text-yellow-800 dark:text-yellow-500 italic">
          Weatherific
        </h1>
      </div>
      <div className="flex justify-center">
        {isAuthenticated() ? (
          <button
            className="bg-blue-400 hover:bg-blue-500 text-white shadow-md text-lg no-underline"
            onClick={() => router.push("/weather")}
          >
            Go to Your Weather Forecasts
          </button>
        ) : (
          <div className="space-x-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white shadow-md text-lg no-underline"
              onClick={signup}
            >
              Sign Up
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white shadow-md text-lg no-underline"
              onClick={login}
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

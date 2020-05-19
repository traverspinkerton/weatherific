import React, { useEffect } from "react";
import { mutate } from "swr";

import { useAuth } from "react-use-auth";

const Auth0CallbackPage = () => {
  const { handleAuthentication } = useAuth();

  useEffect(() => {
    handleAuthentication({ postLoginRoute: "/weather" });
  }, []);

  return (
    <div className="container py-40 mx-auto">
      <div className="flex space-x-4 mx-auto justify-center items-center">
        <img src="http://openweathermap.org/img/wn/01d@2x.png" alt="weather" />
        <img src="http://openweathermap.org/img/wn/02d@2x.png" alt="weather" />
        <img src="http://openweathermap.org/img/wn/03d@2x.png" alt="weather" />
      </div>
      <h1 className="text-center text-5xl text-yellow-800 dark:text-yellow-500">
        Login Successful!
      </h1>
    </div>
  );
};

export default Auth0CallbackPage;

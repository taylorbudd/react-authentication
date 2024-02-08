import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import { RingLoader } from "react-spinners";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    console.log(`first auth: ${JSON.stringify(auth) || "no auth token"}`); 
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`auth: ${JSON.stringify(auth?.accessToken)}`);
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <RingLoader color={"#123abc"} loading={isLoading} size={150} />
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;

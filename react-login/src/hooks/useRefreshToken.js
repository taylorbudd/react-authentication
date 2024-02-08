import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();


  const refresh = async () => {
    const response = await axios
      .get("/refresh", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status !== 200) {
          console.log(res.data);
          throw new Error("Network response was not ok");
        }
        setAuth((prev) => {
          return { ...prev, accessToken: res.data.accessToken };
        });
        return res.data.accessToken;
      }).catch((err) => {
        console.log("error: " + err.response.data);
      });
  };
  return refresh;
};

export default useRefreshToken;

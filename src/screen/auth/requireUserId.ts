import axios from "axios";
import path from "../../../path";
import { useEffect, useState } from "react";

export const RequireUserId = ({ children }) => {
  const [userId, setUserId] = useState(null);

  const fetchUserId = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.post(`${path}/user_with_token/`, {
        token: token,
      });
      setUserId(response.data.u_id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      await fetchUserId();
    };
    getData();
  }, []);

  if (userId === null) {
    return null;
  }

  return children(userId);
};

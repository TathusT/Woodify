import axios from "axios";
import path from "../../../path";
import { useEffect, useState } from "react";
import liff from "@line/liff";
import { useNavigate, useParams } from "react-router-dom";

export const RequireUserId = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const { classifyId } = useParams();
  const router = useNavigate();

  const fetchUserId = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (token == undefined) {
        localStorage.setItem('current_page', "classifyDetail");
        router("/line/login");
      }
      const response = await axios.post(`${path}/user_with_token/`, {
        token: token,
      });
      setUserId(response.data.u_id);
    } catch (error) {
      console.log(error);
    }
  };

  // function getProfileAndChangeRichmenu() {
  //   const data = localStorage.getItem("data");
  //   const google_data = localStorage.getItem("google_data");
  //   if (data == undefined && google_data == undefined) {
  //     liff
  //       .getProfile()
  //       .then((profile) => {
  //         axios
  //           .post(`${path}/liff/login`, {
  //             lineProfile: profile,
  //           })
  //           .then((res) => {
  //             console.log(res.data);

  //             if (
  //               res.data.message == "not_have_data" ||
  //               res.data.message == "new_user"
  //             ) {
  //               liff.logout();
  //               router("/line/signup", { state: { data: res.data } });
  //             } else {
  //               localStorage.clear();
  //               localStorage.setItem(
  //                 "access_token",
  //                 res.data.line_access_token
  //               );
  //               liff.closeWindow();
  //             }
  //           })
  //           .catch((err) => {
  //             console.log(err);
  //           });
  //       })
  //       .catch((err) => {
  //         console.error("Error getting profile:", err);
  //       });
  //   } else {
  //     liff
  //       .getProfile()
  //       .then((profile) => {
  //         axios
  //           .post(
  //             `${path}/line/register`,
  //             {
  //               lineProfile: profile,
  //               data: localStorage.getItem("data"),
  //             },
  //             {
  //               headers: { "Access-Control-Allow-Origin": "*" },
  //             }
  //           )
  //           .then((res) => {})
  //           .catch(() => {});
  //       })
  //       .catch((err) => {
  //         console.error("Error getting profile:", err);
  //       });
  //   }
  // }

  useEffect(() => {
    // liff
    //   .init({
    //     liffId: "2001173297-AoDv0582",
    //   })
    //   .then(() => {
    //     if (liff.isLoggedIn()) {
    //       getProfileAndChangeRichmenu();
    //     }
    //   })
    //   .catch((err) => {
    //     console.error("Error initializing LIFF:", err);
    //   });
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

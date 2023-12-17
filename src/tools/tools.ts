import axios from "axios";
import path from "../../path";
import { useNavigate } from "react-router-dom";


export function convertIsoToThaiDateTime(isoDateString: string): string {
  const isoDate = new Date(isoDateString);

  const thaiYear = isoDate.getFullYear() + 543;
  const thaiMonth = (isoDate.getMonth() + 1).toString().padStart(2, "0");
  const thaiDay = isoDate.getDate().toString().padStart(2, "0");
  const thaiHours = isoDate.getHours().toString().padStart(2, "0");
  const thaiMinutes = isoDate.getMinutes().toString().padStart(2, "0");

  return `${thaiDay}/${thaiMonth}/${
    thaiYear % 100
  } ${thaiHours}.${thaiMinutes} น.`;
}

export function useAuthenticationUserWebsite() {
  const navigate = useNavigate();

  async function authenticationUser() {
    const authen = await axios.post(`${path}/authentication_user`, {}, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    });

    if (authen.data === false) {
      alert("session หมดอายุ")
      navigate("/admin/login");
      localStorage.removeItem('access_token')
    }
  }

  return { authenticationUser };
}

export function useAuthenticationUserLine() {
  const navigate = useNavigate();

  async function authenticationUser() {
    const authen = await axios.post(`${path}/authentication_user`, {}, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    });
    if (authen.data === false) {
      alert("session หมดอายุ")
      navigate("/line/login");
      localStorage.removeItem('access_token')
      return false;
    }
    else{
      return true;
    }
  }

  return { authenticationUser };
}

export function getImage(url: string): string {
  const backendUrl = 'http://localhost:4000'; 
  return `${backendUrl}${url}`;
}


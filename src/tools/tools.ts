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

export function convertIsoToThaiDateTimeFullYear(isoDateString: string): string {
  const isoDate = new Date(isoDateString);

  const thaiYear = isoDate.getFullYear() + 543;
  const thaiMonth = (isoDate.getMonth() + 1).toString().padStart(2, "0");
  const thaiDay = isoDate.getDate().toString().padStart(2, "0");
  const thaiHours = isoDate.getHours().toString().padStart(2, "0");
  const thaiMinutes = isoDate.getMinutes().toString().padStart(2, "0");

  return `${thaiDay}/${thaiMonth}/${
    thaiYear
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

export function isoToThaiDateTime(isoDateTime) {
  const thaiMonths = {
      1: "มกราคม",
      2: "กุมภาพันธ์",
      3: "มีนาคม",
      4: "เมษายน",
      5: "พฤษภาคม",
      6: "มิถุนายน",
      7: "กรกฎาคม",
      8: "สิงหาคม",
      9: "กันยายน",
      10: "ตุลาคม",
      11: "พฤศจิกายน",
      12: "ธันวาคม"
  };

  const [datePart, timePart] = isoDateTime.split('T');
  const [year, month, day] = datePart.split('-').map(Number);
  const [hours, minutes, seconds] = (timePart || '00:00:00').split(':').map(Number);
  const thaiYear = year + 543;
  const thaiMonth = thaiMonths[month];
  
  return `${day} ${thaiMonth} ${thaiYear} เวลา ${hours}:${minutes}`;
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
  const backendUrl = `${path}`; 
  return `${backendUrl}${url}`;
}

export function deleteAllCookies() {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}


export const modules = {
  toolbar: [
      [{ header: "1" }, { header: "2" }, { header: [3, 4, 5, 6] }, { font: [] }],
      [{ size: {} }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      ["clean"],
      ["code-block"],
  ],
};
export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "image",
  "video",
  "code-block",
];
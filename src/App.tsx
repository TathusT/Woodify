import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginLine from "./screen/line/Login";
import RegisterLine from "./screen/line/Register";
import DashBoard from "./screen/website/DashBoard";
import NavigationBar from "./screen/component/NavigationBar";
import InformationWood from "./screen/website/InformationWood";
import Manual from "./screen/website/Manual";
import ClassifyWood from "./screen/website/ClassifyWood";
import Account from "./screen/website/Account";
import HistoryClassify from "./screen/line/HistoryClassify";
import ClassidyDetail from "./screen/line/ClassifyDetail";
import Profile from "./screen/line/Profile";
import WoodDetail from "./screen/line/WoodDetail";
import Notification from "./screen/line/Notification";
import LoginWeb from "./screen/website/Login";
import UserProfile from "./screen/website/UserProfile"
import { RequireAuthLine } from "./screen/auth/requireAccessToken";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/line/*" element={<LineRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}


function LineRoutes() {
  return (
    <Routes>
      <Route path="login" element={<LoginLine />} />
      <Route path="signup" element={<RegisterLine />} />
      <Route path="history_classify" element={<RequireAuthLine><HistoryClassify /></RequireAuthLine>} />
      <Route path="classify_detail" element={<RequireAuthLine><ClassidyDetail /></RequireAuthLine>} />
      <Route path="profile" element={<RequireAuthLine><Profile /></RequireAuthLine>} />
      <Route path="wood_detail/:woodId" element={<RequireAuthLine><WoodDetail /></RequireAuthLine>} />
      <Route path="notification" element={<RequireAuthLine><Notification /></RequireAuthLine>} />
    </Routes>
  );
}

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<NavigationBar />}>
        <Route path="dashboard" element={<DashBoard />} />
        <Route path="account" element={<Account />} />
        <Route path="information_wood" element={<InformationWood />} />
        <Route path="manual" element={<Manual />} />
        <Route path="classify_wood" element={<ClassifyWood />} />
        <Route path="user_profile" element={<UserProfile/>}></Route>
      </Route>
      <Route path="login" element={<LoginWeb />} />
    </Routes>
  );
}

export default App;
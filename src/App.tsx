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
import ClassifyDetail from "./screen/line/ClassifyDetail";
import Profile from "./screen/line/Profile";
import WoodDetail from "./screen/line/WoodDetail";
import Notification from "./screen/line/Notification";
import LoginWeb from "./screen/website/Login";
import UserProfile from "./screen/website/UserProfile"
import ManageManual from "./screen/website/ManageManual";
import { RequireUserId } from "./screen/auth/requireUserId";
import { RequireAccessTokenLine } from "./screen/auth/requireAccessToken";
import ManualLine from "./screen/line/Manual";
import ClassifyWoodDetail from "./screen/website/ClassifyWoodDetail";
import InformationWoodDetail from "./screen/website/InformationWoodDetail";
import ManageInformationWood from "./screen/website/ManageInformationWood";
import HomePage from "./screen/website/HomePage";
import ManualDetail from "./screen/website/ManualDetail"
import SignUpWeb from "./screen/website/Signup";
import InformationWoodLine from "./screen/line/InformationWood";
import NotPermission from './screen/website/NotPermission'
import AlertLogin from "./screen/line/AlertLogin";


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
      <Route path="alert/login" element={<AlertLogin />} />
      <Route path="information_wood" element={<InformationWoodLine />} />
      <Route
        path="history_classify"
        element={
          <RequireUserId>
            {(userId) => <HistoryClassify userId={userId} />}
          </RequireUserId>
        }
      />
      <Route path="classify_detail/:classifyId" element={
          <RequireUserId>
            {(userId) => <ClassifyDetail userAuthen={userId} />}
          </RequireUserId>
        } />
      <Route
        path="profile"
        element={
          <RequireUserId>
            {(userId) => <Profile userId={userId} />}
          </RequireUserId>
        }
      />
      <Route path="wood_detail/:woodId" element={<WoodDetail />} />
      <Route path="notification" element={<RequireAccessTokenLine><Notification /></RequireAccessTokenLine>} />
      <Route path="manual/:id" element={<ManualLine />} />
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
        <Route path="user_profile/:u_id" element={<UserProfile />}></Route>
        <Route path="classify_wood_detail/:c_id" element={<ClassifyWoodDetail />}></Route>
        <Route path="manage_manual" element={<ManageManual />} />
        <Route path="manage_manual/:id" element={<ManageManual />} />
        <Route path="manual_detail" element={<ManualDetail />} />
        <Route path="manage_information_wood" element={<ManageInformationWood />} />
        <Route path="manage_information_wood/:w_id" element={<ManageInformationWood />} />
        <Route path="information_wood_detail/:w_id" element={<InformationWoodDetail />} />
      </Route>
      <Route path="login" element={<LoginWeb />} />
      <Route path="signup/:a_id" element={<SignUpWeb />} />
      <Route path="signup" element={<SignUpWeb />} />
      <Route path="woodify" element={<HomePage />} />
      <Route path="error/not_permission" element={<NotPermission />} />
    </Routes>
  );
}

export default App;
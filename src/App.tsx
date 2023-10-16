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
      <Route path="history_classify" element={<HistoryClassify />} />
      <Route path="classify_detail" element={<ClassidyDetail />} />
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
      </Route>
    </Routes>
  );
}

export default App;
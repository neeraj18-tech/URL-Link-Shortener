import { Routes, Route } from "react-router-dom";
import ShortenUrlPage from "../dashboard/ShortenUrlPage";

const SubDomainRouter = () => {
  return (
    <Routes>
      <Route path="/:url" element={<ShortenUrlPage />} />
    </Routes>
  );
};

export default SubDomainRouter;

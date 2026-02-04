import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import MainRouter from "./routes/MainRouter";

const AppRouter = () => {
  return (
    <>
      <Navbar />
      <Toaster position="bottom-center" />
      <MainRouter />
      <Footer />
    </>
  );
};

export default AppRouter;

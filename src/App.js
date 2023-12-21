import SidBar from "./components/SidBar";
import Container from "./components/Container";
import AppRoute from "./Router/AppRoute";
import "react-tooltip/dist/react-tooltip.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-responsive-modal/styles.css";

function App() {
  return (
    <>
      <AppRoute />
      <ToastContainer />
    </>
  );
}

export default App;

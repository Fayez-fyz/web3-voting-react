import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <div className="bg-gradient-to-b from-gray-800 via-gray-900 to-black h-screen">
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Router>
        <Toaster position="top-right" />
      </div>
    </>
  );
}

export default App;

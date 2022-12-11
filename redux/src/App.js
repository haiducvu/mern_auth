import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from "./pages/index.pages";
import AdminPage from "./pages/admin.pages";
import LoginPage from "./pages/loginPages";
import RegisterPage from "./pages/register.pages";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

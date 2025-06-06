import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import ExhibitionPage from "./pages/ExhibitionPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignupPage";
import Layout from "./components/Layout";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/exhibition" element={<ExhibitionPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/loginpage" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

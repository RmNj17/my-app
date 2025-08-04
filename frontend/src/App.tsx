import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadFromStorage } from "./features/auth/authSlice";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import Homepage from "./pages/home/Homepage";
import LoginPage from "./pages/login/LoginPage";
import TouristSignupPage from "./pages/signup/TouristSignupPage";
import GuideSignupPage from "./pages/signup/GuideSignupPage";
import GuideDashboardPage from "./pages/dashboard/GuideDashboardPage";
import TouristDashboardPage from "./pages/dashboard/TouristDashboardPage";
import AvailableGuidesPage from "./pages/guides/AvailableGuidesPage";
import BookGuidePage from "./pages/guides/BookGuidePage";
import AdminDashboardPage from "./pages/dashboard/AdminDashboardPage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadFromStorage());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/signup/tourist"
          element={
            <PublicRoute>
              <TouristSignupPage />
            </PublicRoute>
          }
        />
        <Route
          path="/signup/guide"
          element={
            <PublicRoute>
              <GuideSignupPage />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard/guide"
          element={
            <ProtectedRoute>
              <GuideDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/tourist"
          element={
            <ProtectedRoute>
              <TouristDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/admin"
          element={
            <ProtectedRoute>
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="/guides" element={<AvailableGuidesPage />} />
        <Route path="/book-guide/:id" element={<BookGuidePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

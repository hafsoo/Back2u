import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  LoginPage,
  SignupPage,
  ActivationPage,
  HomePage,
  FAQPage,
  ProfilePage,
  LostFormPage,
  FoundFormPage,
  ItemPage,
  LostFoundDetailPage,
  BrowseItems,
  UserInbox,
  MatchesPage,
} from "./routes/Routes.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "./redux/actions/user";
import ProtectedRoute from "./routes/ProtectedRoute";
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute";
import {
  AdminClaimDetails,
  AdminClaimPage,
  AdminDashboardPage,
  AdminFoundPage,
  AdminLostPage,
  AdminUsersPage,
} from "./routes/AdminRoutes.js";
import EditReport from "./components/Profile/EditReport.jsx";
import EditFoundReport from "./components/Profile/EditFoundReport.jsx";
import axios from "axios";

function App() {
  const dispatch = useDispatch();

  axios.defaults.withCredentials = true;
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        {/**User Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/report-lost" element={<LostFormPage />} />
        <Route path="/report-found" element={<FoundFormPage />} />
        <Route path="/lost-reports" element={<ItemPage type="lost" />} />
        <Route path="/found-reports" element={<ItemPage type="found" />} />
        <Route path="/lost-found/:id" element={<LostFoundDetailPage />} />
        <Route path="/browse" element={<BrowseItems />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="/lost-report/edit/:item_id" element={<EditReport />} />
        <Route
          path="/found-report/edit/:item_id"
          element={<EditFoundReport />}
        />

        <Route path="/matches" element={<MatchesPage />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardPage />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin-all-lost"
          element={
            <ProtectedAdminRoute>
              <AdminLostPage />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin-users"
          element={
            <ProtectedAdminRoute>
              <AdminUsersPage />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin-all-founds"
          element={
            <ProtectedAdminRoute>
              <AdminFoundPage />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-claims"
          element={
            <ProtectedAdminRoute>
              <AdminClaimPage />
            </ProtectedAdminRoute>
          }
        />
        <Route
           path="/admin/claim/:id"
          element={
            <ProtectedAdminRoute>
              <AdminClaimDetails />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/inbox"
          element={
            <ProtectedRoute>
              <UserInbox />
            </ProtectedRoute>
          }
        />
       
      </Routes>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
}

export default App;

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

// Auth
import Login from "./components/user/auth/login";
import Register from "./components/user/auth/register";
import { logout } from "./_services/auth";

// Halaman user
import Home from "./pages/user/home";
import Contact from "./pages/user/contact";
import About from "./pages/user/about";
import Services from "./components/user/servives";
import CategoryPackage from "./components/user/CategoryPackages";
import Transaction from "./components/user/Transaction";

// Dashboard user
import DashboardLayout from "./components/user/dashboard/dashboardLayout";
import Profile from "./components/user/dashboard/Profile";
import Transaksi from "./components/user/dashboard/Transaksi";

// Admin
import Dashboard from "./pages/admin/dashboard";
import DUser from "./pages/admin/dUser";
import DAdmin from "./pages/admin/dAdmin";
import DKategori from "./pages/admin/dKategori";
import DPackage from "./pages/admin/dPackage";
import DTransaksi from "./pages/admin/dTransaksi";
import DLaporan from "./pages/admin/dLaporan";
import DEvent from "./pages/admin/event";

// Layout
import UserLayout from "./layout/user";
import AdminLayout from "./layout/admin";
// import Transaksi from "./components/user/dashboard/transaksi";

//Chat
import Chat from "./pages/user/chat";

//Transaksi
import ProtectedRoute from "./components/user/ProtectedRoute";

//Event Report

import DEventReport from "./pages/admin/dEventReport";
import EventReportForm from "./pages/admin/EventReportForm";



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn") === "true";
    const storedUsername = localStorage.getItem("username");

    setIsLoggedIn(loginStatus);
    setUsername(storedUsername || "");
  }, []);

const handleLogout = async () => {
  try {
    await logout();
  } catch (err) {
    console.log(err);
  }

  localStorage.removeItem("accessToken");
  localStorage.removeItem("userInfo");

  setIsLoggedIn(false);
  setUsername("");
};

  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminLayout>
              <DUser />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/admin"
          element={
            <AdminLayout>
              <DAdmin />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/kategori"
          element={
            <AdminLayout>
              <DKategori />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/package"
          element={
            <AdminLayout>
              <DPackage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/transaksi"
          element={
            <AdminLayout>
              <DTransaksi />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/laporan"
          element={
            <AdminLayout>
              <DLaporan />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/event"
          element={
            <AdminLayout>
              <DEvent />
            </AdminLayout>
          }
        />
      <Route
        path="/admin/event-report/:transactionId"
        element={
          <AdminLayout>
            <EventReportForm />
          </AdminLayout>
        }
      />

      <Route
        path="/admin/event-reports"
        element={
          <AdminLayout>
            <DEventReport />
          </AdminLayout>
        }
      />
        
        {/* User Routes */}
        <Route
          path="/login"
          element={
            <UserLayout>
              <Login />
            </UserLayout>
          }
        />

        <Route
          path="/register"
          element={
            <UserLayout>
              <Register />
            </UserLayout>
          }
        />

        <Route
          path="/"
          element={
            <UserLayout
              isLoggedIn={isLoggedIn}
              username={username}
              onLogout={handleLogout}
            >
              <Home />
            </UserLayout>
          }
        />
        <Route
          path="/home"
          element={
            <UserLayout
              isLoggedIn={isLoggedIn}
              username={username}
              onLogout={handleLogout}
            >
              <Home />
            </UserLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <UserLayout
              isLoggedIn={isLoggedIn}
              username={username}
              onLogout={handleLogout}
            >
              <Contact />
            </UserLayout>
          }
        />
        <Route
          path="/about"
          element={
            <UserLayout
              isLoggedIn={isLoggedIn}
              username={username}
              onLogout={handleLogout}
            >
              <About />
            </UserLayout>
          }
        />
        <Route
          path="/service"
          element={
            <UserLayout
              isLoggedIn={isLoggedIn}
              username={username}
              onLogout={handleLogout}
            >
              <Services />
            </UserLayout>
          }
        />
        <Route
          path="/kategori/:id"
          element={
            <UserLayout
              isLoggedIn={isLoggedIn}
              username={username}
              onLogout={handleLogout}
            >
              <CategoryPackage />
            </UserLayout>
          }
        />
        <Route
          path="/transaction"
          element={
            <ProtectedRoute>
            <UserLayout
              isLoggedIn={isLoggedIn}
              username={username}
              onLogout={handleLogout}
            >
              <Transaction />
            </UserLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <UserLayout
              isLoggedIn={isLoggedIn}
              username={username}
              onLogout={handleLogout}
            >
              <Login setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />
            </UserLayout>
          }
        />
        <Route
          path="/chat"
          element={
            <UserLayout
              isLoggedIn={isLoggedIn}
              username={username}
              onLogout={handleLogout}
            >
              <Chat />
            </UserLayout>
          }
        />
        {/* User Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="profile" element={<Profile />} />
          <Route path="transaksi" element={<Transaksi />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );  
}

export default App;

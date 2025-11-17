import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/auth/Login';

// Dashboard child pages
import Overview from './pages/dashboard/overview/Overview';
import Equipment from './pages/dashboard/equipment/Equipment';
import Support from './pages/dashboard/support/Support';

// Legacy imports (kept for backward compatibility if needed)
import AllAerobic from './pages/dashboard/allAerobic/AllAerobic';
import AllEquipments from './pages/dashboard/allEquipments/AllEquipments';
import AddAerobic from './pages/dashboard/addAerobic/AddAerobic';
import AddEquipment from './pages/dashboard/addEquipment/AddEquipment';
import AllUsers from './pages/dashboard/allUsers/AllUsers';
import UserProfile from './pages/dashboard/allUsers/UserProfile';
import EditProfile from './pages/dashboard/profile/EditProfile';
import EditUserProfile from './pages/dashboard/allUsers/EditUserProfile';
import AddUser from './pages/dashboard/allUsers/AddUser';
import Profile from './pages/dashboard/profile/Profile';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

    // Handle root path
    if (location.pathname === '/') {
      if (token) {
        navigate('/dashboard');
      } else {
        navigate('/login');
      }
    }
    // Handle other protected routes
    else if (!token && !isAuthPage) {
      navigate('/login');
    }
  }, [location.pathname, navigate]);

  return (
    <Routes>
      {/* Auth routes */}
      <Route path="/login" element={<Login />} />

      {/* Dashboard routes */}
      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<Overview />} /> {/* /dashboard */}
        <Route path="overview" element={<Overview />} />
        <Route path="all_users" element={<AllUsers />} />

        {/* Unified Equipment Management */}
        <Route path="equipment" element={<Equipment />} />

        {/* Legacy Routes (kept for backward compatibility) */}
        <Route path="all_aerobic" element={<AllAerobic />} />
        <Route path="all_equipments" element={<AllEquipments />} />
        <Route path="add_aerobic" element={<AddAerobic />} />
        <Route path="add_equipment" element={<AddEquipment />} />

        <Route path="support" element={<Support />} />
        <Route path="profile" element={<Profile/>} />
        <Route path="profile/edit" element={<EditProfile />} />
        <Route path="add-user" element={<AddUser />} />
        <Route path="user/:id" element={<UserProfile />} />
        <Route path="user/:id/edit" element={<EditUserProfile />} />
      </Route>
    </Routes>
  );
};

export default App;
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';

// Dashboard child pages
import Overview from './pages/dashboard/overview/Overview';
import AllAdmins from './pages/dashboard/allAdmin/AllAdmins';
import AllAerobic from './pages/dashboard/allAerobic/AllAerobic';
import AllEquipments from './pages/dashboard/allEquipments/AllEquipments';
import Support from './pages/dashboard/support/Support';
import Profile from './pages/dashboard/profile/Profile';
import AddAerobic from './pages/dashboard/addAerobic/AddAerobic';
import AddAdmin from './pages/dashboard/addAdmin/AddAdmin';



const App = () => {
  return (
    <Routes>
      {/* Auth routes */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Dashboard routes */}
      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<Overview />} /> {/* /dashboard */}
        <Route path="overview" element={<Overview />} />
        <Route path="all_admins" element={<AllAdmins />} />
        <Route path="all_aerobic" element={<AllAerobic />} />
        <Route path="all_equipments" element={<AllEquipments />} />
        <Route path="support" element={<Support />} />
        <Route path="profile" element={<Profile />} />
        <Route path="add_aerobic" element={<AddAerobic />} />
        <Route path="add_admin" element={<AddAdmin />} />
      </Route>
    </Routes>
  );
};

export default App;

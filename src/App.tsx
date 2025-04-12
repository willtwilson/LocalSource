import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DiscoveryPage from './pages/DiscoveryPage';
import { VendorDetails } from './pages/VendorDetails';
import { Search } from './pages/Search';
import Login from './pages/Login';
import Register from './pages/Register';
import VendorRegistration from './pages/VendorRegistration';
import VendorDashboard from './pages/VendorDashboard';
import Unauthorized from './pages/Unauthorized';
import AdminVendorVerification from './pages/AdminVendorVerification';
import AdminDashboard from './pages/AdminDashboard';
import SubmitVendorPage from './pages/SubmitVendorPage';
import { Toaster } from "@/components/ui/toaster";
import './index.css'; // This will be created next for global styles

// These are placeholder components that will be implemented later
// const SubmitVendorPage = () => <div className="p-8"><h1 className="text-2xl font-bold mb-4">Submit Vendor</h1><p>This page will be implemented as part of Task 14.</p></div>;
const FavoritesPage = () => <div className="p-8"><h1 className="text-2xl font-bold mb-4">My Favorites</h1><p>This page will be implemented later.</p></div>;

const App: React.FC = () => {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/" element={<DiscoveryPage />} />
        <Route path="/vendor/:id" element={<VendorDetails />} />
        <Route path="/search" element={<Search />} />
        <Route path="/submit-vendor" element={<SubmitVendorPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/vendor-dashboard/*" element={<VendorDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/vendor-verification" element={<AdminVendorVerification />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/vendor-registration" element={<VendorRegistration />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </Router>
  );
};

export default App; 
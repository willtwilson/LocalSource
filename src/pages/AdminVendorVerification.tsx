import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import NavigationMenu from '../components/NavigationMenu';
import ProtectedRoute from '../components/ProtectedRoute';

interface Vendor {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  website: string;
  status: string;
  source: string;
  vendor_type_id: number;
  created_at: string;
}

interface VendorType {
  id: number;
  name: string;
}

const AdminVendorVerification: React.FC = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [vendorTypes, setVendorTypes] = useState<VendorType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [filter, setFilter] = useState<'unverified' | 'approved' | 'rejected' | 'all'>('unverified');
  
  useEffect(() => {
    fetchVendorTypes();
    fetchVendors();
  }, [filter]);
  
  const fetchVendorTypes = async () => {
    try {
      const { data, error } = await supabase
        .from('vendor_types')
        .select('id, name')
        .order('name');
      
      if (error) throw error;
      
      setVendorTypes(data || []);
    } catch (error) {
      console.error('Error fetching vendor types:', error);
      setError('Failed to load vendor types');
    }
  };
  
  const fetchVendors = async () => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('vendors')
        .select('*')
        .order('created_at', { ascending: false });
      
      // Apply filter
      if (filter !== 'all') {
        query = query.eq('status', filter);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      setVendors(data || []);
      setError(null);
    } catch (error) {
      console.error('Error fetching vendors:', error);
      setError('Failed to load vendors');
    } finally {
      setLoading(false);
    }
  };
  
  const updateVendorStatus = async (vendorId: string, status: string) => {
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('vendors')
        .update({ status })
        .eq('id', vendorId);
      
      if (error) throw error;
      
      // Update local state
      setVendors(vendors.map(vendor => 
        vendor.id === vendorId ? { ...vendor, status } : vendor
      ));
      
      setSuccessMessage(`Vendor status updated to ${status}`);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      
    } catch (error) {
      console.error('Error updating vendor status:', error);
      setError('Failed to update vendor status');
    } finally {
      setLoading(false);
    }
  };
  
  const getVendorTypeName = (typeId: number) => {
    return vendorTypes.find(vt => vt.id === typeId)?.name || 'Unknown';
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavigationMenu />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Vendor Verification</h1>
          <p className="mt-2 text-lg text-gray-600">
            Review and verify vendors that have been imported or registered on the platform.
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        {successMessage && (
          <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700">{successMessage}</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="mb-6 bg-white shadow rounded-lg p-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 sm:mb-0">Vendor List</h2>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setFilter('unverified')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  filter === 'unverified' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Unverified
              </button>
              <button
                onClick={() => setFilter('approved')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  filter === 'approved' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Approved
              </button>
              <button
                onClick={() => setFilter('rejected')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  filter === 'rejected' 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Rejected
              </button>
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  filter === 'all' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All
              </button>
            </div>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : vendors.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No vendors found</h3>
            <p className="text-gray-500">
              {filter !== 'all' 
                ? `There are no vendors with '${filter}' status.` 
                : 'There are no vendors in the system yet.'}
            </p>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden rounded-lg">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vendor
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Address
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Source
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {vendors.map((vendor) => (
                    <tr key={vendor.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{vendor.name}</div>
                        <div className="text-sm text-gray-500">{vendor.description.substring(0, 100)}{vendor.description.length > 100 ? '...' : ''}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {getVendorTypeName(vendor.vendor_type_id)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {vendor.address || 'No address'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {vendor.source || 'Direct registration'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          vendor.status === 'approved' ? 'bg-green-100 text-green-800' :
                          vendor.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {vendor.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          {vendor.status !== 'approved' && (
                            <button
                              onClick={() => updateVendorStatus(vendor.id, 'approved')}
                              className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                              Approve
                            </button>
                          )}
                          
                          {vendor.status !== 'rejected' && (
                            <button
                              onClick={() => updateVendorStatus(vendor.id, 'rejected')}
                              className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                              Reject
                            </button>
                          )}
                          
                          {vendor.status !== 'unverified' && (
                            <button
                              onClick={() => updateVendorStatus(vendor.id, 'unverified')}
                              className="px-3 py-1 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                            >
                              Unverify
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Wrap the component with the ProtectedRoute HOC
const ProtectedAdminVendorVerification: React.FC = () => (
  <ProtectedRoute requiredRole="admin">
    <AdminVendorVerification />
  </ProtectedRoute>
);

export default ProtectedAdminVendorVerification; 
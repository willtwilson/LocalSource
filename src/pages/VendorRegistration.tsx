import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import NavigationMenu from '../components/NavigationMenu';

interface LocationState {
  userId: string;
  email: string;
}

interface VendorType {
  id: number;
  name: string;
  description: string;
}

const VendorRegistration: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId, email } = (location.state as LocationState) || {};
  
  const [businessName, setBusinessName] = useState('');
  const [businessDescription, setBusinessDescription] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [vendorTypeId, setVendorTypeId] = useState<number | null>(null);
  const [vendorTypes, setVendorTypes] = useState<VendorType[]>([]);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Fetch vendor types from database
  useEffect(() => {
    const fetchVendorTypes = async () => {
      const { data, error } = await supabase
        .from('vendor_types')
        .select('*')
        .order('name');
      
      if (error) {
        console.error('Error fetching vendor types:', error);
        return;
      }
      
      setVendorTypes(data || []);
    };
    
    fetchVendorTypes();
  }, []);
  
  // Redirect if no user ID provided (if accessed directly without registration)
  useEffect(() => {
    if (!userId) {
      navigate('/register');
    }
  }, [userId, navigate]);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate required fields
    if (!businessName || !address || !vendorTypeId) {
      setError('Please fill in all required fields');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Create vendor record in the database
      const { data: vendor, error: vendorError } = await supabase
        .from('vendors')
        .insert([
          {
            name: businessName,
            description: businessDescription,
            address,
            phone,
            website,
            vendor_type_id: vendorTypeId,
            owner_user_id: userId,
            status: 'pending',  // New vendors require approval
          }
        ])
        .select()
        .single();
      
      if (vendorError) throw vendorError;
      
      // Set user metadata to indicate they're a vendor
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          is_vendor: true,
          vendor_id: vendor.id
        }
      });
      
      if (updateError) throw updateError;
      
      setSuccess('Vendor registration successful! Your account is pending approval.');
      
      // Redirect to vendor dashboard after a short delay
      setTimeout(() => {
        navigate('/vendor-dashboard');
      }, 3000);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during vendor registration');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavigationMenu />
      
      <div className="py-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Complete Your Vendor Registration</h1>
          
          {error && (
            <div className="p-3 mb-6 bg-red-50 text-red-700 rounded">
              {error}
            </div>
          )}
          
          {success && (
            <div className="p-3 mb-6 bg-green-50 text-green-700 rounded">
              {success}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email || ''}
                readOnly
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <p className="mt-1 text-sm text-gray-500">You'll use this email to sign in to your vendor account.</p>
            </div>
            
            <div>
              <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">
                Business Name *
              </label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                required
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            
            <div>
              <label htmlFor="businessDescription" className="block text-sm font-medium text-gray-700 mb-1">
                Business Description
              </label>
              <textarea
                id="businessDescription"
                name="businessDescription"
                rows={3}
                value={businessDescription}
                onChange={(e) => setBusinessDescription(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Tell potential customers about your business..."
              />
            </div>
            
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Business Address *
              </label>
              <input
                type="text"
                id="address"
                name="address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="123 Main St, St Helier, Jersey"
              />
              <p className="mt-1 text-sm text-gray-500">You'll be able to adjust the map pin later for precise location.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="+44 1534 123456"
                />
              </div>
              
              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                  Website
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="https://www.example.com"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="vendorType" className="block text-sm font-medium text-gray-700 mb-1">
                Vendor Type *
              </label>
              <select
                id="vendorType"
                name="vendorType"
                required
                value={vendorTypeId || ''}
                onChange={(e) => setVendorTypeId(Number(e.target.value))}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">Select a vendor type</option>
                {vendorTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center justify-between pt-6">
              <div className="text-sm">
                <span className="text-gray-600">Already registered? </span>
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Sign in
                </button>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Complete Registration'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VendorRegistration; 
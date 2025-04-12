import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavigationMenu from '../components/NavigationMenu';

interface LocationState {
  requiredRole?: 'vendor' | 'admin';
}

const Unauthorized: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { requiredRole } = (location.state as LocationState) || {};
  
  const getRoleMessage = () => {
    if (requiredRole === 'vendor') {
      return 'You need to register as a vendor to access this page.';
    } else if (requiredRole === 'admin') {
      return 'You need administrator privileges to access this page.';
    }
    return 'You do not have permission to access this page.';
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <NavigationMenu />
      
      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <div className="text-red-600 mb-4">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-20 w-20 mx-auto" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
              />
            </svg>
          </div>
          
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            Unauthorized Access
          </h1>
          
          <p className="text-lg text-gray-600 mb-6">
            {getRoleMessage()}
          </p>
          
          <div className="space-y-4">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Return to Homepage
            </button>
            
            {requiredRole === 'vendor' && (
              <div>
                <button
                  onClick={() => navigate('/vendor-registration')}
                  className="mt-2 inline-flex items-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Register as Vendor
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized; 
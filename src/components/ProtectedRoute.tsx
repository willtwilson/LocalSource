import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'vendor' | 'admin';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasRequiredRole, setHasRequiredRole] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if user is authenticated
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setIsAuthenticated(false);
          setHasRequiredRole(false);
          setLoading(false);
          return;
        }
        
        setIsAuthenticated(true);
        
        // If no specific role is required, we're done
        if (!requiredRole) {
          setHasRequiredRole(true);
          setLoading(false);
          return;
        }
        
        // Check if user has the required role
        if (requiredRole === 'vendor') {
          const { data: vendor } = await supabase
            .from('vendors')
            .select('id')
            .eq('owner_user_id', user.id)
            .single();
          
          setHasRequiredRole(!!vendor);
        } else if (requiredRole === 'admin') {
          const { data: userRole } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', user.id)
            .eq('role', 'admin')
            .single();
          
          setHasRequiredRole(!!userRole);
        }
        
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, [requiredRole]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && !hasRequiredRole) {
    // Redirect to unauthorized page if missing required role
    return <Navigate to="/unauthorized" state={{ requiredRole }} replace />;
  }

  // If authenticated and has required role (if any), render children
  return <>{children}</>;
};

export default ProtectedRoute; 
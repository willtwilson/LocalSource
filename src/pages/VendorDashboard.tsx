import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import NavigationMenu from '../components/NavigationMenu';
import ProtectedRoute from '../components/ProtectedRoute';
import VendorSidebar from '../components/VendorSidebar';
import VendorService, { Vendor, ContactInfo, VendorPhoto } from '../services/vendor.service';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Placeholder components for dashboard sections
const DashboardHome = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Vendor Dashboard</h2>
    <p className="text-gray-600 mb-6">Welcome to your vendor dashboard! Here you can manage your business information, products, and more.</p>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Business Profile</h3>
        <p className="text-gray-600 mb-4">Update your business details, contact information, and description.</p>
        <a href="/vendor-dashboard/profile" className="text-blue-600 hover:text-blue-800 font-medium">
          Edit Profile →
        </a>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Photo Gallery</h3>
        <p className="text-gray-600 mb-4">Add and manage photos showcasing your business and products.</p>
        <a href="/vendor-dashboard/photos" className="text-blue-600 hover:text-blue-800 font-medium">
          Manage Photos →
        </a>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Location</h3>
        <p className="text-gray-600 mb-4">Update your business location on the map for customers to find you.</p>
        <a href="/vendor-dashboard/location" className="text-blue-600 hover:text-blue-800 font-medium">
          Edit Location →
        </a>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Business Hours</h3>
        <p className="text-gray-600 mb-4">Set your operating hours for each day of the week.</p>
        <a href="/vendor-dashboard/hours" className="text-blue-600 hover:text-blue-800 font-medium">
          Update Hours →
        </a>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics</h3>
        <p className="text-gray-600 mb-4">View statistics about your business profile's performance.</p>
        <a href="/vendor-dashboard/analytics" className="text-blue-600 hover:text-blue-800 font-medium">
          View Analytics →
        </a>
      </div>
    </div>
  </div>
);

const ProfileManagement = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [vendorTypes, setVendorTypes] = useState<{id: string, name: string}[]>([]);
  
  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [vendorTypeId, setVendorTypeId] = useState<string>('');
  
  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        setLoading(true);
        
        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setError('User not authenticated');
          return;
        }
        
        // Fetch vendor types
        const vendorService = new VendorService();
        const types = await vendorService.getVendorTypes();
        setVendorTypes(types);
        
        // Fetch vendor data for this user
        const vendorData = await vendorService.getVendorByUserId(user.id);
        if (vendorData) {
          setVendor(vendorData);
          // Initialize form with vendor data
          setName(vendorData.name || '');
          setDescription(vendorData.description || '');
          setPhone(vendorData.contactInfo?.phone || '');
          setWebsite(vendorData.contactInfo?.website || '');
          // Find vendor type ID from the category name
          const matchingType = types.find((type: { id: string; name: string }) => type.name === vendorData.category);
          if (matchingType) {
            setVendorTypeId(matchingType.id);
          }
        } else {
          setError('No vendor profile found for this user');
        }
      } catch (err) {
        console.error('Error fetching vendor data:', err);
        setError('Failed to load vendor data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchVendorData();
  }, []);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!vendor) {
      setError('No vendor profile found');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Update contact info
      const contactInfo: ContactInfo = {
        ...vendor.contactInfo,
        phone,
        website
      };
      
      // Prepare update data
      const updateData = {
        name,
        description,
        vendor_type_id: parseInt(vendorTypeId),
        contact_info: contactInfo
      };
      
      // Update profile
      const vendorService = new VendorService();
      await vendorService.updateVendorProfile(vendor.id, updateData);
      
      setSuccess('Profile updated successfully');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
      
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };
  
  if (loading && !vendor) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Profile Management</h2>
      <p className="text-gray-600 mb-6">Update your business profile information to keep your customers informed.</p>
      
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
      
      {success && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">{success}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-6 bg-white shadow-sm rounded-lg p-6">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="business-name" className="block text-sm font-medium text-gray-700 mb-1">
              Business Name
            </label>
            <input
              type="text"
              id="business-name"
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Your Business Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Business Description
            </label>
            <textarea
              id="description"
              rows={4}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Describe your business..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="+44 1534 123456"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                Website
              </label>
              <input
                type="url"
                id="website"
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="https://www.example.com"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="vendor-type" className="block text-sm font-medium text-gray-700 mb-1">
              Vendor Type
            </label>
            <select
              id="vendor-type"
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              value={vendorTypeId}
              onChange={(e) => setVendorTypeId(e.target.value)}
              required
            >
              <option value="">Select a vendor type</option>
              {vendorTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => {
                  // Reset form to current vendor data
                  if (vendor) {
                    setName(vendor.name || '');
                    setDescription(vendor.description || '');
                    setPhone(vendor.contactInfo?.phone || '');
                    setWebsite(vendor.contactInfo?.website || '');
                    // Find vendor type ID from the category name
                    const matchingType = vendorTypes.find((type: { id: string; name: string }) => type.name === vendor.category);
                    if (matchingType) {
                      setVendorTypeId(matchingType.id);
                    }
                  }
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  'Save'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const PhotoManagement = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [photos, setPhotos] = useState<VendorPhoto[]>([]);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [captionModalOpen, setCaptionModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<VendorPhoto | null>(null);
  const [caption, setCaption] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    fetchVendorData();
  }, []);
  
  const fetchVendorData = async () => {
    try {
      setLoading(true);
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError('User not authenticated');
        return;
      }
      
      // Fetch vendor data for this user
      const vendorService = new VendorService();
      const vendorData = await vendorService.getVendorByUserId(user.id);
      
      if (vendorData) {
        setVendor(vendorData);
        
        // Fetch photos
        const vendorPhotos = await vendorService.getVendorPhotos(vendorData.id);
        setPhotos(vendorPhotos);
      } else {
        setError('No vendor profile found for this user');
      }
    } catch (err) {
      console.error('Error fetching vendor data:', err);
      setError('Failed to load vendor data');
    } finally {
      setLoading(false);
    }
  };
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    
    // Simple file validation
    if (!file.type.startsWith('image/')) {
      setError('Only image files are allowed');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setError('File size must be less than 5MB');
      return;
    }
    
    try {
      setUploadProgress(0);
      setUploadModalOpen(true);
      setError(null);
      
      // Simulate upload progress (in a real app, we'd use an upload progress handler)
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          const newProgress = prev + Math.random() * 10;
          return newProgress >= 90 ? 90 : newProgress; // Cap at 90% until actually complete
        });
      }, 200);
      
      if (!vendor) {
        throw new Error('No vendor profile found');
      }
      
      const vendorService = new VendorService();
      const newPhoto = await vendorService.uploadVendorPhoto(vendor.id, file, caption);
      
      clearInterval(interval);
      setUploadProgress(100);
      
      // Add the new photo to the list
      setPhotos(prev => [newPhoto, ...prev]);
      
      setSuccess('Photo uploaded successfully');
      
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      // Close modal after a delay
      setTimeout(() => {
        setUploadModalOpen(false);
        setSuccess(null);
        setCaption('');
      }, 1500);
      
    } catch (err) {
      console.error('Error uploading photo:', err);
      setError('Failed to upload photo');
      setUploadModalOpen(false);
    }
  };
  
  const handleDeletePhoto = async (photo: VendorPhoto) => {
    if (!vendor) return;
    if (!confirm('Are you sure you want to delete this photo?')) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const vendorService = new VendorService();
      await vendorService.deleteVendorPhoto(photo.id, vendor.id);
      
      // Remove the photo from the list
      setPhotos(prev => prev.filter(p => p.id !== photo.id));
      
      setSuccess('Photo deleted successfully');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
      
    } catch (err) {
      console.error('Error deleting photo:', err);
      setError('Failed to delete photo');
    } finally {
      setLoading(false);
    }
  };
  
  const handleSetCoverPhoto = async (photo: VendorPhoto) => {
    if (!vendor) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const vendorService = new VendorService();
      await vendorService.setVendorCoverPhoto(photo.url, vendor.id);
      
      // Update vendor data with new cover image
      setVendor(prev => prev ? { ...prev, coverImage: photo.url } : null);
      
      setSuccess('Cover photo updated successfully');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
      
    } catch (err) {
      console.error('Error setting cover photo:', err);
      setError('Failed to set cover photo');
    } finally {
      setLoading(false);
    }
  };
  
  const openEditCaption = (photo: VendorPhoto) => {
    setSelectedPhoto(photo);
    setCaption(photo.caption || '');
    setCaptionModalOpen(true);
  };
  
  const handleUpdateCaption = async () => {
    if (!selectedPhoto) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const vendorService = new VendorService();
      await vendorService.updatePhotoCaption(selectedPhoto.id, caption);
      
      // Update the photo in the list
      setPhotos(prev => prev.map(p => 
        p.id === selectedPhoto.id ? { ...p, caption } : p
      ));
      
      setSuccess('Caption updated successfully');
      
      // Close modal and reset state
      setCaptionModalOpen(false);
      setSelectedPhoto(null);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
      
    } catch (err) {
      console.error('Error updating caption:', err);
      setError('Failed to update caption');
    } finally {
      setLoading(false);
    }
  };
  
  if (loading && photos.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Photo Management</h2>
      <p className="text-gray-600 mb-6">Add and manage photos of your business to attract more customers.</p>
      
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
      
      {success && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">{success}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium">Your Photos</h3>
          
          <input 
            type="file" 
            ref={fileInputRef}
            className="hidden" 
            accept="image/*"
            onChange={handleFileChange}
          />
          
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => fileInputRef.current?.click()}
            disabled={loading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Photo
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.length === 0 ? (
            <div className="col-span-full py-8">
              <div className="text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No photos yet</h3>
                <p className="mt-1 text-sm text-gray-500">Add photos to showcase your business.</p>
                <div className="mt-6">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Your First Photo
                  </button>
                </div>
              </div>
            </div>
          ) : (
            photos.map(photo => (
              <div key={photo.id} className="relative group overflow-hidden rounded-lg">
                <div className="w-full aspect-w-4 aspect-h-3 bg-gray-200 overflow-hidden">
                  <img 
                    src={photo.url} 
                    alt={photo.caption || 'Vendor photo'} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex flex-col justify-end">
                  {photo.caption && (
                    <p className="px-3 py-2 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {photo.caption}
                    </p>
                  )}
                  
                  <div className="p-2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleSetCoverPhoto(photo)}
                        className="bg-blue-500 p-1.5 rounded-full text-white hover:bg-blue-600 focus:outline-none"
                        title="Set as cover image"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                        </svg>
                      </button>
                      
                      <button
                        onClick={() => openEditCaption(photo)}
                        className="bg-green-500 p-1.5 rounded-full text-white hover:bg-green-600 focus:outline-none"
                        title="Edit caption"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    </div>
                    
                    <button
                      onClick={() => handleDeletePhoto(photo)}
                      className="bg-red-500 p-1.5 rounded-full text-white hover:bg-red-600 focus:outline-none"
                      title="Delete photo"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {vendor?.coverImage === photo.url && (
                  <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                    Cover
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
      
      {/* Upload Progress Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          
          <div className="relative bg-white rounded-lg max-w-md w-full mx-auto p-6 z-10">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Uploading Photo</h3>
            
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-right text-sm text-gray-500 mt-1">{Math.round(uploadProgress)}%</p>
            </div>
            
            {uploadProgress < 100 && (
              <div className="mt-4">
                <label htmlFor="caption" className="block text-sm font-medium text-gray-700 mb-1">
                  Photo Caption (Optional)
                </label>
                <input 
                  type="text"
                  id="caption"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Add a caption to this photo"
                />
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Edit Caption Modal */}
      {captionModalOpen && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setCaptionModalOpen(false)}></div>
          
          <div className="relative bg-white rounded-lg max-w-md w-full mx-auto p-6 z-10">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Caption</h3>
            
            <div className="mb-4">
              <label htmlFor="edit-caption" className="block text-sm font-medium text-gray-700 mb-1">
                Photo Caption
              </label>
              <input 
                type="text"
                id="edit-caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Add a caption to this photo"
              />
            </div>
            
            <div className="mt-5 sm:mt-6 flex justify-end space-x-2">
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => setCaptionModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={handleUpdateCaption}
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Caption'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const LocationManagement = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState(49.2184); // Default to Jersey central coordinates
  const [longitude, setLongitude] = useState(-2.1367); // Default to Jersey central coordinates
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    fetchVendorData();
  }, []);
  
  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      initializeMap();
    }
  }, [mapContainerRef.current, vendor]);
  
  const fetchVendorData = async () => {
    try {
      setLoading(true);
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError('User not authenticated');
        return;
      }
      
      // Fetch vendor data for this user
      const vendorService = new VendorService();
      const vendorData = await vendorService.getVendorByUserId(user.id);
      
      if (vendorData) {
        setVendor(vendorData);
        
        // Initialize form fields with vendor data
        setAddress(vendorData.address || '');
        
        if (vendorData.latitude && vendorData.longitude) {
          setLatitude(vendorData.latitude);
          setLongitude(vendorData.longitude);
        }
        
        // If map is already initialized, update marker position
        if (mapRef.current && markerRef.current) {
          const newLatLng = new L.LatLng(
            vendorData.latitude || 49.2184,
            vendorData.longitude || -2.1367
          );
          markerRef.current.setLatLng(newLatLng);
          mapRef.current.setView(newLatLng, 13);
        }
      } else {
        setError('No vendor profile found for this user');
      }
    } catch (err) {
      console.error('Error fetching vendor data:', err);
      setError('Failed to load vendor data');
    } finally {
      setLoading(false);
    }
  };
  
  const initializeMap = () => {
    if (!mapContainerRef.current) return;
    
    // Create map
    const map = L.map(mapContainerRef.current).setView(
      [latitude, longitude],
      13 // Zoom level (13 provides a good view of Jersey)
    );
    
    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Create marker for vendor location
    const marker = L.marker([latitude, longitude], {
      draggable: true // Allow manual positioning
    }).addTo(map);
    
    // Update state when marker is dragged
    marker.on('dragend', function() {
      const position = marker.getLatLng();
      setLatitude(position.lat);
      setLongitude(position.lng);
      
      // Optionally: Reverse geocode to get address (using a service like Nominatim)
      // This example does not implement reverse geocoding to keep it simple
    });
    
    // Store references
    mapRef.current = map;
    markerRef.current = marker;
    
    // Clean up on component unmount
    return () => {
      map.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
  };
  
  const handleAddressSearch = async () => {
    if (!address.trim()) return;
    
    try {
      setLoading(true);
      
      // Use Nominatim for geocoding (OpenStreetMap's service)
      // Note: For production, consider using a proper geocoding service with an API key
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&countrycodes=je`);
      const data = await response.json();
      
      if (data && data.length > 0) {
        const result = data[0];
        const newLat = parseFloat(result.lat);
        const newLng = parseFloat(result.lon);
        
        setLatitude(newLat);
        setLongitude(newLng);
        
        // Update marker and map view
        if (mapRef.current && markerRef.current) {
          const newLatLng = new L.LatLng(newLat, newLng);
          markerRef.current.setLatLng(newLatLng);
          mapRef.current.setView(newLatLng, 15);
        }
      } else {
        setError('Address not found. Please try a different search term.');
      }
    } catch (err) {
      console.error('Error searching address:', err);
      setError('Failed to search address');
    } finally {
      setLoading(false);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!vendor) {
      setError('No vendor profile found');
      return;
    }
    
    if (!address.trim()) {
      setError('Address is required');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const vendorService = new VendorService();
      await vendorService.updateVendorLocation(vendor.id, latitude, longitude, address);
      
      setSuccess('Location updated successfully');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
      
    } catch (err) {
      console.error('Error updating location:', err);
      setError('Failed to update location');
    } finally {
      setLoading(false);
    }
  };
  
  if (loading && !vendor) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Location Management</h2>
      <p className="text-gray-600 mb-6">Update your business location on the map for customers to find you.</p>
      
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
      
      {success && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">{success}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="mb-6">
          <div className="flex space-x-2">
            <div className="flex-grow">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                id="address"
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="123 Main St, St Helier, Jersey"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="flex items-end">
              <button
                type="button"
                onClick={handleAddressSearch}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                disabled={loading}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search
              </button>
            </div>
          </div>
          
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="latitude" className="block text-sm font-medium text-gray-700 mb-1">
                Latitude
              </label>
              <input
                type="number"
                id="latitude"
                step="0.000001"
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                value={latitude}
                onChange={(e) => setLatitude(parseFloat(e.target.value))}
                required
              />
            </div>
            
            <div>
              <label htmlFor="longitude" className="block text-sm font-medium text-gray-700 mb-1">
                Longitude
              </label>
              <input
                type="number"
                id="longitude"
                step="0.000001"
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                value={longitude}
                onChange={(e) => setLongitude(parseFloat(e.target.value))}
                required
              />
            </div>
          </div>
          
          <p className="mt-2 text-sm text-gray-500">
            Drag the marker on the map to adjust your location precisely. Coordinates will update automatically.
          </p>
        </div>
        
        <div 
          ref={mapContainerRef}
          className="h-96 bg-gray-100 rounded-lg mb-6"
          style={{ width: '100%' }}
        ></div>
        
        <div className="flex justify-end">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              'Save Location'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const HoursManagement = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [vendor, setVendor] = useState<Vendor | null>(null);
  
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  // Create a state object for each day's open status and hours
  const [hours, setHours] = useState<{ [day: string]: { isOpen: boolean; openTime: string; closeTime: string } }>({
    Monday: { isOpen: false, openTime: '09:00', closeTime: '17:00' },
    Tuesday: { isOpen: false, openTime: '09:00', closeTime: '17:00' },
    Wednesday: { isOpen: false, openTime: '09:00', closeTime: '17:00' },
    Thursday: { isOpen: false, openTime: '09:00', closeTime: '17:00' },
    Friday: { isOpen: false, openTime: '09:00', closeTime: '17:00' },
    Saturday: { isOpen: false, openTime: '09:00', closeTime: '17:00' },
    Sunday: { isOpen: false, openTime: '09:00', closeTime: '17:00' },
  });
  
  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        setLoading(true);
        
        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setError('User not authenticated');
          return;
        }
        
        // Fetch vendor data for this user
        const vendorService = new VendorService();
        const vendorData = await vendorService.getVendorByUserId(user.id);
        
        if (vendorData) {
          setVendor(vendorData);
          
          // Initialize hours from vendor data if available
          if (vendorData.operatingHours && Array.isArray(vendorData.operatingHours) && vendorData.operatingHours.length > 0) {
            const hoursData: { [day: string]: { isOpen: boolean; openTime: string; closeTime: string } } = {};
            
            vendorData.operatingHours.forEach((dayHours: { day: string; open: string; close: string; isClosed: boolean }) => {
              hoursData[dayHours.day] = {
                isOpen: !dayHours.isClosed,
                openTime: dayHours.open || '09:00',
                closeTime: dayHours.close || '17:00'
              };
            });
            
            // Ensure all days are included in the state
            daysOfWeek.forEach(day => {
              if (!hoursData[day]) {
                hoursData[day] = { isOpen: false, openTime: '09:00', closeTime: '17:00' };
              }
            });
            
            setHours(hoursData);
          }
        } else {
          setError('No vendor profile found for this user');
        }
      } catch (err) {
        console.error('Error fetching vendor data:', err);
        setError('Failed to load vendor data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchVendorData();
  }, []);
  
  const handleHoursChange = (day: string, field: 'isOpen' | 'openTime' | 'closeTime', value: boolean | string) => {
    setHours(prevHours => ({
      ...prevHours,
      [day]: {
        ...prevHours[day],
        [field]: value
      }
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!vendor) {
      setError('No vendor profile found');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Format hours data for API
      const formattedHours = daysOfWeek.map(day => ({
        day,
        isClosed: !hours[day].isOpen,
        open: hours[day].openTime,
        close: hours[day].closeTime
      }));
      
      // Update hours
      const vendorService = new VendorService();
      await vendorService.updateOperatingHours(vendor.id, formattedHours);
      
      setSuccess('Business hours updated successfully');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
      
    } catch (err) {
      console.error('Error updating business hours:', err);
      setError('Failed to update business hours');
    } finally {
      setLoading(false);
    }
  };
  
  if (loading && !vendor) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Business Hours</h2>
      <p className="text-gray-600 mb-6">Set your operating hours for each day of the week.</p>
      
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
      
      {success && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">{success}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-white shadow-sm rounded-lg p-6">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {daysOfWeek.map((day) => (
            <div key={day} className="flex items-center space-x-4">
              <div className="w-24">
                <span className="text-gray-700">{day}</span>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`open-${day}`}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={hours[day].isOpen}
                  onChange={(e) => handleHoursChange(day, 'isOpen', e.target.checked)}
                />
                <label htmlFor={`open-${day}`} className="ml-2 block text-gray-700">
                  Open
                </label>
              </div>
              
              <div className="flex space-x-2 items-center">
                <label htmlFor={`open-time-${day}`} className="sr-only">Opening Time</label>
                <input
                  type="time"
                  id={`open-time-${day}`}
                  className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-32 sm:text-sm border-gray-300 rounded-md ${!hours[day].isOpen ? 'opacity-50' : ''}`}
                  value={hours[day].openTime}
                  onChange={(e) => handleHoursChange(day, 'openTime', e.target.value)}
                  disabled={!hours[day].isOpen}
                />
                
                <span className="text-gray-500">to</span>
                
                <input
                  type="time"
                  id={`close-time-${day}`}
                  className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-32 sm:text-sm border-gray-300 rounded-md ${!hours[day].isOpen ? 'opacity-50' : ''}`}
                  value={hours[day].closeTime}
                  onChange={(e) => handleHoursChange(day, 'closeTime', e.target.value)}
                  disabled={!hours[day].isOpen}
                />
              </div>
            </div>
          ))}
          
          <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  'Save Hours'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const Analytics = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Analytics</h2>
    <p className="text-gray-600 mb-6">View statistics about your business profile's performance.</p>
    
    <div className="bg-white shadow-sm rounded-lg p-6">
      <div className="text-center py-12">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <p className="mt-4 text-lg text-gray-500">Analytics will be available soon</p>
      </div>
    </div>
  </div>
);

interface VendorInfo {
  id: string;
  name: string;
  status: string;
}

const VendorDashboard: React.FC = () => {
  const [vendorInfo, setVendorInfo] = useState<VendorInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchVendorInfo = async () => {
      try {
        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setLoading(false);
          return;
        }
        
        // Get vendor information
        const { data: vendor, error } = await supabase
          .from('vendors')
          .select('id, name, status')
          .eq('owner_user_id', user.id)
          .single();
        
        if (error) throw error;
        
        setVendorInfo(vendor);
      } catch (error) {
        console.error('Error fetching vendor info:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchVendorInfo();
  }, []);
  
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <NavigationMenu />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }
  
  if (!vendorInfo) {
    // Handle case where user is not associated with any vendor
    return (
      <div className="flex flex-col min-h-screen">
        <NavigationMenu />
        <div className="flex-grow flex items-center justify-center p-6">
          <div className="max-w-md text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="mt-4 text-xl font-semibold text-gray-700">No Vendor Profile Found</h2>
            <p className="mt-2 text-gray-500">
              You don't have a vendor profile yet. Please register as a vendor to access the dashboard.
            </p>
            <div className="mt-6">
              <button
                onClick={() => navigate('/vendor-registration')}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Register as Vendor
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavigationMenu />
      
      <div className="flex-grow flex flex-col md:flex-row">
        {/* Sidebar */}
        <VendorSidebar vendorId={vendorInfo.id} vendorStatus={vendorInfo.status} />
        
        {/* Main content area */}
        <div className="flex-grow p-6">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/profile" element={<ProfileManagement />} />
            <Route path="/photos" element={<PhotoManagement />} />
            <Route path="/location" element={<LocationManagement />} />
            <Route path="/hours" element={<HoursManagement />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

// Wrap the dashboard in a protected route
const ProtectedVendorDashboard: React.FC = () => (
  <ProtectedRoute requiredRole="vendor">
    <VendorDashboard />
  </ProtectedRoute>
);

export default ProtectedVendorDashboard; 
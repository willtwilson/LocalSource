import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { vendorService, Vendor, Review, ReviewStats } from '../services/vendor.service';
import { OperatingHours } from '../components/OperatingHours';
import { ContactInfo } from '../components/ContactInfo';
import { PhotoGallery } from '../components/PhotoGallery';
import { FavoriteButton } from '../components/FavoriteButton';
import { ReviewList } from '../components/ReviewList';
import { ReviewForm } from '../components/ReviewForm';
import { VendorMap } from '../components/VendorMap';
import NavigationMenu from '../components/NavigationMenu';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '../lib/supabase';

interface VendorDetailsState {
  vendor: Vendor | null;
  reviews: Review[];
  reviewStats: ReviewStats;
  loading: boolean;
  error: string | null;
}

export const VendorDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [state, setState] = useState<VendorDetailsState>({
    vendor: null,
    reviews: [],
    reviewStats: {
      averageRating: 0,
      totalReviews: 0,
      ratingDistribution: {}
    },
    loading: true,
    error: null,
  });
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [isReportingStock, setIsReportingStock] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setState(prev => ({ ...prev, error: 'Vendor ID is required', loading: false }));
        return;
      }

      try {
        const [vendor, isFavorite, reviews, reviewStats] = await Promise.all([
          vendorService.getVendorById(id),
          vendorService.checkFavoriteStatus(id),
          vendorService.getReviews(id),
          vendorService.getReviewStats(id)
        ]);

        if (vendor) {
          vendor.isFavorite = isFavorite;
        }

        setState(prev => ({
          ...prev,
          vendor,
          reviews,
          reviewStats,
          loading: false,
          error: vendor ? null : 'Vendor not found',
        }));
      } catch (error) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to fetch vendor',
        }));
      }
    };

    fetchData();
  }, [id]);

  const handleFavoriteToggle = (isFavorite: boolean) => {
    setState(prev => prev.vendor ? {
      ...prev,
      vendor: { ...prev.vendor, isFavorite }
    } : prev);
  };

  const handleReviewSubmitted = async () => {
    if (!id) return;

    try {
      const [reviews, reviewStats] = await Promise.all([
        vendorService.getReviews(id),
        vendorService.getReviewStats(id)
      ]);

      setState(prev => ({
        ...prev,
        reviews,
        reviewStats
      }));
      setShowReviewForm(false);
    } catch (error) {
      console.error('Failed to refresh reviews:', error);
    }
  };

  const handleReportLowStock = async () => {
    if (!id) return;
    setIsReportingStock(true);
    console.log(`Reporting low stock for vendor: ${id}`);

    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session) {
      toast({ title: "Authentication Error", description: "You must be logged in to report stock.", variant: "destructive" });
      setIsReportingStock(false);
      return;
    }

    try {
      const { error: functionError } = await supabase.functions.invoke(
        'report-low-stock', 
        { 
          body: JSON.stringify({ vendorId: id, notes: 'Low stock reported via button' }),
          headers: {
             Authorization: `Bearer ${session.access_token}`,
             'Content-Type': 'application/json' 
          }
        }
      );

      if (functionError) {
        console.error('Edge function returned error:', functionError);
        let errorMessage = functionError.message;
         try {
            const errJson = JSON.parse(functionError.context?.responseText || '{}');
            errorMessage = errJson.error || errorMessage;
        } catch (e) { /* Ignore parsing error */ }
        throw new Error(errorMessage);
      }

      toast({
        title: "Low Stock Reported",
        description: "Thank you for letting us know!",
      });
    } catch (error) {
      console.error('Low stock report submission error:', error);
      toast({
        title: "Report Failed",
        description: error instanceof Error ? error.message : 'Could not submit report. Please try again.',
        variant: "destructive",
      });
    } finally {
      setIsReportingStock(false);
    }
  };

  if (state.loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <NavigationMenu />
        <div className="flex items-center justify-center flex-grow">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (state.error || !state.vendor) {
    return (
      <div className="flex flex-col min-h-screen">
        <NavigationMenu />
        <div className="flex flex-col items-center justify-center flex-grow">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600">{state.error || 'Vendor not found'}</p>
        </div>
      </div>
    );
  }

  const { vendor, reviews, reviewStats } = state;

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationMenu />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        {/* Cover Image */}
        <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-8">
          {vendor.coverImage ? (
            <img
              src={vendor.coverImage}
              alt={`${vendor.name} cover`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No cover image available</span>
            </div>
          )}
          <div className="absolute top-4 right-4">
            <FavoriteButton
              vendorId={vendor.id}
              initialFavorite={vendor.isFavorite || false}
              onToggle={handleFavoriteToggle}
            />
          </div>
        </div>

        {/* Vendor Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold">{vendor.name}</h1>
              <Button 
                variant="outline"
                size="sm"
                onClick={handleReportLowStock}
                disabled={isReportingStock}
                className="ml-4 flex-shrink-0"
              >
                <AlertTriangle className="mr-2 h-4 w-4" />
                {isReportingStock ? 'Reporting...' : 'Report Low Stock'}
              </Button>
            </div>
            <p className="text-gray-600 mb-6">{vendor.description}</p>

            {/* Location */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3">Location</h2>
              <p className="text-gray-600 mb-4">{vendor.address}</p>
              <div className="h-64 bg-gray-100 rounded-lg overflow-hidden">
                <VendorMap
                  latitude={vendor.latitude}
                  longitude={vendor.longitude}
                  name={vendor.name}
                  address={vendor.address}
                />
              </div>
            </div>

            {/* Operating Hours */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3">Operating Hours</h2>
              {vendor.operatingHours && vendor.operatingHours.length > 0 ? (
                <OperatingHours hours={vendor.operatingHours} />
              ) : (
                <p className="text-gray-600">Operating hours not available</p>
              )}
            </div>

            {/* Photo Gallery */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3">Photo Gallery</h2>
              {vendor.photos && vendor.photos.length > 0 ? (
                <PhotoGallery photos={vendor.photos.map(url => ({ id: url, url, createdAt: vendor.createdAt }))} />
              ) : (
                <p className="text-gray-600">No photos available</p>
              )}
            </div>

            {/* Reviews */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Reviews</h2>
                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Write a Review
                </button>
              </div>

              {showReviewForm && (
                <div className="mb-8 bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Write Your Review</h3>
                  <ReviewForm
                    vendorId={vendor.id}
                    onReviewSubmitted={handleReviewSubmitted}
                  />
                </div>
              )}

              <ReviewList reviews={reviews} stats={reviewStats} />
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Contact Information */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              {vendor.contactInfo ? (
                <ContactInfo contactInfo={vendor.contactInfo} />
              ) : (
                <p className="text-gray-600">No contact information available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 
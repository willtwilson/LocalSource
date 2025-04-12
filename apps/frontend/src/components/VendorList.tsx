import React, { useEffect, useState } from 'react';

interface Vendor {
  id: string;
  name: string;
  description: string;
  status: string;
}

interface VendorListProps {
  supabase: any; // Using any to resolve type issues with Supabase client
}

const VendorList: React.FC<VendorListProps> = ({ supabase }) => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const { data, error } = await supabase
          .from('vendors')
          .select('*')
          .order('name');

        if (error) {
          throw new Error(error.message);
        }

        // Type assertion with explicit type checking
        const typedData = data?.map((item: any) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          status: item.status
        })) as Vendor[];

        setVendors(typedData || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, [supabase]);

  if (loading) {
    return <div>Loading vendors...</div>;
  }

  if (error) {
    return <div>Error loading vendors: {error}</div>;
  }

  if (vendors.length === 0) {
    return <div>No vendors found.</div>;
  }

  return (
    <div className="vendor-list-container">
      <h2>Local Vendors</h2>
      <div className="vendor-list">
        {vendors.map((vendor) => (
          <div 
            key={vendor.id} 
            className={`vendor-card ${vendor.status === 'unverified' ? 'unverified' : ''}`}
          >
            <h3>
              {vendor.name}
              {vendor.status === 'unverified' && (
                <span className="verification-badge">Unverified</span>
              )}
            </h3>
            <p>{vendor.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorList; 
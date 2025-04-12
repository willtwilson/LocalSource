import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js'
import VendorMap from './components/VendorMap';
import VendorList from './components/VendorList';
import './App.css'

function App() {
  const [vendorName, setVendorName] = useState('');
  const [vendorDescription, setVendorDescription] = useState('');
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('map'); // 'map', 'list', or 'submit'

  // Initialize Supabase client
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  // Check if Supabase is configured
  if (!supabaseUrl || !supabaseKey) {
    return (
      <div className="app">
        <header style={{ padding: '1rem', backgroundColor: '#f0f0f0', textAlign: 'center' }}>
          <h1>LocalSource</h1>
        </header>
        <main style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ maxWidth: '800px', width: '100%' }}>
            <h2>Configuration Error</h2>
            <p>Supabase URL and/or API key not found. Please check your environment variables.</p>
          </div>
        </main>
        <footer style={{ padding: '1rem', backgroundColor: '#f0f0f0', textAlign: 'center', marginTop: 'auto' }}>
          <p>© 2025 LocalSource</p>
        </footer>
      </div>
    );
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from('vendors')
        .insert([
          { name: vendorName, description: vendorDescription, status: 'pending' }
        ]);
        
      if (error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage('Vendor submitted successfully!');
        setVendorName('');
        setVendorDescription('');
      }
    } catch (err) {
      setMessage(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  // Tab navigation styles
  const tabStyle = {
    padding: '0.75rem 1.5rem',
    marginRight: '0.5rem',
    border: 'none',
    borderRadius: '4px 4px 0 0',
    cursor: 'pointer',
    backgroundColor: '#f0f0f0',
  };

  const activeTabStyle = {
    ...tabStyle,
    backgroundColor: '#4CAF50',
    color: 'white',
  };

  return (
    <div className="app">
      <header style={{ padding: '1rem', backgroundColor: '#f0f0f0', textAlign: 'center' }}>
        <h1>LocalSource</h1>
      </header>
      <main style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ maxWidth: '1000px', width: '100%' }}>
          {/* Tab Navigation */}
          <div style={{ marginBottom: '2rem' }}>
            <button 
              style={activeTab === 'map' ? activeTabStyle : tabStyle}
              onClick={() => setActiveTab('map')}
            >
              Map View
            </button>
            <button 
              style={activeTab === 'list' ? activeTabStyle : tabStyle}
              onClick={() => setActiveTab('list')}
            >
              List View
            </button>
            <button 
              style={activeTab === 'submit' ? activeTabStyle : tabStyle}
              onClick={() => setActiveTab('submit')}
            >
              Submit a Vendor
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'map' && (
            <VendorMap supabase={supabase} />
          )}

          {activeTab === 'list' && (
            <VendorList supabase={supabase} />
          )}

          {activeTab === 'submit' && (
            <>
              <h2>Submit a Local Vendor</h2>
              {message && (
                <div style={{ 
                  padding: '1rem', 
                  marginBottom: '1rem', 
                  backgroundColor: message.includes('Error') ? '#ffebee' : '#e8f5e9',
                  borderRadius: '4px'
                }}>
                  {message}
                </div>
              )}
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label htmlFor="vendorName" style={{ display: 'block', marginBottom: '0.5rem' }}>Vendor Name:</label>
                  <input
                    id="vendorName"
                    type="text"
                    value={vendorName}
                    onChange={(e) => setVendorName(e.target.value)}
                    required
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                  />
                </div>
                <div>
                  <label htmlFor="vendorDescription" style={{ display: 'block', marginBottom: '0.5rem' }}>Description:</label>
                  <textarea
                    id="vendorDescription"
                    value={vendorDescription}
                    onChange={(e) => setVendorDescription(e.target.value)}
                    required
                    rows={4}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                  />
                </div>
                <button 
                  type="submit" 
                  style={{ 
                    padding: '0.75rem 1.5rem', 
                    backgroundColor: '#4CAF50', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px', 
                    cursor: 'pointer',
                    alignSelf: 'flex-start'
                  }}
                >
                  Submit Vendor
                </button>
              </form>
            </>
          )}
        </div>
      </main>
      <footer style={{ padding: '1rem', backgroundColor: '#f0f0f0', textAlign: 'center', marginTop: 'auto' }}>
        <p>© 2025 LocalSource</p>
      </footer>
    </div>
  );
}

export default App;

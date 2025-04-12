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

  return (
    <div className="app">
      <header style={{ padding: '1rem', backgroundColor: '#f0f0f0', textAlign: 'center' }}>
        <h1>LocalSource</h1>
      </header>
      <main style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ maxWidth: '1000px', width: '100%' }}>
          {/* Tab Navigation */}
          <div className="tab-navigation">
            <button 
              className={activeTab === 'map' ? 'tab-button active' : 'tab-button'}
              onClick={() => setActiveTab('map')}
            >
              Map View
            </button>
            <button 
              className={activeTab === 'list' ? 'tab-button active' : 'tab-button'}
              onClick={() => setActiveTab('list')}
            >
              List View
            </button>
            <button 
              className={activeTab === 'submit' ? 'tab-button active' : 'tab-button'}
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
                <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
                  {message}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="vendorName">Vendor Name:</label>
                  <input
                    id="vendorName"
                    type="text"
                    value={vendorName}
                    onChange={(e) => setVendorName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="vendorDescription">Description:</label>
                  <textarea
                    id="vendorDescription"
                    value={vendorDescription}
                    onChange={(e) => setVendorDescription(e.target.value)}
                    required
                    rows={4}
                  />
                </div>
                <button type="submit">
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

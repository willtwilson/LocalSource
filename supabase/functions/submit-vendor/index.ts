import { serve } from 'https://deno.land/std@0.170.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

// Ensure Deno types are available for linting if possible
// Add a /// <reference types="https://deno.land/x/deno/cli/types/standalone.d.ts" /> directive or configure tsconfig

console.log('submit-vendor function started');

const BUCKET_NAME = 'submission-photos'; // Ensure this bucket exists and is public

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Use Deno.env.get - requires Deno environment
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Missing Supabase environment variables');
    }
    
    // Create Supabase client with user's auth context
    const supabaseClient = createClient(
      supabaseUrl,
      supabaseAnonKey,
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    // Get user data
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user) {
      console.error('User auth error:', userError);
      return new Response(JSON.stringify({ error: 'User not authenticated' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    // Parse the multipart/form-data request
    const formData = await req.formData();
    const formFields = Object.fromEntries(formData.entries());
    
    console.log('Received form fields:', formFields);

    // Extract form data (ensure keys match frontend form)
    const { 
      vendorName, 
      description, 
      vendorType, 
      contactPhone, 
      contactEmail, 
      operatingHours, 
      latitude, 
      longitude 
    } = formFields;

    // Basic validation (can be more robust)
    if (!vendorName || !vendorType || latitude === undefined || longitude === undefined) {
       return new Response(JSON.stringify({ error: 'Missing required fields (name, type, location)' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    // 1. Insert into submissions table
    const { data: submissionData, error: submissionError } = await supabaseClient
      .from('submissions')
      .insert({
        user_id: user.id,
        vendor_name: vendorName,
        description: description || null,
        vendor_type: vendorType,
        contact_phone: contactPhone || null,
        contact_email: contactEmail || null,
        operating_hours: operatingHours || null,
        latitude: parseFloat(latitude as string), // Ensure conversion
        longitude: parseFloat(longitude as string),
        status: 'pending' // Initial status
      })
      .select()
      .single();

    if (submissionError) {
      console.error('Submission insert error:', submissionError);
      throw new Error(`Database error submitting vendor: ${submissionError.message}`);
    }

    if (!submissionData) {
      throw new Error('Failed to retrieve submission data after insert');
    }

    console.log('Submission created:', submissionData.id);

    // 2. Upload photos and insert into submission_photos
    const photoFiles = formData.getAll('photos') as File[];
    const photoInsertPromises = photoFiles.map(async (file) => {
      const fileName = `${Date.now()}-${file.name}`;
      const filePath = `submissions/${submissionData.id}/${fileName}`; // Store photos under submission ID

      const { error: uploadError } = await supabaseClient.storage
        .from(BUCKET_NAME)
        .upload(filePath, file);

      if (uploadError) {
        console.error(`Failed to upload photo ${file.name}:`, uploadError);
        // Decide how to handle partial failures - skip this photo?
        return null; 
      }

      const { data: publicUrlData } = supabaseClient.storage
        .from(BUCKET_NAME)
        .getPublicUrl(filePath);

      if (!publicUrlData || !publicUrlData.publicUrl) {
        console.error(`Failed to get public URL for ${filePath}`);
        // Clean up storage?
        return null;
      }

      // Insert photo metadata
      return supabaseClient
        .from('submission_photos')
        .insert({
          submission_id: submissionData.id,
          user_id: user.id,
          storage_path: filePath,
          public_url: publicUrlData.publicUrl
        });
    });

    const photoResults = await Promise.all(photoInsertPromises);
    const photoErrors = photoResults.filter(result => result && result.error);
    
    if (photoErrors.length > 0) {
       console.error('Errors inserting photo metadata:', photoErrors);
       // Consider if the overall submission should fail or just log errors
    }

    console.log(`Processed ${photoFiles.length} photos.`);

    // Return success response
    return new Response(JSON.stringify({ message: 'Submission successful', submissionId: submissionData.id }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    console.error('Caught error in function:', error);
    // Ensure Response is imported or available globally in Deno
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
}) 
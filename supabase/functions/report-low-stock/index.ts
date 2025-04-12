import { serve } from 'https://deno.land/std@0.170.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

console.log('report-low-stock function started');

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
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

    // Get request body
    const { vendorId, notes } = await req.json();

    if (!vendorId) {
      return new Response(JSON.stringify({ error: 'Missing required field: vendorId' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    // Insert into low_stock_reports table
    const { error: insertError } = await supabaseClient
      .from('low_stock_reports')
      .insert({
        vendor_id: vendorId,
        user_id: user.id,
        notes: notes || null // Optional notes
      });

    if (insertError) {
      console.error('Low stock report insert error:', insertError);
      throw new Error(`Database error submitting report: ${insertError.message}`);
    }

    console.log(`Low stock reported for vendor: ${vendorId} by user: ${user.id}`);

    // Return success response
    return new Response(JSON.stringify({ message: 'Report submitted successfully' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    console.error('Caught error in function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
}) 
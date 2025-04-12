import React, { useState } from 'react';
import { useForm, ControllerRenderProps, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast'; // Corrected path for use-toast hook
import LocationPickerMap from './LocationPickerMap'; // Import the map component
import PhotoUploader from './PhotoUploader'; // Import PhotoUploader
import { supabase } from '../lib/supabase'; // Import supabase client
// import { createVendorSubmission } from '@/services/vendorService'; // Placeholder for API call

// TODO: Fetch vendor types dynamically
const vendorTypes = [
  { id: 'farm_shop', name: 'Farm Shop' },
  { id: 'hedge_veg', name: 'Hedge Veg' },
  { id: 'market_stall', name: 'Market Stall' },
  { id: 'other', name: 'Other' },
];

const formSchema = z.object({
  vendorName: z.string().min(2, { message: "Vendor name must be at least 2 characters." }),
  description: z.string().optional(),
  vendorType: z.string({ required_error: "Please select a vendor type." }),
  contactPhone: z.string().optional(), // Added
  contactEmail: z.string().email({ message: "Invalid email address." }).optional().or(z.literal('')), // Added & allow empty
  operatingHours: z.string().optional(), // Added
  // Location fields added
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  // Photos array not directly in Zod schema, handled in component state
});

type VendorFormData = z.infer<typeof formSchema>;

const VendorSubmissionForm: React.FC = () => {
  const { toast } = useToast();
  const [photoFiles, setPhotoFiles] = useState<File[]>([]); // State for photo files
  const form = useForm<VendorFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vendorName: '',
      description: '',
      vendorType: '',
      contactPhone: '',
      contactEmail: '',
      operatingHours: '',
      latitude: undefined, // Initialize location as undefined
      longitude: undefined,
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: VendorFormData) => {
    setIsSubmitting(true);
    
    if (data.latitude === undefined || data.longitude === undefined) {
        toast({ title: "Location Missing", description: "Please select a location on the map.", variant: "destructive" });
        setIsSubmitting(false);
        return;
    }

    // Get auth token
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session) {
      toast({ title: "Authentication Error", description: "You must be logged in to submit.", variant: "destructive" });
      setIsSubmitting(false);
      return;
    }

    // Create FormData
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });
    photoFiles.forEach((file) => {
      formData.append('photos', file, file.name);
    });

    console.log('Submitting data...'); // Log before invoking

    try {
      // Invoke the Edge Function
      const { data: functionData, error: functionError } = await supabase.functions.invoke(
        'submit-vendor', 
        { 
          body: formData,
          // Pass Authorization header - Supabase client might handle this automatically when invoked,
          // but explicit passing ensures context. Check Supabase docs if issues arise.
          headers: {
             Authorization: `Bearer ${session.access_token}`,
            // 'Content-Type': 'multipart/form-data' // Usually set automatically by fetch/FormData
          }
        }
      );

      if (functionError) {
        // Deno runtime errors or explicit returns with status >= 400
        console.error('Edge function returned error:', functionError);
        // Try to parse Supabase FunctionError details if available
        let errorMessage = functionError.message;
        try {
            const errJson = JSON.parse(functionError.context?.responseText || '{}');
            errorMessage = errJson.error || errorMessage;
        } catch (e) { /* Ignore parsing error */ }
        throw new Error(errorMessage);
      }

      console.log('Edge function response:', functionData);

      toast({
        title: 'Submission Received',
        description: 'Thank you! Your submission is pending review.',
      });
      form.reset();
      setPhotoFiles([]); // Clear photos state
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: 'Submission Failed',
        description: error instanceof Error ? error.message : 'Could not submit vendor. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Vendor Name */}
        <FormField
          control={form.control}
          name="vendorName"
          render={({ field }: { field: ControllerRenderProps<VendorFormData, 'vendorName'> }) => (
            <FormItem>
              <FormLabel>Vendor Name *</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Le Quesne's Farm Shop" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }: { field: ControllerRenderProps<VendorFormData, 'description'> }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about this vendor (products, specialties, etc.)"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Vendor Type */}
        <FormField
          control={form.control}
          name="vendorType"
          render={({ field }: { field: ControllerRenderProps<VendorFormData, 'vendorType'> }) => (
            <FormItem>
              <FormLabel>Vendor Type *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a vendor type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {vendorTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Contact Phone */}
        <FormField
          control={form.control}
          name="contactPhone"
          render={({ field }: { field: ControllerRenderProps<VendorFormData, 'contactPhone'> }) => (
            <FormItem>
              <FormLabel>Contact Phone</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="e.g., 01534 123456" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Contact Email */}
        <FormField
          control={form.control}
          name="contactEmail"
          render={({ field }: { field: ControllerRenderProps<VendorFormData, 'contactEmail'> }) => (
            <FormItem>
              <FormLabel>Contact Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="e.g., farmer@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Operating Hours */}
        <FormField
          control={form.control}
          name="operatingHours"
          render={({ field }: { field: ControllerRenderProps<VendorFormData, 'operatingHours'> }) => (
            <FormItem>
              <FormLabel>Operating Hours</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., Mon-Sat: 9am - 5pm, Sun: 10am - 4pm (Honesty box)"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Location Picker */}
        <FormField
            control={form.control}
            name="latitude" // We technically link this field, but control the value via the map callback
            render={() => ( // We don't need the render field prop here
                <FormItem>
                    <FormLabel>Location *</FormLabel>
                    <FormControl>
                        <LocationPickerMap 
                            onLocationChange={({ lat, lng }) => {
                                form.setValue('latitude', lat, { shouldValidate: true });
                                form.setValue('longitude', lng, { shouldValidate: true });
                            }}
                            // Optionally pass initial position if editing later
                            // initialPosition={form.getValues().latitude ? { lat: form.getValues().latitude!, lng: form.getValues().longitude! } : undefined}
                        />
                    </FormControl>
                    <FormDescription>
                        Click or tap on the map to place a marker. Drag to refine.
                    </FormDescription>
                    {/* Display validation message for latitude (longitude will likely have same status) */}
                     <FormMessage>{form.formState.errors.latitude?.message}</FormMessage>
                </FormItem>
            )}
        />
        {/* Hidden longitude field just for validation schema link, value set by map */}
        <input type="hidden" {...form.register("longitude")} />

        {/* Photo Uploader */}
        <FormItem>
          <FormLabel>Photos (Optional, Max 5)</FormLabel>
          <FormControl>
            <PhotoUploader onFilesChange={setPhotoFiles} maxFiles={5} />
          </FormControl>
          <FormDescription>
            Add photos of the vendor stall, products, or price list.
          </FormDescription>
          <FormMessage /> 
        </FormItem>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Vendor'}
        </Button>
      </form>
    </Form>
  );
};

export default VendorSubmissionForm; 
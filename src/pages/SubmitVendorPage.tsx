import React from 'react';
import VendorSubmissionForm from '@/components/VendorSubmissionForm';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Toaster } from "@/components/ui/toaster"; // Moved to App.tsx

const SubmitVendorPage: React.FC = () => {
  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Submit a New Vendor</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-sm text-muted-foreground">
            Help grow our directory! Fill out the details below to submit a new local vendor you've discovered.
          </p>
          <VendorSubmissionForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default SubmitVendorPage; 
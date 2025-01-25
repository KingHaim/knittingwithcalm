import React, { useState } from 'react';
import { useAuth } from '../../features/auth/hooks/useAuth';
import Button from '../../components/ui/Button';

export default function AdminBundles() {
  const { user } = useAuth();
  const [bundles, setBundles] = useState([]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Admin Access Required</h1>
          <p className="text-gray-600">Please sign in to access the bundles management.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-primary">Manage Bundles</h1>
        <Button>Create New Bundle</Button>
      </div>

      {bundles.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-600 mb-4">No bundles created yet</p>
          <Button>Create Your First Bundle</Button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Bundle list will go here */}
        </div>
      )}
    </div>
  );
}
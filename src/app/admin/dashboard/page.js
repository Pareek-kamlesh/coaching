"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function AdminDashboard() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const router = useRouter();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!file || !name) {
      toast.error('Please provide both a file and a name.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/resources/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        toast.success('Resource uploaded successfully');
        setFile(null);
        setName('');
        router.refresh(); // Optionally refresh the page or redirect
      } else {
        const data = await response.json();
        toast.error(data.error || 'Failed to upload resource');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Upload failed');
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>
      <div className="bg-white p-6 rounded shadow-md max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Manage Resources</h2>
        <form onSubmit={handleFormSubmit} className="space-y-4 mb-8">
          <input
            type="text"
            placeholder="Resource Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded"
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
          >
            Upload Resource
          </button>
        </form>
      </div>
    </div>
  );
}

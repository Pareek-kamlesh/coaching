"use client";

import { useEffect, useState } from 'react';

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch('/api/resources');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched resources:', data); // Log data for debugging
        setResources(data.resources);
      } catch (error) {
        console.error('Failed to fetch resources:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  const getFileIcon = (filePath) => {
    if (!filePath) return '/icons/txt-icon.png'; // Default icon if file path is missing

    // Extract file extension
    const ext = filePath.slice(((filePath.lastIndexOf(".") - 1) >>> 0) + 2).toLowerCase();

    // Define icons for various file types
    const fileIcons = {
      'pdf': '/icons/pdf-icon.png',
      'doc': '/icons/doc-icon.png',
      'docx': '/icons/doc-icon.png',
      'ppt': '/icons/ppt-icon.jpeg',
      'pptx': '/icons/ppt-icon.jpeg',
      'txt': '/icons/txt-icon.png',
      'xls': '/icons/xls-icon.png',
      'xlsx': '/icons/xls-icon.png',
      'default': '/icons/txt-icon.png', // Default icon for any unknown file type
    };

    return fileIcons[ext] || fileIcons['default'];
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen text-lg text-gray-700">Loading...</div>; // Centered loading indicator
  }

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <section className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Resources</h2>
        {resources.length === 0 ? (
          <p className="text-center text-gray-500">No resources available</p> // Show message if no resources are found
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource) => (
              <li
                key={resource._id}
                className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-md p-6 transition-transform transform hover:-translate-y-2 hover:shadow-lg"
              >
                <a
                  href={`/api/resources/download/${resource._id}`}
                  download
                  className="flex flex-col items-center"
                >
                  <img
                    src={getFileIcon(resource.url)}
                    alt={resource.name}
                    className="w-20 h-20 object-contain mb-4"
                  />
                  <p className="text-center text-lg font-medium text-gray-700 hover:text-blue-500 transition-colors">
                    {resource.name}
                  </p>
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

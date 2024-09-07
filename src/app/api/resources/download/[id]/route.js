import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Resource from '@/models/Resource'; // Adjust path if needed
import path from 'path';
import fs from 'fs';

export const GET = async (req, { params }) => {
  const { id } = params; // Extract ID from URL parameters

  // Ensure MongoDB connection is initialized
  await mongoose.connect(process.env.MONGODB_URI);

  try {
    // Find the resource by ID in the database
    const resource = await Resource.findById(id);
    if (!resource) {
      return new NextResponse('Resource not found', { status: 404 });
    }

    // Construct the absolute path to the file
    const filePath = path.resolve('./public', resource.url); // Ensure file path is correct
    console.log(`Resolved file path: ${filePath}`); // Debugging log

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      console.error('File does not exist:', filePath);
      return new NextResponse('File not found on server', { status: 404 });
    }

    // Read the file from the file system
    const fileData = fs.readFileSync(filePath);

    // Determine the Content-Type dynamically
    const mimeType = resource.contentType || 'application/octet-stream';

    // Return the file data with the appropriate headers for download
    return new NextResponse(fileData, {
      status: 200,
      headers: {
        'Content-Type': mimeType,
        'Content-Disposition': `attachment; filename="${path.basename(filePath)}"`, // Ensure filename is correct
      },
    });
  } catch (error) {
    console.error('Error fetching resource:', error);
    return new NextResponse('Failed to fetch resource', { status: 500 });
  }
};

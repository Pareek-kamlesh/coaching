import { writeFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Resource from '@/models/Resource'; // Adjust path if needed

async function connectToDatabase() {
  if (mongoose.connections[0].readyState) {
    // Use existing connection
    return;
  }
  await mongoose.connect(process.env.MONGODB_URI);
}

export async function POST(request) {
  try {
    // Parse form data
    const data = await request.formData();
    
    // Get the uploaded file and resource name
    const file = data.get('file');
    const name = data.get('name');
    
    // Check if a file and name were uploaded
    if (!file || !name) {
      return NextResponse.json({ success: false, message: 'File and name are required' });
    }

    // Convert the file to a buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Define the path to save the uploaded file
    const filePath = `./public/files/${file.name}`;
    const url = `/files/${file.name}`; // URL to access the file

    // Write the buffer to the file path
    await writeFile(filePath, buffer);

    // Connect to MongoDB
    await connectToDatabase();

    // Create a new Resource document
    const newResource = new Resource({
      name,
      filePath: file.name, // Store just the file name or relative path
      contentType: file.type, // Save the content type (MIME type) of the file
      url, // Save the URL to access the file
    });

    // Save the resource to the database
    await newResource.save();

    console.log(`File saved to ${filePath}`);

    // Return a success response
    return NextResponse.json({ success: true, message: 'File uploaded successfully' });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ success: false, message: 'Failed to upload file' });
  }
}

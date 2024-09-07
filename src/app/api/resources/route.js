// src/app/api/resources/route.js
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Resource from '@/models/Resource'; // Adjust path if needed
import path from 'path';
import fs from 'fs/promises';

export const GET = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Fetch metadata about the resources from the database
    const resources = await Resource.find();

    // Construct file paths and URLs
    const resourcesWithFileData = await Promise.all(resources.map(async (resource) => {
      if (!resource.url) {
        console.error('Resource missing url:', resource);
        return { ...resource._doc, fileExists: false, fileUrl: null };
      }

      const filePath = path.join('public', 'files', resource.url.replace('/files/', ''));
      const fileExists = await fs.access(filePath).then(() => true).catch(() => false);

      return {
        ...resource._doc, // Spread resource metadata
        fileExists,
        fileUrl: fileExists ? `/files/${resource.url.replace('/files/', '')}` : null, // Provide URL for access
      };
    }));

    return NextResponse.json({ resources: resourcesWithFileData });
  } catch (error) {
    console.error('Error fetching resources:', error);
    return new NextResponse('Failed to fetch resources', { status: 500 });
  }
};

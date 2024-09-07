// src/app/api/admin/resources/route.js

import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '@/lib/mongoose';
import Resource from '@/models/Resource';

const authenticateAdmin = (req) => {
  const token = req.headers.get('Authorization')?.split(' ')[1];
  if (!token) {
    return false;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    console.error('Token verification error:', error);
    return false;
  }
};

export const GET = async (req) => {
  const isAdminAuthenticated = authenticateAdmin(req);
  if (!isAdminAuthenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const resources = await Resource.find({});
    return NextResponse.json({ resources }, { status: 200 });
  } catch (error) {
    console.error('Error fetching resources:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
};

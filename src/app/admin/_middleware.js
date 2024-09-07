// src/app/admin/_middleware.js

import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req) {
  const token = req.cookies.get('adminToken')?.value;

  if (!token) {
    return NextResponse.redirect('/admin/login');
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect('/admin/login');
  }
}

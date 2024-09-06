// components/Header.js

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link href="/">Systumm Coaching</Link>
        </div>
        <ul className="flex space-x-4">
          <li><Link href="/about">About</Link></li>
          <li><Link href="/courses">Courses</Link></li>
          <li><Link href="/resources">Resources</Link></li>
          <li><Link href="/blog">Blog</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}

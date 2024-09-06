// components/Footer.js

export default function Footer() {
    return (
      <footer className="bg-blue-600 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Physics Coaching. All rights reserved.</p>
        </div>
      </footer>
    );
  }
  
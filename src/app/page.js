"use client";
import { useState, useEffect } from 'react';
import CourseCard from '@/components/CourseCard';

// Simulate fetching courses and attendance; replace with actual fetch logic if needed
const fetchCourses = async () => {
  // Replace with actual fetching from your API
  return [
    { title: 'Class 11 Physics', description: 'Topics covered include...', fee: '5000 INR' },
    { title: 'Class 12 Physics', description: 'Topics covered include...', fee: '6000 INR' },
    { title: 'IIT-JEE Preparation', description: 'Topics covered include...', fee: '10000 INR' },
  ];
};

const fetchAttendance = async () => {
  // Replace with actual fetching from your API
  return [
    { studentName: 'John Doe', class: 'Class 11 Physics', date: '2024-09-05', status: 'Present' },
    { studentName: 'Jane Smith', class: 'Class 12 Physics', date: '2024-09-05', status: 'Absent' },
    { studentName: 'Alice Johnson', class: 'IIT-JEE Preparation', date: '2024-09-05', status: 'Present' },
  ];
};

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [attendance, setAttendance] = useState([]);

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    // Add subscription logic here, e.g., sending email to API
    console.log('Subscribed with email:', email);
    setSubscribed(true);
    setEmail('');
  };

  useEffect(() => {
    fetchCourses().then((fetchedCourses) => setCourses(fetchedCourses));
    fetchAttendance().then((fetchedAttendance) => setAttendance(fetchedAttendance));
  }, []);

  return (
    <div className="text-center py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">Welcome to Systumm Coaching</h1>
        <p className="text-lg text-gray-700 mb-12">Why choose us? Personalized attention, exam-focused coaching, and proven results.</p>

        {/* Attendance Section */}
        <section className="bg-white p-8 rounded-lg shadow-lg mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Student Attendance</h2>
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-2 px-4 text-left text-gray-600">Student Name</th>
                <th className="py-2 px-4 text-left text-gray-600">Class</th>
                <th className="py-2 px-4 text-left text-gray-600">Date</th>
                <th className="py-2 px-4 text-left text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((record, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-2 px-4 text-gray-700">{record.studentName}</td>
                  <td className="py-2 px-4 text-gray-700">{record.class}</td>
                  <td className="py-2 px-4 text-gray-700">{record.date}</td>
                  <td className="py-2 px-4 text-gray-700">{record.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Courses Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))}
          </div>
        </section>

        {/* Subscribe Section */}
        <section className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Subscribe to Our Page</h2>
          <form onSubmit={handleSubscribe} className="flex flex-col items-center">
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email address"
              className="border border-gray-300 p-3 rounded-lg mb-4 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition-colors"
            >
              Subscribe
            </button>
            {subscribed && <p className="mt-4 text-green-500">Thank you for subscribing!</p>}
          </form>
        </section>
      </div>
    </div>
  );
}

// app/courses/page.js

import CourseCard from '../../components/CourseCard';

export default function Courses() {
  const courses = [
    { title: 'Class 11 Physics', description: 'Topics covered include...', fee: '5000 INR' },
    { title: 'Class 12 Physics', description: 'Topics covered include...', fee: '6000 INR' },
    { title: 'IIT-JEE Preparation', description: 'Topics covered include...', fee: '10000 INR' },
  ];

  return (
    <div className="py-12">
      <section className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold">Our Courses</h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
      </section>
    </div>
  );
}

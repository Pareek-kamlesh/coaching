// components/CourseCard.js
export default function CourseCard({ course }) {
    return (
      <div className="border p-4 rounded shadow">
        <h3 className="text-xl font-bold">{course.title}</h3>
        <p className="mt-2">{course.description}</p>
        <p className="mt-2 font-bold">Fee: {course.fee}</p>
        <button className="bg-blue-500 text-white px-4 py-2 mt-4">Register</button>
      </div>
    );
  }
  
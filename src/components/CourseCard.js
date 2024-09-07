export default function CourseCard({ course }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{course.title}</h3>
        <p className="text-gray-600 mb-4">{course.description}</p>
        <p className="text-lg font-semibold text-gray-900">{course.fee}</p>
      </div>
      <div className="bg-gray-100 p-4 text-center">
        <a
          href="#"
          className="text-blue-500 hover:underline"
        >
          Learn More
        </a>
      </div>
    </div>
  );
}

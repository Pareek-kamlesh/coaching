"use client";
import { useState, useEffect } from 'react';
import CourseCard from '@/components/CourseCard';

// Simulate fetching courses and attendance; replace with actual fetch logic if needed
const fetchCourses = async () => {
  return [
    { title: 'Class 11 Physics', description: 'Topics covered include...', fee: '5000 INR' },
    { title: 'Class 12 Physics', description: 'Topics covered include...', fee: '6000 INR' },
    { title: 'IIT-JEE Preparation', description: 'Topics covered include...', fee: '10000 INR' },
  ];
};

const fetchAttendance = async () => {
  return [
    { studentName: 'John Doe', class: 'Class 11 Physics', date: '2024-09-05', status: 'Present' },
    { studentName: 'Jane Smith', class: 'Class 12 Physics', date: '2024-09-05', status: 'Absent' },
    { studentName: 'Alice Johnson', class: 'IIT-JEE Preparation', date: '2024-09-05', status: 'Present' },
  ];
};

// Fetch quizzes from an external API (OpenTDB) with error handling
const fetchQuizzes = async () => {
  try {
    const response = await fetch('https://opentdb.com/api.php?amount=10&category=19&type=multiple');
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} (${response.statusText})`);
    }

    const data = await response.json();

    if (!data || !data.results) {
      console.error('Invalid data format:', data);
      return [];
    }

    // Map quiz data to the desired format
    return data.results.map((quiz, index) => ({
      id: index,
      question: quiz.question,
      correct_answer: quiz.correct_answer,
      options: [...quiz.incorrect_answers, quiz.correct_answer].sort(() => Math.random() - 0.5),
    }));
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    return [];
  }
};

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [attendance, setAttendance] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    console.log('Subscribed with email:', email);
    setSubscribed(true);
    setEmail('');
  };

  const handleAnswerSubmit = () => {
    const currentQuestion = quizzes[currentQuestionIndex];
    
    // Check if the selected answer is correct
    if (selectedAnswer === currentQuestion.correct_answer) {
      setScore(score + 1);
    }

    // Move to the next question or complete the quiz
    if (currentQuestionIndex + 1 < quizzes.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(''); // Reset selected answer
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setQuizCompleted(false);
    fetchQuizzes().then((fetchedQuizzes) => setQuizzes(fetchedQuizzes)); // Fetch new quizzes
  };

  useEffect(() => {
    fetchCourses().then((fetchedCourses) => setCourses(fetchedCourses));
    fetchAttendance().then((fetchedAttendance) => setAttendance(fetchedAttendance));
    fetchQuizzes().then((fetchedQuizzes) => setQuizzes(fetchedQuizzes));
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

        {/* Quizzes Section */}
        <section className="bg-white p-8 rounded-lg shadow-lg mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Physics Quiz</h2>
          {!quizCompleted ? (
            quizzes.length > 0 ? (
              <div className="p-4 border rounded-lg shadow-md bg-gray-50">
                <h3 className="text-xl font-bold mb-2">{quizzes[currentQuestionIndex].question}</h3>
                <div className="flex flex-col space-y-2">
                  {quizzes[currentQuestionIndex].options.map((option, index) => (
                    <button
                      key={index}
                      className={`p-2 rounded-lg border ${
                        selectedAnswer === option ? 'bg-blue-500 text-white' : 'bg-white'
                      }`}
                      onClick={() => setSelectedAnswer(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <button
                  className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition-colors"
                  onClick={handleAnswerSubmit}
                  disabled={!selectedAnswer}
                >
                  Submit Answer
                </button>
              </div>
            ) : (
              <p>Loading quiz...</p>
            )
          ) : (
            <div>
              <h3 className="text-xl font-bold mb-4">Quiz Completed! Your Score: {score}/10</h3>
              <button
                className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition-colors"
                onClick={handleRestartQuiz}
              >
                Start New Quiz
              </button>
            </div>
          )}
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
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Subscribe to Our Channel</h2>
          {!subscribed ? (
            <form onSubmit={handleSubscribe}>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
                className="w-full p-3 border rounded-lg mb-4"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          ) : (
            <p className="text-green-600 font-bold">Subscribed successfully!</p>
          )}
        </section>
      </div>
    </div>
  );
}

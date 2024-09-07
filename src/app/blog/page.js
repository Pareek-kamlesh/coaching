export default function Blog() {
  const blogPosts = [
    {
      title: "The Future of Education: Embracing Technology in Coaching",
      date: "September 10, 2024",
      excerpt: "Discover how technological advancements are shaping the future of education and coaching. Learn about the latest tools and methods that are revolutionizing the industry.",
      link: "#"
    },
    {
      title: "Top 5 Study Tips for Exam Success",
      date: "August 25, 2024",
      excerpt: "Effective study strategies can make a significant difference in exam performance. Explore our top five tips to enhance your study routine and achieve better results.",
      link: "#"
    },
    {
      title: "How to Stay Motivated During Your Studies",
      date: "July 15, 2024",
      excerpt: "Maintaining motivation throughout your study period can be challenging. Find out practical tips and techniques to keep yourself focused and driven towards your academic goals.",
      link: "#"
    },
  ];

  return (
    <div className="bg-gray-50 py-12">
      <section className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-8">Blog & Updates</h2>
        <div className="space-y-8">
          {blogPosts.map((post, index) => (
            <article key={index} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">{post.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{post.date}</p>
                <p className="text-gray-700 mb-4">{post.excerpt}</p>
                <a
                  href={post.link}
                  className="text-blue-600 hover:underline font-semibold"
                >
                  Read More
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

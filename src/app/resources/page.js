// app/resources/page.js

export default function Resources() {
    return (
      <div className="py-12">
        <section className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold">Resources</h2>
          <ul className="mt-4">
            <li><a href="/files/study-material.pdf" download>Download Study Material</a></li>
            <li><a href="https://www.physics.org">Physics.org</a></li>
          </ul>
        </section>
      </div>
    );
  }
  
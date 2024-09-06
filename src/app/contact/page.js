// app/contact/page.js

export default function Contact() {
    return (
      <div className="py-12">
        <section className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold">Contact Us</h2>
          <form className="mt-8">
            <input type="text" placeholder="Your Name" className="border p-2 w-full mb-4" />
            <input type="email" placeholder="Your Email" className="border p-2 w-full mb-4" />
            <textarea placeholder="Your Message" className="border p-2 w-full mb-4"></textarea>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2">Send</button>
          </form>
        </section>
      </div>
    );
  }
  
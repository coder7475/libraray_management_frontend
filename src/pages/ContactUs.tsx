import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { useState } from "react";
import { toast } from "sonner";

const ContactUs = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast("Thank you for reaching out! We have received your message.", {
      position: "top-center"
    });
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-[60vh] w-full px-4 py-8">
        <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center">
          <h1 className="text-4xl font-extrabold text-primary mb-4 text-center">Contact Us</h1>
          <p className="text-gray-700 dark:text-gray-300 mb-6 text-center">
            Have questions, feedback, or need support? Fill out the form below and we'll get back to you as soon as possible.
          </p>
          <form className="w-full space-y-5" onSubmit={handleSubmit} autoComplete="off">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-primary focus:border-primary"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-primary focus:border-primary"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-primary focus:border-primary"
                placeholder="How can we help you?"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-primary text-white font-semibold rounded-lg shadow hover:bg-primary/90 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactUs;
import React, { useState } from 'react';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!form.name || !form.email || !form.message) {
      alert("Please fill in all fields.");
      return;
    }

    // You can POST to backend here
    // axios.post('/api/contact', form)

    console.log("Form submitted:", form);
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Contact Us</h2>

      {submitted ? (
        <div className="alert alert-success text-center">
          ✅ Thank you! We'll get back to you soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "600px" }}>
          <div className="mb-3">
            <label className="form-label">Your Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="form-control"
              placeholder="example@email.com"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              className="form-control"
              rows="4"
              placeholder="Type your message here..."
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Send Message
          </button>
        </form>
      )}
    </div>
  );
};

export default Contact;

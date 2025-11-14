import { useState } from 'react';
import './Contact.css';

const Contact = () => {
    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        honeypot: '' // Anti-spam field
    });

    // Email configuration - spam protection
    const user = "hishamalahmadx";
    const domain = "gmail.com";
    const email = `${user}@${domain}`;

    // Validation and submission state
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'
    const [formTimestamp] = useState(Date.now()); // Anti-spam timestamp

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // Validate email format
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};

        // Check required fields
        if (!formData.name?.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name?.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        if (!formData.email?.trim()) {
            newErrors.email = 'Email is required';
        } else if (!isValidEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.subject?.trim()) {
            newErrors.subject = 'Subject is required';
        } else if (formData.subject?.trim().length < 3) {
            newErrors.subject = 'Subject must be at least 3 characters';
        }

        if (!formData.message?.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message?.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Anti-spam checks
        // 1. Check honeypot field
        if (formData.honeypot) {
            console.log('Spam detected: honeypot filled');
            return;
        }

        // 2. Check time-based submission (must take at least 3 seconds to fill form)
        const timeTaken = Date.now() - formTimestamp;
        if (timeTaken < 3000) {
            console.log('Spam detected: too fast');
            return;
        }

        // Validate form
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            // Simulate API call - Replace this with your actual email service
            // Examples: EmailJS, Formspree, SendGrid, or your own backend API
            await new Promise(resolve => setTimeout(resolve, 2000));

            // For demonstration - In production, replace with actual API call:
            /*
            const response = await fetch('/api/contact', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                subject: formData.subject,
                message: formData.message
              }),
            });
      
            if (!response.ok) {
              throw new Error('Failed to send message');
            }
            */

            // Success
            setSubmitStatus('success');
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: '',
                honeypot: ''
            });
            setErrors({});

            // Hide success message after 5 seconds
            setTimeout(() => {
                setSubmitStatus(null);
            }, 5000);

        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');

            // Hide error message after 5 seconds
            setTimeout(() => {
                setSubmitStatus(null);
            }, 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="contact-container" id="contact">
            {/* Background Elements */}
            <div className="contact-bg-elements">
                <div className="contact-bg-circle contact-bg-circle-1"></div>
                <div className="contact-bg-circle contact-bg-circle-2"></div>
            </div>

            <div className="contact-content">
                {/* Section Header */}
                <div className="contact-header">
                    <div className="contact-subtitle">Get In Touch</div>
                    <h2 className="contact-title">
                        Let's <span className="gradient-text">Connect</span>
                    </h2>
                    <p className="contact-description">
                        Have a project in mind or want to discuss opportunities?
                        Feel free to reach out and I'll get back to you as soon as possible.
                    </p>
                </div>

                {/* Contact Grid */}
                <div className="contact-grid">
                    {/* Contact Info */}
                    <div className="contact-info">
                        <div className="info-card">
                            <div className="info-card-header">
                                <div className="info-icon">
                                    <i className="ti ti-mail"></i>
                                </div>
                                <h3>Email</h3>
                            </div>
                            <p>
                                <a href={`mailto:${email}`}>
                                    {email}
                                </a>
                            </p>
                        </div>

                        <div className="info-card">
                            <div className="info-card-header">
                                <div className="info-icon">
                                    <i className="ti ti-map-pin"></i>
                                </div>
                                <h3>Location</h3>
                            </div>
                            <p>Tyre, Lebanon</p>
                        </div>

                        <div className="info-card">
                            <div className="info-card-header">
                                <div className="info-icon">
                                    <i className="ti ti-clock"></i>
                                </div>
                                <h3>Response Time</h3>
                            </div>
                            <p>Usually within 2 Days</p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="contact-form-wrapper">
                        <div className="contact-form">
                            {/* Honeypot field for spam protection */}
                            <input
                                type="text"
                                name="honeypot"
                                value={formData.honeypot}
                                onChange={handleChange}
                                className="honeypot"
                                tabIndex="-1"
                                autoComplete="off"
                            />

                            {/* Name Field */}
                            <div className="form-group">
                                <label htmlFor="name" className="form-label">
                                    Name<span className="required">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your full name"
                                    className={`form-input ${errors.name ? 'error' : ''}`}
                                    disabled={isSubmitting}
                                />
                                {errors.name && (
                                    <div className="error-message">
                                        <i className="ti ti-alert-circle"></i>
                                        {errors.name}
                                    </div>
                                )}
                            </div>

                            {/* Email Field */}
                            <div className="form-group">
                                <label htmlFor="email" className="form-label">
                                    Email<span className="required">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="your.email@example.com"
                                    className={`form-input ${errors.email ? 'error' : ''}`}
                                    disabled={isSubmitting}
                                />
                                {errors.email && (
                                    <div className="error-message">
                                        <i className="ti ti-alert-circle"></i>
                                        {errors.email}
                                    </div>
                                )}
                            </div>

                            {/* Subject Field */}
                            <div className="form-group">
                                <label htmlFor="subject" className="form-label">
                                    Subject<span className="required">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="What's this about?"
                                    className={`form-input ${errors.subject ? 'error' : ''}`}
                                    disabled={isSubmitting}
                                />
                                {errors.subject && (
                                    <div className="error-message">
                                        <i className="ti ti-alert-circle"></i>
                                        {errors.subject}
                                    </div>
                                )}
                            </div>

                            {/* Message Field */}
                            <div className="form-group">
                                <label htmlFor="message" className="form-label">
                                    Message<span className="required">*</span>
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Tell me more about your project or inquiry..."
                                    className={`form-textarea ${errors.message ? 'error' : ''}`}
                                    disabled={isSubmitting}
                                />
                                {errors.message && (
                                    <div className="error-message">
                                        <i className="ti ti-alert-circle"></i>
                                        {errors.message}
                                    </div>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="button"
                                className="submit-btn"
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                            >
                                <span className="btn-content">
                                    {isSubmitting ? (
                                        <>
                                            <span className="spinner"></span>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <i className="ti ti-send"></i>
                                            Send Message
                                        </>
                                    )}
                                </span>
                            </button>

                            {/* Success/Error Messages */}
                            {submitStatus === 'success' && (
                                <div className="form-message success">
                                    <i className="ti ti-circle-check"></i>
                                    <span>
                                        Thank you! Your message has been sent successfully. I'll get back to you soon.
                                    </span>
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className="form-message error-msg">
                                    <i className="ti ti-alert-circle"></i>
                                    <span>
                                        Oops! Something went wrong. Please try again or email me directly.
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
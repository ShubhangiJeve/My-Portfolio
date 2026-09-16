import { useState, useRef } from 'react';
import type { PersonalInfo } from '../types';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import './Contact.css';

interface ContactProps {
  personalInfo: PersonalInfo;
}

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function Contact({ personalInfo }: ContactProps) {
  const [sectionRef, isVisible] = useIntersectionObserver<HTMLElement>();
  const formRef = useRef<HTMLFormElement>(null);

  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (!form.name.trim()) newErrors.name = 'Name is required.';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email.';
    }
    if (!form.subject.trim()) newErrors.subject = 'Subject is required.';
    if (!form.message.trim()) newErrors.message = 'Message is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');

    // Opens the user's mail client with the message pre-filled
    // This is reliable without any backend
    const mailtoLink = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
      form.subject
    )}&body=${encodeURIComponent(
      `Hi Shubhangi,\n\n${form.message}\n\nBest regards,\n${form.name}\n${form.email}`
    )}`;

    try {
      window.location.href = mailtoLink;
      // Short delay so user sees success state
      setTimeout(() => {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      }, 500);
    } catch {
      setStatus('error');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setErrors({});
  };

  const contactCards = [
    {
      id: 'email',
      label: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    },
    {
      id: 'phone',
      label: 'Phone',
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l.9-1.81a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      value: 'shubhangi-jeve',
      href: personalInfo.linkedin,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      id: 'github',
      label: 'GitHub',
      value: 'ShubhangiJeve',
      href: personalInfo.github,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      id: 'location',
      label: 'Location',
      value: 'Hyderabad · Open to Relocate',
      href: 'https://maps.google.com/?q=Hyderabad,Telangana',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section contact-section"
    >
      <div className="container">
        {/* Header */}
        <div className={`section-header reveal ${isVisible ? 'is-visible' : ''}`}>
          <p className="section-label">Get In Touch</p>
          <h2 className="section-title">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="section-subtitle">
            Open to AI Engineer roles, collaborations, and interesting conversations. Drop me a message — I reply within 24 hours.
          </p>
        </div>

        <div className="contact__layout">
          {/* Left — info cards */}
          <div className={`contact__info reveal reveal-delay-1 ${isVisible ? 'is-visible' : ''}`}>
            <div className="contact__availability">
              <span className="contact__availability-dot" aria-hidden="true" />
              <span className="contact__availability-text">Available for hire · Open to opportunities</span>
            </div>

            <p className="contact__info-desc">
              I'm actively looking for AI Engineer roles where I can architect and own intelligent systems end to end. Whether it's a full-time position, contract work, or a collaboration — let's talk.
            </p>

            <div className="contact__cards">
              {contactCards.map((card) => (
                <a
                  key={card.id}
                  href={card.href}
                  target={card.id === 'email' || card.id === 'phone' ? undefined : '_blank'}
                  rel={card.id === 'email' || card.id === 'phone' ? undefined : 'noopener noreferrer'}
                  className="contact__card"
                  aria-label={`${card.label}: ${card.value}`}
                >
                  <span className={`contact__card-icon contact__card-icon--${card.id}`}>
                    {card.icon}
                  </span>
                  <div className="contact__card-text">
                    <span className="contact__card-label">{card.label}</span>
                    <span className="contact__card-value">{card.value}</span>
                  </div>
                  <svg
                    className="contact__card-arrow"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Right — contact form */}
          <div className={`contact__form-wrapper reveal reveal-delay-2 ${isVisible ? 'is-visible' : ''}`}>
            {status === 'success' ? (
              <div className="contact__success">
                <div className="contact__success-icon" aria-hidden="true">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h3 className="contact__success-title">Message Sent!</h3>
                <p className="contact__success-body">
                  Your mail client has been opened with the message pre-filled. I'll get back to you soon.
                </p>
                <button
                  type="button"
                  className="btn btn--outline"
                  onClick={handleReset}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form
                ref={formRef}
                className="contact__form"
                onSubmit={handleSubmit}
                noValidate
                aria-label="Contact form"
              >
                <h3 className="contact__form-title">Send a Message</h3>

                {/* Name + Email row */}
                <div className="contact__form-row">
                  <div className="contact__field">
                    <label htmlFor="contact-name" className="contact__label">
                      Your Name <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Jane Smith"
                      className={`contact__input ${errors.name ? 'contact__input--error' : ''}`}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      autoComplete="name"
                    />
                    {errors.name && (
                      <p id="name-error" className="contact__error" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="contact__field">
                    <label htmlFor="contact-email" className="contact__label">
                      Email Address <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="jane@company.com"
                      className={`contact__input ${errors.email ? 'contact__input--error' : ''}`}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      autoComplete="email"
                    />
                    {errors.email && (
                      <p id="email-error" className="contact__error" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div className="contact__field">
                  <label htmlFor="contact-subject" className="contact__label">
                    Subject <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="AI Engineer Role · Collaboration · etc."
                    className={`contact__input ${errors.subject ? 'contact__input--error' : ''}`}
                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                  />
                  {errors.subject && (
                    <p id="subject-error" className="contact__error" role="alert">
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="contact__field">
                  <label htmlFor="contact-message" className="contact__label">
                    Message <span aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about the role, project, or just say hi..."
                    rows={5}
                    className={`contact__textarea ${errors.message ? 'contact__input--error' : ''}`}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  {errors.message && (
                    <p id="message-error" className="contact__error" role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>

                {status === 'error' && (
                  <p className="contact__error contact__error--global" role="alert">
                    Something went wrong. Please try emailing directly at{' '}
                    <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>.
                  </p>
                )}

                <button
                  type="submit"
                  className="btn btn--primary contact__submit"
                  disabled={status === 'submitting'}
                  aria-busy={status === 'submitting'}
                >
                  {status === 'submitting' ? (
                    <>
                      <span className="contact__spinner" aria-hidden="true" />
                      Opening mail client…
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

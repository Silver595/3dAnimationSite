const Contact = () => {
  return (
    <section id="contact" className="py-32 section-padding border-t border-[#1a1a1a]">
      <div className="max-w-2xl">
        {/* Section label */}
        <p className="text-xs tracking-[0.3em] uppercase text-[#555] mb-12">
          Contact
        </p>

        {/* Main text */}
        <p className="text-2xl md:text-3xl leading-relaxed text-[#888] mb-12">
          Have a project in mind or want to discuss security?
          <span className="text-white"> I'd love to hear from you.</span>
        </p>

        {/* Email */}
        <a
          href="mailto:hello@silver.dev"
          className="inline-block text-xl md:text-2xl border-b border-white pb-1 hover:pb-2 transition-all duration-300"
        >
          hello@silver.dev
        </a>

        {/* Social links */}
        <div className="mt-16 flex items-center gap-8">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#666] hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#666] hover:text-white transition-colors"
          >
            Twitter
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#666] hover:text-white transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
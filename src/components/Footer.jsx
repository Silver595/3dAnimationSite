const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="py-8 section-padding border-t border-[#1a1a1a]">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-[#444]">
          © {year} Silver
        </p>
        <a
          href="#"
          className="text-xs text-[#444] hover:text-white transition-colors"
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  );
};

export default Footer;
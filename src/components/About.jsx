const skills = [
    "React", "Next.js", "Node.js", "Python",
    "Security", "Pentesting", "OWASP", "Burp Suite"
];

const About = () => {
    return (
        <section id="about" className="py-32 section-padding border-t border-[#1a1a1a]">
            <div className="max-w-4xl">
                {/* Section label */}
                <p className="text-xs tracking-[0.3em] uppercase text-[#555] mb-12">
                    About
                </p>

                {/* Main text */}
                <p className="text-2xl md:text-3xl lg:text-4xl leading-relaxed text-[#ccc] mb-16">
                    I'm a developer who finds beauty in simplicity.
                    By day, I build modern web applications.
                    By night, I hunt for vulnerabilities.
                    <span className="text-white"> Security isn't just my job—it's my obsession.</span>
                </p>

                {/* Skills - minimal list */}
                <div className="flex flex-wrap gap-3">
                    {skills.map((skill) => (
                        <span
                            key={skill}
                            className="text-xs text-[#666] px-3 py-1.5 border border-[#222] rounded"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
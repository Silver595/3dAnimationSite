
import { useState, useRef, useEffect } from "react";
import { FiTerminal } from "react-icons/fi";

const Terminal = () => {
    const [input, setInput] = useState("");
    const [history, setHistory] = useState([
        { type: "system", content: "Initializing SilverOS v2.0..." },
        { type: "system", content: "Access Granted. Welcome, User." },
        { type: "info", content: 'Type "help" to see available commands.' },
    ]);
    const inputRef = useRef(null);
    const containerRef = useRef(null);

    const commands = {
        help: {
            desc: "List available commands",
            output: (
                <div className="space-y-1">
                    <p>Available commands:</p>
                    <div className="grid grid-cols-[100px_1fr] gap-4">
                        <span className="text-green-400">about</span>
                        <span>Who am I?</span>
                        <span className="text-green-400">skills</span>
                        <span>My technical arsenal</span>
                        <span className="text-green-400">projects</span>
                        <span>View recent operations</span>
                        <span className="text-green-400">contact</span>
                        <span>Establish communication</span>
                        <span className="text-green-400">clear</span>
                        <span>Clear terminal buffer</span>
                    </div>
                </div>
            ),
        },
        about: {
            desc: "Display user bio",
            output: (
                <div className="max-w-lg">
                    <p className="mb-2">Subject: Akash (Silver)</p>
                    <p className="leading-relaxed">
                        A security researcher and full-stack developer obsessed with breaking and building systems.
                        I specialize in identifying vulnerabilities (Web/Network) and architecting resilient digital infrastructure.
                    </p>
                    <p className="mt-2 text-zinc-500">[STATUS: ACTIVE]</p>
                </div>
            ),
        },
        skills: {
            desc: "List technical skills",
            output: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="text-purple-400 mb-1">:: OFFENSIVE ::</p>
                        <ul className="list-disc pl-4 text-zinc-300">
                            <li>Penetration Testing (Burp Suite)</li>
                            <li>Network Analysis (Wireshark)</li>
                            <li>Python / Bash Scripting</li>
                        </ul>
                    </div>
                    <div>
                        <p className="text-blue-400 mb-1">:: DEFENSIVE / DEV ::</p>
                        <ul className="list-disc pl-4 text-zinc-300">
                            <li>React / Next.js / Three.js</li>
                            <li>Secure API Design</li>
                            <li>Cloud Hardening (AWS)</li>
                        </ul>
                    </div>
                </div>
            ),
        },
        projects: {
            desc: "List projects",
            output: (
                <div>
                    <p>Executing 'ls ./projects'...</p>
                    <div className="mt-2 space-y-2">
                        <p><span className="text-blue-400">[DIR]</span> 3D-Portfolio-v2</p>
                        <p><span className="text-blue-400">[DIR]</span> Secure-Chat-App</p>
                        <p><span className="text-blue-400">[DIR]</span> Vulnerability-Scanner-O1</p>
                        <p className="text-zinc-500 mt-2 italic">Tip: Scroll up to the 'Projects' section for visual details.</p>
                    </div>
                </div>
            )
        },
        contact: {
            desc: "Show contact info",
            output: (
                <div>
                    <p>Initiating handshake...</p>
                    <p className="mt-2">Email: <a href="mailto:contact@silver.dev" className="underline hover:text-white">contact@silver.dev</a></p>
                    <p>GitHub: <a href="https://github.com" target="_blank" className="underline hover:text-white">@silver</a></p>
                    <p>Twitter: <a href="https://twitter.com" target="_blank" className="underline hover:text-white">@silver_sec</a></p>
                </div>
            ),
        },
        clear: {
            desc: "Clear screen",
            action: () => setHistory([])
        }
    };

    const handleCommand = (e) => {
        e.preventDefault();
        const cmd = input.trim().toLowerCase();

        if (!cmd) return;

        // Add command to history
        const newHistory = [...history, { type: "command", content: input }];

        // Process command
        if (commands[cmd]) {
            if (commands[cmd].action) {
                commands[cmd].action();
                setInput("");
                return;
            } else {
                newHistory.push({ type: "output", content: commands[cmd].output });
            }
        } else {
            newHistory.push({
                type: "error",
                content: `Command not found: ${cmd}. Type "help" for a list of commands.`,
            });
        }

        setHistory(newHistory);
        setInput("");
    };

    useEffect(() => {
        // Auto-scroll to bottom
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [history]);

    const handleTerminalClick = () => {
        inputRef.current?.focus();
    }

    return (
        <section id="terminal" className="min-h-[80vh] flex items-center justify-center bg-[#0a0a0a] py-20 px-4">
            <div className="w-full max-w-4xl border border-white/10 rounded-lg bg-[#0f0f0f] shadow-2xl overflow-hidden flex flex-col h-[600px] relative font-mono text-sm md:text-base">

                {/* Terminal Header */}
                <div className="bg-[#1a1a1a] px-4 py-2 flex items-center justify-between border-b border-white/5 select-none">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    </div>
                    <div className="flex items-center gap-2 text-zinc-500 text-xs">
                        <FiTerminal />
                        <span>silver@system:~</span>
                    </div>
                    <div className="w-10" /> {/* Spacer */}
                </div>

                {/* Terminal Body */}
                <div
                    ref={containerRef}
                    onClick={handleTerminalClick}
                    className="flex-1 p-6 overflow-y-auto cursor-text scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent space-y-2 relative"
                >
                    {/* Scanline Effect */}
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[5] bg-[length:100%_4px,6px_100%] opacity-20" />

                    {history.map((entry, i) => (
                        <div key={i} className={`${entry.type === "error" ? "text-red-400" : entry.type === "command" ? "text-zinc-400 mt-4" : "text-zinc-300"}`}>
                            {entry.type === "command" && <span className="text-green-500 mr-2">➜ ~</span>}
                            {entry.content}
                        </div>
                    ))}

                    {/* Input Line */}
                    <form onSubmit={handleCommand} className="flex items-center gap-2 mt-4 text-zinc-300">
                        <span className="text-green-500">➜</span>
                        <span className="text-blue-400">~</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="flex-1 bg-transparent outline-none border-none text-white placeholder-zinc-700 focus:ring-0 p-0 m-0 w-full"
                            autoFocus
                            autoComplete="off"
                            spellCheck="false"
                        />
                    </form>
                    {/* Blinking Cursor Block (Alternative visually if input caret isn't styled enough, but default caret is okay) */}
                </div>
            </div>
        </section>
    );
};

export default Terminal;

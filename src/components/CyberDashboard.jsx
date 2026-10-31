import React, { useState, useEffect, useRef } from 'react';

export default function CyberDashboard({ samuraiImg, quickhackImg }) {
  const [activeProjectCategory, setActiveProjectCategory] = useState('all');
  const [terminalOutput, setTerminalOutput] = useState([
    { type: 'sys', text: 'INIT_SYS: JAREER_HAIDER_OS v4.0.8 initialized.' },
    { type: 'sys', text: 'NET_STAT: Connected to node jar1r.github.io [LINK_ESTABLISHED]' },
    { type: 'info', text: 'Type "help" or click action buttons to execute commands.' }
  ]);
  const [terminalInput, setTerminalInput] = useState('');
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [systemMetrics, setSystemMetrics] = useState({ cpuLoad: 24, temp: 42, networkPing: 14 });
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [isQuickhacked, setIsQuickhacked] = useState(false);
  const [activeModalImages, setActiveModalImages] = useState(null);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const terminalEndRef = useRef(null);

  // Quickhack trap triggers on tab switch OR window blur
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) setIsQuickhacked(true);
    };
    const handleBlur = () => setIsQuickhacked(true);

    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('blur', handleBlur);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemMetrics(prev => ({
        ...prev,
        cpuLoad: Math.floor(18 + Math.random() * 15),
        networkPing: Math.floor(12 + Math.random() * 6),
        temp: Math.floor(41 + Math.random() * 3)
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalOutput]);

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    const cmd = terminalInput.trim().toLowerCase();
    const newHistory = [...terminalOutput, { type: 'user', text: `> ${terminalInput}` }];

    switch (cmd) {
      case 'help':
        newHistory.push(
          { type: 'info', text: 'AVAILABLE SYSTEM COMMANDS:' },
          { type: 'info', text: '  specs      - Display core hardware specs & node layout' },
          { type: 'info', text: '  projects   - Output active hardware & embedded builds' },
          { type: 'info', text: '  contact    - Retrieve verified encrypted comm channels' },
          { type: 'info', text: '  ping       - Test network latency to main cluster' },
          { type: 'info', text: '  hacktest   - Manually trigger neural quickhack defense grid' },
          { type: 'info', text: '  clear      - Purge terminal buffer screen' }
        );
        break;
      case 'specs':
        newHistory.push(
          { type: 'sys', text: 'SYSTEM SPECS OVERVIEW:' },
          { type: 'info', text: '  [NODE_01] Dell OptiPlex 5060 SFF | i7 | 32GB RAM | Proxmox VE' },
          { type: 'info', text: '  [MOBILE] ThinkPad P14s Gen 3 Workstation | Debian' },
          { type: 'info', text: '  [NET_AP] Aruba Enterprise Access Point & Managed Switches' }
        );
        break;
      case 'projects':
        newHistory.push(
          { type: 'sys', text: 'ACTIVE REPOSITORIES & BUILDS:' },
          { type: 'info', text: '  1. Salvaged Server Cluster (Home Lab Infrastructure)' },
          { type: 'info', text: '  2. Custom Cyberdeck Terminal (Portable Hardware Interface)' },
          { type: 'info', text: '  3. Bare-Metal Verilog Logic & C Embedded Controllers' }
        );
        break;
      case 'contact':
        newHistory.push(
          { type: 'sys', text: 'VERIFIED CONTACT ENDPOINTS:' },
          { type: 'info', text: '  GitHub:    https://github.com/Jar1r' },
          { type: 'info', text: '  LinkedIn:  https://linkedin.com/in/jareer-haider' }
        );
        break;
      case 'ping':
        newHistory.push(
          { type: 'sys', text: `PING jar1r.github.io: 64 bytes | time=${systemMetrics.networkPing}ms | TTL=56` },
          { type: 'sys', text: 'PACKET_LOSS: 0.0% [NODE_OPTIMAL]' }
        );
        break;
      case 'hacktest':
        setIsQuickhacked(true);
        newHistory.push({ type: 'error', text: 'MANUAL QUICKHACK OVERRIDE TRIGGERED.' });
        break;
      case 'clear':
        setTerminalOutput([]);
        setTerminalInput('');
        return;
      default:
        newHistory.push({ type: 'error', text: `COMMAND NOT RECOGNIZED: "${terminalInput}". Type "help" for syntax.` });
    }

    setTerminalOutput(newHistory);
    setTerminalInput('');
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const hardwareItems = [
    {
      id: 'optiplex',
      title: 'OptiPlex 5060 Salvaged Node',
      category: 'Homelab Infrastructure',
      role: 'Core Proxmox Hypervisor',
      specs: ['Intel Core i7 Processor', '32GB DDR4 RAM', '512GB NVMe SSD + 1TB HDD', 'Proxmox / Debian 12'],
      status: 'ONLINE 99.9%',
      tags: ['Salvaged Tech', 'Docker', 'Self-Hosted', 'Linux'],
      description: 'Salvaged enterprise desktop repurposed into a high-efficiency homelab server hosting internal DNS, reverse proxies, and automated services.'
    },
    {
      id: 'thinkpad',
      title: 'ThinkPad P14s Gen 3 Workstation',
      category: 'Mobile Workstation',
      role: 'Bare-Metal Dev & Diagnostics',
      specs: ['Intel Core i7-1270P', '32GB DDR4 RAM', 'Windows & Linux Dual-Boot', 'Hardware Flash Tools'],
      status: 'ACTIVE',
      tags: ['Engineering', 'Embedded C++', 'GDB', 'CAD'],
      description: 'Primary mobile engineering workstation configured for low-level development, CAD applications, and network debugging.'
    },
    {
      id: 'network',
      title: 'Legion-Powered Private AI & Network Project',
      category: 'Network Architecture',
      role: 'Managed Wireless Mesh',
      specs: ['Aruba Instant On Access Point', 'Passive PoE Switches', 'Isolated VLAN Segments', 'Console Serial Config'],
      status: 'ROUTING OK',
      tags: ['Networking', 'VLANs', 'Aruba', 'PoE'],
      description: 'Custom-configured enterprise-grade network backbone providing segmented isolation and professional wireless linkage across the workspace.'
    },
    {
      id: 'cyberdeck',
      title: 'Mobile Cyberdeck & Hardware Mods',
      category: 'Hardware Hacking',
      role: 'Portable Field Console',
      specs: ['Salvaged Display Panels', 'Custom Power Bus', 'Mechanical Keyboards', 'EDP Pinout Adapters'],
      status: 'PROTOTYPE',
      tags: ['Hardware Mods', 'Soldering', 'Displays', 'Embedded'],
      description: 'Ruggedized field terminal crafted from salvaged laptop panels and custom hardware modifications for diagnostics on the move.'
    }
  ];

  const projects = [
    {
      title: 'Salvaged Hardware Homelab Infrastructure',
      category: 'homelab',
      desc: 'Architected and deployed a multi-node compute cluster built from decommissioned enterprise equipment, optimizing power draw and self-hosting services.',
      tech: ['Proxmox VE', 'Debian Linux', 'Docker', 'ZFS', 'PowerShell'],
      metrics: '32GB RAM | Multi-Drive Storage | Low Latency',
      codeSnippet: 'docker run -d --name homelab-gateway --net=host --restart=always nginx:alpine',
      images: [
        '/network-infrastructure/IMG_2939.jpeg',
        '/network-infrastructure/IMG_2940.jpeg',
        '/network-infrastructure/Screenshot 2026-10-23 032026.png',
        '/network-infrastructure/Screenshot 2026-10-30 014644.png',
        '/network-infrastructure/Screenshot 2026-10-31 005528.png',
        '/network-infrastructure/Screenshot 2026-10-31 025347.png',
        '/network-infrastructure/Screenshot 2026-10-31 025451.png'
      ]
    },
    {
      title: 'Bare-Metal Microcontroller & Logic Flasher',
      category: 'embedded',
      desc: 'Low-level programming interfacing directly with hardware registers, serial consoles, and embedded controllers.',
      tech: ['C / C++', 'Verilog / VHDL', 'Tera Term', 'Serial UART', 'GDB'],
      metrics: 'Zero-overhead I/O | Real-time Register Access',
      codeSnippet: 'void init_uart(void) {\n  UBRR0H = 0;\n  UBRR0L = 103; // 9600 Baud at 16MHz\n  UCSR0B = (1<<TXEN0) | (1<<RXEN0);\n}',
      images: []
    },
    {
      title: 'Legion-Powered Private AI & Network Project',
      category: 'network',
      desc: 'Configured enterprise wireless access points, managed switches, and private AI infrastructure pipelines via serial console commands for secure network zoning.',
      tech: ['Aruba Instant On', 'Serial Console', 'VLAN Tagging', 'Firewall Rules'],
      metrics: 'Segmented VLANs | Professional Rack Deployment',
      codeSnippet: 'conf t\n vlan data_segment\n name SECURE_LAB\n exit',
      images: [
        '/Legion-project/IMG_2860.jpeg',
        '/Legion-project/IMG_2864.jpeg',
        '/Legion-project/IMG_2866.jpeg',
        '/Legion-project/IMG_2872.jpeg',
        '/Legion-project/IMG_20261021_024829.jpg',
        '/Legion-project/IMG_20261023_224051.jpg'
      ]
    },
    {
      title: 'Hardware Salvage & Display Modifications',
      category: 'hardware',
      desc: 'Engineered custom display adapters and power regulation circuits to convert salvaged laptop panels into external lab monitors.',
      tech: ['EDP Pinouts', 'Soldering', 'Buck Converters', 'Multimeter Diagnostics'],
      metrics: '12V DC Input | Custom Pinout Mapping',
      codeSnippet: '// Voltage Regulation Matrix:\n// Input: 12V DC Raw -> Buck Step-Down 5V/3.3V EDP Controller',
      images: []
    }
  ];

  const filteredProjects = activeProjectCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeProjectCategory);

  const openEvidenceModal = (imgList) => {
    const listToUse = (!imgList || imgList.length === 0) ? ['/meme.png'] : imgList;
    setActiveModalImages(listToUse);
    setActiveImageIdx(0);
  };

  return (
    <div className="min-h-screen bg-[#07080c] text-slate-100 font-sans selection:bg-[#FF003C] selection:text-white">
      {/* QUICKHACK OVERLAY TRAP */}
      {isQuickhacked && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 border-4 border-[#FF003C]">
          <div className="text-[#FF003C] font-mono text-2xl sm:text-4xl font-black tracking-widest uppercase mb-2 animate-pulse text-center">
            [!] WARNING: NEURAL QUICKHACK DETECTED [!]
          </div>

          <div className="my-4 max-w-md w-full border-2 border-[#FF003C] rounded overflow-hidden shadow-[0_0_30px_rgba(255,0,60,0.6)] bg-black">
            <img src={quickhackImg} alt="Ultimate Quickhack" className="w-full h-auto object-cover" />
          </div>

          <p className="text-slate-300 font-mono text-xs sm:text-sm mb-4 text-center max-w-md">
            Connection breach intercepted. Uplink signature traced back to unauthorized sub-net node. Re-stabilizing session parameters...
          </p>
          <div className="w-64 h-2 bg-slate-800 rounded overflow-hidden border border-[#FF003C]/50 mb-6">
            <div className="h-full bg-[#FF003C] animate-[pulse_1s_infinite]" style={{ width: '100%' }}></div>
          </div>
          <button 
            onClick={() => setIsQuickhacked(false)}
            className="px-6 py-2 bg-[#FF003C] text-white font-mono text-xs font-bold rounded uppercase hover:bg-[#D60032] shadow-[0_0_15px_rgba(255,0,60,0.5)]"
          >
            [ PURGE BREACH & RESUME SESSION ]
          </button>
        </div>
      )}

      {/* MULTI-IMAGE EVIDENCE LIGHTBOX MODAL */}
      {activeModalImages && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4" onClick={() => setActiveModalImages(null)}>
          <div className="relative max-w-4xl w-full bg-[#0e1017] border border-[#FF003C] rounded-lg p-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4 font-mono text-xs">
              <span className="text-[#FFD700]">
                [ INSPECTING_EVIDENCE_NODE // FILE {activeImageIdx + 1} OF {activeModalImages.length} ]
              </span>
              <button 
                onClick={() => setActiveModalImages(null)}
                className="text-rose-400 hover:text-rose-300 px-2 py-1 bg-slate-900 rounded border border-slate-800"
              >
                [ CLOSE_MODAL ]
              </button>
            </div>

            <div className="flex justify-center items-center max-h-[70vh] overflow-hidden bg-black rounded border border-slate-800 p-2 relative">
              <img 
                src={activeModalImages[activeImageIdx]} 
                alt="Project Evidence" 
                className="max-h-[65vh] w-auto object-contain" 
              />
            </div>

            {activeModalImages.length > 1 && (
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-800 font-mono text-xs">
                <button 
                  onClick={() => setActiveImageIdx(prev => (prev === 0 ? activeModalImages.length - 1 : prev - 1))}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded border border-slate-700"
                >
                  &larr; PREV_FILE
                </button>
                <span className="text-slate-400">
                  FILE [{activeImageIdx + 1} / {activeModalImages.length}]
                </span>
                <button 
                  onClick={() => setActiveImageIdx(prev => (prev === activeModalImages.length - 1 ? 0 : prev + 1))}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded border border-slate-700"
                >
                  NEXT_FILE &rarr;
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#FF003C]/10 border border-[#FF003C]/40 text-xs text-[#FF003C]">
              <span>// COMPUTER ENGINEERING & NETWORK TECHNICIAN</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight uppercase">
              Forging <span className="text-[#FF003C] underline decoration-[#FFD700] decoration-wavy decoration-2">Bare-Metal</span> Systems & Hardware
            </h1>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-sans">
              Network and Hardware Technician at Mobiz and Computer Engineering student at Houston Community College. Specializing in hardware infrastructure deployments, embedded systems, C/C++, and self-hosted homelabs.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded bg-[#11131c] border border-slate-800">
                <div className="text-xs text-slate-500 uppercase">Role</div>
                <div className="text-base font-bold text-[#FFD700]">Hardware Tech</div>
              </div>
              <div className="p-3 rounded bg-[#11131c] border border-slate-800">
                <div className="text-xs text-slate-500 uppercase">Primary Stack</div>
                <div className="text-base font-bold text-white">C++ & Linux</div>
              </div>
              <div className="p-3 rounded bg-[#11131c] border border-slate-800 col-span-2 sm:col-span-1">
                <div className="text-xs text-slate-500 uppercase">Focus</div>
                <div className="text-base font-bold text-[#00F0FF]">Embedded Systems</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <a href="#projects" className="px-6 py-3 rounded bg-[#FF003C] hover:bg-[#D60032] text-white font-bold text-sm tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(255,0,60,0.4)] flex items-center space-x-2">
                <span>Explore Projects &rarr;</span>
              </a>
              <button onClick={() => setTerminalOpen(!terminalOpen)} className="px-6 py-3 rounded bg-[#161922] hover:bg-[#1f2430] text-slate-200 border border-slate-700 font-bold text-sm tracking-wider uppercase transition-all">
                {terminalOpen ? 'Close CLI' : 'Open Terminal CLI'}
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-lg overflow-hidden border border-[#FF003C]/40 bg-[#0d0e14] p-4 shadow-[0_0_30px_rgba(255,0,60,0.1)] flex flex-col items-center">
              <div className="relative border border-orange-500/40 bg-black/60 p-2 rounded shadow-[0_0_20px_rgba(249,115,22,0.2)] flex justify-center items-center w-full h-64">
                <img 
                  src={samuraiImg} 
                  alt="SAMURAI Glitch Logo" 
                  className="max-h-full max-w-full object-contain rounded"
                />
              </div>
              <div className="w-full pt-4 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>SLUG: jareer-haider</span>
                <span>SECURE_LINK: ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TERMINAL DRAWER */}
      {terminalOpen && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 transition-all">
          <div className="rounded-lg border border-[#FF003C] bg-[#0c0d12] shadow-[0_0_25px_rgba(255,0,60,0.2)] overflow-hidden">
            <div className="bg-[#141620] px-4 py-2 border-b border-slate-800 flex items-center justify-between">
              <div className="text-xs text-slate-300 font-mono">jareer@cyberdeck: ~ (zsh)</div>
              <div className="flex items-center space-x-2">
                <button onClick={() => setTerminalOutput([])} className="text-xs text-slate-500 hover:text-slate-300 px-2 py-0.5 rounded bg-slate-800">CLEAR</button>
                <button onClick={() => setTerminalOpen(false)} className="text-xs text-rose-500 hover:text-rose-400 px-2 py-0.5 rounded bg-slate-800">ESC</button>
              </div>
            </div>

            <div className="p-4 h-64 overflow-y-auto space-y-2 text-xs text-slate-300 font-mono">
              {terminalOutput.map((out, idx) => (
                <div key={idx} className={`${
                  out.type === 'error' ? 'text-rose-400' :
                  out.type === 'sys' ? 'text-[#FFD700]' :
                  out.type === 'user' ? 'text-[#00F0FF]' : 'text-slate-300'
                }`}>
                  {out.text}
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>

            <form onSubmit={handleCommandSubmit} className="border-t border-slate-800 p-2 bg-[#090a0f] flex items-center">
              <span className="text-[#FF003C] px-2 text-xs font-bold font-mono">&gt;</span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="Type 'help', 'specs', 'projects', 'contact', 'ping', or 'hacktest'..."
                className="w-full bg-transparent text-xs text-white focus:outline-none font-mono"
              />
              <button type="submit" className="px-3 py-1 bg-[#FF003C] text-white text-xs font-bold rounded hover:bg-[#D60032]">RUN</button>
            </form>
          </div>
        </div>
      )}

      {/* HARDWARE SPECS INSPECTOR */}
      <section className="py-12 bg-[#0a0b10] border-t border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <div className="text-[#FF003C] text-xs font-bold tracking-widest uppercase mb-1">// RACK_SPECIFICATIONS</div>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase">Hardware & Node Diagnostics</h2>
            </div>
            <p className="text-xs text-slate-400 mt-2 md:mt-0 font-mono">Live inspection of hardware inventory and bare-metal environments</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hardwareItems.map((item) => (
              <div key={item.id} className="rounded-lg bg-[#11131a] border border-slate-800 p-5 hover:border-[#FF003C]/60 transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-3 gap-2">
                    <span className="px-2 py-1 rounded bg-slate-800 text-slate-300 font-mono whitespace-nowrap">{item.category}</span>
                    <span className="text-emerald-400 font-bold font-mono whitespace-nowrap">{item.status}</span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-[#FF003C] transition-colors mb-1">{item.title}</h3>
                  <div className="text-xs text-[#FFD700] mb-3 font-mono">{item.role}</div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4 font-sans">{item.description}</p>
                  <div className="space-y-1.5 border-t border-slate-800/80 pt-3 mb-4 font-mono">
                    {item.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-center space-x-2 text-xs text-slate-300">
                        <span className="text-[#FF003C]">&gt;</span>
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800">
                  {item.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[10px] px-2 py-0.5 rounded bg-[#161922] text-slate-400 border border-slate-800 font-mono">#{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="text-[#FF003C] text-xs font-bold tracking-widest uppercase mb-1">// PROJECT_LOGS</div>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase">Featured Engineering Projects</h2>
          </div>
          <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
            {['all', 'homelab', 'embedded', 'network', 'hardware'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveProjectCategory(cat)}
                className={`px-3 py-1.5 rounded text-xs uppercase font-bold transition-all font-mono ${
                  activeProjectCategory === cat
                    ? 'bg-[#FF003C] text-white shadow-[0_0_10px_rgba(255,0,60,0.3)]'
                    : 'bg-[#11131a] text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((proj, idx) => (
            <div key={idx} className="rounded-lg bg-[#0e1017] border border-slate-800 p-6 hover:border-[#FF003C]/50 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-[#FFD700] uppercase tracking-wider font-mono">{proj.category} build</span>
                  <span className="text-xs text-slate-500 font-mono">{proj.metrics}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{proj.title}</h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4 font-sans">{proj.desc}</p>
                <div className="flex flex-wrap gap-2 mb-4 font-mono">
                  {proj.tech.map((t, tIdx) => (
                    <span key={tIdx} className="text-xs px-2.5 py-1 rounded bg-[#161924] text-slate-300 border border-slate-800">{t}</span>
                  ))}
                </div>

                {proj.codeSnippet && (
                  <div className="relative rounded bg-[#07080b] p-3 border border-slate-800/80 mb-4 group">
                    <button
                      onClick={() => copyToClipboard(proj.codeSnippet, idx)}
                      className="absolute top-2 right-2 px-2 py-1 rounded bg-slate-800 text-[10px] text-slate-300 hover:text-white transition-colors font-mono"
                    >
                      {copiedIndex === idx ? 'COPIED!' : 'COPY'}
                    </button>
                    <pre className="text-[11px] text-slate-300 overflow-x-auto font-mono pr-12 whitespace-pre">{proj.codeSnippet}</pre>
                  </div>
                )}
              </div>

              {/* ACTION TRIGGER BUTTON */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between font-mono text-xs">
                <span className="text-slate-500">
                  {proj.images.length > 0 ? `FILES: [${proj.images.length} ATTACHED]` : 'FILES: [NONE]'}
                </span>
                <button
                  onClick={() => openEvidenceModal(proj.images)}
                  className="px-4 py-2 bg-[#161924] hover:bg-[#FF003C] hover:text-white text-[#00F0FF] border border-[#00F0FF]/40 rounded font-bold uppercase transition-all shadow-[0_0_10px_rgba(0,240,255,0.1)]"
                >
                  [ INSPECT EVIDENCE &rarr; ]
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#07080c] border-t border-slate-800/80 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 font-mono">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-2 h-2 rounded-full bg-[#FF003C]" />
            <div>
              <span className="text-slate-300 font-bold">Jareer Haider</span>
              <span> &copy; {new Date().getFullYear()} // System Architecture</span>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <a href="https://github.com/Jar1r" target="_blank" rel="noreferrer" className="hover:text-[#FF003C] transition-colors">GitHub</a>
            <a href="https://linkedin.com/in/jareer-haider" target="_blank" rel="noreferrer" className="hover:text-[#FF003C] transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
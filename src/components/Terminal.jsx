import React, { useState, useRef, useEffect } from 'react';

const HARDWARE_LOGS = [
  "PRIMARY: ThinkPad P14s Gen 3 (i7-1270P / 32GB DDR4)",
  "RIG: Lenovo Legion Y720 (Graphics & Workloads)",
  "NODE: Dell OptiPlex 5060 SFF (Debian Server / 512GB SSD + 1TB HDD)",
  "NET: Aruba Instant On AP, Ubiquiti PoE, Fortinet Firewall"
];

const PROJECTS = [
  "[01] CYBERDECK_MOBILE // Portable encrypted node",
  "[02] OPTIPLEX_DEBIAN // Homelab media/cloud server",
  "[03] ARUBA_CONSOLE   // Serial-configured AP deployment",
  "[04] STALLIGHT_TL    // Custom optic fiber vehicle mod"
];

export default function Terminal() {
  const [history, setHistory] = useState([
    { type: 'sys', text: 'SYSTEM INITIATED. TYPE "help" FOR COMMAND LIST.' }
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      let response = [];

      if (cmd === 'help') {
        response = [
          'AVAILABLE COMMANDS:',
          '  hardware  - Display active system node specs',
          '  projects  - List hardware & engineering deployments',
          '  clear     - Wipe terminal screen',
          '  whoami    - Display session identity'
        ];
      } else if (cmd === 'hardware') {
        response = HARDWARE_LOGS;
      } else if (cmd === 'projects') {
        response = PROJECTS;
      } else if (cmd === 'whoami') {
        response = ['OPERATOR: Jareer Haider // Computer Engineering'];
      } else if (cmd === 'clear') {
        setHistory([]);
        setInput('');
        return;
      } else if (cmd !== '') {
        response = [`Command not recognized: '${cmd}'. Type "help" for options.`];
      }

      setHistory((prev) => [
        ...prev,
        { type: 'user', text: `> ${input}` },
        ...response.map((text) => ({ type: 'sys', text }))
      ]);
      setInput('');
    }
  };

  return (
    <div className="w-full bg-black/80 border border-orange-500/40 p-4 rounded shadow-[0_0_20px_rgba(249,115,22,0.15)] font-mono text-sm h-80 flex flex-col justify-between overflow-hidden">
      <div className="overflow-y-auto space-y-1 pr-2">
        {history.map((item, index) => (
          <div
            key={index}
            className={item.type === 'user' ? 'text-orange-400 font-bold' : 'text-zinc-300'}
          >
            {item.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="flex items-center gap-2 pt-2 border-t border-zinc-800">
        <span className="text-orange-500 font-bold">&gt;</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
          className="bg-transparent border-none outline-none text-orange-400 w-full font-mono focus:ring-0"
          placeholder="type command..."
          autoFocus
        />
      </div>
    </div>
  );
}

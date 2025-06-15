import React, { useState } from 'react';
import { FaRegCopy } from 'react-icons/fa';
import { LockKeyhole } from 'lucide-react';
const App = () => {
  const [length, setLength] = useState(12);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(false);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let chars = '';
    if (uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (numbers) chars += '0123456789';
    if (symbols) chars += '!@#$%^&*()_+[]{}<>?,.';

    if (!chars) {
      setPassword('');
      return;
    }

    let pwd = '';
    for (let i = 0; i < length; i++) {
      pwd += chars[Math.floor(Math.random() * chars.length)];
    }
    setPassword(pwd);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#26547c] text-white px-4 font-montserrat">
      <div className="bg-white text-[#26547c] rounded-2xl p-8 w-full max-w-md shadow-lg">
       <h1 className="text-3xl font-bold mb-6 text-center font-orbitron flex items-center justify-center gap-2">
        <LockKeyhole className="w-6 h-6 text-[#26547c]" />
        Password Generator
      </h1>

        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            value={password}
            readOnly
            className="flex-1 px-3 py-2 rounded border border-[#26547c] bg-white text-[#26547c] outline-none"
          />
          <button
            onClick={copyToClipboard}
            className="bg-[#ffd166] hover:bg-yellow-400 text-[#26547c] font-bold p-2 rounded transition"
          >
            <FaRegCopy />
          </button>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Password Length: {length}</label>
          <input
            type="range"
            min="6"
            max="32"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full accent-[#06d6a0]"
          />
        </div>

        <div className="space-y-2 mb-6">
          <Checkbox label="Include Uppercase" checked={uppercase} onChange={() => setUppercase(!uppercase)} />
          <Checkbox label="Include Lowercase" checked={lowercase} onChange={() => setLowercase(!lowercase)} />
          <Checkbox label="Include Numbers" checked={numbers} onChange={() => setNumbers(!numbers)} />
          <Checkbox label="Include Symbols" checked={symbols} onChange={() => setSymbols(!symbols)} />
        </div>

        <button
          onClick={generatePassword}
          className="w-full bg-[#ef476f] hover:bg-[#04c494] py-2 rounded font-semibold text-white transition"
        >
          Generate Password
        </button>

        {copied && <p className="text-[#ef476f] text-center mt-3 font-semibold">✅ Password copied!</p>}
      </div>
    </div>
  );
};

const Checkbox = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-2 text-sm font-medium">
    <input type="checkbox" checked={checked} onChange={onChange} className="accent-[#ef476f]" />
    {label}
  </label>
);

export default App;

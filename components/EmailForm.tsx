'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const EmailForm = () => {
  const [email, setEmail] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email submitted:', email);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <motion.div
        className={`flex flex-row items-center bg-white/[0.08] backdrop-blur-[40px] border border-white/[0.18] rounded-[30px] transition-all duration-300 ${
          isFocused ? 'bg-white/[0.12] border-white/[0.25] shadow-xl shadow-white/5' : 'shadow-lg shadow-black/5'
        }`}
        style={{
          height: 'clamp(54px, 6.7vh, 60px)',
          padding: '5px',
        }}
        whileHover={{ scale: 1.005 }}
        transition={{ duration: 0.2 }}
      >
        {/* Input Field - Font: 16px */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Enter your email..."
          className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-white/40 px-6 py-4 rounded-[28px] focus:ring-0 font-[var(--font-poppins)]"
          style={{
            fontSize: '16px',
          }}
          required
        />

        {/* Submit Button - Font: 16px, Padding: 28px horizontal, 16px vertical */}
        <motion.button
          type="submit"
          className="bg-white/[0.15] hover:bg-white/[0.22] border border-white/[0.12] text-white font-medium rounded-[26px] transition-all duration-300 whitespace-nowrap shadow-sm font-[var(--font-poppins)]"
          style={{
            fontSize: '16px',
            padding: '16px 28px',
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Join Waitlist
        </motion.button>
      </motion.div>
    </form>
  );
};

export default EmailForm;


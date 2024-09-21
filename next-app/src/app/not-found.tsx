// @ts-nocheck
"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};

export default function Component() {
  const [email, setEmail] = useState("");
  const [boxes, setBoxes] = useState([]);
  const [width, height] = useWindowSize();

  useEffect(() => {
    const boxCount = Math.floor((width * height) / 40000);
    const newBoxes = Array.from({ length: boxCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (width / 10) + 20,
      rotation: Math.random() * 360,
      duration: Math.random() * 10 + 10,
    }));
    setBoxes(newBoxes);
  }, [width, height]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted email:", email);
    setEmail("");
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white overflow-hidden">
      {/* Animated background boxes */}
      {boxes.map((box) => (
        <motion.div
          key={box.id}
          className="absolute bg-gray-600 bg-opacity-10 rounded-lg"
          style={{
            width: box.size,
            height: box.size,
            top: `${box.y}%`,
            left: `${box.x}%`,
          }}
          animate={{
            rotate: [0, box.rotation, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: box.duration,
            ease: "linear",
            repeat: Infinity,
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10 max-w-4xl mx-auto px-4"
      >
        <motion.h1
          className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 text-gray-100"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Coming Soon
        </motion.h1>
        <motion.p
          className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-300"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          We're working on something amazing. Stay tuned!
        </motion.p>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        className="w-full max-w-md z-10 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-grow px-4 py-2 rounded-md bg-gray-700 bg-opacity-50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            required
          />
          <motion.button
            type="submit"
            className="px-6 py-2 rounded-md bg-gray-200 text-gray-900 font-semibold hover:bg-gray-300 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Notify Me
          </motion.button>
        </div>
      </motion.form>

      <motion.div
        className="mt-12 text-sm text-gray-400 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        © {new Date().getFullYear()} Your Company Name. All rights reserved.
      </motion.div>
    </div>
  );
}

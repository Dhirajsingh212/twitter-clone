"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default function ComingSoonCard() {
  const [isNotified, setIsNotified] = useState(false);

  const handleNotifyMe = () => {
    setIsNotified(true);
  };

  return (
    <Card className="w-full max-w-full  overflow-hidden">
      <CardContent className="pt-6 pb-4 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <motion.h2
            className="text-3xl font-bold"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            {"Hold Tight!"}
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {" We're cooking up something amazing."}
          </motion.p>
          <motion.div
            className="relative h-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -10, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              >
                <Sparkles className="text-yellow-400" size={16} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </CardContent>
      <CardFooter className="justify-center pb-6">
        <AnimatePresence mode="wait">
          {!isNotified ? (
            <motion.div
              key="notify-button"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                onClick={handleNotifyMe}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                {"Notify me when it's ready"}
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="thank-you-message"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <p className="text-green-600 font-semibold">
                {"Thank you! We'll keep you posted."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </CardFooter>
    </Card>
  );
}

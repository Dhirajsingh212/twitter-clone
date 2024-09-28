"use client";
import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

const ScrollToTop = ({ divRef }: any) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const div = divRef.current;

    const toggleVisibility = () => {
      if (div && div.scrollTop > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    if (div) {
      div.addEventListener("scroll", toggleVisibility);
    }

    return () => {
      if (div) {
        div.removeEventListener("scroll", toggleVisibility);
      }
    };
  }, []);

  const scrollToTop = () => {
    if (divRef.current) {
      divRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-2 md:right-10 bg-slate-800 text-white px-2 py-2 rounded-full shadow-md hover:bg-blue-500 transition duration-300 ease-in-out"
        >
          <ChevronUp />
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;

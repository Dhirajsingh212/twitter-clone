"use client";
import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const CustomImage = ({
  src,
  customStyle,
}: {
  src: string;
  customStyle: string;
}) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className={cn("relative")}>
      {loading && (
        <div className={cn(" bg-zinc-800 animate-pulse", customStyle)}></div>
      )}
      <Image
        src={src}
        alt="Description"
        width={1000}
        height={1000}
        onLoad={() => setLoading(false)}
        className={cn(
          "object-cover",
          customStyle,
          loading ? "invisible" : "visible"
        )}
      />
    </div>
  );
};

export default CustomImage;

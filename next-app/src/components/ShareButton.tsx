"use client";
import { Share2 } from "lucide-react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

const ShareButton = ({ id }: { id: number }) => {
  const path = usePathname();
  return (
    <Button
      onClick={() => {
        navigator.clipboard.writeText(window.location.origin + path + `/${id}`);
        toast.success("url copied");
      }}
      variant="ghost"
      size="sm"
    >
      <Share2 className="size-4 " />
    </Button>
  );
};

export default ShareButton;

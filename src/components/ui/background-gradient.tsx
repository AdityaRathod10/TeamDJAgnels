import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "framer-motion";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
  onClick,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}) => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };
  return (
    <div className={cn("relative p-[4px] group", containerClassName)} onClick={onClick}>
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-500 via-purple-500 to-blue-500 opacity-50 group-hover:opacity-75 transition duration-500"
      />
      <div className={cn("relative rounded-xl bg-zinc-900", className)}>
        {children}
      </div>
    </div>
  );
};
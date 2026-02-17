"use client";

import { motion } from "framer-motion";
import { ChevronDown, RotateCcw } from "lucide-react";

interface PostVideoOptionsProps {
    onReplay: () => void;
    onContinue: () => void;
}

export default function PostVideoOptions({ onReplay, onContinue }: PostVideoOptionsProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-20 flex flex-col justify-between p-8 pointer-events-none"
        >
            {/* <div className="mt-20 flex justify-center w-full pointer-events-auto">
                <button
                    onClick={onReplay}
                    className="flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors group"
                >
                    <RotateCcw className="w-6 h-6 group-hover:-rotate-90 transition-transform" />
                    <span className="text-xs uppercase tracking-widest">Replay Video</span>
                </button>
            </div>

            <div className="mb-20 flex justify-center w-full pointer-events-auto">
                <button
                    onClick={onContinue}
                    className="flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors animate-pulse"
                >
                    <span className="text-xs uppercase tracking-widest">Scroll Down to Continue</span>
                    <ChevronDown className="w-6 h-6" />
                </button>
            </div> */}
        </motion.div>
    );
}

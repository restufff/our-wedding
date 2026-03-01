"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/app/context/LanguageContext";

interface VideoSectionProps {
    play: boolean;
    onEnded: () => void;
}

export default function VideoSection({ play, onEnded }: VideoSectionProps) {
    const { t } = useLanguage();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [showFeedback, setShowFeedback] = useState<"play" | "pause" | null>(null);

    // Play/Pause logic based on 'play' prop
    useEffect(() => {
        if (videoRef.current) {
            if (play) {
                videoRef.current.muted = false; // Auto-play unmuted since user interacted with GreetingOverlay
                const playPromise = videoRef.current.play();
                if (playPromise !== undefined) {
                    playPromise
                        .catch((error) => {
                            console.error("Autoplay prevented:", error);
                        });
                }
                setShowFeedback(null);
            } else {
                videoRef.current.pause();
            }
        }
    }, [play]);

    // Handle video end
    const handleVideoEnded = () => {
        onEnded();
    };

    // Toggle play/pause on click
    const togglePlay = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
                setShowFeedback("play");
            } else {
                videoRef.current.pause();
                setShowFeedback("pause");
            }
        }
    };

    // Feedback animation timeout
    useEffect(() => {
        if (showFeedback) {
            const timer = setTimeout(() => setShowFeedback(null), 500);
            return () => clearTimeout(timer);
        }
    }, [showFeedback]);

    return (
        <div className="fixed top-0 left-0 w-full h-[100dvh] z-0 bg-black group overflow-hidden" onClick={togglePlay}>
            {/* Desktop Blur Background (Hidden on Mobile) */}
            <div className="hidden md:block absolute inset-0 z-0 opacity-30 bg-gradient-to-br from-[#366998] via-black to-[#366998] pointer-events-none"></div>

            <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex items-center justify-center z-10">
                <video
                    ref={videoRef}
                    // Mobile: object-cover (immersive), Desktop: object-contain (show full content)
                    className="w-full h-full md:w-auto md:h-[90vh] md:aspect-[9/16] object-cover md:object-contain shadow-2xl md:rounded-2xl"
                    src="/video/wedding_compressed.mp4"
                    playsInline
                    preload="none"
                    onEnded={handleVideoEnded}
                // poster="/image/poster.jpg"
                />
            </div>

            {/* Aesthetic Scroll Down Hint Overlay */}
            <AnimatePresence>
                {play && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ delay: 1.5, duration: 1 }}
                        className="absolute bottom-10 md:bottom-12 left-0 right-0 z-30 flex flex-col items-center justify-center pointer-events-none gap-4"
                    >
                        {/* Mouse/Scroll Indicator Pill */}
                        <div className="w-6 h-10 md:w-8 md:h-12 border-[2px] border-white/60 rounded-full flex justify-center p-1.5 backdrop-blur-sm bg-black/10 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                            <motion.div
                                animate={{
                                    y: [0, 16, 0],
                                    opacity: [1, 0, 1]
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="w-[3px] h-3 bg-white rounded-full opacity-90"
                            />
                        </div>

                        {/* Elegant Text */}
                        <motion.div
                            animate={{ opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="bg-black/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/5"
                        >
                            <p className="text-white text-[10px] md:text-xs uppercase tracking-[0.3em] font-medium drop-shadow-md">
                                {t('video.scrollDown')}
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Animated Feedback Icons */}
            <AnimatePresence>
                {showFeedback === "pause" && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.5 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
                    >
                        <div className="bg-black/30 backdrop-blur-md p-6 rounded-full border border-white/20 shadow-2xl">
                            <Pause className="w-12 h-12 text-white fill-white" />
                        </div>
                    </motion.div>
                )}

                {showFeedback === "play" && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.5 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
                    >
                        <div className="bg-black/30 backdrop-blur-md p-6 rounded-full border border-white/20 shadow-2xl">
                            <Play className="w-12 h-12 text-white fill-white translate-x-1" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

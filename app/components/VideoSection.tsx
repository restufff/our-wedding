"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/app/context/LanguageContext";

// --- CUSTOMIZE BUTTON COLORS HERE ---
const BUTTON_STYLE_ON = "bg-[#ffbfdd]/80 hover:bg-[#ffbfdd] border-[#EBE2DC]/30";
const BUTTON_STYLE_OFF = "bg-black/30 hover:bg-black/50 border-white/10";
// ------------------------------------

interface VideoSectionProps {
    play: boolean;
    onEnded: () => void;
}

export default function VideoSection({ play, onEnded }: VideoSectionProps) {
    const { t } = useLanguage();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [showFeedback, setShowFeedback] = useState<"play" | "pause" | null>(null);
    const [isMuted, setIsMuted] = useState(true); // Default to true for autoplay

    // Play/Pause logic based on 'play' prop
    useEffect(() => {
        if (videoRef.current) {
            if (play) {
                videoRef.current.muted = true; // Auto-mute for autoplay policy
                const playPromise = videoRef.current.play();
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            setIsMuted(true);
                        })
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

    // Toggle Mute
    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent toggling play/pause of video
        if (videoRef.current) {
            const newMutedState = !videoRef.current.muted;
            videoRef.current.muted = newMutedState;
            setIsMuted(newMutedState);
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
            <div className="hidden md:block absolute inset-0 z-0 opacity-30 bg-gradient-to-br from-[#064E56] via-black to-[#064E56] pointer-events-none"></div>

            <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex items-center justify-center z-10">
                <video
                    ref={videoRef}
                    // Mobile: object-cover (immersive), Desktop: object-contain (show full content)
                    className="w-full h-full md:w-auto md:h-[90vh] md:aspect-[9/16] object-cover md:object-contain shadow-2xl md:rounded-2xl"
                    src="/video/wedding_compressed.mp4"
                    playsInline
                    onEnded={handleVideoEnded}
                // poster="/image/poster.jpg"
                />
            </div>

            {/* Audio Toggle Button (Heart Shape) */}
            <AnimatePresence>
                {play && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="absolute bottom-8 right-8 z-30 flex items-center gap-3 flex-row-reverse"
                    >
                        <button
                            onClick={toggleMute}
                            className={`relative group flex items-center justify-center w-14 h-14 rounded-full backdrop-blur-md border shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-500 ${isMuted ? BUTTON_STYLE_OFF : BUTTON_STYLE_ON}`}
                        >
                            {/* Pulsing Effect when Muted */}
                            {isMuted && (
                                <span className="absolute inset-0 rounded-full bg-white/30 animate-ping opacity-75 duration-1000"></span>
                            )}

                            {/* Heart Icon (Favicon) */}
                            <img
                                src="/favicon.ico"
                                alt="Audio Toggle"
                                className={`w-8 h-8 object-contain transition-all duration-300 ${isMuted ? 'opacity-50 grayscale' : 'scale-110 drop-shadow-md'}`}
                            />

                            {/* Slash for muted state */}
                            {isMuted && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                                >
                                    <div className="w-8 h-[1.5px] bg-white rotate-45 rounded-full shadow-sm"></div>
                                </motion.div>
                            )}
                        </button>

                        {/* Text Hint */}
                        <AnimatePresence>
                            {isMuted && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10"
                                >
                                    <p className="text-white text-[10px] uppercase tracking-widest font-medium whitespace-nowrap">
                                        {t('video.unmute')}
                                    </p>
                                    {/* Arrow pointing to button */}
                                    <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-l-[6px] border-l-black/40 border-b-[6px] border-b-transparent"></div>
                                </motion.div>
                            )}
                        </AnimatePresence>
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

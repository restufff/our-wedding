"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import YouTube from "react-youtube";

interface VideoSectionProps {
    play: boolean;
    onEnded: () => void;
}

export default function VideoSection({ play, onEnded }: VideoSectionProps) {
    const [player, setPlayer] = useState<any>(null);
    const [showFeedback, setShowFeedback] = useState<"play" | "pause" | null>(null);
    const [isMuted, setIsMuted] = useState(true); // Default to true for autoplay

    // Play video when 'play' prop is true
    useEffect(() => {
        if (play && player) {
            player.mute(); // Mute first to ensure autoplay works on mobile
            player.playVideo();
            setIsMuted(true);
            setShowFeedback(null);
        }
    }, [play, player]);

    // Cleanup: Stop video when component unmounts or play becomes false (optional)
    useEffect(() => {
        if (!play && player) {
            player.pauseVideo();
        }
    }, [play, player]);

    // Hide feedback after animation
    useEffect(() => {
        if (showFeedback) {
            const timer = setTimeout(() => setShowFeedback(null), 500);
            return () => clearTimeout(timer);
        }
    }, [showFeedback]);

    const onReady = (event: any) => {
        setPlayer(event.target);
        if (play) {
            event.target.mute(); // Ensure muted on ready
            event.target.playVideo();
        }
    };

    const onError = (event: any) => {
        console.error("YouTube Player Error Code:", event.data);
        onEnded();
    };

    const togglePlay = () => {
        if (player) {
            const state = player.getPlayerState();
            if (state === 1) { // Playing
                player.pauseVideo();
                setShowFeedback("pause");
            } else {
                player.playVideo();
                setShowFeedback("play");
            }
        }
    };

    const handleUnmute = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent toggling play/pause
        if (player) {
            player.unMute();
            setIsMuted(false);
        }
    };

    const opts = {
        height: '100%',
        width: '100%',
        playerVars: {
            autoplay: 0,
            controls: 0,
            rel: 0,
            showinfo: 0,
            modestbranding: 1,
            playsinline: 1,
            origin: typeof window !== 'undefined' ? window.location.origin : undefined,
            host: 'https://www.youtube.com',
        },
    };

    return (
        <div className="fixed top-0 left-0 w-full h-[100dvh] z-0 bg-black group overflow-hidden" onClick={togglePlay}>
            <div className="absolute top-1/2 left-1/2 w-[300%] h-[300%] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <YouTube
                    videoId="VXDbNLN7TIQ"
                    opts={opts}
                    onReady={onReady}
                    onEnd={onEnded}
                    onError={onError}
                    className="w-full h-full"
                    iframeClassName="w-full h-full object-cover"
                />
            </div>

            {/* Unmute Overlay */}
            <AnimatePresence>
                {isMuted && play && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20"
                    >
                        <button
                            onClick={handleUnmute}
                            className="bg-black/50 backdrop-blur-md px-6 py-3 rounded-full text-white font-medium text-sm tracking-widest uppercase border border-white/20 hover:bg-black/70 transition-all flex items-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
                            Tap to Unmute
                        </button>
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

"use client";

import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GreetingOverlay from "@/app/components/GreetingOverlay";
import VideoSection from "@/app/components/VideoSection";
import PostVideoOptions from "@/app/components/PostVideoOptions";

interface InvitationPageProps {
    guestName?: string;
}

export default function InvitationPage({ guestName }: InvitationPageProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [videoEnded, setVideoEnded] = useState(false);
    const [replayKey, setReplayKey] = useState(0);
    const contentRef = useRef<HTMLElement>(null);

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleVideoEnded = () => {
        setVideoEnded(true);
    };

    const handleReplay = () => {
        setVideoEnded(false);
        setReplayKey((prev) => prev + 1);
    };

    const handleContinue = () => {
        contentRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <main className="relative min-h-screen bg-black text-white overflow-x-hidden">
            {/* 1. Greeting Overlay (Slides up on Open) */}
            <AnimatePresence>
                {!isOpen && (
                    <GreetingOverlay
                        onOpen={handleOpen}
                        guestName={guestName}
                    />
                )}
            </AnimatePresence>

            {/* 2. Video Section (Plays when isOpen is true) */}
            <VideoSection
                key={replayKey}
                play={isOpen}
                onEnded={handleVideoEnded}
            />

            {/* 3. Post Video Options (Shows when video ends) */}
            {videoEnded && (
                <PostVideoOptions
                    onReplay={handleReplay}
                    onContinue={handleContinue}
                />
            )}

            {/* 4. Content */}
            <section
                ref={contentRef}
                className="relative z-10 min-h-screen pt-24 px-6 mt-[100vh] text-[#064E56] bg-[#EBE2DC] overflow-hidden flex flex-col justify-between"
            >
                {/* Top Flower Frame */}
                <div className="absolute top-0 left-0 w-full z-0 pointer-events-none">
                    <motion.img
                        src="/image/rose-up.png"
                        alt="Top Frame Decoration"
                        className="w-full object-contain origin-top -mt-3 md:-mt-16 scale-110"
                        initial={{ scale: 1.02 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                    />
                </div>

                {/* Bottom Flower Frame */}
                <div className="absolute bottom-0 left-0 w-full z-0 pointer-events-none">
                    <motion.img
                        src="/image/rose-bottom.png"
                        alt="Bottom Frame Decoration"
                        className="w-full object-contain origin-bottom"
                        initial={{ scale: 1.02 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                    />
                </div>

                <div className="max-w-4xl mx-auto space-y-16 text-center relative z-10 pt-50 pb-12">
                    <div className="space-y-4">
                        <h2 className="text-sm uppercase tracking-[0.2em] font-bold">The Happy Couple</h2>
                        <div className="w-16 h-0.5 bg-[#064E56] mx-auto opacity-50"></div>
                    </div>

                    <p className="text-lg leading-relaxed font-serif max-w-2xl mx-auto opacity-90">
                        "And of His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy."
                        <br />
                        <span className="text-sm mt-2 block opacity-75">— Ar-Rum: 21</span>
                    </p>

                    <div className="grid md:grid-cols-2 gap-12 md:gap-8 items-center mt-12">
                        {/* Groom */}
                        <div className="flex flex-col items-center space-y-4">
                            <div className="w-48 h-64 bg-white/20 rounded-t-full rounded-b-lg border-2 border-[#064E56]/20 flex items-center justify-center">
                                {/* Placeholder for Photo */}
                                <span className="text-xs uppercase tracking-widest opacity-50">Groom Photo</span>
                            </div>
                            <div className="space-y-1">
                                <h3 className="font-whispering text-5xl">Restu Fauzi</h3>
                                <p className="text-sm uppercase tracking-widest font-bold opacity-80">The Groom</p>
                            </div>
                            <div className="text-sm opacity-80">
                                <p>The Son of</p>
                                <p className="font-bold">Bapak Misar Suhendar & Ibu Meta Ostarica</p>
                            </div>
                        </div>

                        {/* Bride */}
                        <div className="flex flex-col items-center space-y-4">
                            <div className="w-48 h-64 bg-white/20 rounded-t-full rounded-b-lg border-2 border-[#064E56]/20 flex items-center justify-center">
                                {/* Placeholder for Photo */}
                                <span className="text-xs uppercase tracking-widest opacity-50">Bride Photo</span>
                            </div>
                            <div className="space-y-1">
                                <h3 className="font-whispering text-5xl">Tanya Apriska Putri</h3>
                                <p className="text-sm uppercase tracking-widest font-bold opacity-80">The Bride</p>
                            </div>
                            <div className="text-sm opacity-80">
                                <p>The Daughter of</p>
                                <p className="font-bold">Bapak Aprizal & Ibu Eka Susanti</p>
                            </div>
                        </div>
                    </div>

                    {guestName && (
                        <div className="py-8">
                            <div className="inline-block border border-[#064E56]/30 px-6 py-2 rounded-full">
                                <span className="text-sm tracking-widest uppercase opacity-70">Specially for </span>
                                <span className="font-serif italic text-lg ml-1">{guestName}</span>
                            </div>
                        </div>
                    )}

                    <div className="pb-32 text-[#064E56]/40 text-xs uppercase tracking-widest">
                        Scroll up to play video again
                    </div>
                </div>
            </section>
        </main>
    );
}

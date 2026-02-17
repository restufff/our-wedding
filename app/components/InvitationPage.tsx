"use client";

import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GreetingOverlay from "@/app/components/GreetingOverlay";
import VideoSection from "@/app/components/VideoSection";
import PostVideoOptions from "@/app/components/PostVideoOptions";
import CalendarCountdown from "@/app/components/CalendarCountdown";
import WeddingGift from "@/app/components/WeddingGift";
import CommentSection from "@/app/components/CommentSection";

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
                <div className="absolute top-0 left-0 right-0 w-full z-0 pointer-events-none flex justify-center">
                    <motion.img
                        src="/image/rose-up.png"
                        alt="Top Frame Decoration"
                        className="w-full md:w-[80%] lg:w-[60%] object-contain origin-top -mt-3 md:-mt-10 lg:-mt-14 scale-110"
                        initial={{ scale: 1.02 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                    />
                </div>

                {/* Bottom Flower Frame */}
                <div className="absolute bottom-0 left-0 right-0 w-full z-0 pointer-events-none flex justify-center">
                    <motion.img
                        src="/image/rose-bottom.png"
                        alt="Bottom Frame Decoration"
                        className="w-full md:w-[80%] lg:w-[60%] object-contain origin-bottom"
                        initial={{ scale: 1.02 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                    />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="max-w-5xl mx-auto space-y-16 md:space-y-24 text-center relative z-10 pt-28 md:pt-40 pb-12 w-full"
                >
                    <div className="space-y-4">
                        <h2 className="text-xs md:text-sm uppercase tracking-[0.2em] font-bold">Pasangan Mempelai</h2>
                        <div className="w-16 h-0.5 bg-[#064E56] mx-auto opacity-50"></div>
                    </div>

                    <p className="text-base md:text-xl leading-relaxed font-serif max-w-3xl mx-auto opacity-90 px-4">
                        "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."
                        <br />
                        <span className="text-xs md:text-sm mt-3 block opacity-75 font-sans tracking-widest">— Ar-Rum: 21</span>
                    </p>

                    <div className="relative mt-8 md:mt-20">
                        {/* Decorative Ampersand Background */}
                        <div className="absolute top-[45%] md:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[60px] md:text-[200px] leading-none opacity-5 font-whispering select-none pointer-events-none z-0">
                            &
                        </div>

                        <div className="grid md:grid-cols-2 gap-44 md:gap-20 items-stretch max-w-4xl mx-auto px-4 relative z-10">
                            {/* Groom */}
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="flex flex-col items-center space-y-6 group"
                            >
                                <div className="relative w-56 h-72 md:w-64 md:h-80">
                                    <div className="absolute inset-0 bg-[#064E56]/5 rounded-t-full rounded-b-[100px] transform -rotate-3 transition-transform group-hover:-rotate-6"></div>
                                    <div className="absolute inset-0 bg-[#064E56]/5 rounded-t-full rounded-b-[100px] transform rotate-2 transition-transform group-hover:rotate-4"></div>

                                    <div className="relative w-full h-full bg-white/30 backdrop-blur-sm border border-white/40 rounded-t-full rounded-b-[100px] p-3 shadow-lg overflow-hidden">
                                        <div className="w-full h-full bg-[#064E56]/5 rounded-t-full rounded-b-[90px] border border-[#064E56]/10 flex items-center justify-center overflow-hidden relative">
                                            {/* Photo Placeholder / Image */}
                                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#064E56]/10 mix-blend-multiply"></div>
                                            <span className="text-xs uppercase tracking-widest opacity-40 font-bold z-10">Restu Fauzi</span>
                                            {/* If you have images, replace the above span with: <img src="..." className="w-full h-full object-cover" /> */}
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center space-y-2 relative">
                                    <h3 className="font-whispering text-4xl md:text-6xl text-[#064E56]">Restu Fauzi</h3>
                                    <div className="inline-block border-t border-b border-[#064E56]/20 py-1 px-4">
                                        <p className="text-xs md:text-sm uppercase tracking-[0.3em] font-bold text-[#064E56]/80">Mempelai Pria</p>
                                    </div>
                                    <div className="pt-4 text-xs md:text-sm opacity-80 leading-relaxed">
                                        <p className="italic font-serif">Putra Tercinta dari</p>
                                        <p className="font-bold mt-1">Bapak Misar Suhendar</p>
                                        <p className="font-bold">& Ibu Meta Ostarica</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Bride */}
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="flex flex-col items-center space-y-6 group"
                            >
                                <div className="relative w-56 h-72 md:w-64 md:h-80">
                                    <div className="absolute inset-0 bg-[#064E56]/5 rounded-t-full rounded-b-[100px] transform rotate-3 transition-transform group-hover:rotate-6"></div>
                                    <div className="absolute inset-0 bg-[#064E56]/5 rounded-t-full rounded-b-[100px] transform -rotate-2 transition-transform group-hover:-rotate-4"></div>

                                    <div className="relative w-full h-full bg-white/30 backdrop-blur-sm border border-white/40 rounded-t-full rounded-b-[100px] p-3 shadow-lg overflow-hidden">
                                        <div className="w-full h-full bg-[#064E56]/5 rounded-t-full rounded-b-[90px] border border-[#064E56]/10 flex items-center justify-center overflow-hidden relative">
                                            {/* Photo Placeholder / Image */}
                                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#064E56]/10 mix-blend-multiply"></div>
                                            <span className="text-xs uppercase tracking-widest opacity-40 font-bold z-10">Tanya Apriska</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center space-y-2 relative">
                                    <h3 className="font-whispering text-4xl md:text-6xl text-[#064E56]">Tanya Apriska Putri</h3>
                                    <div className="inline-block border-t border-b border-[#064E56]/20 py-1 px-4">
                                        <p className="text-xs md:text-sm uppercase tracking-[0.3em] font-bold text-[#064E56]/80">Mempelai Wanita</p>
                                    </div>
                                    <div className="pt-4 text-xs md:text-sm opacity-80 leading-relaxed">
                                        <p className="italic font-serif">Putri Tercinta dari</p>
                                        <p className="font-bold mt-1">Bapak Aprizal</p>
                                        <p className="font-bold">& Ibu Eka Susanti</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Wedding Event Section */}
                    <div className="mt-16 md:mt-24 space-y-8 md:space-y-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="space-y-4"
                        >
                            <h2 className="text-xs md:text-sm uppercase tracking-[0.2em] font-bold">Acara Pernikahan</h2>
                            <div className="w-16 h-0.5 bg-[#064E56] mx-auto opacity-50"></div>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-8 md:gap-12 text-center max-w-4xl mx-auto px-4">
                            {/* Akad Nikah */}
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="relative group"
                            >
                                <div className="absolute inset-0 bg-[#064E56]/5 rounded-t-[100px] rounded-b-[20px] transform rotate-3 scale-105 transition-transform group-hover:rotate-6"></div>
                                <div className="absolute inset-0 bg-[#064E56]/5 rounded-t-[100px] rounded-b-[20px] transform -rotate-2 scale-105 transition-transform group-hover:-rotate-4"></div>

                                <div className="relative h-full bg-white/60 backdrop-blur-md border border-[#064E56]/20 rounded-t-[100px] rounded-b-[20px] p-2 shadow-xl overflow-hidden group-hover:shadow-2xl transition-all duration-500">
                                    <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#064E56]/5 to-transparent"></div>

                                    <div className="relative h-full border border-[#064E56]/30 rounded-t-[92px] rounded-b-[14px] p-6 pb-10 flex flex-col justify-between group-hover:bg-white/40 transition-colors">


                                        <div className="mt-8 space-y-2">
                                            <h3 className="font-whispering text-4xl md:text-5xl text-[#064E56]">Akad Nikah</h3>
                                            <div className="w-12 h-[1px] bg-[#064E56] mx-auto opacity-30"></div>
                                        </div>

                                        <div className="py-8 space-y-4">
                                            <div className="font-serif">
                                                <p className="text-lg font-bold text-[#064E56]">Sabtu</p>
                                                <div className="flex items-center justify-center gap-4 my-2">
                                                    <div className="h-[1px] w-8 bg-[#064E56]/30"></div>
                                                    <p className="text-3xl font-bold font-serif">28</p>
                                                    <div className="h-[1px] w-8 bg-[#064E56]/30"></div>
                                                </div>
                                                <p className="text-lg text-[#064E56]">Maret 2026</p>
                                            </div>
                                            <div className="inline-block px-4 py-1.5 bg-[#064E56]/10 rounded-full border border-[#064E56]/10">
                                                <p className="text-xs uppercase tracking-widest font-bold">08:00 WIB - Selesai</p>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <p className="text-xs font-bold uppercase tracking-widest text-[#064E56]/80">Bertempat di</p>
                                            <p className="font-serif italic text-lg leading-snug">Kediaman Mempelai Wanita</p>
                                            <p className="text-xs opacity-70">Bengkulu, Seluma</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Resepsi */}
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="relative group"
                            >
                                <div className="absolute inset-0 bg-[#064E56]/5 rounded-t-[100px] rounded-b-[20px] transform -rotate-3 scale-105 transition-transform group-hover:-rotate-6"></div>
                                <div className="absolute inset-0 bg-[#064E56]/5 rounded-t-[100px] rounded-b-[20px] transform rotate-2 scale-105 transition-transform group-hover:rotate-4"></div>

                                <div className="relative h-full bg-white/60 backdrop-blur-md border border-[#064E56]/20 rounded-t-[100px] rounded-b-[20px] p-2 shadow-xl overflow-hidden group-hover:shadow-2xl transition-all duration-500">
                                    <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#064E56]/5 to-transparent"></div>

                                    <div className="relative h-full border border-[#064E56]/30 rounded-t-[92px] rounded-b-[14px] p-6 pb-10 flex flex-col justify-between group-hover:bg-white/40 transition-colors">


                                        <div className="mt-8 space-y-2">
                                            <h3 className="font-whispering text-4xl md:text-5xl text-[#064E56]">Resepsi</h3>
                                            <div className="w-12 h-[1px] bg-[#064E56] mx-auto opacity-30"></div>
                                        </div>

                                        <div className="py-8 space-y-4">
                                            <div className="font-serif">
                                                <p className="text-lg font-bold text-[#064E56]">Minggu</p>
                                                <div className="flex items-center justify-center gap-4 my-2">
                                                    <div className="h-[1px] w-8 bg-[#064E56]/30"></div>
                                                    <p className="text-3xl font-bold font-serif">29</p>
                                                    <div className="h-[1px] w-8 bg-[#064E56]/30"></div>
                                                </div>
                                                <p className="text-lg text-[#064E56]">Maret 2026</p>
                                            </div>
                                            <div className="inline-block px-4 py-1.5 bg-[#064E56]/10 rounded-full border border-[#064E56]/10">
                                                <p className="text-xs uppercase tracking-widest font-bold">09:00 WIB - Selesai</p>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <p className="text-xs font-bold uppercase tracking-widest text-[#064E56]/80">Bertempat di</p>
                                            <p className="font-serif italic text-lg leading-snug">Kediaman Mempelai Wanita</p>
                                            <p className="text-xs opacity-70">Bengkulu, Seluma</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Location Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="w-full max-w-3xl mx-auto px-4 mt-8 md:mt-12 mb-6 flex justify-center"
                        >
                            <img
                                src="/image/lokasi-weddings.jpg"
                                alt="Peta Lokasi"
                                className="w-full h-auto rounded-2xl shadow-xl border-4 border-white/50"
                            />
                        </motion.div>

                        {/* Map Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex justify-center pt-4 mb-16 md:mb-24"
                        >
                            <a
                                href="https://maps.app.goo.gl/qgYMYWfNiK8ZjiLC9?g_st=ac"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative px-8 py-3 md:px-10 md:py-4 bg-[#064E56] text-[#EBE2DC] rounded-full overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:scale-105 active:scale-95"
                            >
                                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                <span className="relative z-10 text-[10px] md:text-xs tracking-[0.2em] uppercase font-bold flex items-center gap-2 md:gap-3">
                                    Lihat Lokasi
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform w-3 h-3 md:w-4 md:h-4"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                                </span>
                            </a>
                        </motion.div>

                        {/* Save The Date Countdown */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="pb-12"
                        >
                            <CalendarCountdown />
                        </motion.div>

                        {/* Wedding Gift Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <WeddingGift />
                        </motion.div>

                        {/* Comment Section (RSVP) */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <CommentSection guestName={guestName} />
                        </motion.div>
                    </div>

                    {guestName && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="py-8"
                        >
                            <div className="inline-block border border-[#064E56]/30 px-6 py-2 rounded-full">
                                <span className="text-sm tracking-widest uppercase opacity-70">Spesial untuk </span>
                                <span className="font-serif italic text-lg ml-1">{guestName}</span>
                            </div>
                        </motion.div>
                    )}

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="pb-24 pt-12 text-[#064E56]/60 text-xs tracking-widest flex flex-col items-center gap-2"
                    >
                        <div className="w-8 h-[1px] bg-[#064E56]/30 my-4"></div>
                        <p className="font-serif italic opacity-80">
                            Crafted with <span className="text-red-800/60">♥</span> by <span className="font-bold">Tania & Restu</span>
                        </p>
                        <p className="text-[10px] opacity-50 uppercase tracking-[0.2em]">Next.js • TypeScript • Tailwind</p>
                    </motion.div>
                </motion.div>
            </section>
        </main >
    );
}

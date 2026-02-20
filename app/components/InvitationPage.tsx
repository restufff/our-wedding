"use client";

import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GreetingOverlay from "@/app/components/GreetingOverlay";
import VideoSection from "@/app/components/VideoSection";
import PostVideoOptions from "@/app/components/PostVideoOptions";
import CalendarCountdown from "@/app/components/CalendarCountdown";
import WeddingGift from "@/app/components/WeddingGift";
import CommentSection from "@/app/components/CommentSection";
import { useLanguage } from "@/app/context/LanguageContext";

interface InvitationPageProps {
    guestName?: string;
}

// --- KONFIGURASI TAMPILAN ---
const FLOWER_CONFIG = {
    bottomRoseWidth: {
        // Lebar bunga untuk berbagai ukuran layar (dalam persentase viewport width - vw)
        md: "45vw", // Layar Tablet/iPad Portrait (768px - 1024px)
        lg: "40vw", // Layar Laptop/Desktop Kecil (1024px - 1280px)
        xl: "35vw", // Layar Desktop (di atas 1280px)
        maxDesktopWidth: "450px" // Batas maksimal lebar bunga di layar sangat besar (Full HD, 2K, 4K)
    },
    bottomRosePosition: {
        // Atur posisi horizontal bunga di layar desktop/tablet.
        // Ganti nilai dengan vw (viewport width) atau % agar masuk/keluar proporsional di semua layar.
        // Semakin besar angka minusnya, semakin banyak yang terpotong ke samping.
        leftOffset: "-8vw",
        rightOffset: "-8vw",
        // Atur posisi vertikal bunga mentok ke bawah. 
        // 0 akan menempel pas di garis bawah. Gunakan nilai piksel seperti "-20px" jika ingin memotong sedikit ujung akarnya.
        bottomOffset: "-30px"
    }
};

const WEDDING_DATE_CONFIG = {
    day: "28",
    month: "03",
    year: "26",
    dayLabelKey: "greeting.days.saturday" as const,
    monthLabelKey: "greeting.months.march" as const,
    yearLabelKey: "greeting.years.year" as const,
    // Atur ukuran font di sini (Gunakan kelas Tailwind)
    numberFontSize: "text-base md:text-lg lg:text-xl",
    labelFontSize: "text-[8px] md:text-[9px]",
};

export default function InvitationPage({ guestName }: InvitationPageProps) {
    const { t } = useLanguage();
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
                        weddingDate={WEDDING_DATE_CONFIG}
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
                <motion.div
                    className="absolute top-0 left-0 right-0 w-full z-0 pointer-events-none flex justify-center"
                    initial={{ y: -100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: false, amount: 0.1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                >
                    <motion.img
                        src="/image/rose-up.png"
                        alt="Top Frame Decoration"
                        className="w-full md:w-[60%] lg:w-[40%] object-contain origin-top -mt-3 md:-mt-10 lg:-mt-14 scale-110"
                        animate={{ y: [-10, 0, -10] }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut"
                        }}
                    />
                </motion.div>

                {/* Bottom Flower Frame */}
                <motion.div
                    className="absolute bottom-0 left-0 right-0 w-full h-full z-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false, amount: 0.1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                >
                    {/* Mobile Version: Centered Rose */}
                    <motion.img
                        src="/image/rose-bottom.png"
                        alt="Bottom Frame Decoration"
                        className="w-full md:hidden object-cover object-top origin-bottom absolute bottom-0 left-0"
                        animate={{ y: [0, 10, 0] }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut"
                        }}
                    />

                    {/* Desktop Version: Left Rose */}
                    <motion.img
                        src="/image/blue-rose-bottom-left.png"
                        alt="Bottom Left Decoration"
                        style={{
                            '--w-md': FLOWER_CONFIG.bottomRoseWidth.md,
                            '--w-lg': FLOWER_CONFIG.bottomRoseWidth.lg,
                            '--w-xl': FLOWER_CONFIG.bottomRoseWidth.xl,
                            '--w-max': FLOWER_CONFIG.bottomRoseWidth.maxDesktopWidth,
                            left: FLOWER_CONFIG.bottomRosePosition.leftOffset,
                            bottom: FLOWER_CONFIG.bottomRosePosition.bottomOffset
                        } as React.CSSProperties}
                        className="hidden md:block h-auto w-[var(--w-md)] lg:w-[var(--w-lg)] xl:w-[var(--w-xl)] max-w-[var(--w-max)] object-contain object-left-bottom origin-bottom-left absolute"
                        animate={{ y: [0, 10, 0] }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut"
                        }}
                    />

                    {/* Desktop Version: Right Rose */}
                    <motion.img
                        src="/image/blue-rose-bottom-right.png"
                        alt="Bottom Right Decoration"
                        style={{
                            '--w-md': FLOWER_CONFIG.bottomRoseWidth.md,
                            '--w-lg': FLOWER_CONFIG.bottomRoseWidth.lg,
                            '--w-xl': FLOWER_CONFIG.bottomRoseWidth.xl,
                            '--w-max': FLOWER_CONFIG.bottomRoseWidth.maxDesktopWidth,
                            right: FLOWER_CONFIG.bottomRosePosition.rightOffset,
                            bottom: FLOWER_CONFIG.bottomRosePosition.bottomOffset
                        } as React.CSSProperties}
                        className="hidden md:block h-auto w-[var(--w-md)] lg:w-[var(--w-lg)] xl:w-[var(--w-xl)] max-w-[var(--w-max)] object-contain object-right-bottom origin-bottom-right absolute"
                        animate={{ y: [0, 10, 0] }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut"
                        }}
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="max-w-5xl mx-auto space-y-16 md:space-y-24 text-center relative z-10 pt-28 md:pt-40 pb-12 w-full"
                >
                    <div className="space-y-4">
                        <h2 className="text-xs md:text-sm uppercase tracking-[0.2em] font-bold">{t('invitation.coupleHeading')}</h2>
                        <div className="w-16 h-0.5 bg-[#064E56] mx-auto opacity-50"></div>
                    </div>

                    <p className="text-base md:text-xl leading-relaxed font-serif max-w-3xl mx-auto opacity-90 px-4">
                        {t('invitation.quote')}
                        <br />
                        <span className="text-xs md:text-sm mt-3 block opacity-75 font-sans tracking-widest">{t('invitation.quoteSource')}</span>
                    </p>

                    <div className="relative mt-8 md:mt-20">
                        {/* Decorative Ampersand Background */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block text-[60px] md:text-[200px] leading-none opacity-5 font-whispering select-none pointer-events-none z-0">
                            &
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-stretch max-w-4xl mx-auto px-4 relative z-10">
                            {/* Groom */}
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: false, amount: 0.3 }}
                                transition={{ duration: 0.8 }}
                                className="flex flex-col items-center space-y-6 group"
                            >
                                <div className="relative w-56 h-72 md:w-64 md:h-80">
                                    <div className="absolute inset-0 bg-[#064E56]/5 rounded-t-full rounded-b-[100px] transform -rotate-3 transition-transform group-hover:-rotate-6"></div>
                                    <div className="absolute inset-0 bg-[#064E56]/5 rounded-t-full rounded-b-[100px] transform rotate-2 transition-transform group-hover:rotate-4"></div>

                                    <div className="relative w-full h-full bg-white/30 backdrop-blur-sm border border-white/40 rounded-t-full rounded-b-[100px] p-3 shadow-lg overflow-hidden">
                                        <div className="w-full h-full bg-[#064E56]/5 rounded-t-full rounded-b-[90px] border border-[#064E56]/10 flex items-center justify-center overflow-hidden relative">
                                            {/* Photo Placeholder / Image */}
                                            <img
                                                src="/image/restu.jpeg"
                                                alt="Restu Fauzi"
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#064E56]/10 mix-blend-multiply pointer-events-none"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center space-y-2 relative">
                                    <h3 className="font-whispering text-4xl md:text-6xl text-[#064E56]">Restu Fauzi</h3>
                                    <div className="inline-block border-t border-b border-[#064E56]/20 py-1 px-4">
                                        <p className="text-xs md:text-sm uppercase tracking-[0.3em] font-bold text-[#064E56]/80">{t('invitation.groomRole')}</p>
                                    </div>
                                    <div className="pt-4 text-xs md:text-sm opacity-80 leading-relaxed">
                                        <p className="italic font-serif">{t('invitation.sonOf')}</p>
                                        <p className="font-bold mt-1">Bapak Misar Suhendar</p>
                                        <p className="font-bold">& Ibu Meta Ostarica</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Bride */}
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: false, amount: 0.3 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="flex flex-col items-center space-y-6 group"
                            >
                                <div className="relative w-56 h-72 md:w-64 md:h-80">
                                    <div className="absolute inset-0 bg-[#064E56]/5 rounded-t-full rounded-b-[100px] transform rotate-3 transition-transform group-hover:rotate-6"></div>
                                    <div className="absolute inset-0 bg-[#064E56]/5 rounded-t-full rounded-b-[100px] transform -rotate-2 transition-transform group-hover:-rotate-4"></div>

                                    <div className="relative w-full h-full bg-white/30 backdrop-blur-sm border border-white/40 rounded-t-full rounded-b-[100px] p-3 shadow-lg overflow-hidden">
                                        <div className="w-full h-full bg-[#064E56]/5 rounded-t-full rounded-b-[90px] border border-[#064E56]/10 flex items-center justify-center overflow-hidden relative">
                                            {/* Photo Placeholder / Image */}
                                            <img
                                                src="/image/tania.jpeg"
                                                alt="Tanya Apriska"
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#064E56]/10 mix-blend-multiply pointer-events-none"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center space-y-2 relative">
                                    <h3 className="font-whispering text-4xl md:text-6xl text-[#064E56]">Tanya Apriska Putri</h3>
                                    <div className="inline-block border-t border-b border-[#064E56]/20 py-1 px-4">
                                        <p className="text-xs md:text-sm uppercase tracking-[0.3em] font-bold text-[#064E56]/80">{t('invitation.brideRole')}</p>
                                    </div>
                                    <div className="pt-4 text-xs md:text-sm opacity-80 leading-relaxed">
                                        <p className="italic font-serif">{t('invitation.daughterOf')}</p>
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
                            viewport={{ once: false, amount: 0.3 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-4"
                        >
                            <h2 className="text-xs md:text-sm uppercase tracking-[0.2em] font-bold">{t('events.title')}</h2>
                            <div className="w-16 h-0.5 bg-[#064E56] mx-auto opacity-50"></div>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-16 md:gap-12 text-center max-w-4xl mx-auto px-4">
                            {/* Akad Nikah */}
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false, amount: 0.3 }}
                                transition={{ duration: 0.8 }}
                                className="relative group"
                            >
                                <div className="absolute inset-0 bg-[#064E56]/5 rounded-t-[100px] rounded-b-[20px] transform rotate-3 scale-105 transition-transform group-hover:rotate-6"></div>
                                <div className="absolute inset-0 bg-[#064E56]/5 rounded-t-[100px] rounded-b-[20px] transform -rotate-2 scale-105 transition-transform group-hover:-rotate-4"></div>

                                <div className="relative h-full bg-white/60 backdrop-blur-md border border-[#064E56]/20 rounded-t-[100px] rounded-b-[20px] p-2 shadow-xl overflow-hidden group-hover:shadow-2xl transition-all duration-500">
                                    <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#064E56]/5 to-transparent"></div>

                                    <div className="relative h-full border border-[#064E56]/30 rounded-t-[92px] rounded-b-[14px] p-6 pb-10 flex flex-col justify-between group-hover:bg-white/40 transition-colors">


                                        <div className="mt-8 space-y-2">
                                            <h3 className="font-whispering text-4xl md:text-5xl text-[#064E56]">{t('events.akad')}</h3>
                                            <div className="w-12 h-[1px] bg-[#064E56] mx-auto opacity-30"></div>
                                        </div>

                                        <div className="py-8 space-y-4">
                                            <div className="font-serif">
                                                <p className="text-lg font-bold text-[#064E56]">{t('events.day.saturday')}</p>
                                                <div className="flex items-center justify-center gap-4 my-2">
                                                    <div className="h-[1px] w-8 bg-[#064E56]/30"></div>
                                                    <p className="text-3xl font-bold font-serif">28</p>
                                                    <div className="h-[1px] w-8 bg-[#064E56]/30"></div>
                                                </div>
                                                <p className="text-lg text-[#064E56]">{t('events.month.march')}</p>
                                            </div>
                                            <div className="inline-block px-4 py-1.5 bg-[#064E56]/10 rounded-full border border-[#064E56]/10">
                                                <p className="text-xs uppercase tracking-widest font-bold">{t('events.time.akad')}</p>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <p className="text-xs font-bold uppercase tracking-widest text-[#064E56]/80">{t('events.venueLabel')}</p>
                                            <p className="font-serif italic text-lg leading-snug">{t('events.venueName')}</p>
                                            <p className="text-xs opacity-70">{t('events.venueLocation')}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Resepsi */}
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false, amount: 0.3 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="relative group"
                            >
                                <div className="absolute inset-0 bg-[#064E56]/5 rounded-t-[100px] rounded-b-[20px] transform -rotate-3 scale-105 transition-transform group-hover:-rotate-6"></div>
                                <div className="absolute inset-0 bg-[#064E56]/5 rounded-t-[100px] rounded-b-[20px] transform rotate-2 scale-105 transition-transform group-hover:rotate-4"></div>

                                <div className="relative h-full bg-white/60 backdrop-blur-md border border-[#064E56]/20 rounded-t-[100px] rounded-b-[20px] p-2 shadow-xl overflow-hidden group-hover:shadow-2xl transition-all duration-500">
                                    <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#064E56]/5 to-transparent"></div>

                                    <div className="relative h-full border border-[#064E56]/30 rounded-t-[92px] rounded-b-[14px] p-6 pb-10 flex flex-col justify-between group-hover:bg-white/40 transition-colors">


                                        <div className="mt-8 space-y-2">
                                            <h3 className="font-whispering text-4xl md:text-5xl text-[#064E56]">{t('events.reception')}</h3>
                                            <div className="w-12 h-[1px] bg-[#064E56] mx-auto opacity-30"></div>
                                        </div>

                                        <div className="py-8 space-y-4">
                                            <div className="font-serif">
                                                <p className="text-lg font-bold text-[#064E56]">{t('events.day.sunday')}</p>
                                                <div className="flex items-center justify-center gap-4 my-2">
                                                    <div className="h-[1px] w-8 bg-[#064E56]/30"></div>
                                                    <p className="text-3xl font-bold font-serif">29</p>
                                                    <div className="h-[1px] w-8 bg-[#064E56]/30"></div>
                                                </div>
                                                <p className="text-lg text-[#064E56]">{t('events.month.march')}</p>
                                            </div>
                                            <div className="inline-block px-4 py-1.5 bg-[#064E56]/10 rounded-full border border-[#064E56]/10">
                                                <p className="text-xs uppercase tracking-widest font-bold">{t('events.time.reception')}</p>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <p className="text-xs font-bold uppercase tracking-widest text-[#064E56]/80">{t('events.venueLabel')}</p>
                                            <p className="font-serif italic text-lg leading-snug">{t('events.venueName')}</p>
                                            <p className="text-xs opacity-70">{t('events.venueLocation')}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Location Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: false, amount: 0.3 }}
                            transition={{ duration: 0.8 }}
                            className="w-full max-w-3xl md:max-w-lg mx-auto px-4 mt-8 md:mt-12 mb-6 flex justify-center"
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
                            viewport={{ once: false, amount: 0.3 }}
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
                                    {t('events.mapButton')}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform w-3 h-3 md:w-4 md:h-4"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                                </span>
                            </a>
                        </motion.div>

                        {/* Save The Date Countdown */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.3 }}
                            transition={{ duration: 0.8 }}
                            className="pb-12"
                        >
                            <CalendarCountdown />
                        </motion.div>

                        {/* Wedding Gift Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.3 }}
                            transition={{ duration: 0.8 }}
                        >
                            <WeddingGift />
                        </motion.div>

                        {/* Comment Section (RSVP) */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.3 }}
                            transition={{ duration: 0.8 }}
                        >
                            <CommentSection guestName={guestName} />
                        </motion.div>
                    </div>

                    {guestName && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: false, amount: 0.3 }}
                            transition={{ duration: 0.6 }}
                            className="py-8"
                        >
                            <div className="relative inline-block mt-12 md:mt-16 w-full max-w-sm mx-auto">
                                {/* Angel & Stitch Decorations - Sitting on top (Behind the box) */}
                                <motion.div
                                    className="absolute bottom-[70%] left-0 right-0 flex justify-center items-end gap-2 pointer-events-none z-0 w-full"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: false, margin: "-50px" }} // Re-animate on scroll
                                    transition={{
                                        delay: 0.8, // Slightly reduced delay but still after box
                                        duration: 0.8,
                                        ease: "easeOut"
                                    }}
                                >
                                    <motion.img
                                        src="/image/angel_sit.png"
                                        alt="Angel Sitting"
                                        className="w-14 md:w-16 drop-shadow-md origin-bottom mix-blend-multiply opacity-90"
                                        animate={{ rotate: [-2, 2, -2] }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    />
                                    <motion.img
                                        src="/image/stitch_sit.png"
                                        alt="Stitch Sitting"
                                        className="w-16 md:w-20 drop-shadow-md origin-bottom mix-blend-multiply opacity-90"
                                        animate={{ rotate: [2, -2, 2] }}
                                        transition={{
                                            duration: 4.5,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: 0.5
                                        }}
                                    />
                                </motion.div>

                                {/* The "Spesial untuk" Box (In front) */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true, margin: "-50px" }} // Changed to once: true
                                    className="relative z-10 border border-[#064E56]/30 px-6 py-2 rounded-full bg-[#EBE2DC]/50 backdrop-blur-sm mx-auto inline-block"
                                >
                                    <span className="text-sm tracking-widest uppercase opacity-70">{t('footer.specialFor')} </span>
                                    <span className="font-serif italic text-lg ml-1">{guestName}</span>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="pb-40 pt-12 text-[#064E56]/60 text-xs tracking-widest flex flex-col items-center gap-2"
                    >
                        <div className="w-8 h-[1px] bg-[#064E56]/30 my-4"></div>
                        <p className="font-serif italic opacity-80">
                            {t('footer.craftedWith')} <span className="text-red-800/60">♥</span> {t('footer.by')} <span className="font-bold">Tania & Restu</span>
                        </p>
                        <p className="text-[10px] opacity-50 uppercase tracking-[0.2em]">Next.js • TypeScript • Tailwind</p>
                    </motion.div>
                </motion.div>
            </section>
        </main >
    );
}

"use client";

import { motion, Variants } from "framer-motion";
import { useEffect } from "react";
import { useLanguage } from "@/app/context/LanguageContext";

interface GreetingOverlayProps {
    onOpen: () => void;
    guestName?: string;
    weddingDate: {
        day: string;
        month: string;
        year: string;
        dayLabelKey: string;
        monthLabelKey: string;
        yearLabelKey: string;
        numberFontSize: string;
        labelFontSize: string;
    };
}

export default function GreetingOverlay({ onOpen, guestName, weddingDate }: GreetingOverlayProps) {
    const { t } = useLanguage();

    // Lock body scroll when overlay is active
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        },
        exit: {
            opacity: 0,
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 70,
                damping: 10
            }
        },
        exit: { opacity: 0, y: -20 }
    };

    const nameVariants: Variants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 50,
                damping: 10
            }
        }
    };

    return (
        <motion.div
            className="fixed top-0 left-0 w-full h-[100dvh] z-50 flex flex-col items-center justify-center text-[#f7f3ee] overflow-hidden touch-none"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
                hidden: { y: 0 },
                visible: {
                    y: 0,
                    transition: { duration: 0.5, when: "beforeChildren" }
                },
                exit: {
                    y: "-100%",
                    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], when: "afterChildren" }
                }
            }}
        >
            {/* Background Image - Parallax Effect possible here if we wanted, but static is fine for now */}
            {/* Mobile Background Image (Stretched) */}
            <motion.div
                className="absolute inset-0 z-0 bg-center bg-[length:100%_100%] md:hidden"
                style={{ backgroundImage: "url('/image/bg-blue.jpg')" }}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
            />

            {/* Desktop Background Image */}
            <motion.div
                className="absolute inset-0 z-0 bg-center bg-[length:100%_100%] hidden md:block"
                style={{ backgroundImage: "url('/image/bg-dekstop.jpg')" }}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
            />





            {/* Content Container */}
            <motion.div
                className="relative z-10 text-center space-y-6 p-6"
                variants={containerVariants}
            >
                <motion.div variants={itemVariants} className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#366998] font-medium opacity-80">
                    {t('greeting.title')}
                </motion.div>

                <div className="flex flex-col items-center gap-2 py-4">
                    <motion.h1
                        variants={nameVariants}
                        className="font-whispering text-5xl md:text-7xl text-[#366998] leading-none font-bold pr-11"
                    >
                        Tanya
                    </motion.h1>
                    <motion.span
                        variants={itemVariants}
                        className="font-whispering text-xl text-[#366998] italic font-bold"
                    >
                        &
                    </motion.span>
                    <motion.h1
                        variants={nameVariants}
                        className="font-whispering text-5xl md:text-7xl text-[#366998] leading-none font-bold pl-16"
                    >
                        Restu
                    </motion.h1>
                </div>

                <motion.div variants={itemVariants} className="flex items-center justify-center text-[#366998] my-6">
                    <span className="font-sans text-xs md:text-sm font-bold uppercase tracking-[0.3em] opacity-80">
                        {weddingDate.day} {t(weddingDate.monthLabelKey as any)} {weddingDate.year}
                    </span>
                </motion.div>

                <div className="mt-8 mb-4">
                    {guestName ? (
                        <motion.div variants={itemVariants} className="flex flex-col items-center">
                            <div className="text-xs md:text-sm font-serif italic text-[#366998]/80 mb-2">
                                {t('greeting.specialFor')}
                            </div>
                            <div className="text-2xl md:text-3xl font-serif text-[#366998]">
                                {guestName}
                            </div>
                        </motion.div>
                    ) : (
                        <div className="h-[4.5rem]" />
                    )}
                </div>

                <motion.button
                    onClick={onOpen}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-[#366998] text-[#f7f3ee] text-[10px] md:text-xs uppercase tracking-[0.2em] rounded-full cursor-pointer hover:bg-[#04363d] transition-all shadow-lg hover:shadow-xl shadow-[#366998]/20 relative overflow-hidden group"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        {t('greeting.open')}
                    </span>
                    <motion.div
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.5 }}
                    />
                </motion.button>
            </motion.div>
        </motion.div>
    );
}

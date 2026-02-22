"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/app/context/LanguageContext";


/* ──────────────────────────────────────────────
   Pure-CSS Mastercard icon (two overlapping circles)
   ────────────────────────────────────────────── */
function MastercardIcon() {
    return (
        <div className="relative flex items-center h-8 sm:h-9 md:h-11 select-none" role="img" aria-label="Mastercard">
            {/* Red circle */}
            <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-[#EB001B] opacity-90" />
            {/* Orange/Yellow circle — overlaps the red */}
            <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-[#F79E1B] opacity-90 -ml-3 sm:-ml-3.5 md:-ml-4" />
        </div>
    );
}

export default function WeddingGift() {
    const { t } = useLanguage();
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const accounts = [
        {
            bank: "BCA",
            logo: "/image/bca-new.svg",
            number: "1650329569",
            name: "Restu Fauzi",
            gradientStyle: {
                background: "linear-gradient(to bottom right, #AA822A, #E8C66C, #976F1D)",
                WebkitBackground: undefined,
            } as React.CSSProperties,
            renderStyle: (
                <>
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{
                            background: "radial-gradient(circle at 50% 50%, transparent 20%, #000 120%)",
                        }}
                    />
                    <div className="absolute top-0 right-0 w-48 h-48 rounded-full -mr-10 -mt-10" style={{ background: "rgba(255,255,255,0.2)", filter: "blur(48px)" }} />
                </>
            ),
        },
        {
            bank: "BRI",
            logo: "/image/bri-new.svg",
            number: "355101021430535",
            name: "Tanya Apriska Putri",
            gradientStyle: {
                background: "linear-gradient(to right, #1a1a1a, #0a0a0a)",
            } as React.CSSProperties,
            renderStyle: (
                <>
                    <div
                        className="absolute top-0 right-0 h-full"
                        style={{
                            width: "200%",
                            background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.05), transparent)",
                            transform: "skewX(-30deg) translateX(3rem)",
                        }}
                    />
                </>
            ),
        },
    ];

    const handleCopy = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 mt-16 md:mt-24 mb-16">
            {/* Section Header */}
            <div className="text-center space-y-4 mb-10 sm:mb-12">
                <h2 className="text-xs md:text-sm uppercase tracking-[0.2em] font-bold text-[#366998]">
                    {t("gift.title")}
                </h2>
                <div className="w-16 h-0.5 bg-[#366998] mx-auto opacity-50" />
                <p className="text-sm md:text-base font-serif opacity-80 text-[#366998] max-w-lg mx-auto px-2">
                    {t("gift.description")}
                </p>
            </div>

            {/* Cards grid — 1 col on mobile, 2 cols from sm (640px) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-6 md:gap-8 justify-center items-stretch max-w-3xl mx-auto">
                {accounts.map((account, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        viewport={{ once: true }}
                        className="max-w-md sm:max-w-none mx-auto w-full"
                    >
                        {/* Aspect ratio wrapper — padding-bottom fallback for older Safari (iPhone 7) */}
                        <div className="relative w-full" style={{ paddingBottom: "63.05%" }}>
                            <div
                                className="absolute inset-0 rounded-2xl shadow-2xl overflow-hidden text-white group transition-transform hover:scale-[1.02]"
                                style={account.gradientStyle}
                            >
                                {/* Card style overlays */}
                                {account.renderStyle}

                                {/* Card content */}
                                <div className="relative z-10 h-full flex flex-col justify-between font-sans p-4 xs:p-5 sm:p-4 md:p-5 lg:p-6">
                                    {/* Top row — Bank logo */}
                                    <div className="flex justify-end">
                                        <div style={{ height: 28, position: 'relative', width: '80px' }}>
                                            <Image
                                                src={account.logo}
                                                alt={account.bank}
                                                fill
                                                className="object-contain object-right"
                                                style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.4))" }}
                                            />
                                        </div>
                                    </div>

                                    {/* Center — Chip + Account number */}
                                    <div className="flex flex-col gap-2 sm:gap-2.5 md:gap-3 my-auto">
                                        {/* EMV Chip (pure CSS) */}
                                        <div
                                            style={{
                                                width: 40,
                                                height: 28,
                                                background: "linear-gradient(to top right, #d4af37, #fcf6ba)",
                                                borderRadius: 6,
                                                border: "1px solid rgba(179, 135, 40, 0.5)",
                                                position: "relative",
                                                overflow: "hidden",
                                                boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                                            }}
                                        >
                                            <div style={{ position: "absolute", top: "50%", left: 0, width: "100%", height: 1, background: "rgba(0,0,0,0.2)" }} />
                                            <div style={{ position: "absolute", left: "50%", top: 0, width: 1, height: "100%", background: "rgba(0,0,0,0.2)" }} />
                                            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 14, height: 14, border: "1px solid rgba(0,0,0,0.2)", borderRadius: "50%" }} />
                                        </div>

                                        {/* Account number + copy */}
                                        <div className="flex items-center gap-1.5 sm:gap-2">
                                            <div
                                                className="font-mono tracking-wider sm:tracking-widest drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] text-[#FFFFF0] leading-snug whitespace-nowrap overflow-hidden text-ellipsis"
                                                style={{ fontSize: "clamp(1.1rem, 4.5vw, 1.5rem)" }}
                                            >
                                                {account.number}
                                            </div>
                                            <button
                                                onClick={() => handleCopy(account.number, index)}
                                                className="p-1 sm:p-1.5 md:p-2 bg-white/20 hover:bg-white/40 rounded-full transition-colors backdrop-blur-sm flex-shrink-0"
                                                title="Copy Number"
                                            >
                                                {copiedIndex === index ? (
                                                    <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                                                ) : (
                                                    <Copy className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Bottom — Name above, Mastercard icon below */}
                                    <div className="flex flex-col gap-1 mt-auto w-full">
                                        <div
                                            className="uppercase tracking-wider sm:tracking-widest font-medium drop-shadow-md text-[#FFFFF0] leading-tight text-left"
                                            style={{ fontSize: "clamp(0.8rem, 3.2vw, 1rem)" }}
                                        >
                                            {account.name}
                                        </div>
                                        <div className="flex justify-end">
                                            <MastercardIcon />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}


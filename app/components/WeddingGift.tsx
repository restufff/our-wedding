"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";

/* ──────────────────────────────────────────────
   Plain text bank logo — no background/border
   BCA → Montserrat (BCA Sans alternative)
   BRI → sans-serif
   ────────────────────────────────────────────── */
function BankLogo({ name, variant }: { name: string; variant: "gold" | "dark" }) {
    return (
        <span
            className={`text-xl sm:text-xl md:text-2xl font-extrabold tracking-[0.2em] text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] select-none ${variant === "gold" ? "italic" : ""
                }`}
            style={{
                fontFamily:
                    variant === "gold"
                        ? "var(--font-montserrat), 'Montserrat', sans-serif"
                        : "'Arial', 'Helvetica Neue', sans-serif",
            }}
        >
            {name}
        </span>
    );
}


/* ──────────────────────────────────────────────
   Pure-CSS Mastercard icon (two overlapping circles)
   ────────────────────────────────────────────── */
function MastercardIcon() {
    return (
        <div className="relative flex items-center h-7 sm:h-8 md:h-10 select-none" aria-label="Mastercard">
            {/* Red circle */}
            <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full bg-[#EB001B] opacity-90" />
            {/* Orange/Yellow circle — overlaps the red */}
            <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full bg-[#F79E1B] opacity-90 -ml-2.5 sm:-ml-3 md:-ml-4" />
        </div>
    );
}

export default function WeddingGift() {
    const { t } = useLanguage();
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const accounts = [
        {
            bank: "BCA",
            number: "1650329569",
            name: "Restu Fauzi",
            variant: "gold" as const,
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
            number: "355101021430535",
            name: "Tanya Apriska Putri",
            variant: "dark" as const,
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
                                        <BankLogo name={account.bank} variant={account.variant} />
                                    </div>

                                    {/* Center — Chip + Account number */}
                                    <div className="flex flex-col gap-2 sm:gap-2.5 md:gap-3 my-auto">
                                        {/* EMV Chip (pure CSS) */}
                                        <div className="w-10 h-7 sm:w-10 sm:h-7 md:w-12 md:h-9 bg-gradient-to-tr from-[#d4af37] to-[#fcf6ba] rounded-md relative overflow-hidden shadow-sm border border-[#b38728]/50">
                                            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black/20" />
                                            <div className="absolute left-1/2 top-0 w-[1px] h-full bg-black/20" />
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 border border-black/20 rounded-full" />
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

                                    {/* Bottom row — Name + Mastercard icon */}
                                    <div className="flex justify-between items-end mt-auto">
                                        <div
                                            className="uppercase tracking-wider sm:tracking-widest font-medium drop-shadow-md text-[#FFFFF0] leading-tight"
                                            style={{ fontSize: "clamp(0.8rem, 3.2vw, 1rem)" }}
                                        >
                                            {account.name}
                                        </div>
                                        <MastercardIcon />
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


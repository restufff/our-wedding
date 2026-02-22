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
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[0.2em] text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] select-none ${variant === "gold" ? "italic" : ""
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
        <div className="relative flex items-center h-8 sm:h-9 md:h-10 select-none" aria-label="Mastercard">
            {/* Red circle */}
            <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-[#EB001B] opacity-90" />
            {/* Orange/Yellow circle — overlaps the red */}
            <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-[#F79E1B] opacity-90 -ml-3 sm:-ml-3.5 md:-ml-4" />
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
            gradient: "bg-gradient-to-br from-[#AA822A] via-[#E8C66C] to-[#976F1D]",
            renderStyle: (
                <>
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,_transparent_20%,_#000_120%)]" />
                    <div className="absolute top-0 right-0 w-48 h-48 bg-white/20 rounded-full blur-3xl -mr-10 -mt-10 mix-blend-overlay" />
                </>
            ),
        },
        {
            bank: "BRI",
            number: "355101021430535",
            name: "Tanya Apriska Putri",
            variant: "dark" as const,
            gradient: "bg-gradient-to-r from-[#1a1a1a] to-[#0a0a0a]",
            renderStyle: (
                <>
                    <div className="absolute top-0 right-0 w-[200%] h-full bg-gradient-to-b from-transparent via-white/5 to-transparent -skew-x-[30deg] translate-x-12" />
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
        <div className="w-full max-w-4xl mx-auto px-4 mt-16 md:mt-24 mb-16">
            {/* Section Header */}
            <div className="text-center space-y-4 mb-12">
                <h2 className="text-xs md:text-sm uppercase tracking-[0.2em] font-bold text-[#366998]">
                    {t("gift.title")}
                </h2>
                <div className="w-16 h-0.5 bg-[#366998] mx-auto opacity-50" />
                <p className="text-sm md:text-base font-serif opacity-80 text-[#366998] max-w-lg mx-auto">
                    {t("gift.description")}
                </p>
            </div>

            {/* Cards grid */}
            <div className="grid md:grid-cols-2 gap-8 justify-center items-center max-w-3xl mx-auto">
                {accounts.map((account, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        viewport={{ once: true }}
                        className={`relative w-full aspect-[1.586/1] min-h-[220px] sm:min-h-[240px] md:min-h-[260px] rounded-2xl shadow-2xl overflow-hidden ${account.gradient} text-white p-4 sm:p-5 md:p-8 group transition-transform hover:scale-[1.02]`}
                    >
                        {/* Card style overlays */}
                        {account.renderStyle}

                        {/* Card content */}
                        <div className="relative z-10 h-full flex flex-col justify-between font-sans p-2 sm:p-3">
                            {/* Top row — Bank logo */}
                            <div className="flex justify-end">
                                <BankLogo name={account.bank} variant={account.variant} />
                            </div>

                            {/* Center — Chip + Account number */}
                            <div className="flex flex-col gap-3 sm:gap-4 my-auto">
                                {/* EMV Chip (pure CSS) */}
                                <div className="w-10 h-7 sm:w-11 sm:h-8 bg-gradient-to-tr from-[#d4af37] to-[#fcf6ba] rounded-md relative overflow-hidden shadow-sm border border-[#b38728]/50">
                                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black/20" />
                                    <div className="absolute left-1/2 top-0 w-[1px] h-full bg-black/20" />
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 border border-black/20 rounded-full" />
                                </div>

                                {/* Account number + copy */}
                                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                                    <div className="font-mono text-base sm:text-lg md:text-xl lg:text-2xl tracking-wider sm:tracking-widest drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] text-[#FFFFF0] break-all leading-snug">
                                        {account.number}
                                    </div>
                                    <button
                                        onClick={() => handleCopy(account.number, index)}
                                        className="p-1 sm:p-1.5 bg-white/20 hover:bg-white/40 rounded-full transition-colors backdrop-blur-sm flex-shrink-0"
                                        title="Copy Number"
                                    >
                                        {copiedIndex === index ? (
                                            <Check className="w-3 h-3 text-white" />
                                        ) : (
                                            <Copy className="w-3 h-3 text-white" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Bottom row — Name + Mastercard icon */}
                            <div className="flex justify-between items-end mt-auto pb-0.5 sm:pb-1 md:pb-0">
                                <div className="uppercase tracking-wider sm:tracking-widest font-medium text-xs sm:text-sm md:text-base drop-shadow-md text-[#FFFFF0] leading-tight">
                                    {account.name}
                                </div>
                                <MastercardIcon />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}


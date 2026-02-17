"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";

export default function WeddingGift() {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const accounts = [
        {
            bank: "BCA",
            number: "1650329569",
            name: "Restu Fauzi",
            // Gold Gradient for BCA Paspor Gold
            gradient: "bg-gradient-to-br from-[#AA822A] via-[#E8C66C] to-[#976F1D]",
            logoSrc: "/image/bca-new.svg",
            // Increased size for BCA logo as requested
            logoClass: "h-5 md:h-7 w-auto brightness-0 invert shadow-sm",
            // Use white Mastercard logo for BCA as well
            mastercardImg: "/image/mastercard-white.svg",
            renderStyle: (
                <>
                    {/* Gold Texture Overlay */}
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,_transparent_20%,_#000_120%)]"></div>
                    <div className="absolute top-0 right-0 w-48 h-48 bg-white/20 rounded-full blur-3xl -mr-10 -mt-10 mix-blend-overlay"></div>
                </>
            )
        },
        {
            bank: "BRI",
            number: "355101021430535",
            name: "Tanya Apriska Putri",
            // Black Gradient for BritAma Black
            gradient: "bg-gradient-to-r from-[#1a1a1a] to-[#0a0a0a]",
            logoSrc: "/image/britama.png",
            // Decreased size for BritAma logo as requested
            logoClass: "h-5 md:h-7 w-auto brightness-0 invert",
            // Specific white Mastercard logo for dark background
            mastercardImg: "/image/mastercard-white.svg",
            renderStyle: (
                <>
                    {/* Shiny Lines Overlay */}
                    <div className="absolute top-0 right-0 w-[200%] h-full bg-gradient-to-b from-transparent via-white/5 to-transparent -skew-x-[30deg] translate-x-12"></div>
                </>
            )
        }
    ];

    const handleCopy = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="w-full max-w-4xl mx-auto px-4 mt-16 md:mt-24 mb-16">
            <div className="text-center space-y-4 mb-12">
                <h2 className="text-xs md:text-sm uppercase tracking-[0.2em] font-bold text-[#064E56]">Wedding Gift</h2>
                <div className="w-16 h-0.5 bg-[#064E56] mx-auto opacity-50"></div>
                <p className="text-sm md:text-base font-serif opacity-80 text-[#064E56] max-w-lg mx-auto">
                    Your blessing is a very meaningful gift to us. However, if giving is an expression of your love, you may give a cashless gift.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 justify-center items-center max-w-3xl mx-auto">
                {accounts.map((account, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        viewport={{ once: true }}
                        className={`relative w-full aspect-[1.586/1] rounded-2xl shadow-2xl overflow-hidden ${account.gradient} text-white p-6 group transition-transform hover:scale-[1.02]`}
                    >
                        {/* Specific Card Style Overlays */}
                        {account.renderStyle}

                        {/* Content */}
                        <div className="relative z-10 h-full flex flex-col justify-between font-sans">
                            {/* Header: Bank Logo */}
                            <div className="flex justify-end">
                                <img
                                    src={account.logoSrc}
                                    alt={account.bank}
                                    className={account.logoClass}
                                />
                            </div>

                            {/* Chip */}
                            <div className="flex flex-col gap-6 -mt-2">
                                <div className="w-11 h-8 bg-gradient-to-tr from-[#d4af37] to-[#fcf6ba] rounded-md relative overflow-hidden shadow-sm border border-[#b38728]/50">
                                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black/20"></div>
                                    <div className="absolute left-1/2 top-0 w-[1px] h-full bg-black/20"></div>
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border border-black/20 rounded-full"></div>
                                </div>

                                {/* Number */}
                                <div className="flex items-center gap-3">
                                    <div className="font-mono text-xl md:text-2xl tracking-widest drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] text-[#FFFFF0] py-1">
                                        {account.number}
                                    </div>
                                    <button
                                        onClick={() => handleCopy(account.number, index)}
                                        className="p-1.5 bg-white/20 hover:bg-white/40 rounded-full transition-colors backdrop-blur-sm"
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

                            {/* Footer: Name & Mastercard Logo */}
                            <div className="flex justify-between items-end mt-auto mb-4 md:mb-6">
                                <div className="uppercase tracking-widest font-medium text-sm md:text-base drop-shadow-md text-[#FFFFF0]">
                                    {account.name}
                                </div>
                                {/* Mastercard Logo (Bottom Right) */}
                                <img
                                    src={account.mastercardImg}
                                    alt="Mastercard"
                                    className="h-8 md:h-10 w-auto object-contain"
                                />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

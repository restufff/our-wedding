"use client";

import { motion } from "framer-motion";
import { MouseEventHandler, useEffect } from "react";

interface GreetingOverlayProps {
    onOpen: () => void;
    guestName?: string;
}

export default function GreetingOverlay({ onOpen, guestName }: GreetingOverlayProps) {
    // Lock body scroll when overlay is active
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 w-full h-[100dvh] z-50 flex flex-col items-center justify-center text-[#f7f3ee] overflow-hidden touch-none"
            initial={{ y: 0 }}
            exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
        >
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0 bg-center bg-no-repeat bg-[length:100%_100%]"
                style={{ backgroundImage: "url('/image/bg-blue.jpg')" }}
            />

            {/* No Overlay as requested */}

            <div className="relative z-10 text-center space-y-6 p-6">
                <div className="text-xs tracking-[0.2em] uppercase text-[#064E56] font-bold">
                    The Wedding Celebration of
                </div>

                <div className="flex flex-col items-center gap-2 py-4">
                    <h1 className="font-whispering text-5xl md:text-7xl text-[#064E56] leading-none font-bold pr-11">
                        Tanya
                    </h1>
                    <span className="font-whispering text-xl text-[#064E56] italic font-bold">
                        &
                    </span>
                    <h1 className="font-whispering text-5xl md:text-7xl text-[#064E56] leading-none font-bold pl-16">
                        Restu
                    </h1>
                </div>

                <div className="text-base text-[#064E56] font-bold">
                    Saturday, March 28, 2026
                </div>

                <div className="mt-8 mb-4">
                    {guestName ? (
                        <>
                            <div className="text-[0.65rem] text-[#064E56] uppercase tracking-widest mb-2 font-bold">
                                Special Invitation For
                            </div>
                            <div className="text-xl font-serif text-[#064E56] font-bold">
                                {guestName}
                            </div>
                        </>
                    ) : (
                        <div className="h-[4.5rem]" /> /* Placeholder to keep layout stable if needed */
                    )}
                </div>

                <button
                    onClick={onOpen}
                    className="px-8 py-3 bg-[#064E56] text-white text-xs uppercase tracking-widest font-medium rounded-full hover:bg-[#5FBae0] transition-colors shadow-lg shadow-[#064E56]/20"
                >
                    Open Invitation
                </button>
            </div>

            {/* <div className="absolute bottom-10 left-0 right-0 text-center text-xs text-[#064E56] uppercase tracking-widest font-bold text-outline">
                Special Invitation
            </div> */}
        </motion.div>
    );
}

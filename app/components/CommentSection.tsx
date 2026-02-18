"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, MessageCircle, CheckCircle, XCircle, HelpCircle } from "lucide-react";
import { getComments, submitComment, type Comment } from "@/app/actions/comments";

interface CommentSectionProps {
    guestName?: string;
}

// Helper to generate random positions/durations
const random = (min: number, max: number) => Math.random() * (max - min) + min;

export default function CommentSection({ guestName = "Guest" }: CommentSectionProps) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<"Hadir" | "Tidak Hadir" | "Mungkin">("Hadir");
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // Fetch comments on mount
    useEffect(() => {
        const fetchComments = async () => {
            const data = await getComments();
            setComments(data);
            setLoading(false);
        };
        fetchComments();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFeedback(null);

        const formData = new FormData();
        formData.append("name", guestName);
        formData.append("message", message);
        formData.append("status", status);

        const result = await submitComment(null, formData);

        if (result.success) {
            setFeedback({ type: 'success', text: "Ucapan berhasil dikirim!" });
            setMessage("");
            // Refresh comments (optimistic update would be better, but fetching is safe)
            const updated = await getComments();
            setComments(updated);
        } else {
            setFeedback({ type: 'error', text: result.message || "Gagal menyimpan ucapan" });
        }
        setIsSubmitting(false);

        // Clear feedback after 3 seconds
        setTimeout(() => setFeedback(null), 3000);
    };

    return (
        <div className="relative w-full py-12 md:py-20 px-4 overflow-hidden min-h-[600px] flex flex-col items-center">

            {/* Section Header */}
            <div className="relative z-20 text-center mb-10 space-y-2">
                <h2 className="text-xs md:text-sm uppercase tracking-[0.2em] font-bold text-[#064E56]">Ucapan & Doa</h2>
                <div className="w-16 h-0.5 bg-[#064E56] mx-auto opacity-50"></div>
                <h3 className="font-whispering text-3xl md:text-5xl text-[#064E56] mt-2">Kirim Ucapan</h3>
            </div>

            {/* Comment Form with Angel & Stitch Sitting on Top */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative z-20 w-full max-w-md bg-white/40 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6 md:p-8 mb-16 mt-20 md:mt-40"
            >
                {/* Angel & Stitch Decorations - Sitting on top */}
                <div className="absolute -top-31 md:-top-40 left-0 right-0 flex justify-center items-end gap-4 pointer-events-none z-10">
                    <motion.img
                        src="/image/angel.png"
                        alt="Angel Decoration"
                        className="w-24 md:w-32 drop-shadow-lg transform translate-y-2 origin-bottom"
                        animate={{ rotate: [-3, 3, -3] }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    <motion.img
                        src="/image/stitch.png"
                        alt="Stitch Decoration"
                        className="w-24 md:w-32 drop-shadow-lg transform translate-y-2 origin-bottom"
                        animate={{ rotate: [3, -3, 3] }}
                        transition={{
                            duration: 3.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.2 // Slight delay for natural feel
                        }}
                    />
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name Field (Locked) */}
                    <div className="space-y-1">
                        <label className="text-xs uppercase tracking-widest text-[#064E56]/70 font-bold ml-1">Nama</label>
                        <div className="flex items-center gap-3 bg-white/30 rounded-lg px-4 py-3 border border-[#064E56]/5 cursor-not-allowed opacity-80">
                            <User size={18} className="text-[#064E56]" />
                            <span className="font-serif font-bold text-[#064E56]">{guestName}</span>
                        </div>
                    </div>

                    {/* RSVP Status */}
                    <div className="space-y-1">
                        <label className="text-xs uppercase tracking-widest text-[#064E56]/70 font-bold ml-1">Kehadiran</label>
                        <div className="grid grid-cols-3 gap-2">
                            {(["Hadir", "Mungkin", "Tidak Hadir"] as const).map((option) => (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => setStatus(option)}
                                    className={`relative py-2 px-1 rounded-lg text-xs font-bold transition-all border ${status === option
                                        ? "bg-[#064E56] text-white border-[#064E56]"
                                        : "bg-white/30 text-[#064E56] border-[#064E56]/10 hover:bg-[#064E56]/5"
                                        }`}
                                >
                                    {option}
                                    {status === option && (
                                        <motion.div
                                            layoutId="status-indicator"
                                            className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center"
                                        >
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#064E56]" />
                                        </motion.div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Message Area */}
                    <div className="space-y-1">
                        <label className="text-xs uppercase tracking-widest text-[#064E56]/70 font-bold ml-1">Pesan</label>
                        <div className="relative">
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Tulis ucapan dan doa..."
                                className="w-full bg-white/30 border border-[#064E56]/10 rounded-lg p-4 text-sm text-[#064E56] placeholder:text-[#064E56]/40 focus:outline-none focus:ring-2 focus:ring-[#064E56]/20 min-h-[120px] resize-none backdrop-blur-sm"
                                required
                            />
                            <MessageCircle className="absolute top-4 right-4 text-[#064E56]/20" size={20} />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#064E56] text-white py-3 rounded-lg font-bold tracking-widest text-xs uppercase hover:bg-[#064E56]/90 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-[#064E56]/20"
                    >
                        {isSubmitting ? (
                            <span className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                Kirim Ucapan <Send size={14} />
                            </>
                        )}
                    </button>

                    {/* Feedback Message */}
                    <AnimatePresence>
                        {feedback && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className={`text-center text-xs font-bold p-2 rounded ${feedback.type === 'success' ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'
                                    }`}
                            >
                                {feedback.text}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </form>
            </motion.div>

            {/* Dedicated Marquee Section */}
            <div className="relative z-10 w-full max-w-4xl mx-auto mt-8">
                <div className="text-center mb-6 space-y-2">
                    <h3 className="font-whispering text-2xl md:text-3xl text-[#064E56]">Doa & Ucapan Terbaru</h3>
                    <div className="w-12 h-[1px] bg-[#064E56] mx-auto opacity-30"></div>
                </div>

                <div className="bg-white/30 backdrop-blur-md rounded-2xl border border-white/40 p-1 md:p-2 h-[400px] overflow-hidden relative shadow-inner">
                    {/* Mask gradients */}
                    <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-[#EBE2DC]/50 to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#EBE2DC]/50 to-transparent z-10 pointer-events-none"></div>

                    <div className="flex justify-between px-2 md:px-4 h-full gap-2 md:gap-4">
                        {/* Left Column (Scrolling Up) */}
                        <div className="w-1/2 h-full relative overflow-hidden">
                            <MarqueeColumn comments={comments.slice(0, Math.ceil(comments.length / 2))} direction="up" duration={40} />
                        </div>

                        {/* Right Column (Scrolling Down) */}
                        <div className="w-1/2 h-full relative overflow-hidden">
                            <MarqueeColumn comments={comments.slice(Math.ceil(comments.length / 2))} direction="down" duration={50} />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

function MarqueeColumn({ comments, direction, duration }: { comments: Comment[], direction: "up" | "down", duration: number }) {
    // Determine Y values based on direction
    const yStart = direction === "up" ? "0%" : "-50%";
    const yEnd = direction === "up" ? "-50%" : "0%";

    // 1. Ensure minimal length for scrolling
    // If we have very few comments, duplicates might not fill the height.
    // Let's duplicate enough times.
    let displayComments = [...comments];
    while (displayComments.length < 10 && displayComments.length > 0) {
        displayComments = [...displayComments, ...comments];
    }
    // Always double at the end to ensure the loop set exists
    displayComments = [...displayComments, ...displayComments];

    if (displayComments.length === 0) return null;

    // Adjust duration based on length to keep speed consistent roughly?
    // Or just use a longer base duration.
    // Normalized duration: (items count) * (seconds per item)
    const normalizedDuration = displayComments.length * 3;

    return (
        <motion.div
            className="absolute left-0 right-0 w-full space-y-6 will-change-transform"
            initial={{ y: yStart }}
            animate={{ y: yEnd }}
            transition={{
                repeat: Infinity,
                ease: "linear",
                duration: normalizedDuration, // Dynamic duration based on content length
            }}
        >
            {displayComments.map((comment, i) => (
                <div key={`${comment.id}-${i}`} className="px-2">
                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl border border-white/30 shadow-none text-xs text-[#064E56]">
                        <div className="flex justify-between items-start mb-2 gap-2 border-b border-[#064E56]/10 pb-2">
                            <span className="font-bold flex-1 break-words leading-tight">{comment.name}</span>
                            <span className={`shrink-0 text-[8px] md:text-[9px] uppercase px-2 py-1 rounded-full font-bold opacity-80 ${comment.status === 'Hadir' ? 'text-green-800 bg-green-100/60' : comment.status === 'Tidak Hadir' ? 'text-red-800 bg-red-100/60' : 'text-amber-800 bg-amber-100/60'}`}>
                                {comment.status}
                            </span>
                        </div>
                        <p className="opacity-80 leading-relaxed font-serif break-words">
                            {comment.message}
                        </p>
                    </div>
                </div>
            ))}
        </motion.div>
    );
}

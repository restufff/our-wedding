"use client";

import { useEffect, useState } from "react";

export default function CalendarCountdown() {
    // Target Date: March 28, 2026 08:00:00 (Akad)
    const targetDate = new Date("2026-03-28T08:00:00").getTime();

    // Time Left State
    const [timeLeft, setTimeLeft] = useState<{
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                clearInterval(interval);
                return;
            }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000),
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    // Calendar Generation
    // March 1, 2026 is a Sunday.
    const daysInMonth = 31;
    const startDay = 0; // 0=Sun, 1=Mon...

    const renderCalendarDays = () => {
        const days = [];

        // Empty cells for days before the 1st
        for (let i = 0; i < startDay; i++) {
            days.push(<div key={`empty-${i}`} className="p-2"></div>);
        }

        // Days of the month
        for (let i = 1; i <= daysInMonth; i++) {
            const isAkad = i === 28;
            const isResepsi = i === 29;
            const isWeddingDay = isAkad || isResepsi;

            days.push(
                <div key={i} className="flex items-center justify-center p-2 relative group cursor-default">
                    {isWeddingDay && (
                        <>
                            <div className="absolute inset-0 bg-[#064E56]/10 rounded-full animate-ping opacity-75"></div>
                            <div className="absolute inset-0 bg-[#064E56] rounded-full shadow-lg scale-90"></div>
                        </>
                    )}
                    <span
                        className={`relative z-10 w-8 h-8 flex items-center justify-center rounded-full text-sm font-serif transition-colors ${isWeddingDay
                            ? "text-[#EBE2DC] font-bold"
                            : "text-[#064E56]/70 group-hover:bg-[#064E56]/5"
                            }`}
                    >
                        {i}
                    </span>
                </div>
            );
        }
        return days;
    };

    return (
        <div className="w-full max-w-[20rem] md:max-w-sm mx-auto px-4 md:px-0">
            {/* Calendar Card */}
            <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-[2rem] p-6 md:p-8 shadow-2xl relative overflow-hidden">
                {/* Decorative Blur */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#064E56]/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#064E56]/5 rounded-full blur-3xl"></div>

                {/* Header */}
                <div className="text-center mb-6 md:mb-8 relative z-10">
                    <h3 className="font-whispering text-3xl md:text-4xl text-[#064E56] mb-1">March</h3>
                    <div className="flex items-center justify-center gap-3">
                        <div className="h-[1px] w-6 md:w-8 bg-[#064E56]/30"></div>
                        <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] opacity-60 font-bold">2026</p>
                        <div className="h-[1px] w-6 md:w-8 bg-[#064E56]/30"></div>
                    </div>
                </div>

                {/* Days Header */}
                <div className="grid grid-cols-7 text-center mb-2 md:mb-4">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                        <div key={`${day}-${index}`} className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest opacity-40 text-[#064E56]">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 text-center mb-6 md:mb-8 gap-y-1">
                    {renderCalendarDays()}
                </div>

                {/* Divider */}
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#064E56]/20 to-transparent mb-6 md:mb-8"></div>

                {/* Countdown Timer */}
                <div className="grid grid-cols-4 gap-1 md:gap-2 text-center text-[#064E56]">
                    <div className="flex flex-col items-center">
                        <span className="text-xl md:text-2xl font-serif font-bold tabular-nums leading-none">
                            {timeLeft.days}
                        </span>
                        <span className="text-[8px] md:text-[9px] uppercase tracking-widest opacity-50 mt-1">Days</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-xl md:text-2xl font-serif font-bold tabular-nums leading-none">
                            {timeLeft.hours}
                        </span>
                        <span className="text-[8px] md:text-[9px] uppercase tracking-widest opacity-50 mt-1">Hours</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-xl md:text-2xl font-serif font-bold tabular-nums leading-none">
                            {timeLeft.minutes}
                        </span>
                        <span className="text-[8px] md:text-[9px] uppercase tracking-widest opacity-50 mt-1">Mins</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-xl md:text-2xl font-serif font-bold tabular-nums leading-none">
                            {timeLeft.seconds}
                        </span>
                        <span className="text-[8px] md:text-[9px] uppercase tracking-widest opacity-50 mt-1">Secs</span>
                    </div>
                </div>

                {/* Add to Calendar Button */}
                <div className="mt-8 text-center">
                    <button
                        onClick={() => {
                            const eventTitle = "The Wedding of Restu & Tanya";
                            // For Google Calendar Location, use the map link as requested
                            const eventLocation = "https://maps.app.goo.gl/qgYMYWfNiK8ZjiLC9?g_st=ac";
                            // Use actual newlines for the description string
                            const eventDescription = `Akad: Sabtu, 28 Maret 2026 (08:00 WIB)
Resepsi: Minggu, 29 Maret 2026 (09:00 WIB)

Lokasi: Kediaman Mempelai Wanita, Bengkulu, Seluma

Kami mengundang Anda untuk merayakan pernikahan kami.`;

                            const startDate = "20260328T080000"; // YYYYMMDDTHHMMSS
                            const endDate = "20260329T130000"; // Until end of resepsi

                            // Check if iOS (iPhone/iPad)
                            const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

                            if (isIOS) {
                                // .ics file for iOS/Apple Calendar
                                // ICS format requires literal \n for newlines (escaped), so we replace real newlines with \\n
                                const icsDescription = eventDescription.replace(/\n/g, '\\n');
                                const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${eventTitle}
DTSTART:${startDate}
DTEND:${endDate}
LOCATION:${eventLocation}
DESCRIPTION:${icsDescription}
END:VEVENT
END:VCALENDAR`;
                                const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
                                const link = document.createElement("a");
                                link.href = window.URL.createObjectURL(blob);
                                link.setAttribute("download", "wedding-invitation.ics");
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                            } else {
                                // Google Calendar Link for Android/Desktop
                                // encodeURIComponent handles real newlines correctly (\n -> %0A)
                                const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(eventDescription)}&location=${encodeURIComponent(eventLocation)}&sf=true&output=xml`;
                                window.open(googleUrl, '_blank');
                            }
                        }}
                        className="px-6 py-3 bg-[#064E56] text-[#EBE2DC] rounded-full text-xs uppercase tracking-widest font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2 mx-auto"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /><path d="M8 14h.01" /><path d="M12 14h.01" /><path d="M16 14h.01" /><path d="M8 18h.01" /><path d="M12 18h.01" /><path d="M16 18h.01" /></svg>
                        Save the date
                    </button>
                </div>
            </div>
        </div>
    );
}

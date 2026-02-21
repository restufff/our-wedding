import InvitationPage from "@/app/components/InvitationPage";
import { notFound } from "next/navigation";
import fs from "fs/promises";
import path from "path";

import { Metadata } from "next";

interface PageProps {
    params: Promise<{ guestName: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { guestName } = await params;
    const decodedName = decodeURIComponent(guestName).replace(/-/g, " ");

    return {
        title: `Undangan Pernikahan Restu & Tanya — Untuk ${decodedName} 💌`,
        description: `${decodedName}, kami dengan penuh kebahagiaan mengundang Anda untuk hadir dan berbagi kebahagiaan di hari pernikahan kami. Sabtu, 28 Maret 2026 · Bengkulu, Seluma.`,
        openGraph: {
            title: `Undangan Pernikahan Restu & Tanya ✨`,
            description: `${decodedName}, kami mengundang Anda untuk hadir dan menjadi bagian dari hari spesial kami. Sabtu, 28 Maret 2026 · Bengkulu, Seluma.`,
            url: `https://tr-invitation.my.id/${guestName}`,
            siteName: "Undangan Pernikahan Restu & Tanya",
            images: [
                {
                    url: "/image/metatag.png",
                    width: 1200,
                    height: 630,
                    alt: "Undangan Pernikahan Restu & Tanya — 28 Maret 2026",
                    type: "image/png",
                },
            ],
            locale: "id_ID",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `Undangan Pernikahan Restu & Tanya ✨`,
            description: `${decodedName}, kami mengundang Anda untuk hadir dan menjadi bagian dari hari spesial kami. Sabtu, 28 Maret 2026 · Bengkulu, Seluma.`,
            images: ["/image/metatag.png"],
        },
    };
}

export default async function Page({ params }: PageProps) {
    const { guestName } = await params;
    const decodedName = decodeURIComponent(guestName).replace(/-/g, " ");

    // Validation: Check if guest is in whitelist
    try {
        const guestsPath = path.join(process.cwd(), "data", "guests.json");
        const fileContent = await fs.readFile(guestsPath, "utf-8");
        const allowedGuests: string[] = JSON.parse(fileContent);

        // Case-insensitive check or exact check? 
        // User asked for: "Restu", "Fauzi" -> OK. "Tanya" -> Not Found.
        // Let's do a case-insensitive match to be user-friendly, but strict on content.
        const isValid = allowedGuests.some(
            (guest) => guest.toLowerCase() === decodedName.toLowerCase()
        );

        if (!isValid) {
            notFound();
        }
    } catch (error) {
        console.error("Error reading guest list:", error);
        // If error (e.g. file missing), maybe allow or deny? Secure default is deny/notFound.
        notFound();
    }

    return <InvitationPage guestName={decodedName} />;
}

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
        title: `The Wedding of Restu & Tanya - Spesial Untuk ${decodedName}`,
        description: "We invite you to share in our joy at our wedding ceremony.",
        openGraph: {
            title: `The Wedding of Restu & Tanya - Spesial Untuk ${decodedName}`,
            description: "We invite you to share in our joy at our wedding ceremony.",
            images: [
                {
                    url: "/image/metatag.png",
                    width: 1200,
                    height: 630,
                    alt: "Restu & Tanya Wedding Invitation",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: `The Wedding of Restu & Tanya - Spesial Untuk ${decodedName}`,
            description: "We invite you to share in our joy at our wedding ceremony.",
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

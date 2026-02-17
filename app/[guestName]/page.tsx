import InvitationPage from "@/app/components/InvitationPage";
import { notFound } from "next/navigation";
import fs from "fs/promises";
import path from "path";

interface PageProps {
    params: Promise<{ guestName: string }>;
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

import InvitationPage from "@/app/components/InvitationPage";

interface PageProps {
    params: Promise<{ guestName: string }>;
}

export default async function Page({ params }: PageProps) {
    const { guestName } = await params;
    const decodedName = decodeURIComponent(guestName).replace(/-/g, " ");
    return <InvitationPage guestName={decodedName} />;
}

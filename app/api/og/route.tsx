import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const guestParam = searchParams.get('guest');
        const guestName = guestParam ? decodeURIComponent(guestParam).replace(/-/g, " ") : 'Bapak/Ibu/Saudara/i';

        // Load image buffer (metatag.jpg from public)
        const imageUrl = new URL('/image/metatag.jpg', request.url).toString();
        const imageRes = await fetch(imageUrl);
        const imageData = await imageRes.arrayBuffer();

        // Construct base64 to avoid some Satori fetch issues
        const base64Image = `data:image/jpeg;base64,${Buffer.from(imageData).toString('base64')}`;

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        backgroundImage: `url(${base64Image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        fontFamily: 'serif',
                    }}
                >
                    {/* Gradient Overlay for Text Visibility */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '40%',
                            width: '100%',
                            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
                            justifyContent: 'flex-end',
                            padding: '40px 60px',
                            color: 'white',
                        }}
                    >
                        <span style={{ fontSize: 32, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.8, marginBottom: 10, fontFamily: 'sans-serif' }}>
                            Spesial Untuk
                        </span>
                        <span style={{ fontSize: 72, fontWeight: 'bold' }}>
                            {guestName}
                        </span>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        );
    } catch (e: any) {
        console.error(e);
        return new Response(`Failed to generate image`, { status: 500 });
    }
}

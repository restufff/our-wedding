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
                        justifyContent: 'space-between',
                        backgroundColor: '#ffffff',
                        fontFamily: 'sans-serif',
                        padding: 0,
                        margin: 0,
                    }}
                >
                    {/* Main Body */}
                    <div style={{ display: 'flex', flexDirection: 'column', padding: '60px 80px', flex: 1, height: '100%' }}>

                        {/* Top row: Name and the image on the right */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%', flex: 1 }}>

                            <div style={{ display: 'flex', flexDirection: 'column', width: '65%', paddingTop: 20 }}>
                                {/* Header like Github Repo Name */}
                                <div style={{ display: 'flex', fontSize: 50, flexWrap: 'wrap', lineHeight: 1.2, alignItems: 'center' }}>
                                    <span style={{ color: '#656d76', marginRight: 15, fontWeight: 400 }}>tanya-restu</span>
                                    <span style={{ color: '#656d76', marginRight: 15, fontWeight: 400 }}>/</span>
                                    <span style={{ color: '#0969da', fontWeight: 600 }}>undangan_pernikahan</span>
                                </div>

                                {/* Description below it */}
                                <div style={{ fontSize: 26, color: '#656d76', marginTop: 40, lineHeight: 1.5 }}>
                                    End-to-end wedding invitation covering akad, reception, and blessing layers using digital framework.
                                </div>

                                <div style={{ fontSize: 32, color: '#656d76', marginTop: 30, lineHeight: 1.5, display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ fontSize: 24 }}>Spesial untuk:</span>
                                    <span style={{ fontWeight: 600, color: '#24292f', fontSize: 38, marginTop: 10 }}>{guestName}</span>
                                </div>
                            </div>

                            {/* Avatar / Side Image matching github icon size approx */}
                            <div style={{
                                display: 'flex',
                                backgroundColor: '#f6f8fa',
                                border: '1px solid #d0d7de',
                                borderRadius: 24,
                                width: 260,
                                height: 260,
                                overflow: 'hidden',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 20
                            }}>
                                <img
                                    src={base64Image}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                        </div>

                        {/* Footer row like Contributors, Issues, Stars, Forks */}
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: 'auto', paddingTop: 40, width: '100%' }}>
                            <div style={{ display: 'flex', alignItems: 'center', color: '#656d76', fontSize: 24, marginRight: 60 }}>
                                {/* Generic user/contributor icon */}
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 10 }}><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="20" y1="8" x2="20" y2="14" /><line x1="23" y1="11" x2="17" y2="11" /></svg>
                                <span style={{ fontWeight: 600, marginRight: 8, color: '#24292f' }}>28</span> Mar
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', color: '#656d76', fontSize: 24, marginRight: 60 }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 10 }}><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>
                                <span style={{ fontWeight: 600, marginRight: 8, color: '#24292f' }}>Bengkulu,</span> Seluma
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', color: '#656d76', fontSize: 24, marginLeft: 'auto' }}>
                                {/* Github Logo style corner branding */}
                                <svg height="32" viewBox="0 0 16 16" width="32" fill="#656d76">
                                    <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Gradient / Colored strips matching Github */}
                    <div style={{ display: 'flex', height: 16, width: '100%', borderTop: '1px solid #d0d7de' }}>
                        <div style={{ backgroundColor: '#e34c26', width: '25%', height: '100%' }}></div>
                        <div style={{ backgroundColor: '#563d7c', width: '25%', height: '100%' }}></div>
                        <div style={{ backgroundColor: '#f1e05a', width: '25%', height: '100%' }}></div>
                        <div style={{ backgroundColor: '#2b7489', width: '25%', height: '100%' }}></div>
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

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
        {/* <nav></nav> */}
        <main className="w-full h-full p-8">
            {children}
        </main>
        </>
        
    );
}
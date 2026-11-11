import { Providers } from "@/lib/context/Providers";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" >
      <body className="font-sans" suppressHydrationWarning>
      <Providers>
        {children}
      </Providers>
      </body>
    </html>
  );
}

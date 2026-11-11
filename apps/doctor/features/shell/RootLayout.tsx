import Provider from "@/components/provider/Provider";
import { ToastContainer } from 'react-toastify'


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-inter`}>
        <Provider>
        {children}
        <ToastContainer />
        </Provider>
      </body>
    </html>
  );
}

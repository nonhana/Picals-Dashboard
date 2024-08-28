import ThemeRegistry from '@/ui/theme/ThemeRegistry';
import { Toaster } from '@/ui/Toast';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { Inter } from 'next/font/google';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Picals Dashboard',
  description: "Picals' Backend management system",
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cn">
      <body className={`${inter.className} antialiased`}>
        <Toaster />
        <ThemeRegistry>
          <SessionProvider>{children}</SessionProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}

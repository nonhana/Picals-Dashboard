import '@/styles/global.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ThemeRegistry from './ThemeRegistry';

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
        <ThemeRegistry options={{ key: 'joy' }}>{children}</ThemeRegistry>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Baloo_2, Geist } from 'next/font/google';
import './globals.css';
import Providers from './shared/providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});
const baloo2 = Baloo_2({
  variable: '--font-baloo2',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Mavi Gök Airlines',
  description: 'Mavi Gök Airlines Project',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={`${geistSans.variable} ${baloo2.variable} h-full antialiased`}>
      <Providers>
        <body className='min-h-full flex flex-col'>{children}</body>
      </Providers>
    </html>
  );
}

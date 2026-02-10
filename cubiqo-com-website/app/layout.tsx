import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CubiQo - Intelligence, Reimagined | Multi-Model AI Platform',
  description: 'Private, secure, multi-model AI assistant. Routes to optimal models—Claude, OpenAI, specialized systems. Zero data retention. Your intelligence, your rules.',
  keywords: ['multi-model AI', 'private AI assistant', 'secure AI platform', 'cooperative AI', 'BYO AI model', 'zero data retention', 'AI privacy', 'intelligent routing'],
  openGraph: {
    title: 'CubiQo - Intelligence, Reimagined',
    description: 'The Cooperative V.A. The World Needs. Private by design.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CubiQo - Intelligence, Reimagined',
    description: 'Private, secure, multi-model AI assistant. Zero data retention.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white`}>
        {children}
      </body>
    </html>
  );
}
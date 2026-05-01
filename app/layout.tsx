import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'API Architect',
  description: 'API testing dashboard',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <body className="bg-background text-on-background min-h-screen font-sans selection:bg-primary/30" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

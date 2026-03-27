import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AdminLayout from '@/components/AdminLayout';

const inter = Inter({ subsets: ['latin', 'vietnamese'] });

export const metadata: Metadata = {
  title: 'Nexus CRM - Quản trị',
  description: 'Precision Architect',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="light" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.className} bg-surface text-on-surface selection:bg-primary-container selection:text-on-primary-container antialiased`} style={{ margin: 0, padding: 0 }} suppressHydrationWarning>
        <AdminLayout>{children}</AdminLayout>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
const geist = Geist({ variable: '--font-geist', subsets: ['latin'] });
const mono = Geist_Mono({ variable: '--font-mono', subsets: ['latin'] });
export const metadata: Metadata = { title: 'Analytical Innovations — Custom Software & Intelligent Systems', description: 'Purpose-built web applications, internal tools, data systems, automation, and technical consulting.', openGraph: { title: 'Analytical Innovations', description: 'Custom software. Intelligent systems. Built for how you work.' } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body className={`${geist.variable} ${mono.variable}`}>{children}</body></html>; }

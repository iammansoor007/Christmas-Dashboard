import { Montserrat } from 'next/font/google';
import './globals.css';
import ClientLayout from './ClientLayout';

export const metadata = {
  title: 'Christmas Lighting',
  description: 'Professional lighting services',
  openGraph: {
    title: 'Christmas Lighting',
    description: 'Professional lighting services',
    url: 'https://christmaswebsite-kappa.vercel.app', // your live site URL
    images: [
      {
        url: 'https://christmaswebsite-kappa.vercel.app/images/mainlogo.jpg', // direct URL of logo
        width: 1200,
        height: 630,
        alt: 'Christmas Lighting',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Christmas Lighting',
    description: 'Professional lighting services',
    images: ['https://christmaswebsite-kappa.vercel.app/images/mainlogo.jpg'],
  },
  // Optional: LinkedIn will use openGraph automatically
};

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} font-sans`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
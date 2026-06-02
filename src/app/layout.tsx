import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import { QuoteProvider } from '@/components/QuoteContext';
import ChatBot from '@/components/ChatBot';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'COINBACA - Concretera Industrial Barinas',
  description: 'Catálogo de productos de concreto y agropecuarios.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.variable} font-sans min-h-screen flex flex-col bg-gray-50`}>
        <QuoteProvider>
          <Navbar />
          <ChatBot />
          <main className="flex-1 flex flex-col">
          {children}
        </main>
        
        {/* Simple Footer */}
        <footer className="bg-brand-secondary text-white py-8 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="font-extrabold text-xl tracking-tight">COIN<span className="text-brand-primary">BACA</span></h3>
              <p className="text-gray-400 text-sm mt-1">Concretera Industrial Barinas, C.A.</p>
            </div>
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} Todos los derechos reservados.
            </div>
          </div>
        </footer>
        </QuoteProvider>
      </body>
    </html>
  );
}

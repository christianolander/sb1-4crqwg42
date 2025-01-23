import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/theme-provider';
import { Sidebar } from '@/components/sidebar';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Workly Demo',
  description: 'Workly Notification and Activity Center',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "antialiased")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1">{children}</div>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

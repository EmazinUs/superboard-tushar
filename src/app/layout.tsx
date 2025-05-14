import type { Metadata } from 'next';
import '../app/styles/globals.scss';

export const metadata: Metadata = {
  title: 'SuperBoard | Harshvardhan',
  description: 'This application will display campaign information',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

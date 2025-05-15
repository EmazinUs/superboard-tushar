import type { Metadata } from 'next';
import '../app/styles/globals.scss';
import { CampaignProvider } from './context/campaignContext';

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
      <body suppressHydrationWarning>
        <CampaignProvider>{children}</CampaignProvider>
      </body>
    </html>
  );
}

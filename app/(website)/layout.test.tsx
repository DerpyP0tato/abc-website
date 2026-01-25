import React from 'react';
import WebsiteLayout from './layout';
import { client } from '@/sanity/lib/client';

// Mock the Sanity client
jest.mock('@/sanity/lib/client', () => ({
  client: {
    fetch: jest.fn(),
  },
}));

// Mock queries
jest.mock('@/sanity/lib/queries', () => ({
  SETTINGS_QUERY: 'SETTINGS_QUERY',
}));

// Mock next/font/google
jest.mock('next/font/google', () => ({
  Geist: jest.fn().mockReturnValue({ className: 'geist-class' }),
  Geist_Mono: jest.fn().mockReturnValue({ className: 'geist-mono-class' }),
}));

// Mock next/script
jest.mock('next/script', () => {
  return function Script() { return null; };
});

// Mock @vercel/analytics/next
jest.mock('@vercel/analytics/next', () => ({
  Analytics: () => null,
}));

// Mock components
jest.mock('@/components/navbar', () => ({ Navbar: () => null }));
jest.mock('@/components/footer', () => ({ Footer: () => null }));
jest.mock('@/components/page-wrapper', () => ({ PageWrapper: ({ children }: any) => <div>{children}</div> }));
jest.mock('@/components/background-blobs', () => ({ BackgroundBlobs: () => null }));
jest.mock('@/components/scroll-to-top', () => ({ ScrollToTop: () => null }));
jest.mock('@/components/preloader', () => ({ Preloader: ({ children }: any) => <div>{children}</div> }));
jest.mock('@/components/theme-provider', () => ({ ThemeProvider: ({ children }: any) => <div>{children}</div> }));

describe('WebsiteLayout', () => {
  it('should fetch settings with revalidate: 60', async () => {
    // Setup mock return value
    (client.fetch as jest.Mock).mockResolvedValue({ enableDarkMode: true });

    // Call the layout component (it's an async server component)
    await WebsiteLayout({ children: <div>Test</div> });

    // Verify client.fetch was called with expected arguments
    expect(client.fetch).toHaveBeenCalledWith(
      'SETTINGS_QUERY',
      {},
      { next: { revalidate: 60 } }
    );
  });
});

'use client';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BRAND } from '@/theme/brand';

const theme = createTheme({
  shape: { borderRadius: 12 },
  palette: {
    mode: 'light',
    background: { default: BRAND.grayBg, paper: '#fff' },
    text: { primary: BRAND.text.main, secondary: BRAND.text.sub },
  },
  typography: {
    fontFamily: `system-ui, -apple-system, Segoe UI, Roboto, "Noto Sans Thai", sans-serif`,
    h5: { fontWeight: 700 },
  },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <style jsx global>{`
        :root { --gap: 16px; --gap-lg: 24px; --gap-xl: 32px; }
        body { background: ${BRAND.grayBg}; }
        .container { max-width: 1160px; margin: 0 auto; padding: var(--gap); }
      `}</style>
      {children}
    </ThemeProvider>
  );
}

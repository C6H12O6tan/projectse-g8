'use client';

import { Experimental_CssVarsProvider as CssVarsProvider, extendTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Prompt } from 'next/font/google';

const prompt = Prompt({ subsets: ['thai'], weight: ['400','500','700'] });

// TODO: ใส่ค่าสีจากแบบให้เป๊ะ
const BRAND = {
  primary: '#145CC1',   // ตัวอย่าง: สีหลัก
  secondary: '#00C2A8', // ตัวอย่าง: สีรอง
  grayBg: '#F7F8FA',
  textMain: '#111827',
  textSub: '#6B7280',
  radius: 12
};

const theme = extendTheme({
  shape: { borderRadius: BRAND.radius },
  colorSchemes: {
    light: {
      palette: {
        primary: { main: BRAND.primary },
        secondary: { main: BRAND.secondary },
        text: { primary: BRAND.textMain, secondary: BRAND.textSub },
        background: { default: BRAND.grayBg, paper: '#FFFFFF' },
      }
    }
  },
  typography: {
    fontFamily: `${prompt.style.fontFamily}, system-ui, -apple-system, Segoe UI, Roboto, "Noto Sans Thai", sans-serif`,
    h3: { fontWeight: 700, letterSpacing: 0 },
    h5: { fontWeight: 700 }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: BRAND.radius, textTransform: 'none', fontWeight: 600 }
      }
    },
    MuiCard: {
      styleOverrides: { root: { borderRadius: BRAND.radius } }
    },
    MuiTextField: {
      defaultProps: { size: 'medium' }
    }
  }
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CssVarsProvider theme={theme} defaultMode="light">
      <CssBaseline />
      <style jsx global>{`
        :root { --gap: 16px; --gap-lg: 24px; --gap-xl: 32px; }
        body { background: ${BRAND.grayBg}; }
        .container { max-width: 1160px; margin: 0 auto; padding: var(--gap); }
        .topnav { position: sticky; top: 0; z-index: 50; background: rgba(255,255,255,.9); backdrop-filter: blur(8px); border-bottom: 1px solid #eee; }
        .grid-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: var(--gap-lg); }
        .thumb { display:flex; align-items:center; justify-content:center; height:180px; background:#fff; border:1px solid #eee; border-radius:${BRAND.radius}px; overflow:hidden; }
      `}</style>
      <div className={prompt.className}>{children}</div>
    </CssVarsProvider>
  );
}

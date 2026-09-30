export const metadata = { title: 'Dashboard Musica Clasica' };

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body style={{ fontFamily: 'system-ui, sans-serif', margin: 0, background: '#0f1222', color: '#eef' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>{children}</div>
      </body>
    </html>
  );
}

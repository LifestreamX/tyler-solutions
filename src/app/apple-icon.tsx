import { ImageResponse } from 'next/og';

export const size = {
  width: 180,
  height: 180,
};

export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        alignItems: 'center',
        background:
          'radial-gradient(circle at top right, rgba(59,130,246,0.32), transparent 36%), linear-gradient(135deg, #020617 0%, #0f172a 100%)',
        color: '#f8fafc',
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        position: 'relative',
        width: '100%',
      }}
    >
      <div
        style={{
          background: 'rgba(15,23,42,0.72)',
          border: '6px solid rgba(59,130,246,0.28)',
          borderRadius: 42,
          inset: 16,
          position: 'absolute',
        }}
      />
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          position: 'relative',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            gap: 8,
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              background: '#60a5fa',
              borderRadius: 9999,
              height: 8,
              width: 8,
            }}
          />
          <div
            style={{
              color: '#93c5fd',
              display: 'flex',
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: '0.18em',
              paddingLeft: 2,
              textTransform: 'uppercase',
            }}
          >
            Tyler Allen
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 76,
            fontWeight: 800,
            justifyContent: 'center',
            letterSpacing: '-0.1em',
            lineHeight: 0.82,
          }}
        >
          TA
        </div>
      </div>
    </div>,
    size,
  );
}

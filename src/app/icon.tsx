import { ImageResponse } from 'next/og';

export const size = {
  width: 512,
  height: 512,
};

export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        alignItems: 'center',
        background:
          'radial-gradient(circle at top right, rgba(59,130,246,0.35), transparent 34%), linear-gradient(135deg, #020617 0%, #0f172a 100%)',
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
          background: 'rgba(15,23,42,0.68)',
          border: '16px solid rgba(59,130,246,0.28)',
          borderRadius: 128,
          inset: 48,
          position: 'absolute',
        }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 22,
          justifyContent: 'center',
          position: 'relative',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            gap: 16,
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              background: '#60a5fa',
              borderRadius: 9999,
              height: 18,
              width: 18,
            }}
          />
          <div
            style={{
              color: '#93c5fd',
              display: 'flex',
              fontSize: 34,
              fontWeight: 700,
              letterSpacing: '0.24em',
              paddingLeft: 10,
              textTransform: 'uppercase',
            }}
          >
            Tyler Allen
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 184,
            fontWeight: 800,
            justifyContent: 'center',
            letterSpacing: '-0.12em',
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

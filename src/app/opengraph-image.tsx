import { ImageResponse } from 'next/og';

export const alt =
  'Tyler Allen websites, store improvements, and tools for teams';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: 'stretch',
        background: '#020617',
        color: '#f8fafc',
        display: 'flex',
        height: '100%',
        position: 'relative',
        width: '100%',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at top right, rgba(59,130,246,0.28), transparent 32%), radial-gradient(circle at bottom left, rgba(96,165,250,0.18), transparent 28%)',
        }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '56px',
          position: 'relative',
          width: '100%',
        }}
      >
        <div
          style={{
            alignItems: 'center',
            color: '#93c5fd',
            display: 'flex',
            fontSize: 22,
            gap: 16,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
          }}
        >
          <div
            style={{
              background: '#3b82f6',
              borderRadius: 9999,
              height: 12,
              width: 12,
            }}
          />
          Websites and Team Tools
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            maxWidth: 920,
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 74,
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1.02,
            }}
          >
            Tyler Allen builds websites, improves stores, and creates tools for
            growing teams.
          </div>
          <div
            style={{
              color: '#cbd5e1',
              display: 'flex',
              fontSize: 30,
              lineHeight: 1.35,
            }}
          >
            Direct communication, dependable delivery, and practical solutions
            built around how your business works day to day.
          </div>
        </div>

        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ color: '#e2e8f0', display: 'flex', fontSize: 24 }}>
            tyler-allen.com
          </div>
          <div style={{ display: 'flex', gap: 14 }}>
            {['Build', 'Improve', 'Support'].map((label) => (
              <div
                key={label}
                style={{
                  alignItems: 'center',
                  background: 'rgba(59,130,246,0.12)',
                  border: '1px solid rgba(59,130,246,0.35)',
                  borderRadius: 9999,
                  color: '#bfdbfe',
                  display: 'flex',
                  fontSize: 22,
                  padding: '10px 18px',
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>,
    size,
  );
}

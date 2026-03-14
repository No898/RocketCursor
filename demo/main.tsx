import React from 'react';
import ReactDOM from 'react-dom/client';
import RocketCursor, { CursorFollower } from '../src';
import './styles.css';

type CursorMode = 'rocket' | 'starship';

function StarshipCursor({ isMoving }: { isMoving: boolean }) {
  const saucerGradientId = React.useId();
  const hullGradientId = React.useId();
  const nacelleGradientId = React.useId();
  const bussardGradientId = React.useId();
  const trailGradientId = React.useId();
  const shadowId = React.useId();

  return (
    <svg
      aria-hidden="true"
      height="100%"
      viewBox="0 0 280 150"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={saucerGradientId} x1="132" y1="28" x2="224" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#f8fbff" />
          <stop offset="0.58" stopColor="#d8e2ee" />
          <stop offset="1" stopColor="#8c9caf" />
        </linearGradient>
        <linearGradient id={hullGradientId} x1="58" y1="50" x2="176" y2="106" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#eef6ff" />
          <stop offset="0.5" stopColor="#c1cfde" />
          <stop offset="1" stopColor="#74839a" />
        </linearGradient>
        <linearGradient id={nacelleGradientId} x1="48" y1="26" x2="238" y2="26" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#60738b" />
          <stop offset="0.48" stopColor="#cfd9e8" />
          <stop offset="0.82" stopColor="#94b8ff" />
          <stop offset="1" stopColor="#dce7f8" />
        </linearGradient>
        <radialGradient id={bussardGradientId} cx="50%" cy="50%" r="70%">
          <stop offset="0" stopColor="#fff2bf" />
          <stop offset="0.45" stopColor="#ff9b72" />
          <stop offset="1" stopColor="#ff6c56" />
        </radialGradient>
        <linearGradient id={trailGradientId} x1="10" y1="75" x2="108" y2="75" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#76abff" stopOpacity="0" />
          <stop offset="0.45" stopColor="#76abff" stopOpacity="0.26" />
          <stop offset="0.88" stopColor="#b1e7ff" stopOpacity="0.9" />
        </linearGradient>
        <filter id={shadowId} x="-30%" y="-50%" width="160%" height="200%">
          <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#63aefc" floodOpacity="0.24" />
        </filter>
      </defs>

      <g
        style={{
          opacity: isMoving ? 1 : 0.38,
          transform: `scaleX(${isMoving ? 1 : 0.8})`,
          transformOrigin: '90px 75px',
          transition: 'opacity 140ms ease, transform 140ms ease',
        }}
      >
        <path
          d="M10 75C26 60 48 55 82 58L108 64L108 86L82 92C48 95 26 90 10 75Z"
          fill={`url(#${trailGradientId})`}
        />
        <path
          d="M22 75C38 67 58 66 90 68"
          stroke="rgba(224, 245, 255, 0.78)"
          strokeLinecap="round"
          strokeWidth="2.8"
        />
        <path
          d="M22 75C38 83 58 84 90 82"
          stroke="rgba(142, 206, 255, 0.54)"
          strokeLinecap="round"
          strokeWidth="2.2"
        />
      </g>

      <g filter={`url(#${shadowId})`}>
        <rect x="72" y="28" width="140" height="18" rx="9" fill={`url(#${nacelleGradientId})`} />
        <rect x="72" y="104" width="140" height="18" rx="9" fill={`url(#${nacelleGradientId})`} />
        <ellipse cx="206" cy="37" rx="16" ry="8.5" fill={`url(#${bussardGradientId})`} />
        <ellipse cx="206" cy="113" rx="16" ry="8.5" fill={`url(#${bussardGradientId})`} />
        <path
          d="M92 66L138 56L186 38L194 46L150 65L112 72Z"
          fill="rgba(171, 184, 206, 0.9)"
          stroke="rgba(231, 240, 255, 0.26)"
          strokeLinejoin="round"
          strokeWidth="1.1"
        />
        <path
          d="M92 84L138 94L186 112L194 104L150 85L112 78Z"
          fill="rgba(171, 184, 206, 0.9)"
          stroke="rgba(231, 240, 255, 0.26)"
          strokeLinejoin="round"
          strokeWidth="1.1"
        />
        <path
          d="M62 75C74 61 96 55 122 56H164C177 56 191 63 201 75C191 87 177 94 164 94H122C96 95 74 89 62 75Z"
          fill={`url(#${hullGradientId})`}
          stroke="#edf3ff"
          strokeOpacity="0.38"
          strokeLinejoin="round"
          strokeWidth="1.4"
        />
        <path
          d="M98 75H168"
          stroke="rgba(84, 103, 129, 0.44)"
          strokeLinecap="round"
          strokeWidth="1.6"
        />
        <ellipse
          cx="182"
          cy="75"
          rx="58"
          ry="36"
          fill={`url(#${saucerGradientId})`}
          stroke="#f7fbff"
          strokeOpacity="0.5"
          strokeWidth="1.5"
        />
        <ellipse
          cx="190"
          cy="75"
          rx="21"
          ry="12"
          fill="rgba(120, 177, 255, 0.2)"
          stroke="rgba(216, 233, 255, 0.42)"
          strokeWidth="1.2"
        />
        <path
          d="M132 75H222"
          stroke="rgba(92, 110, 138, 0.34)"
          strokeLinecap="round"
          strokeWidth="1.6"
        />
        <path
          d="M148 61C166 56 190 55 214 58"
          stroke="rgba(246, 250, 255, 0.58)"
          strokeLinecap="round"
          strokeWidth="1.2"
        />
        <path
          d="M148 89C166 94 190 95 214 92"
          stroke="rgba(246, 250, 255, 0.4)"
          strokeLinecap="round"
          strokeWidth="1.1"
        />
        <ellipse
          cx="230"
          cy="75"
          rx="10"
          ry="7"
          fill="rgba(121, 216, 214, 0.82)"
        />
        <path
          d="M146 69L170 69"
          stroke="rgba(114, 135, 162, 0.35)"
          strokeLinecap="round"
          strokeWidth="1.1"
        />
        <path
          d="M146 81L170 81"
          stroke="rgba(114, 135, 162, 0.26)"
          strokeLinecap="round"
          strokeWidth="1.1"
        />
      </g>
    </svg>
  );
}

function App() {
  const [size, setSize] = React.useState(50);
  const [threshold, setThreshold] = React.useState(10);
  const [flameHideTimeout, setFlameHideTimeout] = React.useState(300);
  const [isVisible, setIsVisible] = React.useState(true);
  const [hideCursor, setHideCursor] = React.useState(false);
  const [followSpeed, setFollowSpeed] = React.useState(0.15);
  const [cursorMode, setCursorMode] = React.useState<CursorMode>('rocket');
  const [activePreset, setActivePreset] = React.useState<string | null>("Cruise");
  const cursorLabel = cursorMode === 'rocket' ? 'Rocket' : 'Starship';
  const motionLabel = cursorMode === 'rocket' ? 'Flame' : 'Warp glow';
  const presets = [
    {
      name: "Arcade",
      description: "Fast and playful",
      values: {
        flameHideTimeout: 220,
        followSpeed: 0.42,
        hideCursor: false,
        isVisible: true,
        size: 56,
        threshold: 6,
      },
    },
    {
      name: "Cruise",
      description: "Balanced default",
      values: {
        flameHideTimeout: 300,
        followSpeed: 0.15,
        hideCursor: false,
        isVisible: true,
        size: 50,
        threshold: 10,
      },
    },
    {
      name: "Stealth",
      description: "Rocket-only mode",
      values: {
        flameHideTimeout: 180,
        followSpeed: 0.26,
        hideCursor: true,
        isVisible: true,
        size: 42,
        threshold: 14,
      },
    },
  ];
  const telemetry = [
    { label: 'Mode', value: cursorLabel },
    { label: 'Size', value: `${size}px` },
    { label: 'Follow speed', value: `${Math.round(followSpeed * 100)}%` },
    { label: `${motionLabel} delay`, value: `${flameHideTimeout}ms` },
  ];
  const clearActivePreset = () => {
    setActivePreset(null);
  };
  const applyPreset = (preset: (typeof presets)[number]) => {
    setSize(preset.values.size);
    setThreshold(preset.values.threshold);
    setFlameHideTimeout(preset.values.flameHideTimeout);
    setIsVisible(preset.values.isVisible);
    setHideCursor(preset.values.hideCursor);
    setFollowSpeed(preset.values.followSpeed);
    setActivePreset(preset.name);
  };

  return (
    <>
      {cursorMode === 'rocket' ? (
        <RocketCursor
          size={size}
          threshold={threshold}
          flameHideTimeout={flameHideTimeout}
          isVisible={isVisible}
          hideCursor={hideCursor}
          followSpeed={followSpeed}
        />
      ) : (
        <CursorFollower
          anchorOffset={{ x: size * 0.8, y: 0 }}
          followSpeed={followSpeed}
          height={Math.round(size * 1.08)}
          hideCursor={hideCursor}
          isVisible={isVisible}
          movingTimeout={flameHideTimeout}
          threshold={threshold}
          width={Math.round(size * 2.1)}
          zIndex={9999}
        >
          {({ isMoving }) => <StarshipCursor isMoving={isMoving} />}
        </CursorFollower>
      )}

      <div className="page-shell">
        <div className="starfield" aria-hidden="true" />
        <div className="aurora aurora-left" aria-hidden="true" />
        <div className="aurora aurora-right" aria-hidden="true" />
        <div className="orbit orbit-large" aria-hidden="true" />
        <div className="orbit orbit-small" aria-hidden="true" />

        <main className="layout">
          <section className="hero panel">
            <div className="eyebrow">RocketCursor demo</div>
            <div className="hero-grid">
              <div className="hero-copy">
                <h1>Built-in rocket. Custom-ready motion.</h1>
                <p className="lead">Switch modes, tune the movement, and test a custom SVG starship.</p>

                <div className="mode-row" role="group" aria-label="Cursor mode">
                  <button
                    className={`mode-button${cursorMode === 'rocket' ? ' is-active' : ''}`}
                    onClick={() => setCursorMode('rocket')}
                    type="button"
                  >
                    <strong>Rocket</strong>
                    <span>Built-in preset</span>
                  </button>
                  <button
                    className={`mode-button${cursorMode === 'starship' ? ' is-active' : ''}`}
                    onClick={() => setCursorMode('starship')}
                    type="button"
                  >
                    <strong>Starship</strong>
                    <span>Custom SVG `CursorFollower`</span>
                  </button>
                </div>

                <div className="preset-row">
                  {presets.map((preset) => (
                    <button
                      className={`preset-button${activePreset === preset.name ? ' is-active' : ''}`}
                      key={preset.name}
                      onClick={() => applyPreset(preset)}
                      type="button"
                    >
                      <strong>{preset.name}</strong>
                      <span>{preset.description}</span>
                    </button>
                  ))}
                </div>

                <div className="telemetry-grid">
                  {telemetry.map((item) => (
                    <div className="telemetry-card" key={item.label}>
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                    </div>
                  ))}
                </div>
              </div>

              <aside className="status-panel">
                <div className="status-panel-header">
                  <span className="status-kicker">Live</span>
                  <span className="status-pill">{cursorLabel}</span>
                </div>

                <ul className="status-list">
                  <li>
                    <span>{motionLabel}</span>
                    <strong>{flameHideTimeout >= 500 ? 'Long fade' : 'Quick fade'}</strong>
                  </li>
                  <li>
                    <span>Pointer</span>
                    <strong>{hideCursor ? 'Custom only' : 'Native + custom'}</strong>
                  </li>
                  <li>
                    <span>Motion</span>
                    <strong>{followSpeed >= 0.4 ? 'Snappy' : 'Smooth'}</strong>
                  </li>
                  <li>
                    <span>Turn threshold</span>
                    <strong>{threshold}px</strong>
                  </li>
                </ul>
              </aside>
            </div>
          </section>

          <section className="control-deck panel">
            <div className="section-heading">
              <div>
                <div className="eyebrow">Control deck</div>
                <h2>Tune the motion</h2>
              </div>
              <p>Size, lag, trail, and visibility.</p>
            </div>

            <div className="controls-grid">
              <div className="control-card">
                <label htmlFor="size">
                  <span>Cursor size</span>
                  <strong>{size}px</strong>
                </label>
                <input
                  id="size"
                  type="range"
                  min="20"
                  max="150"
                  value={size}
                  onChange={(e) => {
                    clearActivePreset();
                    setSize(Number(e.target.value));
                  }}
                />
              </div>

              <div className="control-card">
                <label htmlFor="threshold">
                  <span>Rotation threshold</span>
                  <strong>{threshold}px</strong>
                </label>
                <input
                  id="threshold"
                  type="range"
                  min="1"
                  max="50"
                  value={threshold}
                  onChange={(e) => {
                    clearActivePreset();
                    setThreshold(Number(e.target.value));
                  }}
                />
              </div>

              <div className="control-card">
                <label htmlFor="flame-time">
                  <span>{motionLabel} visibility time</span>
                  <strong>{flameHideTimeout}ms</strong>
                </label>
                <input
                  id="flame-time"
                  type="range"
                  min="100"
                  max="1000"
                  step="50"
                  value={flameHideTimeout}
                  onChange={(e) => {
                    clearActivePreset();
                    setFlameHideTimeout(Number(e.target.value));
                  }}
                />
              </div>

              <div className="control-card">
                <label htmlFor="follow-speed">
                  <span>Follow speed</span>
                  <strong>{(followSpeed * 100).toFixed(0)}%</strong>
                </label>
                <input
                  id="follow-speed"
                  type="range"
                  min="0.05"
                  max="1"
                  step="0.05"
                  value={followSpeed}
                  onChange={(e) => {
                    clearActivePreset();
                    setFollowSpeed(Number(e.target.value));
                  }}
                />
                <small>Lower values add drift, higher values tighten the pursuit.</small>
              </div>
            </div>

            <div className="toggle-row">
              <label className="toggle-card">
                <input
                  type="checkbox"
                  checked={isVisible}
                  onChange={(e) => {
                    clearActivePreset();
                    setIsVisible(e.target.checked);
                  }}
                />
                <span>
                  <strong>Show cursor</strong>
                  <small>Keep the follower visible on the page.</small>
                </span>
              </label>

              <label className="toggle-card">
                <input
                  type="checkbox"
                  checked={hideCursor}
                  onChange={(e) => {
                    clearActivePreset();
                    setHideCursor(e.target.checked);
                  }}
                />
                <span>
                  <strong>Hide system cursor</strong>
                  <small>Switch to a custom-only pointer mode.</small>
                </span>
              </label>
            </div>
          </section>

          <section className="launch-zone panel">
            <div className="section-heading">
              <div>
                <div className="eyebrow">Launch zone</div>
                <h2>Try it here</h2>
              </div>
              <p>Move here. The red block is excluded.</p>
            </div>

            <div className="test-area">
              <div className="test-copy">
                <h3>Open area</h3>
                <p>Check alignment, rotation, and the motion fade.</p>
              </div>

              <div className="excluded-area no-rocket-cursor">
                <span className="zone-tag">Shielded sector</span>
                <p>Hidden here via `no-rocket-cursor`.</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import RocketCursor, { CursorFollower } from '../src';
import './styles.css';

type CursorMode = 'rocket' | 'starship';

function StarshipCursor({ isMoving }: { isMoving: boolean }) {
  const hullGradientId = React.useId();
  const nacelleGradientId = React.useId();
  const trailGradientId = React.useId();
  const shadowId = React.useId();

  return (
    <svg
      aria-hidden="true"
      height="100%"
      viewBox="0 0 240 120"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={hullGradientId} x1="44" y1="34" x2="212" y2="92" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#eef6ff" />
          <stop offset="0.48" stopColor="#b9cbdf" />
          <stop offset="1" stopColor="#6d7f97" />
        </linearGradient>
        <linearGradient id={nacelleGradientId} x1="32" y1="20" x2="232" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#61d2d7" />
          <stop offset="0.45" stopColor="#8eafff" />
          <stop offset="1" stopColor="#ffe3b0" />
        </linearGradient>
        <linearGradient id={trailGradientId} x1="8" y1="60" x2="82" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#76abff" stopOpacity="0" />
          <stop offset="0.55" stopColor="#76abff" stopOpacity="0.32" />
          <stop offset="1" stopColor="#b1e7ff" stopOpacity="0.94" />
        </linearGradient>
        <filter id={shadowId} x="-30%" y="-50%" width="160%" height="200%">
          <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#55adff" floodOpacity="0.3" />
        </filter>
      </defs>

      <g
        style={{
          opacity: isMoving ? 1 : 0.35,
          transform: `scaleX(${isMoving ? 1 : 0.82})`,
          transformOrigin: '70px 60px',
          transition: 'opacity 140ms ease, transform 140ms ease',
        }}
      >
        <path
          d="M12 60C27 47 42 44 64 47L84 52L84 68L64 73C42 76 27 73 12 60Z"
          fill={`url(#${trailGradientId})`}
        />
        <path
          d="M24 60C35 52 50 51 72 53"
          stroke="rgba(227, 247, 255, 0.8)"
          strokeLinecap="round"
          strokeWidth="2.4"
        />
        <path
          d="M24 60C35 68 50 69 72 67"
          stroke="rgba(148, 207, 255, 0.6)"
          strokeLinecap="round"
          strokeWidth="2"
        />
      </g>

      <g filter={`url(#${shadowId})`}>
        <path
          d="M80 53C95 39 126 34 154 42L166 46L188 51L202 60L188 69L166 74L154 78C126 86 95 81 80 67L92 60L80 53Z"
          fill={`url(#${hullGradientId})`}
          stroke="#f5f9ff"
          strokeOpacity="0.45"
          strokeWidth="1.4"
        />
        <ellipse cx="78" cy="60" rx="38" ry="17" fill="rgba(220, 232, 248, 0.92)" />
        <path
          d="M44 60C50 50 62 44 78 44C96 44 111 51 116 60C111 69 96 76 78 76C62 76 50 70 44 60Z"
          fill="rgba(248, 252, 255, 0.96)"
          stroke="rgba(103, 125, 154, 0.58)"
          strokeWidth="1.2"
        />
        <path
          d="M55 60H118"
          stroke="rgba(95, 120, 150, 0.45)"
          strokeLinecap="round"
          strokeWidth="1.4"
        />
        <path
          d="M106 56L140 49"
          stroke="#9aaeca"
          strokeLinecap="round"
          strokeWidth="5.2"
        />
        <path
          d="M106 64L140 71"
          stroke="#9aaeca"
          strokeLinecap="round"
          strokeWidth="5.2"
        />
        <path
          d="M108 44L152 24H210C216 24 220 27 220 32C220 37 216 40 210 40H160"
          fill="rgba(163, 177, 204, 0.58)"
          stroke="#bccbdd"
          strokeLinejoin="round"
          strokeWidth="1.2"
        />
        <path
          d="M108 76L152 96H210C216 96 220 93 220 88C220 83 216 80 210 80H160"
          fill="rgba(163, 177, 204, 0.58)"
          stroke="#bccbdd"
          strokeLinejoin="round"
          strokeWidth="1.2"
        />
        <rect x="156" y="26" width="68" height="12" rx="6" fill={`url(#${nacelleGradientId})`} />
        <rect x="156" y="82" width="68" height="12" rx="6" fill={`url(#${nacelleGradientId})`} />
        <ellipse cx="217" cy="32" rx="10" ry="5.5" fill="#ffe8be" />
        <ellipse cx="217" cy="88" rx="10" ry="5.5" fill="#ffe8be" />
        <ellipse cx="193" cy="60" rx="9" ry="11" fill="#66d0d4" />
        <path
          d="M135 60H186"
          stroke="rgba(245, 251, 255, 0.8)"
          strokeLinecap="round"
          strokeWidth="2.2"
        />
        <circle cx="78" cy="60" r="8" fill="#9cc7ff" fillOpacity="0.22" />
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
  const motionLabel = cursorMode === 'rocket' ? 'Flame' : 'Warp trail';
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
          anchorOffset={{ x: size * 0.68, y: 0 }}
          followSpeed={followSpeed}
          height={size}
          hideCursor={hideCursor}
          isVisible={isVisible}
          movingTimeout={flameHideTimeout}
          threshold={threshold}
          width={Math.round(size * 2)}
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

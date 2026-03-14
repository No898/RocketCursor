import React from 'react';
import ReactDOM from 'react-dom/client';
import RocketCursor, { CursorFollower } from '../src';
import './styles.css';

type CursorMode = 'rocket' | 'star';

function StarCursor({ isMoving }: { isMoving: boolean }) {
  const starGradientId = React.useId();
  const coreGradientId = React.useId();
  const glowGradientId = React.useId();
  const streakGradientId = React.useId();
  const shadowId = React.useId();

  return (
    <svg
      aria-hidden="true"
      height="100%"
      viewBox="0 0 220 180"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id={glowGradientId} cx="50%" cy="50%" r="70%">
          <stop offset="0" stopColor="#fff7d6" stopOpacity="0.92" />
          <stop offset="0.55" stopColor="#7ee2ff" stopOpacity="0.32" />
          <stop offset="1" stopColor="#7ee2ff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={starGradientId} x1="62" y1="36" x2="154" y2="142" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fffdf3" />
          <stop offset="0.46" stopColor="#ffd874" />
          <stop offset="1" stopColor="#ff9e47" />
        </linearGradient>
        <radialGradient id={coreGradientId} cx="45%" cy="45%" r="70%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.4" stopColor="#fff2b8" />
          <stop offset="1" stopColor="#ffd15d" />
        </radialGradient>
        <linearGradient id={streakGradientId} x1="8" y1="90" x2="86" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#92eaff" stopOpacity="0" />
          <stop offset="0.55" stopColor="#92eaff" stopOpacity="0.22" />
          <stop offset="1" stopColor="#f1fbff" stopOpacity="0.85" />
        </linearGradient>
        <filter id={shadowId} x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="#ffca56" floodOpacity="0.26" />
        </filter>
      </defs>

      <g
        style={{
          opacity: isMoving ? 1 : 0.28,
          transform: `scaleX(${isMoving ? 1 : 0.84})`,
          transformOrigin: '88px 90px',
          transition: 'opacity 140ms ease, transform 140ms ease',
        }}
      >
        <path d="M8 90C18 77 33 70 58 72L82 78L82 102L58 108C33 110 18 103 8 90Z" fill={`url(#${streakGradientId})`} />
        <path d="M20 90C34 82 48 80 76 82" stroke="rgba(233, 250, 255, 0.72)" strokeLinecap="round" strokeWidth="2.8" />
        <path d="M18 74C33 69 52 69 73 71" stroke="rgba(150, 224, 255, 0.38)" strokeLinecap="round" strokeWidth="1.8" />
        <path d="M18 106C33 111 52 111 73 109" stroke="rgba(150, 224, 255, 0.34)" strokeLinecap="round" strokeWidth="1.8" />
        <path d="M30 58C44 54 58 55 71 59" stroke="rgba(174, 235, 255, 0.26)" strokeLinecap="round" strokeWidth="1.6" />
        <path d="M30 122C44 126 58 125 71 121" stroke="rgba(174, 235, 255, 0.22)" strokeLinecap="round" strokeWidth="1.6" />
        <path d="M82 45C74 58 72 72 74 90" stroke="rgba(203, 244, 255, 0.18)" strokeLinecap="round" strokeWidth="1.4" />
        <path d="M82 135C74 122 72 108 74 90" stroke="rgba(203, 244, 255, 0.18)" strokeLinecap="round" strokeWidth="1.4" />
      </g>

      <g filter={`url(#${shadowId})`}>
        <circle cx="102" cy="90" r="58" fill={`url(#${glowGradientId})`} />
        <path
          d="M102 31L117 65L155 69L127 92L134 129L102 110L70 129L77 92L49 69L87 65Z"
          fill={`url(#${starGradientId})`}
          stroke="#fff7de"
          strokeLinejoin="round"
          strokeWidth="3"
        />
        <path
          d="M102 45L113 69L140 72L120 89L125 115L102 101L79 115L84 89L64 72L91 69Z"
          fill={`url(#${coreGradientId})`}
          fillOpacity="0.9"
        />
        <circle cx="102" cy="90" r="15" fill="rgba(255, 248, 218, 0.9)" />
        <path d="M102 31L108 57" stroke="rgba(255, 255, 255, 0.48)" strokeLinecap="round" strokeWidth="2" />
        <path d="M146 71L121 77" stroke="rgba(255, 255, 255, 0.34)" strokeLinecap="round" strokeWidth="1.8" />
        <path d="M146 109L121 101" stroke="rgba(255, 255, 255, 0.3)" strokeLinecap="round" strokeWidth="1.8" />
        <path d="M102 149L105 119" stroke="rgba(255, 255, 255, 0.24)" strokeLinecap="round" strokeWidth="1.6" />
        <path d="M58 109L82 101" stroke="rgba(255, 255, 255, 0.24)" strokeLinecap="round" strokeWidth="1.6" />
        <path d="M58 71L82 77" stroke="rgba(255, 255, 255, 0.28)" strokeLinecap="round" strokeWidth="1.6" />
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
  const cursorLabel = cursorMode === 'rocket' ? 'Rocket' : 'Star';
  const motionLabel = cursorMode === 'rocket' ? 'Flame' : 'Air wake';
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
          anchorOffset={{ x: size * 0.48, y: 0 }}
          followSpeed={followSpeed}
          height={Math.round(size * 1.45)}
          hideCursor={hideCursor}
          isVisible={isVisible}
          movingTimeout={flameHideTimeout}
          threshold={threshold}
          width={Math.round(size * 1.8)}
          zIndex={9999}
        >
          {({ isMoving }) => <StarCursor isMoving={isMoving} />}
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
                <p className="lead">Switch modes, tune the movement, and test a custom SVG star with an air wake.</p>

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
                    className={`mode-button${cursorMode === 'star' ? ' is-active' : ''}`}
                    onClick={() => setCursorMode('star')}
                    type="button"
                  >
                    <strong>Star</strong>
                    <span>Custom SVG with air wake</span>
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

import React from 'react';
import ReactDOM from 'react-dom/client';
import RocketCursor, { CursorFollower } from '../src';
import './styles.css';

type CursorMode = 'rocket' | 'starship';

function StarshipCursor({ isMoving }: { isMoving: boolean }) {
  const saucerGradientId = React.useId();
  const saucerCenterId = React.useId();
  const hullGradientId = React.useId();
  const nacelleGradientId = React.useId();
  const bussardGradientId = React.useId();
  const exhaustGradientId = React.useId();
  const trailGradientId = React.useId();
  const shadowId = React.useId();

  return (
    <svg
      aria-hidden="true"
      height="100%"
      viewBox="0 0 360 220"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id={saucerGradientId} cx="58%" cy="50%" r="68%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.62" stopColor="#edf1f6" />
          <stop offset="1" stopColor="#c4cfdd" />
        </radialGradient>
        <radialGradient id={saucerCenterId} cx="50%" cy="50%" r="70%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.48" stopColor="#d2dbe7" />
          <stop offset="1" stopColor="#7cbfff" />
        </radialGradient>
        <linearGradient id={hullGradientId} x1="126" y1="74" x2="246" y2="152" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#f7faff" />
          <stop offset="0.46" stopColor="#d6dde8" />
          <stop offset="1" stopColor="#8897ac" />
        </linearGradient>
        <linearGradient id={nacelleGradientId} x1="18" y1="46" x2="202" y2="46" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#f4f8fd" />
          <stop offset="0.55" stopColor="#d9e1ec" />
          <stop offset="1" stopColor="#98a7bc" />
        </linearGradient>
        <radialGradient id={bussardGradientId} cx="50%" cy="50%" r="72%">
          <stop offset="0" stopColor="#f4fbff" />
          <stop offset="0.58" stopColor="#8bd3ff" />
          <stop offset="1" stopColor="#3aa2ef" />
        </radialGradient>
        <linearGradient id={exhaustGradientId} x1="18" y1="46" x2="42" y2="46" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#00b8ff" />
          <stop offset="1" stopColor="#b7ecff" />
        </linearGradient>
        <linearGradient id={trailGradientId} x1="4" y1="110" x2="96" y2="110" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#78c7ff" stopOpacity="0" />
          <stop offset="0.42" stopColor="#78c7ff" stopOpacity="0.2" />
          <stop offset="1" stopColor="#d5f3ff" stopOpacity="0.78" />
        </linearGradient>
        <filter id={shadowId} x="-25%" y="-35%" width="150%" height="170%">
          <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#7aa6d8" floodOpacity="0.24" />
        </filter>
      </defs>

      <g
        style={{
          opacity: isMoving ? 1 : 0.34,
          transform: `scaleX(${isMoving ? 1 : 0.82})`,
          transformOrigin: '90px 110px',
          transition: 'opacity 140ms ease, transform 140ms ease',
        }}
      >
        <path d="M6 110C22 95 44 88 82 90L96 96L96 124L82 130C44 132 22 125 6 110Z" fill={`url(#${trailGradientId})`} />
        <path d="M20 110C37 101 56 100 90 102" stroke="rgba(230, 248, 255, 0.66)" strokeLinecap="round" strokeWidth="2.4" />
        <path d="M20 110C37 119 56 120 90 118" stroke="rgba(150, 219, 255, 0.48)" strokeLinecap="round" strokeWidth="2" />
      </g>

      <g filter={`url(#${shadowId})`}>
        <path
          d="M92 94C112 73 144 63 188 64H208C224 64 239 71 249 82L252 87L248 92C240 100 227 106 212 108H182C143 108 113 103 92 94Z"
          fill="rgba(176, 188, 205, 0.34)"
        />

        <g>
          <rect x="18" y="34" width="164" height="28" rx="14" fill={`url(#${nacelleGradientId})`} stroke="#7c8899" strokeWidth="1.5" />
          <rect x="18" y="158" width="164" height="28" rx="14" fill={`url(#${nacelleGradientId})`} stroke="#7c8899" strokeWidth="1.5" />
          <rect x="18" y="34" width="22" height="28" rx="14" fill={`url(#${exhaustGradientId})`} />
          <rect x="18" y="158" width="22" height="28" rx="14" fill={`url(#${exhaustGradientId})`} />
          <path d="M42 40H145" stroke="#0ca9ef" strokeLinecap="round" strokeWidth="4" />
          <path d="M42 164H145" stroke="#0ca9ef" strokeLinecap="round" strokeWidth="4" />
          <path d="M144 37H168C176 37 182 43 182 48V62C182 54 176 48 168 48H144Z" fill="#f5f8fc" />
          <path d="M144 172H168C176 172 182 166 182 161V158C182 166 176 172 168 172H144Z" fill="#f5f8fc" />
          <ellipse cx="174" cy="48" rx="16" ry="14" fill={`url(#${bussardGradientId})`} stroke="#6f7e92" strokeWidth="1.3" />
          <ellipse cx="174" cy="172" rx="16" ry="14" fill={`url(#${bussardGradientId})`} stroke="#6f7e92" strokeWidth="1.3" />
          <path d="M170 35V61" stroke="rgba(243, 249, 255, 0.7)" strokeWidth="1.2" />
          <path d="M170 159V185" stroke="rgba(243, 249, 255, 0.7)" strokeWidth="1.2" />
        </g>

        <path
          d="M150 87C169 88 189 92 208 100L190 103C171 101 158 98 146 94Z"
          fill="rgba(156, 167, 186, 0.9)"
          stroke="rgba(248, 252, 255, 0.4)"
          strokeLinejoin="round"
          strokeWidth="1.1"
        />
        <path
          d="M150 133C169 132 189 128 208 120L190 117C171 119 158 122 146 126Z"
          fill="rgba(156, 167, 186, 0.9)"
          stroke="rgba(248, 252, 255, 0.4)"
          strokeLinejoin="round"
          strokeWidth="1.1"
        />
        <path
          d="M152 77C160 66 176 58 198 56L222 56C236 56 247 59 255 66L251 72C243 79 232 82 219 82H182C170 82 160 80 152 77Z"
          fill="rgba(247, 250, 255, 0.94)"
          stroke="rgba(118, 129, 146, 0.65)"
          strokeWidth="1.3"
        />
        <path
          d="M152 143C160 154 176 162 198 164L222 164C236 164 247 161 255 154L251 148C243 141 232 138 219 138H182C170 138 160 140 152 143Z"
          fill="rgba(247, 250, 255, 0.94)"
          stroke="rgba(118, 129, 146, 0.65)"
          strokeWidth="1.3"
        />

        <path
          d="M104 98C112 86 129 78 152 76H194C214 76 229 87 229 100V120C229 133 214 144 194 144H152C129 142 112 134 104 122Z"
          fill={`url(#${hullGradientId})`}
          stroke="#7b8797"
          strokeWidth="1.5"
        />
        <path d="M120 110H210" stroke="rgba(74, 84, 102, 0.34)" strokeLinecap="round" strokeWidth="1.8" />
        <path d="M136 90H192" stroke="rgba(255, 255, 255, 0.6)" strokeLinecap="round" strokeWidth="1.2" />
        <path d="M136 130H192" stroke="rgba(255, 255, 255, 0.34)" strokeLinecap="round" strokeWidth="1.1" />
        <path d="M170 80V140" stroke="rgba(114, 125, 142, 0.38)" strokeLinecap="round" strokeWidth="1.1" />

        <path
          d="M219 88L251 80C268 77 282 78 294 84L292 92C281 97 268 100 252 100L219 98Z"
          fill="rgba(245, 248, 253, 0.98)"
          stroke="#7a8697"
          strokeWidth="1.35"
          strokeLinejoin="round"
        />
        <path
          d="M219 132L251 140C268 143 282 142 294 136L292 128C281 123 268 120 252 120L219 122Z"
          fill="rgba(245, 248, 253, 0.98)"
          stroke="#7a8697"
          strokeWidth="1.35"
          strokeLinejoin="round"
        />

        <circle cx="284" cy="110" r="74" fill={`url(#${saucerGradientId})`} stroke="#6c7889" strokeWidth="1.6" />
        <circle cx="284" cy="110" r="62" fill="none" stroke="rgba(123, 132, 149, 0.38)" strokeWidth="1.1" />
        <circle cx="284" cy="110" r="42" fill="none" stroke="rgba(123, 132, 149, 0.28)" strokeWidth="1" />
        <circle cx="284" cy="110" r="24" fill="rgba(241, 246, 252, 0.92)" stroke="rgba(125, 136, 152, 0.45)" strokeWidth="1.1" />
        <circle cx="284" cy="110" r="12" fill={`url(#${saucerCenterId})`} stroke="rgba(83, 126, 180, 0.52)" strokeWidth="1" />
        <path d="M216 110H344" stroke="rgba(100, 111, 128, 0.32)" strokeLinecap="round" strokeWidth="1.3" />
        <path d="M284 38V182" stroke="rgba(100, 111, 128, 0.18)" strokeWidth="1" />
        <path d="M232 58C254 50 314 50 336 58" stroke="rgba(255, 255, 255, 0.52)" strokeLinecap="round" strokeWidth="1.1" />
        <path d="M232 162C254 170 314 170 336 162" stroke="rgba(255, 255, 255, 0.36)" strokeLinecap="round" strokeWidth="1.1" />
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
          anchorOffset={{ x: size * 1.02, y: 0 }}
          followSpeed={followSpeed}
          height={Math.round(size * 1.42)}
          hideCursor={hideCursor}
          isVisible={isVisible}
          movingTimeout={flameHideTimeout}
          threshold={threshold}
          width={Math.round(size * 2.45)}
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

import React from 'react';
import ReactDOM from 'react-dom/client';
import RocketCursor, { CursorFollower } from '../src';
import './styles.css';

type CursorMode = 'rocket' | 'comet';

function CometCursor({ isMoving }: { isMoving: boolean }) {
  return (
    <div className={`comet-cursor${isMoving ? ' is-moving' : ''}`}>
      <span className="comet-tail" />
      <span className="comet-glow" />
      <span className="comet-core" />
      <span className="comet-ring" />
      <span className="comet-spark comet-spark-a" />
      <span className="comet-spark comet-spark-b" />
    </div>
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
  const cursorLabel = cursorMode === 'rocket' ? 'Rocket' : 'Comet';
  const motionLabel = cursorMode === 'rocket' ? 'Flame' : 'Tail';
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
          anchorOffset={{ x: size * 0.24, y: 0 }}
          followSpeed={followSpeed}
          height={size}
          hideCursor={hideCursor}
          isVisible={isVisible}
          movingTimeout={flameHideTimeout}
          threshold={threshold}
          width={Math.round(size * 1.4)}
          zIndex={9999}
        >
          {({ isMoving }) => <CometCursor isMoving={isMoving} />}
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
                <p className="lead">Switch modes, tune the movement, and test the exclusion zone.</p>

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
                    className={`mode-button${cursorMode === 'comet' ? ' is-active' : ''}`}
                    onClick={() => setCursorMode('comet')}
                    type="button"
                  >
                    <strong>Comet</strong>
                    <span>Custom `CursorFollower`</span>
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

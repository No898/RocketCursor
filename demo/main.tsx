import React from 'react';
import ReactDOM from 'react-dom/client';
import RocketCursor from '../src/rocket.Cursor.tsx';
import './styles.css';

function App() {
  const [size, setSize] = React.useState(50);
  const [threshold, setThreshold] = React.useState(10);
  const [flameHideTimeout, setFlameHideTimeout] = React.useState(300);
  const [isVisible, setIsVisible] = React.useState(true);
  const [hideCursor, setHideCursor] = React.useState(false);
  const [followSpeed, setFollowSpeed] = React.useState(0.15);

  return (
    <>
      <RocketCursor
        size={size}
        threshold={threshold}
        flameHideTimeout={flameHideTimeout}
        isVisible={isVisible}
        hideCursor={hideCursor}
        followSpeed={followSpeed}
      />
      
      <div className="container">
        <h1>🚀 RocketCursor Demo</h1>
        <p>Pohybujte myší po obrazovce a sledujte raketu!</p>

        <div className="controls">
          <h2>Nastavení</h2>
          
          <div className="control-group">
            <label>
              Velikost rakety: {size}px
              <input
                type="range"
                min="20"
                max="150"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
              />
            </label>
          </div>

          <div className="control-group">
            <label>
              Threshold (citlivost rotace): {threshold}px
              <input
                type="range"
                min="1"
                max="50"
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
              />
            </label>
          </div>

          <div className="control-group">
            <label>
              Čas zobrazení plamene: {flameHideTimeout}ms
              <input
                type="range"
                min="100"
                max="1000"
                step="50"
                value={flameHideTimeout}
                onChange={(e) => setFlameHideTimeout(Number(e.target.value))}
              />
            </label>
          </div>

          <div className="control-group">
            <label>
              Rychlost následování: {(followSpeed * 100).toFixed(0)}%
              <input
                type="range"
                min="0.05"
                max="1"
                step="0.05"
                value={followSpeed}
                onChange={(e) => setFollowSpeed(Number(e.target.value))}
              />
            </label>
            <small style={{ color: '#666', fontSize: '0.9em' }}>
              Nižší hodnota = větší zpoždění, vyšší = rychlejší následování
            </small>
          </div>

          <div className="control-group">
            <label>
              <input
                type="checkbox"
                checked={isVisible}
                onChange={(e) => setIsVisible(e.target.checked)}
              />
              Zobrazit raketu
            </label>
          </div>

          <div className="control-group">
            <label>
              <input
                type="checkbox"
                checked={hideCursor}
                onChange={(e) => setHideCursor(e.target.checked)}
              />
              Skrýt kurzor myši
            </label>
          </div>
        </div>

        <div className="test-area">
          <h2>Testovací oblast</h2>
          <p>Pohybujte myší v této oblasti a sledujte, jak se raketa otáčí a zobrazuje plamen.</p>
          <div className="excluded-area no-rocket-cursor">
            <p>Tato oblast má třídu "no-rocket-cursor" - raketa se zde skryje</p>
          </div>
        </div>
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";

export type RocketCursorProps = {
  size?: number;
  threshold?: number;
  flameHideTimeout?: number;
  isVisible?: boolean;
  hideCursor?: boolean;
  followSpeed?: number;
};

// SVG components for flame and rocket visuals
const FlameSvg = ({ gradientId }: { gradientId: string }) => (
  <g transform="translate(1.2245, 350.449) rotate(45) scale(0.5, -0.5)">
    <defs>
      <linearGradient
        id={gradientId}
        gradientUnits="userSpaceOnUse"
        x1="94.141"
        y1="255"
        x2="94.141"
        y2="0.188"
      >
        <stop offset="0" stopColor="#ff4c0d" />
        <stop offset="1" stopColor="#fc9502" />
      </linearGradient>
    </defs>
    <path
      d="M187.899,164.809 C185.803,214.868 144.574,254.812 94.000,254.812 C42.085,254.812 -0.000,211.312 -0.000,160.812 C-0.000,154.062 -0.121,140.572 10.000,117.812 C16.057,104.191 19.856,95.634 22.000,87.812 C23.178,83.513 25.469,76.683 32.000,87.812 C35.851,94.374 36.000,103.812 36.000,103.812 C36.000,103.812 50.328,92.817 60.000,71.812 C74.179,41.019 62.866,22.612 59.000,9.812 C57.662,5.384 56.822,-2.574 66.000,0.812 C75.352,4.263 100.076,21.570 113.000,39.812 C131.445,65.847 138.000,90.812 138.000,90.812 C138.000,90.812 143.906,83.482 146.000,75.812 C148.365,67.151 148.400,58.573 155.999,67.813 C163.226,76.600 173.959,93.113 180.000,108.812 C190.969,137.321 187.899,164.809 187.899,164.809 Z"
      fill={`url(#${gradientId})`}
      fillRule="evenodd"
    />
    <path
      d="M94.000,254.812 C58.101,254.812 29.000,225.711 29.000,189.812 C29.000,168.151 37.729,155.000 55.896,137.166 C67.528,125.747 78.415,111.722 83.042,102.172 C83.953,100.292 86.026,90.495 94.019,101.966 C98.212,107.982 104.785,118.681 109.000,127.812 C116.266,143.555 118.000,158.812 118.000,158.812 C118.000,158.812 125.121,154.616 130.000,143.812 C131.573,140.330 134.753,127.148 143.643,140.328 C150.166,150.000 159.127,167.390 159.000,189.812 C159.000,225.711 129.898,254.812 94.000,254.812 Z"
      fill="#fc9502"
      fillRule="evenodd"
    />
    <path
      d="M95.000,183.812 C104.250,183.812 104.250,200.941 116.000,223.812 C123.824,239.041 112.121,254.812 95.000,254.812 C77.879,254.812 69.000,240.933 69.000,223.812 C69.000,206.692 85.750,183.812 95.000,183.812 Z"
      fill="#fce202"
      fillRule="evenodd"
    />
  </g>
);

const RocketSvg = () => (
  <g transform="translate(0, 0)">
    <path
      style={{ fill: "#FF7124" }}
      d="M399.76,16.699c10.12,37.84,8.67,78.13-4.34,115.28h-0.01L284.48,21.049v-0.01 C321.63,8.029,361.92,6.579,399.76,16.699z"
    />
    <path
      style={{ fill: "#F2D59F" }}
      d="M90.21,207.929l87.14-101.42h0.01l33.71-39.24c21.43-21.43,46.6-36.84,73.41-46.23v0.01 l110.93,110.93h0.01c-9.39,26.81-24.8,51.98-46.23,73.41l-39.24,33.71l-101.43,87.14l-29.57-29.57l-29.58-29.58l-29.58-29.58 L90.21,207.929z M296.11,193.399c20.18-20.17,20.18-52.89,0-73.06c-20.17-20.18-52.89-20.18-73.06,0 c-20.18,20.17-20.18,52.89,0,73.06C243.22,213.579,275.94,213.579,296.11,193.399z"
    />
    <path
      style={{ fill: "#F2D59F" }}
      d="M309.95,239.099c1.74,45.6-14.8,91.78-49.61,126.59c-10.69,10.68-22.44,19.65-34.93,26.89 l-16.89-66.34L309.95,239.099z"
    />
    <path
      style={{ fill: "#8ECAC1" }}
      d="M296.11,120.339c20.18,20.17,20.18,52.89,0,73.06c-20.17,20.18-52.89,20.18-73.06,0 c-20.18-20.17-20.18-52.89,0-73.06C243.22,100.159,275.94,100.159,296.11,120.339z"
    />
    <path
      style={{ fill: "#E6B263" }}
      d="M208.52,326.239l-39.94,14.71c-10.98,4.05-23.31,1.34-31.58-6.94l-6.85-6.85l48.8-30.49 L208.52,326.239z"
    />
    <polygon
      style={{ fill: "#E6B263" }}
      points="178.95,296.669 130.15,327.159 130.14,327.159 109.72,306.739 149.37,267.089"
    />
    <path
      style={{ fill: "#F2D59F" }}
      d="M177.35,106.509l-87.14,101.42l-66.33-16.88c7.24-12.49,16.21-24.24,26.89-34.93 C85.58,121.309,131.74,104.769,177.35,106.509z"
    />
    <polygon
      style={{ fill: "#E6B263" }}
      points="149.37,267.089 109.72,306.739 89.3,286.309 119.79,237.509"
    />
    <path
      style={{ fill: "#E6B263" }}
      d="M119.79,237.509l-30.49,48.8l-6.86-6.85c-8.27-8.28-10.98-20.6-6.94-31.58l14.71-39.95 L119.79,237.509z"
    />
  </g>
);

const RocketCursor = ({
  size = 50,
  threshold = 10,
  flameHideTimeout = 300,
  isVisible = true,
  hideCursor = false,
  followSpeed = 0.18,
}: RocketCursorProps) => {
  const gradientId = useId();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const flameRef = useRef<SVGGElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const target = useRef({
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
  });
  const current = useRef({ ...target.current });
  const angleRef = useRef(0);
  const lastMoveTs = useRef<number>(Date.now());
  const rafRef = useRef<number | null>(null);
  const isMovingRef = useRef(false);
  const [visible, setVisible] = useState(isVisible);
  const lastSignificantPosition = useRef({ ...target.current });
  const flameTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    setVisible(isVisible);
  }, [isVisible]);

  useEffect(() => {
    if (!hideCursor) {
      return;
    }

    const previousCursor = document.body.style.cursor;
    document.body.style.cursor = "none";

    return () => {
      document.body.style.cursor = previousCursor;
    };
  }, [hideCursor]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const targetElement = e.target instanceof Element ? e.target : null;
      const exclude = targetElement?.closest(".no-rocket-cursor");
      const shouldShow = !exclude && isVisible;
      setVisible((currentVisible) =>
        currentVisible === shouldShow ? currentVisible : shouldShow
      );
      if (!shouldShow) return;

      target.current.x = e.clientX;
      target.current.y = e.clientY;
      lastMoveTs.current = Date.now();

      const dx = target.current.x - lastSignificantPosition.current.x;
      const dy = target.current.y - lastSignificantPosition.current.y;
      const distance = Math.hypot(dx, dy);

      if (distance > threshold) {
        angleRef.current = Math.atan2(dy, dx) * (180 / Math.PI) + 45;
        lastSignificantPosition.current = {
          x: target.current.x,
          y: target.current.y,
        };
      }

      isMovingRef.current = true;
      if (flameTimeoutRef.current) {
        window.clearTimeout(flameTimeoutRef.current);
      }
      flameTimeoutRef.current = window.setTimeout(
        () => {
          isMovingRef.current = false;
        },
        flameHideTimeout
      );
    },
    [threshold, flameHideTimeout, isVisible]
  );

  const handleMouseOut = useCallback((e: MouseEvent) => {
    const rel = e.relatedTarget instanceof Element ? e.relatedTarget : null;
    if (!rel || rel.nodeName === "HTML") {
      setVisible(false);
      isMovingRef.current = false;
    }
  }, []);

  const handleVisibilityChange = useCallback(() => {
    if (document.visibilityState === "visible") {
      setVisible(isVisible);
      return;
    }

    setVisible(false);
    isMovingRef.current = false;
  }, [isVisible]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const step = () => {
      const lerp = Math.min(Math.max(followSpeed, 0), 1);
      const dx = target.current.x - current.current.x;
      const dy = target.current.y - current.current.y;
      const distanceToTarget = Math.hypot(dx, dy);

      // Snap to cursor when we are very close to avoid asymptotic lag/overshoot feeling
      if (distanceToTarget < 0.5) {
        current.current.x = target.current.x;
        current.current.y = target.current.y;
      } else {
        current.current.x += dx * lerp;
        current.current.y += dy * lerp;
      }

      const showFlame = Date.now() - lastMoveTs.current < flameHideTimeout;

      const el = wrapperRef.current;
      if (el) {
        const dirRad = (angleRef.current - 45) * (Math.PI / 180);
        const noseOffset = size * 0.35;
        const noseX = Math.cos(dirRad) * noseOffset;
        const noseY = Math.sin(dirRad) * noseOffset;

        el.style.transform = `translate3d(${current.current.x - noseX}px, ${
          current.current.y - noseY
        }px, 0) translate(-50%, -50%)`;
        const svg = svgRef.current;
        if (svg) {
          svg.style.transform = `rotate(${angleRef.current}deg)`;
        }
      }

      if (flameRef.current) {
        flameRef.current.style.opacity =
          showFlame && isMovingRef.current ? "1" : "0";
      }

      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (flameTimeoutRef.current) {
        window.clearTimeout(flameTimeoutRef.current);
      }
    };
  }, [
    flameHideTimeout,
    followSpeed,
    handleMouseMove,
    handleMouseOut,
    handleVisibilityChange,
    size,
  ]);

  const wrapperStyle = useMemo(
    () => ({
      position: "fixed" as const,
      left: 0,
      top: 0,
      pointerEvents: "none" as const,
      zIndex: 9999,
      width: `${size}px`,
      height: `${size * 1.5}px`,
      willChange: "transform",
      display: visible ? "block" : "none",
    }),
    [size, visible]
  );

  const svgStyle = useMemo(
    () => ({
      width: "100%",
      height: "100%",
      display: "block",
    }),
    []
  );

  if (!visible) {
    return null;
  }

  return (
    <div ref={wrapperRef} style={wrapperStyle}>
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 416.449 516.449"
        style={svgStyle}
      >
        <g ref={flameRef}>
          <FlameSvg gradientId={gradientId} />
        </g>
        <RocketSvg />
      </svg>
    </div>
  );
};

export default RocketCursor;

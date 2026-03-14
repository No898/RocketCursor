import {
  type HTMLAttributes,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export type CursorFollowerRenderState = {
  isMoving: boolean;
  visible: boolean;
};

export type CursorFollowerBaseProps = {
  className?: string;
  disabled?: boolean;
  disableOnCoarsePointer?: boolean;
  excludeSelector?: string;
  followSpeed?: number;
  hideCursor?: boolean;
  isVisible?: boolean;
  respectReducedMotion?: boolean;
  threshold?: number;
  zIndex?: number;
};

type CursorFollowerDataAttributes = {
  [key: `data-${string}`]: string | number | boolean | undefined;
};

export type CursorFollowerProps = CursorFollowerBaseProps & {
  anchorOffset?: {
    x: number;
    y: number;
  };
  children: ReactNode | ((state: CursorFollowerRenderState) => ReactNode);
  movingTimeout?: number;
  rotateWithMovement?: boolean;
  rotationOffset?: number;
  height?: number;
  width?: number;
  wrapperProps?: Omit<HTMLAttributes<HTMLDivElement>, "children" | "style"> &
    CursorFollowerDataAttributes;
};

const getMediaQueryMatch = (query: string) =>
  typeof window !== "undefined" && typeof window.matchMedia === "function"
    ? window.matchMedia(query).matches
    : false;

const subscribeToMediaQuery = (
  mediaQueryList: MediaQueryList,
  listener: () => void
) => {
  if (typeof mediaQueryList.addEventListener === "function") {
    mediaQueryList.addEventListener("change", listener);

    return () => mediaQueryList.removeEventListener("change", listener);
  }

  mediaQueryList.addListener(listener);

  return () => mediaQueryList.removeListener(listener);
};

const useMediaQueryMatch = (query: string) => {
  const [matches, setMatches] = useState(() => getMediaQueryMatch(query));

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }

    const mediaQueryList = window.matchMedia(query);
    const updateMatch = () => {
      setMatches(mediaQueryList.matches);
    };

    updateMatch();

    return subscribeToMediaQuery(mediaQueryList, updateMatch);
  }, [query]);

  return matches;
};

const rotatePoint = (x: number, y: number, angleInDegrees: number) => {
  const angleInRadians = angleInDegrees * (Math.PI / 180);
  const cos = Math.cos(angleInRadians);
  const sin = Math.sin(angleInRadians);

  return {
    x: x * cos - y * sin,
    y: x * sin + y * cos,
  };
};

const resolveClassName = (
  className?: string,
  wrapperClassName?: string
) => [className, wrapperClassName].filter(Boolean).join(" ") || undefined;

const CursorFollower = ({
  anchorOffset = { x: 0, y: 0 },
  children,
  className,
  disabled = false,
  disableOnCoarsePointer = true,
  excludeSelector = ".no-rocket-cursor",
  followSpeed = 0.18,
  height = 48,
  hideCursor = false,
  isVisible = true,
  movingTimeout = 300,
  respectReducedMotion = true,
  rotateWithMovement = true,
  rotationOffset = 0,
  threshold = 10,
  width = 48,
  wrapperProps,
  zIndex = 9999,
}: CursorFollowerProps) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const target = useRef({
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
  });
  const current = useRef({ ...target.current });
  const angleRef = useRef(0);
  const lastSignificantPosition = useRef({ ...target.current });
  const rafRef = useRef<number | null>(null);
  const hideTimeoutRef = useRef<number | null>(null);
  const isMovingRef = useRef(false);
  const [isMoving, setIsMoving] = useState(false);
  const prefersReducedMotion = useMediaQueryMatch("(prefers-reduced-motion: reduce)");
  const hasCoarsePointer = useMediaQueryMatch("(pointer: coarse)");
  const isInteractionDisabled =
    disabled ||
    (disableOnCoarsePointer && hasCoarsePointer) ||
    (respectReducedMotion && prefersReducedMotion);
  const [visible, setVisible] = useState(isVisible && !isInteractionDisabled);

  useEffect(() => {
    setVisible(isVisible && !isInteractionDisabled);
  }, [isInteractionDisabled, isVisible]);

  useEffect(() => {
    if (!hideCursor || isInteractionDisabled) {
      return;
    }

    const previousCursor = document.body.style.cursor;
    document.body.style.cursor = "none";

    return () => {
      document.body.style.cursor = previousCursor;
    };
  }, [hideCursor, isInteractionDisabled]);

  const stopMoving = useCallback(() => {
    if (!isMovingRef.current) {
      return;
    }

    isMovingRef.current = false;
    setIsMoving(false);
  }, []);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      const targetElement = event.target instanceof Element ? event.target : null;
      const exclude = excludeSelector ? targetElement?.closest(excludeSelector) : null;
      const shouldShow = !exclude && isVisible && !isInteractionDisabled;

      setVisible((currentVisible) =>
        currentVisible === shouldShow ? currentVisible : shouldShow
      );

      if (!shouldShow) {
        stopMoving();
        return;
      }

      target.current.x = event.clientX;
      target.current.y = event.clientY;

      const dx = target.current.x - lastSignificantPosition.current.x;
      const dy = target.current.y - lastSignificantPosition.current.y;
      const distance = Math.hypot(dx, dy);

      if (distance > threshold) {
        angleRef.current = Math.atan2(dy, dx) * (180 / Math.PI);
        lastSignificantPosition.current = {
          x: target.current.x,
          y: target.current.y,
        };
      }

      if (!isMovingRef.current) {
        isMovingRef.current = true;
        setIsMoving(true);
      }

      if (hideTimeoutRef.current) {
        window.clearTimeout(hideTimeoutRef.current);
      }

      hideTimeoutRef.current = window.setTimeout(stopMoving, movingTimeout);
    },
    [excludeSelector, isInteractionDisabled, isVisible, movingTimeout, stopMoving, threshold]
  );

  const handleMouseOut = useCallback(
    (event: MouseEvent) => {
      const relatedTarget = event.relatedTarget instanceof Element ? event.relatedTarget : null;

      if (!relatedTarget || relatedTarget.nodeName === "HTML") {
        setVisible(false);
        stopMoving();
      }
    },
    [stopMoving]
  );

  const handleVisibilityChange = useCallback(() => {
    if (document.visibilityState === "visible") {
      setVisible(isVisible && !isInteractionDisabled);
      return;
    }

    setVisible(false);
    stopMoving();
  }, [isInteractionDisabled, isVisible, stopMoving]);

  useEffect(() => {
    if (isInteractionDisabled) {
      setVisible(false);
      stopMoving();
      return;
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const step = () => {
      const lerp = Math.min(Math.max(followSpeed, 0), 1);
      const dx = target.current.x - current.current.x;
      const dy = target.current.y - current.current.y;
      const distanceToTarget = Math.hypot(dx, dy);

      if (distanceToTarget < 0.5) {
        current.current.x = target.current.x;
        current.current.y = target.current.y;
      } else {
        current.current.x += dx * lerp;
        current.current.y += dy * lerp;
      }

      const totalAngle =
        (rotateWithMovement ? angleRef.current : 0) + rotationOffset;
      const rotatedAnchorOffset = rotatePoint(
        anchorOffset.x,
        anchorOffset.y,
        totalAngle
      );
      const wrapper = wrapperRef.current;
      const content = contentRef.current;

      if (wrapper) {
        wrapper.style.transform = `translate3d(${current.current.x - rotatedAnchorOffset.x}px, ${
          current.current.y - rotatedAnchorOffset.y
        }px, 0) translate(-50%, -50%)`;
      }

      if (content) {
        content.style.transform = `rotate(${totalAngle}deg)`;
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      if (hideTimeoutRef.current) {
        window.clearTimeout(hideTimeoutRef.current);
      }
    };
  }, [
    anchorOffset.x,
    anchorOffset.y,
    followSpeed,
    handleMouseMove,
    handleMouseOut,
    handleVisibilityChange,
    isInteractionDisabled,
    rotateWithMovement,
    rotationOffset,
    stopMoving,
  ]);

  const wrapperStyle = useMemo(
    () => ({
      display: visible ? "block" : "none",
      height: `${height}px`,
      left: 0,
      pointerEvents: "none" as const,
      position: "fixed" as const,
      top: 0,
      width: `${width}px`,
      willChange: "transform",
      zIndex,
    }),
    [height, visible, width, zIndex]
  );

  const contentStyle = useMemo(
    () => ({
      display: "block",
      height: "100%",
      transformOrigin: "center center",
      width: "100%",
      willChange: "transform",
    }),
    []
  );

  if (!visible) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      {...wrapperProps}
      className={resolveClassName(className, wrapperProps?.className)}
      ref={wrapperRef}
      style={wrapperStyle}
    >
      <div ref={contentRef} style={contentStyle}>
        {typeof children === "function" ? children({ isMoving, visible }) : children}
      </div>
    </div>
  );
};

export default CursorFollower;

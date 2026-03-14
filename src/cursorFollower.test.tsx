import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import CursorFollower from "./cursorFollower";

type MatchMediaState = Record<string, boolean>;

let matchMediaState: MatchMediaState;

const installMatchMediaMock = () => {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    writable: true,
    value: (query: string): MediaQueryList => ({
      matches: Boolean(matchMediaState[query]),
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }),
  });
};

describe("CursorFollower", () => {
  beforeEach(() => {
    matchMediaState = {};
    installMatchMediaMock();
    vi.useFakeTimers();
    vi.stubGlobal("requestAnimationFrame", vi.fn(() => 1));
    vi.stubGlobal("cancelAnimationFrame", vi.fn());
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    vi.unstubAllGlobals();
    document.body.style.cursor = "";
  });

  it("renders custom content with merged wrapper props", () => {
    render(
      <CursorFollower
        className="base-cursor"
        wrapperProps={{
          "data-cursor-follower": "probe",
          className: "custom-cursor",
        }}
      >
        <span>Probe</span>
      </CursorFollower>
    );

    expect(screen.getByText("Probe")).toBeInTheDocument();

    const wrapper = document.querySelector("[data-cursor-follower='probe']");

    expect(wrapper).toHaveClass("base-cursor");
    expect(wrapper).toHaveClass("custom-cursor");
  });

  it("exposes movement state through render-prop children", () => {
    render(
      <CursorFollower movingTimeout={200}>
        {({ isMoving }) => <span>{isMoving ? "moving" : "idle"}</span>}
      </CursorFollower>
    );

    expect(screen.getByText("idle")).toBeInTheDocument();

    fireEvent.mouseMove(document.body, {
      clientX: 64,
      clientY: 96,
    });

    expect(screen.getByText("moving")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(201);
    });

    expect(screen.getByText("idle")).toBeInTheDocument();
  });
});

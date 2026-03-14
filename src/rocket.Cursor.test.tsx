import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import RocketCursor from "./rocket.Cursor";

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

describe("RocketCursor", () => {
  beforeEach(() => {
    matchMediaState = {};
    installMatchMediaMock();
    vi.stubGlobal("requestAnimationFrame", vi.fn(() => 1));
    vi.stubGlobal("cancelAnimationFrame", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    document.body.style.cursor = "";
  });

  it("applies custom className and zIndex to the wrapper", () => {
    render(<RocketCursor className="custom-rocket" zIndex={4242} />);

    const wrapper = document.querySelector("[data-rocket-cursor]");

    expect(wrapper).toHaveClass("custom-rocket");
    expect(wrapper).toHaveStyle({ zIndex: "4242" });
  });

  it("hides over elements that match excludeSelector", () => {
    render(
      <>
        <div data-hide-rocket>Excluded zone</div>
        <RocketCursor excludeSelector="[data-hide-rocket]" />
      </>
    );

    fireEvent.mouseMove(screen.getByText("Excluded zone"), {
      clientX: 20,
      clientY: 30,
    });

    expect(document.querySelector("[data-rocket-cursor]")).toBeNull();
  });

  it("does not render when disabled", () => {
    render(<RocketCursor disabled />);

    expect(document.querySelector("[data-rocket-cursor]")).toBeNull();
  });

  it("disables itself on coarse pointers by default", () => {
    matchMediaState["(pointer: coarse)"] = true;
    installMatchMediaMock();

    render(<RocketCursor />);

    expect(document.querySelector("[data-rocket-cursor]")).toBeNull();
  });

  it("can stay enabled on coarse pointers when opted in", () => {
    matchMediaState["(pointer: coarse)"] = true;
    installMatchMediaMock();

    render(<RocketCursor disableOnCoarsePointer={false} />);

    expect(document.querySelector("[data-rocket-cursor]")).not.toBeNull();
  });

  it("respects reduced motion by default", () => {
    matchMediaState["(prefers-reduced-motion: reduce)"] = true;
    installMatchMediaMock();

    render(<RocketCursor />);

    expect(document.querySelector("[data-rocket-cursor]")).toBeNull();
  });

  it("restores the previous body cursor when hideCursor is toggled off", () => {
    document.body.style.cursor = "crosshair";

    const { rerender, unmount } = render(<RocketCursor hideCursor />);

    expect(document.body.style.cursor).toBe("none");

    rerender(<RocketCursor hideCursor={false} />);
    expect(document.body.style.cursor).toBe("crosshair");

    unmount();
    expect(document.body.style.cursor).toBe("crosshair");
  });
});

import { renderHook, act } from "@testing-library/react";
import useIsMobile from "@/hooks/useIsMobile";

describe("useIsMobile", () => {
  const originalInnerWidth = window.innerWidth;

  afterEach(() => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: originalInnerWidth
    });
  });

  it("returns true when window width is less than or equal to default breakpoint (768)", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 600
    });

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it("returns false when window width is greater than default breakpoint (768)", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1024
    });

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it("returns true when window width equals the breakpoint", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 768
    });

    const { result } = renderHook(() => useIsMobile(768));
    expect(result.current).toBe(true);
  });

  it("uses custom breakpoint when provided", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 900
    });

    const { result: resultMobile } = renderHook(() => useIsMobile(1000));
    expect(resultMobile.current).toBe(true);

    const { result: resultDesktop } = renderHook(() => useIsMobile(800));
    expect(resultDesktop.current).toBe(false);
  });

  it("updates when window is resized", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 600
    });

    const { result } = renderHook(() => useIsMobile(768));
    expect(result.current).toBe(true);

    act(() => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 1024
      });
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current).toBe(false);
  });

  it("removes resize listener on unmount", () => {
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");
    const { unmount } = renderHook(() => useIsMobile(768));

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "resize",
      expect.any(Function)
    );
    removeEventListenerSpy.mockRestore();
  });
});

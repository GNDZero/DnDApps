const TABLET_CLASS = "tablet-mode";
const TABLET_ZOOM_CLASS = "tablet-zoom";

const isTabletLike = () => {
  if (typeof window === "undefined") return false;
  if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) return true;
  return navigator.maxTouchPoints && navigator.maxTouchPoints > 1;
};

const applyTabletMode = () => {
  if (!document.body) {
    window.requestAnimationFrame(applyTabletMode);
    return;
  }

  if (isTabletLike()) {
    document.body.classList.add(TABLET_CLASS);
  }
};

applyTabletMode();

let lastTapAt = 0;
let lastTapTarget = null;

document.addEventListener(
  "touchend",
  (event) => {
    if (!document.body || !document.body.classList.contains(TABLET_CLASS)) return;

    const now = Date.now();
    const isDoubleTap = now - lastTapAt < 300 && lastTapTarget === event.target;
    lastTapAt = now;
    lastTapTarget = event.target;

    const target = event.target;
    if (target && target.closest("a, button, input, select, textarea, .clickable")) return;

    if (isDoubleTap) {
      document.body.classList.toggle(TABLET_ZOOM_CLASS);
    }
  },
  { passive: true }
);

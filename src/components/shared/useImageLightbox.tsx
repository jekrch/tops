import { useMemo } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useLightbox, type ViewerItem } from "@jekrch/react-viewport-lightbox/lazy";
import "@jekrch/react-viewport-lightbox/styles.css";
import { CounterBox, DesktopFooter, Overlay, ZoomHint } from "./LightboxSlots";
import "./lightbox.css";

/**
 * Wraps @jekrch/react-viewport-lightbox with the tops look: square bordered
 * controls, a counter box top-left, edge arrows + thumbnail strip on desktop,
 * and an arrow/counter row on mobile.
 *
 * The built-in pieces (close button, mobile nav row) are restyled in
 * lightbox.css under `.tops-lightbox`; everything else lives in render slots.
 */
export function useImageLightbox(images: string[], name: string) {
  const items = useMemo<ViewerItem[]>(
    () =>
      images.map((src, i) => ({
        id: String(i),
        src,
        alt: i === 0 ? name : `${name} image ${i + 1}`,
      })),
    [images, name],
  );

  const lightbox = useLightbox(items, {
    loop: true,
    closeOnBackdropClick: true,
    showZoomControls: false,
    // No custom getOrigin: the default returns the trigger button, and the
    // library reads the object-cover crop from the <img> inside it. Handing it
    // the <img> directly skips that lookup, so the open/close zoom stretches
    // the full image into the tile's box and snaps at the end.
    icons: {
      close: <X className="w-6 h-6" strokeWidth={2} />,
      prev: <ChevronLeft strokeWidth={2} />,
      next: <ChevronRight strokeWidth={2} />,
    },
    classNames: { root: "tops-lightbox" },
    renderHeader: (ctx) => <CounterBox ctx={ctx} />,
    renderHeaderActions: (ctx) => <ZoomHint ctx={ctx} />,
    renderOverlay: (ctx) => <Overlay ctx={ctx} />,
    renderFooter: (ctx) => <DesktopFooter ctx={ctx} />,
  });

  // Portaled to <body> so the viewer escapes the list's stacking context
  // (.vt-year-list has a view-transition-name), which otherwise lets the
  // sticky list header paint over it.
  const viewer = lightbox.viewer ? createPortal(lightbox.viewer, document.body) : null;

  return { trigger: lightbox.triggerProps, viewer };
}

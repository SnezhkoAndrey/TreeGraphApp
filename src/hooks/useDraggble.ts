import { useRef, useState, useEffect, useCallback } from "react";

const throttle = <T extends (...args: any[]) => void>(f: T) => {
  let token: ReturnType<typeof requestAnimationFrame> | null = null;
  let lastArgs: Parameters<T> | null = null;

  const invoke = () => {
    f(...(lastArgs as Parameters<T>));
    token = null;
  };

  const result = (...args: Parameters<T>) => {
    lastArgs = args;
    if (!token) {
      token = requestAnimationFrame(invoke);
    }
  };

  result.cancel = () => token && cancelAnimationFrame(token);

  return result;
};

const id = <T>(x: T) => x;

interface UseDraggableOptions {
  onDrag?: (position: { x: number; y: number }) => { x: number; y: number };
}

export const useDraggable = ({ onDrag = id }: UseDraggableOptions = {}) => {
  const [pressed, setPressed] = useState(false);
  const position = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement | null>(null);
  const unsubscribe = useRef<() => void>();

  const handleMouseDown = useCallback((e: MouseEvent) => {
    if (e.target) {
      (e.target as HTMLElement).style.userSelect = "none";
      setPressed(true);
    }
  }, []);

  const handleMouseMove = throttle((event: MouseEvent) => {
    if (!ref.current || !position.current) {
      return;
    }
    const pos = position.current;
    const elem = ref.current;
    position.current = onDrag({
      x: pos.x + event.movementX,
      y: pos.y + event.movementY,
    });
    elem.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
  });

  const handleMouseUp = useCallback((e: MouseEvent) => {
    if (e.target) {
      (e.target as HTMLElement).style.userSelect = "auto";
      setPressed(false);
    }
  }, []);

  const legacyRef = useCallback(
    (elem: HTMLDivElement | null) => {
      ref.current = elem;
      if (unsubscribe.current) {
        unsubscribe.current();
      }
      if (elem) {
        elem.addEventListener("mousedown", handleMouseDown);
        unsubscribe.current = () => {
          elem.removeEventListener("mousedown", handleMouseDown);
        };
      }
    },
    [handleMouseDown]
  );

  useEffect(() => {
    if (pressed) {
      const handleMouseMove = throttle((event: MouseEvent) => {
        if (!ref.current || !position.current) {
          return;
        }
        const pos = position.current;
        const elem = ref.current;
        position.current = onDrag({
          x: pos.x + event.movementX,
          y: pos.y + event.movementY,
        });
        elem.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
      });

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        handleMouseMove.cancel();
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [pressed, handleMouseMove, handleMouseUp, onDrag]);

  return [legacyRef, pressed] as const;
};

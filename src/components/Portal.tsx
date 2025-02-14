import { forwardRef, Ref, RefCallback, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type PossibleRef<T> = Ref<T> | undefined;

type RefCleanup<T> = ReturnType<RefCallback<T>>;

function assignRef<T>(ref: PossibleRef<T>, value: T): RefCleanup<T> {
  if (typeof ref === "function") {
    return ref(value);
  } else if (typeof ref === "object" && ref !== null && "current" in ref) {
    ref.current = value;
  }
}

function createPortalNode(props: React.ComponentPropsWithoutRef<"div">) {
  const node = document.createElement("div");
  node.setAttribute("data-portal", "true");
  if (typeof props.className === "string")
    node.classList.add(...props.className.split(" ").filter(Boolean));
  if (typeof props.style === "object") Object.assign(node.style, props.style);
  if (typeof props.id === "string") node.setAttribute("id", props.id);
  return node;
}

export interface PortalProps extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
  target?: HTMLElement | string;
}

export const Portal = forwardRef<HTMLDivElement, PortalProps>(
  ({ children, target, ...others }, ref) => {
    const [mounted, setMounted] = useState(false);
    const nodeRef = useRef<HTMLElement | null>(null);

    useLayoutEffect(() => {
      setMounted(true);
      nodeRef.current = !target
        ? createPortalNode(others)
        : typeof target === "string"
          ? document.querySelector(target)
          : target;

      assignRef(ref, nodeRef.current);

      if (!target && nodeRef.current) {
        document.body.appendChild(nodeRef.current);
      }

      return () => {
        if (!target && nodeRef.current) {
          document.body.removeChild(nodeRef.current);
        }
      };
    }, [target]); // eslint-disable-line react-hooks/exhaustive-deps

    if (!mounted || !nodeRef.current) {
      return null;
    }

    return createPortal(<>{children}</>, nodeRef.current);
  }
);

Portal.displayName = "Portal";

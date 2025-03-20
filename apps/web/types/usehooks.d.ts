import 'usehooks-ts'

declare module 'usehooks-ts' {
  /// https://github.com/juliencrn/usehooks-ts/pull/675
  /// https://github.com/juliencrn/usehooks-ts/issues/663
  declare function useOnClickOutside<T extends HTMLElement = HTMLElement>(
    ref: RefObject<T | null | undefined> | RefObject<T | null | undefined>[],
    handler: (event: MouseEvent | TouchEvent | FocusEvent) => void,
    eventType?: EventType,
    eventListenerOptions?: AddEventListenerOptions
  ): void

  /** The size of the observed element. */
  type Size = {
    /** The width of the observed element. */
    width: number | undefined;
    /** The height of the observed element. */
    height: number | undefined;
  };

  /** The options for the ResizeObserver. */
  type UseResizeObserverOptions<T extends HTMLElement = HTMLElement> = {
    /** The ref of the element to observe. */
    ref: RefObject<T | null | undefined>;
    /**
     * When using `onResize`, the hook doesn't re-render on element size changes; it delegates handling to the provided callback.
     * @default undefined
     */
    onResize?: (size: Size) => void;
    /**
     * The box model to use for the ResizeObserver.
     * @default 'content-box'
     */
    box?: 'border-box' | 'content-box' | 'device-pixel-content-box';
  };

  declare function useResizeObserver<T extends HTMLElement = HTMLElement>(options: UseResizeObserverOptions<T>): Size
}
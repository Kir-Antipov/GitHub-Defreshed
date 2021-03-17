if (typeof window.ResizeObserver === "undefined") {
    window.ResizeObserver = class {
        private callback: ResizeObserverCallback;
        private watchlist: Set<Element>;

        constructor(callback: ResizeObserverCallback) {
            this.callback = callback;
            this.watchlist = new Set();
        }

        observe(target: Element) {
            if (this.watchlist.has(target)) {
                return;
            }

            const disposableIframe = (
                <iframe title="resize-observer" style={{
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    opacity: 0,
                    zIndex: -9999,
                    position: "absolute",
                }} />
            ) as HTMLIFrameElement;

            target.prepend(disposableIframe);

            disposableIframe.contentWindow.onresize = () => {
                const rect = {
                    blockSize: target.clientHeight,
                    inlineSize: target.clientWidth,
                    width: target.clientWidth,
                    height: target.clientHeight,
                    x: target.clientLeft,
                    y: target.clientTop,
                    top: target.clientTop,
                    bottom: target.clientTop + target.clientHeight,
                    left: target.clientLeft,
                    right: target.clientLeft + target.clientWidth,
                    toJSON() {
                        return {
                            bottom: this.bottom,
                            height: this.height,
                            left: this.left,
                            right: this.right,
                            top: this.top,
                            width: this.width,
                            x: this.x,
                            y: this.y,
                        };
                    },
                };
                this.callback([{
                    borderBoxSize: [rect],
                    contentBoxSize: [rect],
                    contentRect: rect,
                    target,
                }], this);
            };

            this.watchlist.add(target);
        }

        unobserve(target: Element) {
            if (!this.watchlist.has(target)) {
                return;
            }

            const disposableIframe = target.querySelector<HTMLIFrameElement>("iframe[title='resize-observer']");
            if (disposableIframe) {
                disposableIframe.contentWindow.onresize = null;
                target.removeChild(disposableIframe);
            }

            this.watchlist.delete(target);
        }

        disconnect() {
            for (const element of this.watchlist) {
                this.unobserve(element);
            }
        }
    };
}

export default ResizeObserver;

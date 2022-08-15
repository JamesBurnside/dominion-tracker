import logger from 'logger';

type OnChangedCallback = () => void;

/**
 * Self managing observer class.
 */
export class HTMLObserver {
  /**
   * ctor
   * @param fetchElementToObserve A function that returns the html element to observer.
   * This function is called when subscribe is called and the element is expected to exist
   * at that point.
   */
  constructor(fetchElementToObserve: () => HTMLElement) {
    this.fetchElementToObserve = fetchElementToObserve;
  }

  public subscribe(id: string, callback: OnChangedCallback): void {
    if (this.callbacks.has(id)) {
      logger.error(`Observer already has ID: ${id}`, true);
    }

    this.callbacks.set(id, callback);

    // if this was the first callbacks to be added, we need to connect the document observer
    if (!this.observer) {
      this.observer = new MutationObserver(() => {
        this.callCallbacks();
      });

      const elementToObserve = this.fetchElementToObserve();

      if (!elementToObserve)
        logger.error(
          `Element to observe not found! Element: ${elementToObserve}`
        );

      this.observer.observe(elementToObserve, {
        childList: true,
        subtree: true,
        attributes: false,
        characterData: false,
      });
    }
  }

  public unsubscribe(id: string): void {
    if (!this.callbacks.has(id)) {
      logger.error(
        `No callback found to unsubscribe from with id: ${id}`,
        false
      );
      return;
    }

    this.callbacks.delete(id);

    // if no callbacks are present, we can disconnect the document observer
    if (this.callbacks.size === 0) {
      this.observer.disconnect();
      this.observer = null;
    }
  }

  private callCallbacks(): void {
    this.callbacks.forEach((callback) => {
      callback();
    });
  }

  private fetchElementToObserve: () => HTMLElement = null;
  private observer: MutationObserver = null;
  private callbacks: Map<string, OnChangedCallback> = new Map();
}

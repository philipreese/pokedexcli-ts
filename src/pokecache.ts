type CacheEntry<T> = {
    createdAt: number;
    val: T;
};

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(interval: number) {
        this.#interval = interval;
        this.#startReapLoop();
    }

    add<T>(key: string, val: T) {
        this.#cache.set(key, {
            createdAt: Date.now(),
            val: val
        });
    }

    get<T>(key: string) : T | undefined {
        const entry = this.#cache.get(key);
        if (entry !== undefined) {
          return entry.val as T;
        }
        return undefined;
    }

    stopReapLoop() {
        if (this.#reapIntervalId) {
            clearInterval(this.#reapIntervalId);
            this.#reapIntervalId = undefined;
        }
    }

    #reap() {
        for (const [key, val] of this.#cache) {
            if (Date.now() - val.createdAt >= this.#interval) {
                this.#cache.delete(key);
            }
        }
    }

    #startReapLoop() {    
        this.#reap();  
        this.#reapIntervalId = setInterval(() => {
            this.#reap();
        }, this.#interval);
    }
  }
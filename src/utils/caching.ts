class ExpiryCacheItem<V> {
    public value: V;
    private lifetime: number;
    private createdAt: number;

    constructor(value: V, lifetime: number) {
        this.value = value;
        this.lifetime = lifetime;
        this.createdAt = Date.now();
    }

    public get expired(): boolean {
        return Date.now() - this.createdAt > this.lifetime;
    }
}

export class ExpiryCache<K, V> {
    private cache: Map<K, ExpiryCacheItem<V>> = new Map();
    private lifetime: number;

    constructor(lifetime: number) {
        this.lifetime = lifetime;
    }

    public get(key: K, fetcher: (key: K) => V | null, useCache: boolean = true): V | null {
        if (useCache) {
            const cached = this.cache.get(key);
            if (cached !== undefined) {
                if (!cached.expired)
                    return cached.value;

                this.cache.delete(key);
            }
        }

        const fetched = fetcher(key);
        if (fetched === null)
            return null;

        const item = new ExpiryCacheItem<V>(fetched, this.lifetime);
        this.cache.set(key, item);
        return fetched;
    }

    public async getAsync(key: K, fetcher: (key: K) => Promise<V | null>, useCache: boolean = true): Promise<V | null> {
        if (useCache) {
            const cached = this.cache.get(key);
            if (cached !== undefined) {
                if (!cached.expired)
                    return cached.value;

                this.cache.delete(key);
            }
        }

        const fetched = await fetcher(key);
        if (fetched === null)
            return null;

        const item = new ExpiryCacheItem<V>(fetched, this.lifetime);
        this.cache.set(key, item);
        return fetched;
    }
}

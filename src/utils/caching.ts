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

    public get(key: K, fetcher: (key: K) => V): V {
        const cached = this.cache.get(key);
        if (cached !== undefined && !cached.expired)
            return cached.value;

        this.cache.delete(key);
        const fetched = fetcher(key);
        const item = new ExpiryCacheItem<V>(fetched, this.lifetime);
        this.cache.set(key, item);
        return fetched;
    }

    public async getAsync(key: K, fetcher: (key: K) => Promise<V>): Promise<V> {
        const cached = this.cache.get(key);
        if (cached !== undefined && !cached.expired)
            return cached.value;

        this.cache.delete(key);
        const fetched = await fetcher(key);
        const item = new ExpiryCacheItem<V>(fetched, this.lifetime);
        this.cache.set(key, item);
        return fetched;
    }
}

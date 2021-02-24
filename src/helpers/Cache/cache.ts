export interface CacheOptions<T> {
  ttl: number;
  onDelete?(value: T): Promise<void> | void;
}

export interface Entry<T> {
  value: T;
  expiresAt: number;
}

export class Cache<T> {
  private options: CacheOptions<T>;
  private map: Map<string, Entry<T>> = new Map();
  constructor(options: Partial<CacheOptions<T>> = {}) {
    const defaultCacheOptions: CacheOptions<T> = {
      ttl: Infinity,
    };
    this.options = { ...defaultCacheOptions, ...options };
  }
  get(key: string): T | null {
    const e = this.map.get(key);
    if (!e) {
      return null;
    }
    if (e.expiresAt < Date.now()) {
      this.delete(key).catch();
      return null;
    }
    return e.value;
  }
  async getDefault(
    key: string,
    resolver: (key: string) => Promise<T>
  ): Promise<T> {
    const stored = this.get(key);
    if (stored) {
      return stored;
    }
    const d = await resolver(key);
    this.set(key, d);
    return d;
  }
  set(key: string, value: T, ttl = this.options.ttl): void {
    const e: Entry<T> = {
      value,
      expiresAt: Date.now() + ttl,
    };
    this.map.set(key, e);
  }
  async delete(key: string): Promise<void> {
    const e = this.map.get(key);
    if (!e) {
      return;
    }
    this.map.delete(key);
    if (this.options.onDelete) {
      await this.options.onDelete(e.value);
    }
  }
  async clear(): Promise<void> {
    await Promise.all([...this.map.keys()].map((key) => this.delete(key)));
  }
}

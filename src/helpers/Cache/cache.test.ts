import { Cache } from "./cache";

describe("Cache", () => {
  test("set/get", () => {
    const c = new Cache<string>();
    const key = "key";
    const value = "value";
    c.set(key, value);
    expect(c.get(key)).toBe(value);
  });
  test("get missing key", () => {
    const c = new Cache<string>();
    const key = "key";
    expect(c.get(key)).toBe(null);
  });
  test("ttl", () => {
    Date.now = jest.fn(() => 0);
    const c = new Cache<string>({ ttl: 10 });
    const key = "key";
    const value = "value";
    c.set(key, value);
    expect(c.get(key)).toBe(value);
    Date.now = jest.fn(() => 10);
    expect(c.get(key)).toBe(value);
    Date.now = jest.fn(() => 11);
    expect(c.get(key)).toBe(null);
  });
  test("set custom ttl", () => {
    Date.now = jest.fn(() => 0);
    const c = new Cache<string>({ ttl: 10 });
    const key = "key";
    const value = "value";
    c.set(key, value, 15);
    expect(c.get(key)).toBe(value);
    Date.now = jest.fn(() => 15);
    expect(c.get(key)).toBe(value);
    Date.now = jest.fn(() => 16);
    expect(c.get(key)).toBe(null);
  });
  test("ttl w/ cleaner", () => {
    Date.now = jest.fn(() => 0);
    const mockCleaner = jest.fn();
    const c = new Cache<string>({ onDelete: mockCleaner, ttl: 10 });
    const key = "key";
    const value = "value";
    c.set(key, value);
    expect(c.get(key)).toBe(value);
    Date.now = jest.fn(() => 10);
    expect(c.get(key)).toBe(value);
    expect(mockCleaner).toBeCalledTimes(0);
    Date.now = jest.fn(() => 11);
    expect(c.get(key)).toBe(null);
    expect(mockCleaner).toBeCalledWith(value);
  });
  test("delete", () => {
    const c = new Cache<string>();
    const key = "key";
    const value = "value";
    c.set(key, value);
    c.delete(key);
    expect(c.get(key)).toBe(null);
  });
  test("delete missing key", () => {
    const c = new Cache<string>();
    c.delete("foo");
    expect(() => c.delete("foo")).not.toThrowError();
  });
  test("delete w/ cleaner", () => {
    const mockCleaner = jest.fn();
    const c = new Cache<string>({ onDelete: mockCleaner });
    const key = "key";
    const value = "value";
    c.set(key, value);
    c.delete(key);
    expect(c.get(key)).toBe(null);
    expect(mockCleaner).toBeCalledWith("value");
  });
  test("clear", () => {
    const c = new Cache<string>();
    c.set("key1", "value1");
    c.set("key2", "value2");
    c.set("key3", "value3");
    c.clear();
    expect(c.get("key1")).toBe(null);
    expect(c.get("key2")).toBe(null);
    expect(c.get("key3")).toBe(null);
  });
  test("delete w/ cleaner", () => {
    const mockCleaner = jest.fn();
    const c = new Cache<string>({ onDelete: mockCleaner });
    c.set("key1", "value1");
    c.set("key2", "value2");
    c.set("key3", "value3");
    c.clear();
    expect(c.get("key1")).toBe(null);
    expect(mockCleaner).toBeCalledWith("value3");
    expect(mockCleaner).toBeCalledTimes(3);
  });
  test("getDefault", async () => {
    const resolver = (key: string) => Promise.resolve(`resolved:${key}`);
    const c = new Cache<string>();
    c.set("key1", "value1");
    const v1 = await c.getDefault("key1", resolver);
    expect(v1).toBe("value1");
    const v2 = await c.getDefault("key2", resolver);
    expect(v2).toBe("resolved:key2");
    const v22 = c.get("key2");
    expect(v22).toBe("resolved:key2");
  });
});

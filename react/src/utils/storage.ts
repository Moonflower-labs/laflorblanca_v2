import localforage from "localforage";

const store = typeof window !== "undefined" ? localStorage : undefined;

export const storage = {
  set: <Item>(key: string, value: Item): void =>
    store?.setItem(key, JSON.stringify(value)),
  get: <Item>(key: string): Item => {
    return JSON.parse(store?.getItem(key) || '""')as Item;
  },
  remove: (key: string): void => store?.removeItem(key),
};

export const storage1 = {
  set: async <Item>(key: string, value: Item): Promise<void> => {
    if (typeof window !== "undefined") {
      await localforage.setItem(key, value);
    }
  },
  get: async <Item>(key: string): Promise<Item | null> => {
    if (typeof window !== "undefined") {
      const value = await localforage.getItem<Item>(key);
      return value || null;
    }
    return null;
  },
  remove: async (key: string): Promise<void> => {
    if (typeof window !== "undefined") {
      await localforage.removeItem(key);
    }
  },
};

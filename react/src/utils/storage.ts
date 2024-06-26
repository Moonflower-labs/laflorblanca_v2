
const store = typeof window !== "undefined" ? localStorage : undefined;

export const storage = {
  set: <Item>(key: string, value: Item): void =>
    store?.setItem(key, JSON.stringify(value)),
  get: <Item>(key: string): Item => {
    return JSON.parse(store?.getItem(key) || '""')as Item;
  },
  remove: (key: string): void => store?.removeItem(key),
};

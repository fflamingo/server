export function mapObject<T, U, K extends string>(
  obj: Record<K, T>,
  transform: (key: string, value: T) => U
): Record<K, U> {
  return (Object.keys(obj) as [K]).reduce(
    (mapped, key) => {
      mapped[key] = transform(key, obj[key]);
      return mapped;
    },
    {} as Record<K, U>
  );
}

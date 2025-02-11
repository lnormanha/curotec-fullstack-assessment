export type Without<T, K> = Pick<T, Exclude<keyof T, keyof K>>;

export type Result<T, E> = ({ success: true } & T) | ({ success: false } & E);

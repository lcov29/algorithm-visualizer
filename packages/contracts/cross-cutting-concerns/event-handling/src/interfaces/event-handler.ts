export type IEventHandler<T> = (args: T) => Promise<boolean>;

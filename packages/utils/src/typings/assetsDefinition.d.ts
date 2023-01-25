// eslint-disable-next-line @typescript-eslint/no-explicit-any
type StoreValue = any;

interface Window {
  monaco: { [key: string]: StoreValue };
  MONACO_PROMISE: Promise<StoreValue>;
}

type IDataSource = { [key: string]: StoreValue; label: string; value: StoreValue }[];

declare interface PlainObject {
  [propName: string]: StoreValue;
}

declare interface BooleanObject {
  [propName: string]: boolean;
}

declare interface StringObject {
  [propName: string]: string;
}

declare interface NumberObject {
  [propName: string]: number;
}

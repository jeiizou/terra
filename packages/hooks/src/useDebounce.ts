import { debounce, DebounceSettings } from 'lodash';
import { useMemo } from 'react';
import { useLatest } from './useLatest';
import { useUnmount } from './useUnmount';

type noop = (...args: any) => any;

export function useDebounceFn<T extends noop>(
  fn: T,
  options: {
    wait?: number;
  } & DebounceSettings,
) {
  const fnRef = useLatest(fn);
  const wait = options?.wait ?? 1000;

  const debounced = useMemo(
    () =>
      debounce(
        (...args: Parameters<T>): ReturnType<T> => {
          return fnRef.current(...(args as any[]));
        },
        wait,
        options,
      ),
    [],
  );

  useUnmount(() => {
    debounced.cancel();
  });

  return {
    run: debounced,
    cancel: debounced.cancel,
    flush: debounced.flush,
  };
}

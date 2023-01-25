type CacheStruct<T> = {
  done: boolean;
  cacheTime?: number;
  resultPromise?: Promise<T>;
  cacheValue?: T;
};

/**
 * 函数缓存, 会增加一定的内存开销
 * - 支持异步函数
 * - 支持自定义缓存key, 默认使用params作为key
 * - 支持设置过期时间, 默认为1分钟, 设置为0不过期
 */
export function cacheFunctionAsync<T extends Array<StoreValue>, U>(
  fn: (...args: T) => Promise<U>,
  opts: {
    keyCall?: (...params: T) => StoreValue;
    outTime?: number;
  },
) {
  const { keyCall, outTime = 60 * 1000 } = opts;

  const valueCache = new Map<string, CacheStruct<U>>();

  return async function cachedFn(...params: T) {
    const key = keyCall ? keyCall(...params) : JSON.stringify(params);
    let cachedInfo = valueCache.get(key);

    const date = new Date().getTime();

    // 验证是否缓存失效
    if (cachedInfo?.cacheTime && outTime !== 0) {
      const overlapCache = date - cachedInfo.cacheTime >= outTime;
      if (overlapCache) {
        valueCache.delete(key);
        cachedInfo = undefined;
      }
    }

    if (cachedInfo) {
      // 命中缓存
      if (cachedInfo.done) {
        // 缓存数据已准备就绪
        return cachedInfo.cacheValue;
      } else {
        // 缓存数据未准备就绪
        return cachedInfo.resultPromise;
      }
    } else {
      // 未命中缓存
      const resultPromise = fn(...params);
      valueCache.set(key, {
        done: false,
        resultPromise: resultPromise?.then((i: U) => {
          valueCache.set(key, {
            done: true,
            cacheTime: new Date().getTime(),
            cacheValue: i,
          });
          return i;
        }),
      });
      return resultPromise;
    }
  };
}

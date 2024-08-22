const promises = new Map();

/**
 * @example
 * function test() {
 *   return global.fetch("http://www.baidu.com");
 * }
 *
 * function main() {
 *   const res = test();
 *   console.log(res);
 * }
 *
 * remove_async_infect(main, global.fetch);
 * @param {*} infect_fn
 */
function remove_async_infect(infect_fn) {
  const origin = global.fetch;

  global.fetch = replace_promise.bind(origin);

  try {
    infect_fn();
  } catch (error) {
    if (error instanceof Promise) {
      error.then(infect_fn, infect_fn).finally(() => (global.fetch = origin));
    }
  }
}

function replace_promise(...args) {
  const mapKey = JSON.stringify(args);

  if (promises.has(mapKey)) {
    const cache = promises.get(mapKey);

    if (cache.status === "fulfilled") return cache.data;
    if (cache.status === "rejected") throw cache.err;
  } else {
    throw this(...args)
      .then((result) => {
        promises.set(mapKey, {
          data: result,
          status: "fulfilled",
        });
      })
      .catch((err) => {
        promises.set(mapKey, {
          err,
          status: "rejected",
        });
      });
  }
}

function test() {
  return global.fetch("http://www.baidu.com");
}

function main() {
  const res = test();
  console.log(res);
}

remove_async_infect(main);

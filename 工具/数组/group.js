function groupSizeArr(arr, size) {
  return arr.reduce((memo, item, index) => {
    const chunkIndex = Math.floor(index / size);
    if (!memo[chunkIndex]) memo[chunkIndex] = [];
    memo[chunkIndex].push(item);
    return memo;
  }, []);
}

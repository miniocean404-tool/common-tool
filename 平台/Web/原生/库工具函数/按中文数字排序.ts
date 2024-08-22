import { toArabicString } from "chinese-numbers-to-arabic";

function sortChineseNumber(arr) {
  const intl = new Intl.Collator(undefined, {
    // 以实现按照字符串中的数字顺序进行排序
    numeric: true,
  });
  return arr.sort((a, b) => intl.compare(toArabicString(a), toArabicString(b)));
}

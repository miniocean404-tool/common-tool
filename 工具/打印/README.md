#### 打印事件

有两个事件可以监听到到打印事件，分别表示打印事件触发前后。

1. onbeforeprint()
2. onafterprint()

#### print 样式加载的 4 种方式

1. <link rel="stylesheet" href="" media="print">
2. @import url print

   ```scss
   概述
   @import CSS@规则，用于从其他样式表导入样式规则。这些规则必须先于所有其他类型的规则，@charset 规则除外; 因为它不是一个嵌套语句，@import 不能在条件组的规则中使用。

   因此，用户代理可以避免为不支持的媒体类型检索资源，作者可以指定依赖媒体的@import 规则。这些条件导入在 URI 之后指定逗号分隔的媒体查询。在没有任何媒体查询的情况下，导入是无条件的。指定所有的媒体具有相同的效果。

   语法
   @import url;
   @import url list-of-media-queries;
   ```

3. 通过媒体查询 @media
4. 内联样式表
   ```scss
   <style type="text/css" media="print">
   // 打印样式
   </style>
   ```

#### 去除页眉页脚

@page 规则用于在打印文档时修改某些 CSS 属性。你不能用@page 规则来修改所有的 CSS 属性，而是只能修改 `margin,orphans,widow 和 page breaks of the document`。对其他属性的修改是无效的。

```scss
<style>
@media print {
  @page {
    margin: 1cm; // 可以控制打印布局（四周边距）
  }

  @page :first {
    margin: 2cm;
  }

  body {
    border: 1px solid #999;
  }
}
</style>

```

#### 控制分页

1. page-break-before: 控制在指定元素前是否分页
   - auto 默认值。如果必要则在元素前插入分页符。
   - always 在元素前插入分页符。
   - avoid 避免在元素前插入分页符。
   - left 在元素之前足够的分页符，一直到一张空白的左页为止。
   - right 在元素之前足够的分页符，一直到一张空白的右页为止。
   - inherit 规定应该从父元素继承 page-break-before 属性的设置。
2. page-break-after: 控制在指定元素后是否分页
   - auto 默认值。如果必要则在元素后插入分页符。
   - always 在元素后插入分页符。
   - avoid 避免在元素后插入分页符。
   - left 在元素之后足够的分页符，一直到一张空白的左页为止。
   - right 在元素之后足够的分页符，一直到一张空白的右页为止。
   - inherit 规定应该从父元素继承 page-break-after 属性的设置。
3. page-break-inside 控制指定元素中是否可以插入分页符
   - auto 默认。如果必要则在元素内部插入分页符。
   - avoid 避免在元素内部插入分页符。
   - inherit 规定应该从父元素继承 page-break-inside 属性的设置。

```scss
@media print {
  @page {
    /* 打印A4大小 */
    size: auto A4 landscape;
    /* 利用 margin 设置页边距 */
    margin: 0;
  }
  body {
    border: 1px solid #999;
  }
  p {
    page-break-after: always;
    page-break-inside: avoid; /* 避免元素被剪切 */
  }
}
```

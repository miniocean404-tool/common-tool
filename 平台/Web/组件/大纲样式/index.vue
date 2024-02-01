<script>
export default {
  props: {
    titles: {
      type: Array,
      default: () => [],
    },
  },
  components: {},
  data() {
    return {}
  },
  mounted() {},
}
</script>

<template>
  <div class="dir-num-container">
    <div class="title-list" v-for="info in titles">
      <a href="#link_to_heading">
        <span class="title">{{ info.title }}</span>
        <span class="page-num">{{ info.page }}</span>
      </a>
    </div>
  </div>
</template>

<style scoped lang="scss">
a:visited {
    color: unset;
  }


.dir-num-container {
  font-size: 14px;
  font-weight: 400;
  line-height: 28px;
  text-align: left;
  color: #262626;

  .title-list a {
    text-decoration: none;

    display: grid;
    grid-template-columns: auto max-content;
    align-items: end;
    margin-block-start: 0.3em;

    .title {
      position: relative;
      overflow: hidden;

      &::after {
        position: absolute;
        padding-left: 0.25ch;
        content: " . . . . . . . . . . . . . . . . . . . " ". . . . . . . . . . . . . . . . . . . . . . . " ". . . . . . . . . . . . . . . . . . . . . . . "
          ". . . . . . . . . . . . . . . . . . . . . . . " ". . . . . . . . . . . . . . . . . . . . . . . " ". . . . . . . . . . . . . . . . . . . . . . . "
          ". . . . . . . . . . . . . . . . . . . . . . . " ". . . . . . . . . . . . . . . . . . . . . . . " ". . . . . . . . . . . . . . . . . . . . . . . ";
        text-align: right;
      }
    }

    .page-num {
      min-width: 2ch;
      /* tabular-nums 启用表格数字显示。使数字等宽，易于像表格那样对齐。等同于 OpenType 特性 tnum */
      font-variant-numeric: tabular-nums;
      text-align: right;
    }
  }
}
</style>

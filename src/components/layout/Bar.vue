<template>
  <!--
  Bar is a horizontal component which has 3 sections; left, center, right
  The sections will be spaced such that;
  'left' is left-aligned
  'center' is center-aligned
  'right' is right-aligned
  behaviour unexpected if content cannot physically fit in the area
  -->
  <div class="bar">
    <div class="bar-left">
      <slot name="left"></slot>
    </div>
    <div class="bar-center">
      <slot name="center"></slot>
    </div>
    <div class="bar-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
</script>

<style scoped lang="scss">
.bar {
  align-items: stretch;
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
}

.bar-left {
  flex-grow: 1;
  flex-basis: 0;
  justify-content: flex-start;
  margin-right: auto;
  align-items: stretch;
  display: flex;
}

.bar-center {
  align-items: stretch;
  display: flex;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
}

.bar-right {
  flex-grow: 1;
  flex-basis: 0;
  justify-content: flex-end;
  margin-left: auto;
  align-items: stretch;
  display: flex;
}

.bar .navbar-item {
  align-items: center;
  display: flex;
}

.bar .bar-content {
  display: flex;
  align-items: center;
}
</style>

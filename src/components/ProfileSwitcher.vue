<template>
  <div>
    <p class="control">
      <span class="select">
        <select v-model="selectedLayout">
          <template v-for="layoutType in layoutTypes">
            <option :value="layoutType">{{layoutType}}</option>
          </template>
        </select>
      </span>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      layoutTypes: ['top-down', 'narrow-wide', 'hero-sidebar'],
      selectedLayout: 'top-down',
    };
  },
  created() {
    this.selectedLayout = this.$route.query.layout || 'top-down';
  },
  methods: {
    changeStyle(layoutType) {
      this.$router.replace({
        path: this.$route.path,
        query: {
          layout: layoutType,
        },
      });
    },
  },
  watch: {
    selectedLayout() {
      this.changeStyle(this.selectedLayout);
    },
  },
};
</script>

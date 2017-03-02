<template>
  <footer class="footer sui-footer">
    <div class="container">
      <div class="has-text-centered">
        <p>
          <router-link :to="{ name: 'home' }">
            <strong>social-ui</strong>
          </router-link>
          by
          <a href="https://aaron-tay.github.io" target="_blank">aaron-tay</a>
          using
          <a href="//bulma.io/" target="_blank">bulma.io</a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'footer',
  components: {
  },
  data() {
    return {
    };
  },
};
</script>

<style lang="scss">
.sui-footer {
  padding-bottom: 3rem;
}
</style>

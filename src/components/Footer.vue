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
        </p>
        <p>
          Developed using
          <a href="https://vuejs.org" target="_blank">vuejs</a>,
          <a href="http://bulma.io" target="_blank">bulma.io</a>,
          <a href="http://placehod.it" target="_blank">placehold.it</a>,
          <a href="http://chancejs.com" target="_blank">chance</a>
        </p>
        <p>
          View it on
          <a href="https://github.com/aaron-tay/social.ui" target="_blank">GitHub</a>
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

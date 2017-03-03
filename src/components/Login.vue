<template>
  <div class="account-login">
    <section class="hero is-light is-fullheight">
      <div class="hero-body">
        <div class="container is-fluid">
          <div class="columns">
            <div class="column is-4 is-offset-4">
              <form class="box">
                <p>
                  <div class="image is-16by9">
                    <img src="https://placehold.it/160x90" />
                  </div>
                </p>
                <hr />
                <p class="control has-icon">
                  <input class="input" type="text" placeholder="Email">
                  <span class="icon is-small">
                    <i class="fa fa-envelope"></i>
                  </span>
                </p>
                <p class="control has-addons has-icon">
                  <input class="input is-expanded" type="password" placeholder="Password">
                  <span class="icon is-small">
                    <i class="fa fa-lock"></i>
                  </span>
                  <a class="button">Forgot?</a>
                </p>
                <hr />
                <p class="control">
                  <button class="button is-medium is-primary is-fullwidth">Login</button>
                </p>
              </form>
              <div class="box has-text-centered">
                <router-link :to="{ name: 'register' }" class="button is-info is-inverted is-fullwidth">
                  Register an account &gt;
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <sui-footer></sui-footer>
  </div>
</template>

<script>
import SuiFooter from './Footer';

export default {
  components: {
    SuiFooter,
  },
};
</script>

<style lang="scss">
</style>

<template>
  <div class="account-register">
    <section class="hero is-light is-fullheight">
      <div class="hero-head">
        <header class="nav">
          <div class="container is-fluid">
            <div class="nav-left">
              <router-link :to="{ name: 'home' }" class="nav-item">
                <img src="https://placehold.it/64x64" alt="social-ui"/>&nbsp;social-ui
              </router-link>
            </div>
          </div>
        </header>
      </div>
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
                <div class="control is-grouped">
                  <p class="control has-icon is-expanded">
                    <input class="input" type="password" placeholder="Password">
                    <span class="icon is-small">
                      <i class="fa fa-lock"></i>
                    </span>
                  </p>
                  <p class="control is-expanded">
                    <input class="input" type="password" placeholder="Confirm">
                  </p>
                </div>
                <p class="has-text-centered">
                  <small>
                    By registering you agree to our
                    <a class="">
                      <strong>terms of service</strong>
                    </a>
                  </small>
                </p>
                <hr />
                <p class="control">
                  <router-link tag="button" :to="{ name: 'profile', params: { profileId: 'me' } }" class="button is-medium is-primary is-fullwidth">
                    Create account
                  </router-link>
                </p>
              </form>
              <div class="box has-text-centered">
                <router-link :to="{ name: 'login' }" class="button is-dark is-inverted is-fullwidth">
                  Have an account? Log in &gt;
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

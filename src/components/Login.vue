<template>
  <div class="account-login">
    <section class="hero is-light is-fullheight">
      <div class="hero-head">
        <header class="nav">
          <div class="container">
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
                <div class="field">
                  <p class="control has-icon">
                    <input class="input" type="text" placeholder="Email">
                    <span class="icon is-small">
                      <i class="fa fa-envelope"></i>
                    </span>
                  </p>
                </div>
                <div class="field has-addons">
                  <p class="control has-icon is-expanded">
                    <input class="input" type="password" placeholder="Password">
                    <span class="icon is-small">
                      <i class="fa fa-lock"></i>
                    </span>
                  </p>
                  <p class="control">
                    <a class="button">Forgot?</a>
                  </p>
                </div>
                <hr />
                <div class="field">
                  <p class="control">
                    <router-link tag="button" :to="{ name: 'profile', params: { profileId: 'me' } }" class="button is-medium is-primary is-fullwidth">
                      Login
                    </router-link>
                  </p>
                </div>
              </form>
              <div class="box has-text-centered">
                <router-link :to="{ name: 'register' }" class="button is-dark is-inverted is-fullwidth">
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

<template>
  <div class="home">
    <nav class="nav has-shadow">
      <div class="nav-left">
        <a class="nav-item">
          social-ui
        </a>
      </div>

      <div class="nav-center is-hidden-tablet">
        <span class="nav-item">
          <router-link :to="{ name: 'login' }" class="button is-primary is-outlined">
            <span>Login</span>
          </router-link>
        </span>
        <span class="nav-item">
          <router-link :to="{ name: 'register' }" class="button is-primary">
            <span>Register</span>
          </router-link>
        </span>
      </div>

      <div class="nav-right is-hidden-mobile">
        <span class="nav-item">
          <router-link :to="{ name: 'login' }" class="button is-primary is-outlined">
            <span>Login</span>
          </router-link>
        </span>
        <span class="nav-item">
          <router-link :to="{ name: 'register' }" class="button is-primary">
            <span>Register</span>
          </router-link>
        </span>
      </div>
    </nav>

    <section class="hero is-primary is-medium">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">
            Awesome new social site
          </h1>
          <h2 class="subtitle">
            where people can be social on a site
          </h2>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="columns is-multiline">
          <div class="column is-one-third has-text-centered">
            <div class="content">
              <p>
                <div class="image is-16by9">
                  <img src="https://placehold.it/160x90" />
                </div>
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis efficitur nisi non diam convallis laoreet.
              </p>
            </div>
          </div>
          <div class="column is-one-third has-text-centered">
            <div class="content">
              <p>
                <div class="image is-16by9">
                  <img src="https://placehold.it/160x90" />
                </div>
              </p>
              <p>
                Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas vitae finibus risus.
              </p>
            </div>
          </div>
          <div class="column is-one-third has-text-centered">
            <div class="content">
              <p>
                <div class="image is-16by9">
                  <img src="https://placehold.it/160x90" />
                </div>
              </p>
              <p>
                Donec euismod lacus ac ipsum placerat pretium ac sed felis. Donec et mauris id augue convallis efficitur in nec purus.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="hero is-light">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column is-half">
              <div class="image is-2by1">
                <img src="https://placehold.it/160x80" />
              </div>
            </div>
            <div class="column is-one-third is-offset-1">
              <h1 class="title">
                Aenean neque tellus
              </h1>
              <h2 class="subtitle">
                Maecenas ac leo ac dolor suscipit pellentesque.
                Aenean massa sem, scelerisque vitae odio sed, scelerisque auctor odio.
                Pellentesque tristique metus ac sollicitudin sagittis.
                Maecenas ut leo in nisl tincidunt fermentum ut at odio.
              </h2>
              <p>
                <button class="button is-primary">Get started</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-tablet-reversed">
            <div class="column is-half is-offset-2">
              <div class="image is-2by1">
                <img src="https://placehold.it/160x80" />
              </div>
            </div>
            <div class="column is-one-third">
              <h1 class="title">
                Aenean neque tellus
              </h1>
              <h2 class="subtitle">
                Ac sollicitudin sagittis pellentesque tristique metus.
                Tincidunt fermentum ut at odio maecenas ut leo in nisl.
                Odio odio aenean sed, scelerisque auctor massa sem, scelerisque vitae.
                Suscipit ac dolor Maecenas ac leo pellentesque.
              </h2>
              <p>
                <button class="button is-primary is-outlined">Learn more</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-multiline is-mobile">
            <div class="column is-half-mobile">
              <div class="image is-16by9">
                <img src="https://placehold.it/160x90" />
              </div>
            </div>
            <div class="column is-half-mobile">
              <div class="image is-16by9">
                <img src="https://placehold.it/160x90" />
              </div>
            </div>
            <div class="column is-half-mobile">
              <div class="image is-16by9">
                <img src="https://placehold.it/160x90" />
              </div>
            </div>
            <div class="column is-half-mobile">
              <div class="image is-16by9">
                <img src="https://placehold.it/160x90" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="hero is-primary is-medium">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">
            Try it now
          </h1>
          <h2 class="subtitle">
            Unlock awesomeness
          </h2>
          <router-link :to="{ name: 'profile', params: { profileId: 'me' } }" class="button is-primary is-medium is-inverted">
            Get started
          </router-link>
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
.is-tablet-reversed {
  flex-direction: row-reverse;
}
</style>

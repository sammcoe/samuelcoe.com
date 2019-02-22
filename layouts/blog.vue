<template>
  <div>
    <nav
      class="navbar is-fixed-top"
      role="navigation"
      aria-label="main navigation">
      <div class="navbar-brand">
        <nuxt-link
          class="navbar-item"
          to="/">
          <img
            src="~/assets/SC_logo.svg"
            alt="Samuel Coe"
            height="28">
        </nuxt-link>
        <button class="button navbar-burger">
          <span/>
          <span/>
          <span/>
        </button>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <nuxt-link
            class="navbar-item"
            to="/about">
            about
          </nuxt-link>
          <nuxt-link
            class="navbar-item"
            to="/recommendations">
            recommendations
          </nuxt-link>
          <nuxt-link
            class="navbar-item"
            to="/blog-posts">
            blog
          </nuxt-link>
        </div>
        <div
          v-if="$store.state.posts.post.attributes"
          class="navbar-item has-text-primary has-text-weight-semibold">
          {{ $store.state.posts.post.attributes.title }}
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="field is-grouped">
              <p class="control">
                <a
                  class="button is-info"
                  data-social-network="Twitter"
                  href="https://twitter.com/SamuelMcoe">
                  <span class="icon">
                    <fa :icon="['fab', 'twitter']"/>
                  </span>
                  <span>Twitter</span>
                </a>
              </p>
              <p class="control">
                <a
                  class="button"
                  data-social-network="Github"
                  href="https://github.com/sammcoe">
                  <span class="icon">
                    <fa :icon="['fab', 'github']"/>
                  </span>
                  <span>GitHub</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <nuxt/>
    <footer class="footer">
      <div class="container">
        <div class="content has-text-centered">
          <p>
            Copyright © {{ (new Date).getFullYear() }} Samuel Coe
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>

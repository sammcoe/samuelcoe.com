<template>
  <div>
    <nav
      class="navbar"
      role="navigation"
      aria-label="main navigation">
      <div class="navbar-brand"/>
      <div class="navbar-menu">
        <div class="navbar-start">
          <nuxt-link
            class="navbar-item"
            to="/">
            Home
          </nuxt-link>
          <nuxt-link
            class="navbar-item"
            to="/">
            About
          </nuxt-link>
          <nuxt-link
            class="navbar-item"
            to="/">
            What I'm...
          </nuxt-link>
          <nuxt-link
            class="navbar-item"
            to="/">
            Recommendations
          </nuxt-link>
        </div>
        <no-ssr>
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="field is-grouped">
                <p class="control">
                  <a
                    class="button is-info"
                    data-social-network="Twitter"
                    href="https://twitter.com/SamuelMcoe">
                    <span class="icon">
                      <i class="fab fa-twitter"/>
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
                      <i class="fab fa-github"/>
                    </span>
                    <span>GitHub</span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </no-ssr>
      </div>
    </nav>
    <section class="container">
      <div>
        <app-logo/>
        <h1 class="title">
          samuelcoe.com
        </h1>
        <h2 class="subtitle">
          Personal website for Samuel Coe
        </h2>
      </div>
    </section>
  </div>
</template>

<script>
import '~/assets/fontawesome-all.js'
import AppLogo from '~/components/AppLogo.vue'

export default {
  components: {
    AppLogo
  }
}
</script>

<style>
</style>

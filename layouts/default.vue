<template>
  <div>
    <nav
      class="navbar"
      role="navigation"
      aria-label="main navigation">
      <div class="navbar-brand">
        <nuxt-link
          class="navbar-item"
          to="/">
          <img
            src="~/static/SC_logo.png"
            alt="Samuel Coe"
            width="28" 
            eight="28">
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

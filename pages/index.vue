<template>
  <div class="has-navbar-fixed-top">
    <section class="hero is-bold is-primary">
      <div class="hero-body main-banner">
        <div class="columns">
          <div class="column is-half vcenter">
            <img
              class="invert"
              src="~/static/samuel_coe_logo.svg"
              alt="Samuel Coe"
              width="100%">
          </div>
          <div class="column"/>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="tile is-ancestor">
        <div class="tile is-vertical is-9">
          <div class="tile">
            <div class="tile is-parent is-4">
              <article class="tile is-child box">
                <no-ssr>
                  <twitter-feed/>
                </no-ssr>
              </article>
            </div>
            <div class="tile is-parent">
              <div class="tile is-child">
                <blog-list/>
              </div>              
            </div>
          </div>
        </div>
        <div class="tile is-parent">
          <article class="tile box is-child is-vertical">
            <div class="tile">
              <github-vue
                class="is-centered"
                :token="token"
                avatar
                hireable
                company
                email
                bio
                vertical
                no-border/>
            </div>
            <div class="tile">
              <div class="tile">
                <img
                  class="is-centered"
                  width="100px"
                  src="~/static/JavaScript_logo.svg">
              </div>
              <div class="tile">
                <img
                  class="is-centered"
                  width="100px"
                  src="~/static/Node.js_logo.svg">
              </div>
              <div class="tile">
                <img 
                  class="is-centered"
                  width="100px"
                  src="~/static/Vue.js_Logo.svg">
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import BlogList from '~/components/BlogList.vue';
import TwitterFeed from '~/components/TwitterFeed.vue';
import gitConfig from '../config/github';

export default {
  components: {
    BlogList,
    TwitterFeed
  },
  data: () => ({
    token: gitConfig.token
  })
}
</script>

<style>
.vcenter {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.is-centered {
  margin: auto;
}

.full-height {
  height: 100%;
}

.header-twit {
  padding-left: 400px;
  padding-right: 200px;
}

.invert {
  filter: invert(1);
  -webkit-filter: invert(1);
}

.transparent {
  filter: opacity(.3);
}

.header-logo-secondary {
  filter: invert(1) opacity(.3);
  -webkit-filter: invert(1) opacity(.3);
}

.main-banner {
  padding: 1.5rem 1.5rem;
}

.column-head {
  border-radius: 5px;
  margin-bottom: 10px;
}
</style>

<template>
  <div>
    <section class="hero is-bold is-primary">
      <div class="hero-body main-banner">
        <div class="columns">
          <div class="column is-half vcenter">
            <img
              class="invert logo"
              src="~/static/samuel_coe_logo.svg"
              alt="Samuel Coe"
              width="100%">
          </div>
          <div class="column">
            <github-vue
              class="is-centered"
              :token="token"
              avatar
              hireable
              company
              email
              bio/>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="tile is-ancestor">
        <div class="tile is-vertical is-10">
          <div class="tile">
            <div class="tile is-parent is-4">
              <article class="tile is-child box">
                <div class="hero is-dark is-bold column-head">
                  <div class="hero-body">
                    <h1 class="title has-text-centered">Twitter</h1>
                  </div>
                </div>
                <twitter-feed/>
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child box">
                <div class="hero is-dark is-bold column-head">
                  <div class="hero-body">
                    <h1 class="title has-text-centered">News</h1>
                  </div>
                </div>
                <h1 class="subtitle is-1 has-text-centered">Nothing new here. 🐱‍🏍</h1>
              </article>
            </div>
          </div>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child box">
            <div class="hero is-dark is-bold column-head">
              <div class="hero-body">
                <h1 class="title has-text-centered">Other</h1>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import '~/assets/fontawesome-all.js';
import TwitterFeed from '~/components/TwitterFeed.vue';
import gitConfig from '../config/github';

export default {
  components: {
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

.logo {
  filter: invert(1);
  -webkit-filter: invert(1);
}

.transparent {
  filter: opacity(.3);
}

.main-banner {
  padding: 1.5rem 1.5rem;
}

.column-head {
  border-radius: 5px;
  margin-bottom: 10px;
}
</style>

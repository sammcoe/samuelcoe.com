<template>
  <div>
    <section class="hero is-bold is-primary">
      <div class="hero-body">
        <div class="columns">
          <div class="column">
            <div class="level full-height">
              <div class="level-item vcenter">
                <img
                  src="~/static/SC_logo_white.png"
                  alt="Samuel Coe"
                  width="200" 
                  height="200">
              </div>
            </div>
          </div>
          <div class="column is-two-thirds header-twit">
            <github-vue
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
                <twitter-feed/>
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child box vcenter">
                <h1 class="subtitle is-1 has-text-centered">Nothing new here. 🐱‍🏍</h1>
              </article>
            </div>
          </div>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child box">
            <figure class="image">
              <img
                src="~/static/sc_tall_cmp.png"
                alt="sc tall">
            </figure>
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

.full-height {
  height: 100%;
}

.header-twit {
  padding-left: 400px;
  padding-right: 200px;
}
</style>

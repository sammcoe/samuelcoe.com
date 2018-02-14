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
            <github-card
              token="84c93925860375a635d65f1b43f2feac6b9431e7"
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
            <div class="level">
              <div class="level-item">
                <img
                  src="~/static/sc_tall_cmp.png"
                  alt="sc tall"
                  width="300px">
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import '~/assets/fontawesome-all.js'
import TwitterFeed from '~/components/TwitterFeed.vue'
import GithubCard from '~/components/GithubCard.vue'

export default {
  components: {
    GithubCard,
    TwitterFeed
  }
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

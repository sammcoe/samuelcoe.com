<template>
  <div>
    <section class="hero is-bold is-primary">
      <div class="hero-body">
        <img
          class="transparent invert"
          src="~/static/samuel_coe_logo.svg"
          alt="Samuel Coe"
          width="25%">
      </div>
    </section>
    <section class="hero is-bold is-dark">
      <div class="hero-body">
        <h1 class="title">About</h1>
      </div>
    </section>
    <section class="section">
      <div class="tile is-ancestor">
        <div class="tile is-vertical is-10">
          <div class="tile">
            <div class="tile is-parent is-3">
              <article class="tile is-child box">
                <img
                  src="../static/sc_tall_cmp.png"
                  width="100%">
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child box vcenter">
                <h1 class="subtitle is-1 has-text-centered">About me</h1>
              </article>
            </div>
          </div>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child"/>
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

</style>

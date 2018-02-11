<template>
  <section class="hero is-bold is-primary">
    <div class="hero-body">
      <div class="columns">
        <div class="column">
          <img
            src="~/static/SC_logo_white.png"
            alt="Samuel Coe"
            width="200" 
            eight="200">
        </div>
        <div class="column is-three-quarters">
          <twitter-feed/>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import '~/assets/fontawesome-all.js'
import TwitterFeed from '~/components/TwitterFeed.vue'

export default {
  components: {
    TwitterFeed
  }
}
</script>

<style>

</style>

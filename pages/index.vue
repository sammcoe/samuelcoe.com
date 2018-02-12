<template>
  <div>
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
    <section class="section">
      <div class="tile is-ancestor">
        <div class="tile is-vertical is-8">
          <div class="tile">
            <div class="tile is-parent is-vertical">
              <article class="tile is-child box">
                <!-- Put any content you want -->
              </article>
              <article class="tile is-child box">
                <!-- Put any content you want -->
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child box">
                <!-- Put any content you want -->
              </article>
            </div>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child box">
              At this time, I have over three years of technical experience and
              experience in a professional, fast-paced production environment that manages, analyzes, and maintains a platform that handles
              the routing and processing of business-to-business and applicationa-to-application datasets.  While gaining this experience and completing school,
              I worked with a small team of developers to create a social based class management system for students, which is now
              open sourced.  I am passionate about improving anything I am involved in and helping to make an impact by enhancing 
              whatever I touch— whether it's a project or a team. I am very creative in nature and love engineering user experiences
              and visual aspects in addition to coding. Programming and design are two things that I have been passionate about 
              from a young age— always seeking out knowledge to grow in both.
            </article>
          </div>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child box">
            <img
              src="~/static/sc_tall_cmp.png"
              alt="sc tall">
          </article>
        </div>
      </div>
    </section>
  </div>
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

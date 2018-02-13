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
            <twitter-feed/>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="tile is-ancestor">
        <div class="tile is-vertical is-10">
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
                <github-card
                  token="84c93925860375a635d65f1b43f2feac6b9431e7"
                  no-border
                  bio/>
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

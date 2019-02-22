<template>
  <div class="has-navbar-fixed-top">
    <section class="section">
      <div class="tile is-ancestor">
        <div class="tile is-vertical is-12">
          <div class="tile">
            <div class="tile is-parent is-vertical is-4">
              <div class="tile is-child">
                <github-vue
                  :token="token"
                  class="is-centered"
                  avatar
                  company
                  email
                  vertical
                  bio/>
              </div>
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
      </div>
    </section>
  </div>
</template>

<script>
import BlogList from '~/components/BlogList.vue';
import TwitterFeed from '~/components/TwitterFeed.vue';

export default {
  components: {
    BlogList,
    TwitterFeed
  },
  data: () => ({
    token: process.env.gitToken
  })
}
</script>

<style>
@media screen and (max-width: 450px) {
  .section {
    padding: 3rem .5rem;
  }
}

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

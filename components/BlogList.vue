<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent is-vertical">
      <nuxt-link
        class="box post"
        :to="post.url"
        v-for="post in posts"
        :key="post.attributes.title">
        <div class="tile is-parent">
          <div class="tile is-child is-1 vcenter">
            <div class="is-centered post-dot is-primary"/>
          </div>
          <div class="tile is-child">
            <h1 class="title">{{ post.attributes.title }}</h1>
            <div class="subtitle is-size-6 has-text-grey">{{ formatDate(post) }}</div>
            <div>
              {{ post.attributes.description }}
            </div>
          </div>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns';

export default {
  fetch ({store, params}) {
    store.dispatch('posts/loadPost', params.post);
  },
  computed: {
    posts() { return this.$store.state.posts.posts}
  },
  methods: {
    formatDate(post) {
      return format(new Date(post.created), 'MMMM Do[,] YYYY')
    }
  }
}
</script>

<style>
.post {
  transition: all 0.2s ease;
}

.post:hover {
  box-shadow: 2px 4px 3px rgba(10, 10, 10, .1), 0 0 0 1px rgba(10, 10, 10, .1);
  -webkit-box-shadow: 2px 4px 3px rgba(10, 10, 10, .1), 0 0 0 1px rgba(10, 10, 10, .1);
}

.post-dot {
  border-radius: 100%;
  width: 1em;
  height: 1em;
  background-color: #4DBA87;
}
</style>

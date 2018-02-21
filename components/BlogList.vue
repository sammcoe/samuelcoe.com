<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent is-vertical">
      <nuxt-link
        class="box post"
        :to="post.url"
        v-for="post in posts"
        :key="post.attributes.title">
        <div class="tile is-parent">
          <div class="tile is-child is-2 vcenter">
            <div class="post-image">
              {{ post.attributes.badge }}
            </div>
          </div>
          <div class="tile is-child">
            <h1 class="has-text-weight-semibold">{{ post.attributes.title }}</h1>
            <div class="has-text-weight-light has-text-grey">{{ formatDate(post) }}</div>
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

.post-image {
  width: 120px;
  height: 120px;
  border-radius: 5px;
  background-color: #4DBA87;
  font-weight: light;
  font-size: 3em;
  color: white;
  text-align: right;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-right: 15px; 
}
</style>

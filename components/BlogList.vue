<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent is-vertical">
      <nuxt-link
        v-for="post in posts"
        :to="post.url"
        :key="post.attributes.title"
        class="box post">
        <div class="tile is-parent">
          <div class="tile is-child is-2 vcenter">
            <img
              v-if="post.attributes.image"
              :src="post.attributes.image"
              class="is-centered"
              width="90%">
            <div
              v-if="!post.attributes.image"
              :style="{ backgroundColor: '#' + post.attributes.color, color: invertColor('#' + post.attributes.color, true)}"
              class="post-image">
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
      return format(new Date(post.attributes.created), 'MMMM Do[,] YYYY')
    },
    invertColor(hex, bw) {
      if (hex.indexOf('#') === 0) {
          hex = hex.slice(1);
      }
      // convert 3-digit hex to 6-digits.
      if (hex.length === 3) {
          hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
      }
      if (hex.length !== 6) {
          throw new Error('Invalid HEX color.');
      }
      var r = parseInt(hex.slice(0, 2), 16),
          g = parseInt(hex.slice(2, 4), 16),
          b = parseInt(hex.slice(4, 6), 16);
      if (bw) {
          return (r * 0.299 + g * 0.587 + b * 0.114) > 186
              ? '#000000'
              : '#FFFFFF';
      }
      // invert color components
      r = (255 - r).toString(16);
      g = (255 - g).toString(16);
      b = (255 - b).toString(16);
      // pad each with zeros and return
      return "#" + padZero(r) + padZero(g) + padZero(b);
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
  width: 90%;
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

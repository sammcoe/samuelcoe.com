<template>
  <div class="comment-box">
    <article class="media">
      <figure class="media-left">
        <p class="image is-64x64">
          <img :src="avatar">
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <p>
            <strong>{{ comment.name }} </strong>
            <small class="is-size-7 has-text-grey-darker">{{ createdAt }}</small>
            <br>
            {{ comment.message }}
          </p>
        </div>
        <nav class="level is-mobile">
          <div class="level-left">
            <!--
            <a class="level-item">
              <span class="icon is-small"><fa :icon="['fas', 'reply']"/></span>
            </a>
            <a class="level-item">
              <span class="icon is-small"><i class="fas fa-retweet"></i></span>
            </a>
            <a class="level-item">
              <span class="icon is-small"><i class="fas fa-heart"></i></span>
            </a>
            -->
          </div>
        </nav>
      </div>
    </article>
  </div>
</template>

<script>
import { format } from 'date-fns'

export default {
  props: {
    comment: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    createdAt () {
      return format(new Date(this.comment.date), 'MMMM Do[,] YYYY');
    },
    avatar () {
      return 'https://www.gravatar.com/avatar/' + this.comment.email + '?d=mm&s=128'
    }
  }
}
</script>

<style>
.comment-box {
  padding: 15px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 3px rgba(10, 10, 10, .1), 0 0 0 1px rgba(10, 10, 10, .1);
  -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, .1), 0 0 0 1px rgba(10, 10, 10, .1);
}
</style>

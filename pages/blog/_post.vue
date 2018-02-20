<template>
  <div class="content">
    <h1 class="title">{{ post.title }}</h1>
    <br>
    <small><i class="el-icon-date"/>{{ createdAt }}</small>
    <div v-html="postFile"/>
  </div>
</template>

<script>
  import {format} from 'date-fns';
  import { mapMutations } from 'vuex';
  
  export default {
    fetch ({store, params}) {
      store.dispatch('posts/loadPost', params.post);
    },
    head () {
      return {
        title: this.postTitle
      }
    },
    computed: {
      post () {
        return this.$store.state.posts.post;
      },
      postFile () {
        if (this.post.filename) {
          return require(`./${this.post.filename}`);
        }
      },
      createdAt () {
        return format(new Date(this.post.created), 'MMMM Do[,] YYYY');
      },
      postTitle () {
        return `Samuel Coe Blog :: ${this.post.title}`;
      }
    }
  }
</script>
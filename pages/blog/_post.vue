<template>
  <div
    v-if="post"
    class="has-navbar-fixed-top">
    <section class="hero is-bold is-primary">
      <div class="hero-body">
        <div class="level">
          <p class="level-item">
            <img
              style="height: 50px;"
              class="header-logo-secondary"
              src="~/static/samuel_coe_logo.svg"
              alt="Samuel Coe">
          </p>
          <p class="level-item title is-1 has-text-centered has-text-weight-light">
            blog
          </p>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="tile is-ancestor">
        <div class="tile is-vertical is-12">
          <div class="tile">
            <div class="tile is-parent is-3"/>
            <div class="tile is-parent is-vertical box is-6">
              <div class="tile is-child vcenter">
                <section class="hero is-primary">
                  <div class="hero-body">
                    <h1 class="title has-text-weight-light">{{ post.attributes.title }}</h1>
                    <p class="has-text-weight-light">{{ createdAt }}</p>
                  </div>
                </section>
              </div>
              <div class="tile is-child">
                <div class="content">
                  <div v-html="$md.render(post.body)"/>
                </div>
              </div>
              <div class="tile is-child comments">
                <h1 class="subtitle">Comments</h1>
                <comments :slug="post.slug"/>
                <div
                  class="comment"
                  v-for="comment in comments"
                  :key="comment.id">
                  <comment :comment="comment"/>
                </div>
              </div>
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
  import { format } from 'date-fns';
  import { mapMutations } from 'vuex';
  import Comments from '~/components/Comments.vue'
  import Comment from '~/components/Comment.vue'
  
  export default {
    components: {
      Comment,
      Comments,
      VueDisqus
    },
    fetch ({store, params}) {
      store.dispatch('posts/loadPost', params.post);
      store.dispatch('comments/loadComments', params.post);
    },
    head () {
      return {
        title: this.postTitle
      }
    },
    computed: {
      comments () {
        return this.$store.state.comments.comments;
      },
      post () {
        return this.$store.state.posts.post;
      },
      createdAt () {
        return format(new Date(this.post.attributes.created), 'MMMM Do[,] YYYY');
      },
      postTitle () {
        if (this.post) {
          return `Samuel Coe Blog :: ${this.post.attributes.title}`;
        }
      }
    }
  }
</script>

<style>
.header-logo-secondary {
  filter: invert(1) opacity(.3);
  -webkit-filter: invert(1) opacity(.3);
}

.tile.is-child.comments {
  background-color: #F5F5F5;
  margin: -11px !important;
  padding: 15px;
  border-radius: 0px 0px 5px 5px;
}

.comment {
  margin-top: 25px;
}
</style>
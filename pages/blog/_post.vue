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
              src="~/assets/samuel_coe_logo.svg"
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
              <div class="tile is-parent">
                <div
                  class="tile is-child is-3"
                  v-if="post.attributes.image">
                  <div class="is-centered vcenter">
                    <img
                      width="90%"
                      :src="postImage">
                  </div>
                </div>
                <div class="tile is-child vcenter">
                  <h1 class="title has-text-weight-light has-text-primary is-2">{{ post.attributes.title }}</h1>
                  <p class="has-text-weight-light">{{ createdAt }}</p>
                </div>
              </div>
              <div class="is-divider"/>
              <div class="tile is-child">
                <div class="content">
                  <div v-html="$md.render(post.body)"/>
                </div>
              </div>
              <div class="tile is-child">
                <vue-goodshare-twitter 
                  :page_url="`https://samuelcoe.com${post.url}`" 
                  :page_title="postTitle"/>
                <vue-goodshare-facebook 
                  :page_url="`https://samuelcoe.com${post.url}`" 
                  :page_title="postTitle"/>
                <vue-goodshare-google-plus 
                  :page_url="`https://samuelcoe.com${post.url}`" 
                  :page_title="postTitle"/>
                <vue-goodshare-reddit 
                  :page_url="`https://samuelcoe.com${post.url}`" 
                  :page_title="postTitle"/>
                <vue-goodshare-linked-in 
                  :page_url="`https://samuelcoe.com${post.url}`" 
                  :page_title="postTitle"/>
              </div>
              <div class="tile is-child comments">
                <h1 class="subtitle">Comments</h1>
                <comments
                  :comments="post.comments"
                  :slug="post.slug"/>
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
  import VueGoodshareFacebook from '~/components/Facebook.vue'
  import VueGoodshareTwitter from '~/components/Twitter.vue'
  import VueGoodshareReddit from '~/components/Reddit.vue'
  import VueGoodshareGooglePlus from '~/components/GooglePlus.vue'
  import VueGoodshareLinkedIn from '~/components/LinkedIn.vue'
  
  export default {
    layout: 'blog',
    scrollToTop: true,
    components: {
      Comments,
      VueGoodshareFacebook,
      VueGoodshareTwitter,
      VueGoodshareReddit,
      VueGoodshareGooglePlus,
      VueGoodshareLinkedIn

    },
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
      createdAt () {
        return format(new Date(this.post.attributes.created), 'MMMM Do[,] YYYY');
      },
      postTitle () {
        if (this.post) {
          return `Samuel Coe Blog :: ${this.post.attributes.title}`;
        }
      },
      postImage () {
        return `/${this.post.attributes.image}`;
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
  background-color: #f7f9ff;
  margin: -11px !important;
  padding: 15px;
  border-radius: 0px 0px 5px 5px;
}

.vcenter {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
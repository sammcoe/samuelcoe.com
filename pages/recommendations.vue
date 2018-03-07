<template>
  <div class="has-navbar-fixed-top">
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
            recommendations
          </p>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="tile is-ancestor">
        <div class="tile is-vertical is-3">
          <h1 class="title has-text-primary">books</h1>
          <div class="tile is-parent is-vertical">
            <media-card
              v-for="book in books"
              :key="book.filename"
              :image="book.image"
              :header="book.title"
              :text="book.text"
              :link="book.link"/>
          </div>
        </div>
        <div class="tile is-1"/>
        <div class="tile is-vertical is-4">
          <h1 class="title has-text-primary">podcasts</h1>
          <div class="tile is-parent is-vertical">
            <media-card
              v-for="podcast in podcasts"
              :key="podcast.filename"
              :image="podcast.image"
              :header="podcast.title"
              :text="podcast.text"
              :link="podcast.link"/>
          </div>
        </div>
        <div class="tile is-1"/>
        <div class="tile is-vertical is-3">
          <h1 class="title has-text-primary">blogs</h1>
          <div class="tile is-parent is-vertical">
            <media-card
              v-for="blog in blogs"
              :key="blog.filename"
              :image="blog.image"
              :header="blog.title"
              :text="blog.text"
              :link="blog.link"/>
          </div>
        </div>
        <!--
        <div class="tile is-vertical is-3">
          <h1 class="title has-text-primary">products</h1>
          <div class="tile is-parent">
            <media-card
              v-for="product in products"
              :key="product.filename"
              :image="product.image"
              :header="product.title"
              :text="product.text"
              :link="product.link"/>
          </div>
        </div>
        -->
      </div>
    </section>
  </div>
</template>

<script>
import MediaCard from '~/components/MediaCard';

export default {
  components: {
    MediaCard
  },
  computed: {
    books() {
      return this.$store.state.recs.recommendations.filter(
        rec => rec.type === 'book'
      );
    },
    podcasts() {
      return this.$store.state.recs.recommendations.filter(
        rec => rec.type === 'podcast'
      );
    },
    blogs() {
      return this.$store.state.recs.recommendations.filter(
        rec => rec.type === 'blog'
      );
    },
    products() {
      return this.$store.state.recs.recommendations.filter(
        rec => rec.type === 'product'
      );
    }
  }
};
</script>

<style>
.header-logo-secondary {
  filter: invert(1) opacity(0.3);
  -webkit-filter: invert(1) opacity(0.3);
}
</style>
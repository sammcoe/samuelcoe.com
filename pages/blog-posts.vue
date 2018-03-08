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
            <div class="tile is-parent is-vertical is-6">
              <blog-list/>
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
import BlogList from '~/components/BlogList.vue';

export default {
  components: {
    BlogList
  }
}
</script>

<style>
.header-logo-secondary {
  filter: invert(1) opacity(.3);
  -webkit-filter: invert(1) opacity(.3);
}
</style>
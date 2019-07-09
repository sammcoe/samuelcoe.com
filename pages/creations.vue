<template>
  <div class="has-navbar-fixed-top">
    <section class="hero is-bold is-primary">
      <div class="hero-body">
        <div class="level">
          <p class="level-item" />
          <p class="level-item title is-2 has-text-centered has-text-weight-light">creations</p>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="tile is-ancestor">
        <div class="tile is-vertical is-3" />
        <div class="tile is-1" />
        <div class="tile is-vertical is-4">
          <h1 class="title has-text-primary">apps</h1>
          <div class="tile is-parent is-vertical">
            <media-card
              v-for="app in apps"
              :key="app.filename"
              :image="app.image"
              :header="app.title"
              :text="app.text"
              :link="app.link"
            />
          </div>
        </div>
        <div class="tile is-1" />
        <div class="tile is-vertical is-3" />
      </div>
    </section>
  </div>
</template>

<script>
import MediaCard from "~/components/MediaCard";

export default {
  components: {
    MediaCard
  },
  computed: {
    apps() {
      return this.$store.state.creations.apps.filter(
        creation => creation.type === "app"
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

.title.has-text-primary {
  margin-left: 0.75rem;
}
</style>
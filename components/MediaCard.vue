<template>
  <a
    :href="link"
    class="box">
    <div class="tile is-vertical">
      <div class="is-child media">
        <img
          :src="image"
          class="is-centered"
          alt="Media Image">
      </div>
      <div class="is-child">
        <h1 class="title has-text-primary has-text-weight-light">{{ header }}</h1>
        <p>{{ text }}</p>
      </div>
    </div>
  </a>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      default: ''
    },
    header: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      default: ''
    }
  }
};
</script>

<style>
.media {
  margin-bottom: 20px;
}

.is-centered {
  margin-left: auto;
  margin-right: auto;
}
</style>

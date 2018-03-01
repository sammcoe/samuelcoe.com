<template>
  <div>
    <form
      method="POST"
      action="https://api.staticman.net/v2/entry/sammcoe/samuelcoe.com/master/comments">
      <input
        :value="slug"
        name="options[slug]"
        type="hidden">
      <div class="field">
        <p class="control has-icons-left has-icons-right">
          <input
            name="fields[name]"
            class="input"
            type="text"
            placeholder="Name">
          <span class="icon is-small is-left">
            <fa :icon="['fas', 'user']"/>
          </span>
        </p>
      </div>
      <div class="field">
        <p class="control has-icons-left has-icons-right">
          <input
            name="fields[email]"
            class="input"
            type="email"
            placeholder="Email">
          <span class="icon is-small is-left">
            <fa :icon="['fas', 'envelope']"/>
          </span>
        </p>
      </div>
      <div class="field">
        <div class="control">
          <textarea
            name="fields[message]"
            class="textarea"
            placeholder="Comment"/>
        </div>
      </div>
      <div class="control">
        <button class="button is-link">Submit</button>
      </div>
    </form>
    <div
      class="comment"
      v-for="comment in comments"
      :key="comment.id">
      <comment :comment="comment"/>
    </div>
  </div>
</template>

<script>
import Comment from '~/components/Comment';

export default {
  components: {
    Comment
  },
  props: {
    comments: {
      type: Array,
      default: () => []
    },
    slug: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>
.comment {
  margin-top: 25px;
}
</style>

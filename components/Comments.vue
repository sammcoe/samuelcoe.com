<template>
  <div>
    <div :class="['notification', 'is-primary', {'notify': notify}]">
      <button
        class="delete"
        @click="notify = !notify"/>
      Comment has been submitted for moderation!
    </div>
    <form @submit.prevent="'onSubmit'">
      <div class="field">
        <p class="control has-icons-left has-icons-right">
          <input
            v-model="comment.name"
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
            v-model="comment.email"
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
            v-model="comment.message"
            class="textarea"
            placeholder="Comment"/>
        </div>
      </div>
      <div class="control">
        <button
          :class="['button', 'is-link', { 'is-loading': loading }]"
          @click="submitComment()">Submit</button>
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
import axios from 'axios';
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
  },
  data: () => ({
    loading: false,
    notify: false,
    comment: {
      name: '',
      email: '',
      message: ''
    }
  }),
  methods: {
    submitComment() {
      this.loading = true;
      let formData = new URLSearchParams();
      formData.append('options[slug]', this.slug);
      formData.append('fields[name]', this.comment.name);
      formData.append('fields[email]', this.comment.email);
      formData.append('fields[message]', this.comment.message);

      axios.post('https://api.staticman.net/v2/entry/sammcoe/samuelcoe.com/master/comments', formData).then((response) => {
        this.notify = true;
        this.loading = false;
      }).catch((err) => {
        console.log(err);
        this.loading = false;
      })
    }
  }
}
</script>

<style>
.comment {
  margin-top: 25px;
}

.notification {
  opacity: 0;
  margin: -30px 0px -30px 0px !important;
  transition-duration: .5s;
}

.notification.notify {
  opacity: 1;
  margin: 30px 0px 30px 0px !important;
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

/* Animations to fade the notification in and out */
@-webkit-keyframes fadein {
    from {opacity: 0;} 
    to {opacity: 1;}
}

@keyframes fadein {
    from {opacity: 0;}
    to {opacity: 1;}
}

@-webkit-keyframes fadeout {
    from {opacity: 1;} 
    to {opacity: 0;}
}

@keyframes fadeout {
    from {opacity: 1;}
    to {opacity: 0;}
}
</style>

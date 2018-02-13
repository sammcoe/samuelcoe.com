<template>
  <div
    class="card"
    :class="{ borderless: noBorder }">
    <div class="card-content">
      <div class="columns">
        <div class="column">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img
                  :src="userInfo.avatarUrl"
                  alt="github avatar">
              </figure>
            </div>
            <div class="media-content no-scroll">
              <p class="title is-4">{{ userInfo.name }}</p>
              <p class="subtitle is-6">
                <a :href="userInfo.url">@{{ userInfo.login }}</a>
              </p>
            </div>
          </div>
          <div class="content">
            <div class="tile is-ancestor is-vertical">
              <div class="tile is-parent">
                <div class="tile is-child">
                  <p class="subtitle is-6">{{ userInfo.bio }}</p>
                </div>
              </div>
              <div class="tile is-parent">
                <div class="tile is-child">
                  <article>
                    <i class="fas fa-check-square has-text-success"/>
                    <b> Hireable</b>
                  </article>
                  <aticle><i>{{ userInfo.company }}</i></aticle>
                  <article>{{ userInfo.email }}</article>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column box">
          test
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    token: {
      type: String,
      default: ''
    },
    bio: {
      type: Boolean,
      default: false
    },
    company: {
      type: Boolean,
      default: false
    },
    email: {
      type: Boolean,
      default: false
    },
    hireable: {
      type: Boolean,
      default: false
    },
    organization: {
      type: Boolean,
      default: false
    },
    noBorder: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    userInfo: {}
  }),
  created() {
    let userQuery = `query {
      viewer {
        login
      }
    }`
        
    this.gitQuery(userQuery).then((response) => {
      let currentUser = response.data.data.viewer.login,
          dataQuery = `query { 
            user(login: "${currentUser}") {
              avatarUrl,
              bio,
              company,
              email,
              isHireable
              login,
              name,
              organization(login: "${currentUser}") {
              	name
              },
              url,
              contributedRepositories(first: 5){
                nodes{
                  name,
                  description,
                  primaryLanguage {
                    name,
                    color
                  },
                  url
                },
                totalCount
              },
              repositories(first: 5){
                nodes{
                  name,
                  description,
                  primaryLanguage {
                    name,
                    color
                  },
                  url
                },
                totalCount
              },
              starredRepositories(first: 5){
                nodes{
                  name,
                  description,
                  primaryLanguage {
                    name,
                    color
                  },
                  url
                },
              	totalCount
              }
            }
          }`
      return this.gitQuery(dataQuery)
    }).then((response) => {
      if (!response.data.error) {
        this.userInfo = response.data.data.user
        console.log(JSON.stringify(this.userInfo));
      } else throw new Error(response.data.error)
    }).catch((e) => {
      console.info(e);
    });
  },
  methods: {
    gitQuery(query) {
      return axios.post('https://api.github.com/graphql', {
        query: query
      }, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
    }
  }
}
</script>

<style>
.borderless {
  box-shadow: 0 0px 0px rgba(0,0,0,0);
  -webkit-box-shadow: 0 0px 0px rgba(0,0,0,0);
}

.no-scroll {
  overflow-y: hidden;
}
</style>

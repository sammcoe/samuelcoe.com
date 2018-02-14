<template>
  <div
    v-if="userInfo.name"
    class="card is-round"
    :class="{ borderless: noBorder, hcard: !vertical, vcard: vertical }">
    <div class="card-content">
      <div
        class="tile is-ancestor"
        :class="verticalCard">
        <div class="tile is-vertical">
          <div class="tile is-parent">
            <div
              v-if="avatar"
              class="tile is-child has-text-right is-5">
              <figure class="image is-48x48 is-pulled-right sm-margin">
                <img
                  :src="userInfo.avatarUrl"
                  alt="github avatar">
              </figure>
            </div>
            <div class="tile is-child">
              <div
                :class="centerName"
                class="title is-4 has-text-black">
                {{ userInfo.name }}
              </div>
              <div
                :class="centerName"
                class="subtitle is-6s has-text-primary">
                <a :href="userInfo.url">@{{ userInfo.login }}</a>
              </div>
            </div>
          </div>
          <div class="tile is-parent">
            <div 
              class="tile is-child has-text-centered"
              v-if="bio">
              <p class="subtitle is-6 has-text-black">{{ userInfo.bio }}</p>
            </div>
          </div>
          <div
            v-if="hireable || company || email"
            class="tile is-parent is-vertical has-text-centered">
            <div class="tile is-child">
              <article v-if="hireable">
                <i class="fas fa-check-square has-text-success"/>
                <b> Available for hire.</b>
              </article>
              <article v-if="company"><i>{{ userInfo.company }}</i></article>
              <article v-if="email">{{ userInfo.email }}</article>
            </div>
          </div>
        </div>
        <div
          v-if="!vertical"
          class="is-divider-vertical no-pad"/>
        <div
          v-if="vertical"
          class="is-divider no-pad"/>
        <div class="tile is-child">
          <div class="level sm-margin">
            <div class="level-item has-text-centered">
              <div>
                <p class="title has-text-black">{{ userInfo.repositories.totalCount }}</p>
                <p class="heading has-text-black">REPOS</p>
              </div>
            </div>
            <div class="level-item has-text-centered">
              <div>
                <p class="title has-text-black">{{ userInfo.followers.totalCount }}</p>
                <p class="heading has-text-black">FOLLOWERS</p>
              </div>
            </div>
            <div class="level-item has-text-centered">
              <div>
                <p class="title has-text-black">{{ userInfo.following.totalCount }}</p>
                <p class="heading has-text-black">FOLLOWING</p>
              </div>
            </div>
          </div>
          <div class="is-divider sm-margin"/>
          <div class="heading has-text-centered has-text-black">TOP REPOSITORIES</div>
          <table class="table sm-margin">
            <tbody>
              <tr
                v-for="repo in userInfo.pinnedRepositories.nodes"
                :key="repo.name">
                <td>
                  <a
                    :href="repo.url"
                    class="has-text-primary">
                    {{ repo.name }}
                  </a>
                </td>
                <td class="has-text-centered">
                  <span
                    class="tag"
                    :style="{ backgroundColor: repo.primaryLanguage.color, color: invertColor(repo.primaryLanguage.color, true) }">
                    {{ repo.primaryLanguage.name }}
                  </span>
                </td>
                <td>
                  <div class="is-flex">
                    <i class="fas fa-star sm-margin has-text-warning"/>
                    {{ repo.stargazers.totalCount }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    avatar: {
      type: Boolean,
      default: false
    },
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
    },
    vertical: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    userInfo: {}
  }),
  computed: {
    verticalCard() {
      return {
        'is-vertical': this.vertical
      }
    },
    centerName() {
      return {
        'center-text': !this.avatar
      }
    }
  },
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
              followers(first: 1){
                totalCount
              },
              following(first: 1){
                totalCount
              },
              repositories(first: 1){
                nodes{
                  name,
                  description,
                  primaryLanguage {
                    name,
                    color
                  },
                  stargazers(first: 1){
                    totalCount
                  }
                  url
                },
                totalCount
              },
              pinnedRepositories(first: 3){
                nodes{
                  name,
                  description,
                  primaryLanguage {
                    name,
                    color
                  },
                  stargazers(first: 1){
                    totalCount
                  }
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
    },
    invertColor(hex, bw) {
      if (hex.indexOf('#') === 0) {
          hex = hex.slice(1);
      }
      // convert 3-digit hex to 6-digits.
      if (hex.length === 3) {
          hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
      }
      if (hex.length !== 6) {
          throw new Error('Invalid HEX color.');
      }
      var r = parseInt(hex.slice(0, 2), 16),
          g = parseInt(hex.slice(2, 4), 16),
          b = parseInt(hex.slice(4, 6), 16);
      if (bw) {
          return (r * 0.299 + g * 0.587 + b * 0.114) > 186
              ? '#000000'
              : '#FFFFFF';
      }
      // invert color components
      r = (255 - r).toString(16);
      g = (255 - g).toString(16);
      b = (255 - b).toString(16);
      // pad each with zeros and return
      return "#" + padZero(r) + padZero(g) + padZero(b);
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

.is-round {
  border-radius: 5px;
}

.sm-margin {
  margin: 5px !important;
}

.vcard {
  max-width: 375px;
}

.hcard {
  max-width: 650px;
}

.no-pad {
  padding: 0px;
}

.center-text {
  text-align: center;
}
</style>

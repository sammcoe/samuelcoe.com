import Vue from 'vue';
import githubVue from 'github-vue';

const GithubVue = {
  install(Vue, options) {
    Vue.component('github-vue', githubVue)
  }
};

Vue.use(GithubVue);
export default GithubVue;
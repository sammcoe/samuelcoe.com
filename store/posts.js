export const state = () => ({
  posts: [],
  post: {}
})

export const mutations = {
  add (state, name) {
    state.posts.push({
      name: name
    })
  },
  updatePosts(state, posts) {
    state.posts = posts.filter(post => post.filename !== '_post.vue');
  },
  updatePost(state, post) {
    state.post = post;
    console.log(state.post);
  }
}

export const actions = {
  loadPosts ({commit}, posts) {
    const sorted = posts.sort((a, b) => {
      if (a === b) {
        return 0
      }
      return (a.attributes.created < b.attributes.created) ? 1 : -1
    })
    commit('updatePosts', sorted);
  },
  loadPost ({commit}, slug) {
    const post = this.state.posts.posts.find((post) => {
      return post.slug === slug
    });
    commit('updatePost', post);
  }
}
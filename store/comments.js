import yaml from 'js-yaml';

export const state = () => ({
  comments: []
})

export const mutations = {
  add (state, comment) {
    state.comments.push(comment);
  },
  updateComments(state, comments) {
    state.comments = comments;
  }
}

export const actions = {
  loadComments ({commit}, post) {
    if (process.server) {
      const fs = require('fs');
      try {
        const files = fs.readdirSync(`pages/blog/comments/${post}`);
        const comments = files.map((file) => {
          let comment = yaml.safeLoad(fs.readFileSync(`pages/blog/comments/${post}/${file}`, 'utf8'));
          console.info(comment);
          comment.filename = file;
          return comment;
        })

        const sorted = comments.sort((a, b) => {
          if (a === b) {
            return 0
          }
          return (a.date < b.date) ? 1 : -1
        })
        commit('updateComments', sorted);
      } catch(e) {
        if (e.code === 'ENOENT') {
          // No comments
          commit('updateComments', []);
        } else console.info(e);
      }
    }
  }
}
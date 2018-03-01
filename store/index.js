import fm from 'front-matter';
import slugify from 'slugify';

export const actions = {
  nuxtServerInit () {
    if (process.server) {
      const fs = require('fs');
      const files = fs.readdirSync('pages/blog').filter(file => file.includes('.md'));

      const posts = files.map((file) => {
        let post = fm(fs.readFileSync(`pages/blog/${file}`, 'utf8'));
        post.filename = file;
        post.created = new Date(fs.statSync(`pages/blog/${file}`).ctime);
        post.slug = slugify(file.replace(/\.md$/, ''), {lower: true});
        post.url = `/blog/${post.slug}`;
        return post;
      });
      this.dispatch('posts/loadPosts', posts);
    }
  }
}
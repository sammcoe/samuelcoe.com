import fm from "front-matter";
import slugify from "slugify";
import yaml from "js-yaml";

export const actions = {
  nuxtServerInit() {
    if (process.server) {
      const fs = require("fs");

      // Posts
      const files = fs
        .readdirSync("pages/blog")
        .filter(file => file.includes(".md"));

      const posts = files.map(file => {
        let post = fm(fs.readFileSync(`pages/blog/${file}`, "utf8"));
        post.filename = file;
        post.created = new Date(fs.statSync(`pages/blog/${file}`).ctime);
        post.slug = slugify(file.replace(/\.md$/, ""), { lower: true });
        post.url = `/blog/${post.slug}`;

        try {
          const commentFiles = fs.readdirSync(
            `pages/blog/comments/${post.slug}`
          );
          const comments = commentFiles.map(cFile => {
            let comment = yaml.safeLoad(
              fs.readFileSync(
                `pages/blog/comments/${post.slug}/${cFile}`,
                "utf8"
              )
            );
            comment.filename = cFile;
            return comment;
          });
          post.comments = comments.sort((a, b) => {
            if (a === b) {
              return 0;
            }
            return a.date < b.date ? 1 : -1;
          });
        } catch (e) {
          if (e.code === "ENOENT") {
            // No comments
            post.comments = [];
          } else console.info(e);
        }

        return post;
      });
      this.dispatch("posts/loadPosts", posts);

      // Recommendations
      const recFiles = fs.readdirSync("pages/blog/recommendations");
      try {
        const recommendations = recFiles.map(rFile => {
          let recommendation = yaml.safeLoad(
            fs.readFileSync(`pages/blog/recommendations/${rFile}`, "utf8")
          );
          recommendation.filename = rFile;
          return recommendation;
        });
        this.dispatch("recs/loadRecommendations", recommendations);
      } catch (e) {
        console.info(e);
      }

      // Creations
      const creationFiles = fs.readdirSync("pages/blog/creations");
      try {
        const creations = creationFiles.map(rFile => {
          let creation = yaml.safeLoad(
            fs.readFileSync(`pages/blog/creations/${rFile}`, "utf8")
          );
          creation.filename = rFile;
          return creation;
        });
        this.dispatch("creations/loadCreations", creations);
      } catch (e) {
        console.info(e);
      }
    }
  }
};

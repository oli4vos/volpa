const fs = require("fs");
const path = require("path");

const {
  BLOG_OUTPUT_DIR,
  getBlogStaticPath,
  loadSeoConfig,
  readBlogPosts,
  renderStaticBlogPage
} = require("./blog-build-utils");

function ensureOutputDirectory(directory) {
  fs.mkdirSync(directory, { recursive: true });
}

function clearGeneratedHtml(directory) {
  if (!fs.existsSync(directory)) {
    return;
  }

  fs.readdirSync(directory)
    .filter((entry) => entry.endsWith(".html"))
    .forEach((entry) => {
      fs.unlinkSync(path.join(directory, entry));
    });
}

function generateBlogPages() {
  const config = loadSeoConfig();
  const posts = readBlogPosts();

  ensureOutputDirectory(BLOG_OUTPUT_DIR);
  clearGeneratedHtml(BLOG_OUTPUT_DIR);

  posts.forEach((post) => {
    const relativePath = getBlogStaticPath(post.slug);
    const outputPath = path.join(BLOG_OUTPUT_DIR, `${post.slug}.html`);
    const html = renderStaticBlogPage(post, posts, config);
    fs.writeFileSync(outputPath, html, "utf8");
    process.stdout.write(`Generated ${relativePath}\n`);
  });

  process.stdout.write(`Generated ${posts.length} static blog pages.\n`);
}

if (require.main === module) {
  generateBlogPages();
}

module.exports = {
  generateBlogPages
};

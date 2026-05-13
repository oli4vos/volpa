const fs = require("fs");

const {
  SITEMAP_PATH,
  generateSitemapXml,
  loadSeoConfig,
  readBlogPosts
} = require("./blog-build-utils");

function generateSitemap() {
  const config = loadSeoConfig();
  const posts = readBlogPosts();
  const xml = generateSitemapXml(posts, config);

  fs.writeFileSync(SITEMAP_PATH, xml, "utf8");
  process.stdout.write(`Updated sitemap.xml with ${posts.length} blog URLs.\n`);
}

if (require.main === module) {
  generateSitemap();
}

module.exports = {
  generateSitemap
};

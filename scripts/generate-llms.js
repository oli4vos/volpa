const fs = require("fs");

const {
  LLMS_PATH,
  KNOWLEDGE_PAGE_ENTRIES,
  PRIMARY_PAGE_ENTRIES,
  absoluteUrl,
  loadSeoConfig,
  readBlogPosts
} = require("./blog-build-utils");

function generateLlmsText() {
  const config = loadSeoConfig();
  const posts = readBlogPosts();

  const mainSection = PRIMARY_PAGE_ENTRIES.map((entry) => (
    `[${entry.label}](${absoluteUrl(config, entry.path)}): ${entry.llmsDescription}`
  )).join("\n");

  const knowledgeSection = KNOWLEDGE_PAGE_ENTRIES.map((entry) => (
    `[${entry.label}](${absoluteUrl(config, entry.path)}): ${entry.llmsDescription}`
  )).join("\n");

  const blogSection = posts.map((post) => (
    `[${post.title}](${absoluteUrl(config, `blog/${post.slug}.html`)}): ${post.summary}`
  )).join("\n");

  return `# Volpa

> Volpa begeleidt mensen bij scheiding met aandacht voor rust, overzicht en financiele duidelijkheid.

## Belangrijkste pagina's

${mainSection}

## Kennisbank

${knowledgeSection}

## Blog

${blogSection}

## Contact

[Contact](${absoluteUrl(config, "contact.html")}): Contact opnemen voor een eerste gesprek.
`;
}

function generateLlms() {
  const content = generateLlmsText();
  fs.writeFileSync(LLMS_PATH, content, "utf8");
  process.stdout.write("Updated llms.txt.\n");
}

if (require.main === module) {
  generateLlms();
}

module.exports = {
  generateLlms,
  generateLlmsText
};

function userMarkdownSetup(md) {
  // The md parameter stands for the markdown-it instance used throughout the site generator.
  // Feel free to add any plugin you want here instead of /.eleventy.js
}
function userEleventySetup(eleventyConfig) {
  // The eleventyConfig parameter stands for the the config instantiated in /.eleventy.js.
  // Feel free to add any plugin you want here instead of /.eleventy.js
  const debug = require("eleventy-plugin-debug");
  eleventyConfig.addPlugin(debug);

  eleventyConfig.addCollection("sortedPosts", collectionApi => {
    return collectionApi.getFilteredByGlob("src/site/notes/**/*.md").sort((a, b) => {
      // 按日期倒序排序（最新的排在最前面）
      return new Date(b.data.created) - new Date(a.data.created);
    });
  });

}
exports.userMarkdownSetup = userMarkdownSetup;
exports.userEleventySetup = userEleventySetup;

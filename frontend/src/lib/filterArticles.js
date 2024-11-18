// A cache to store filtered articles based on their unique content
const articleCache = new Map();

/**
 * Filters out articles that have incomplete or invalid data.
 * The function checks for the presence of the article source name,
 * ensures the source name is not "[Removed]", and checks for the existence
 * of a valid image URL (`urlToImage`). It also implements caching for performance optimization.
 *
 * @param {Array} articles - An array of articles to be filtered.
 * @returns {Array} - A filtered array of articles.
 */
export const filterArticles = (articles) => {
  // Generate a unique cache key based on the articles' content (stringified)
  const cacheKey = JSON.stringify(articles);

  // Check if the filtered articles for this cache key already exist in the cache
  if (articleCache.has(cacheKey)) {
    console.log("Cache kullanıldı"); // Log message indicating that cached data is being used
    return articleCache.get(cacheKey); // Return the cached filtered articles
  }

  // Filter articles based on the following conditions:
  const filteredArticles = articles.filter(
    (article) =>
      article.source && // Article must have a source
      article.source.name && // Source must have a valid name
      article.source.name !== "[Removed]" && // Exclude articles with "[Removed]" as source name
      article.urlToImage // Article must have an image URL
  );

  // Store the filtered articles in the cache with the generated cache key
  articleCache.set(cacheKey, filteredArticles);

  // Return the filtered articles
  return filteredArticles;
};

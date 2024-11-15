const articleCache = new Map();

export const filterArticles = (articles) => {
  const cacheKey = JSON.stringify(articles);

  if (articleCache.has(cacheKey)) {
    console.log("Cache kullanıldı");
    return articleCache.get(cacheKey);
  }

  const filteredArticles = articles.filter(
    (article) =>
      article.source &&
      article.source.name &&
      article.source.name !== "[Removed]" &&
      article.urlToImage
  );

  articleCache.set(cacheKey, filteredArticles);

  return filteredArticles;
};

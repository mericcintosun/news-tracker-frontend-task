export const filterArticles = (articles) => {
  return articles.filter(
    (article) =>
      article.source &&
      article.source.name &&
      article.source.name !== "[Removed]"
  );
};

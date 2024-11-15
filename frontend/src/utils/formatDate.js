export const groupArticlesByHour = (articles) => {
  const hours = new Array(24).fill(0);

  articles.forEach((article) => {
    const date = new Date(article.publishedAt);
    const hour = date.getHours();
    hours[hour] += 1;
  });

  return hours;
};

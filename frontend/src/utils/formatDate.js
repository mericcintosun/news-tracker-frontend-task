export const groupArticlesByHour = (articles) => {
    const hours = new Array(24).fill(0); // 0-23 saatlerini temsil eden bir dizi
  
    articles.forEach((article) => {
      const date = new Date(article.publishedAt);
      const hour = date.getHours(); // Yayınlanma saatini al
      hours[hour] += 1; // O saate ait haber sayısını artır
    });
  
    return hours;
  };
  
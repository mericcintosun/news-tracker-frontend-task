export const filterArticles = (articles) => {
  return articles.filter(
    (article) =>
      article.source && // Kaynağın mevcut olup olmadığını kontrol et
      article.source.name && // Kaynak isminin mevcut olup olmadığını kontrol et
      article.source.name !== "[Removed]" && // İstenmeyen kaynakları filtrele
      article.urlToImage // Resim URL'sinin mevcut olup olmadığını kontrol et
  );
};

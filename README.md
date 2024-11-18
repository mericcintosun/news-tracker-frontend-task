# Gerçek Zamanlı Haber Takip Uygulaması

Bu proje, kullanıcıların haber kaynaklarını ve konularını takip edebilmesini, gerçek zamanlı (veya gerçeğe yakın) haberleri görüntüleyebilmesini, push bildirimleri alabilmesini ve haber yayınlanma saatlerini görsel grafiklerle analiz edebilmesini sağlayan bir Next.js web uygulamasıdır.

---

## 🚀 Proje Özeti

Gerçek Zamanlı Haber Takip Uygulaması:

- **Web Uygulaması**: Haber API entegrasyonu, haber gösterimi, interaktif grafikler.
- **Custom Tasarım**: Frameworksüz modern ve responsive tasarım. Özelleştirilmiş CSS Module yapısı.
- **Güvenlik**: API anahtarlarının güvenli kullanımı ve hata yönetimi.

---

## 📋 Özellikler

### Haber API Entegrasyonu

- Haber kaynakları veya konularına göre filtreleme.
- Gerçek zamanlı veri çekme ve görüntüleme.
- API limitleri ve hata yönetimi.

### Haber Gösterimi

- Anlık haber listesi.
- Push bildirimleri.
- Yayınlanma saatleri için istatistiksel grafikler.

### Grafikler

- Chart.js kullanılarak etkileşimli grafikler.
- Haber yayın saatlerini analiz edebilme.

### Custom CSS ve Responsive Tasarım

- Modern, temiz, responsive tasarım.
- Mobil, tablet ve masaüstü uyumu.

---

## 🛠 Kullanılan Teknolojiler

- **Frontend**: Next.js
- **Grafikler**: Chart.js
- **Veri Çekme**: Axios & Tanstack Query
- **Stil**: Custom CSS
- **Bildirimler**: Polling
- **Güvenlik**: .env Dosyası, Hata Yönetimi

---

## 📦 Proje Kurulumu

Proje kurulumunu gerçekleştirmek için önce proje kaynak kodunu yerel makinenize klonlayın ve proje dizinine gidin:

```bash
git clone <proje-repo-url>
cd <proje-dizin-adı>
Sonrasında projenin gereksinim duyduğu bağımlılıkları yüklemek için:

npm install
Proje, API anahtarları gibi gizli bilgileri .env dosyasında saklar. Ana dizine bir .env dosyası oluşturun ve şu bilgileri ekleyin:

NEWS_API_KEY=api_key_buraya
BASE_URL=http://localhost:3000
NEWS_API_KEY: Haber API'sinden alınan API anahtarı.
BASE_URL: Projenin çalışacağı temel URL (varsayılan: http://localhost:3000).
Uygulamayı geliştirme modunda çalıştırmak için:

npm run dev
Ardından http://localhost:3000 adresine giderek uygulamayı tarayıcınızda görüntüleyebilirsiniz.

Üretim ortamında çalıştırmak için projeyi derleyin ve başlatın:

npm run build
npm start
```

## 📊 Grafikler

- **Yayınlanma Saatleri Grafiği**: Haberlerin saat bazlı dağılımını görselleştirir.
- **Kaynak Dağılımı**: Hangi haber kaynağının ne zaman aktif olduğunu analiz eder.

---

## 📄 Mimari ve Tasarım Kararları

- **Next.js Kullanımı**: SEO ve SSR desteği için tercih edildi.
- **Custom CSS**: Özgün bir tasarım sunmak amacıyla CSS framework'leri kullanılmadı.
- **Veri Güvenliği**: API anahtarları `.env` dosyası ile gizlendi.

---

## 🌟 Varsayımlar

- Kullanıcılar genellikle 4 ana kategoriye (teknoloji, iş dünyası, gündem, spor) ve 10 kaynağa göre haberleri filtreleyebiliyor. (BBC, CNN, The New York Times, The Guardian UK, Reuters, Al Jazeera English, Fox, Bloomberg, Associated Press, The Washington Post)
- Haber API'sinin ücretsiz planı, proje gereksinimlerini karşılıyor.

---

## 🛠 Bilinen Kısıtlamalar

- Haber API'si çağrıları, API limitleri nedeniyle kısa bir süreliğine gecikmeli olabilir.
- Farklı dil destekleri eklenebilir, ancak bu sürüm yalnızca İngilizce ve Türkçe haberleri desteklemektedir.

---

## NewsAPI seçim nedenleri

- NewsAPI'nin güncel olarak en büyük rakibi MediastackAPI. Her ikisini karşılaştırdığımızda Mediastack her ay için 500 API isteği hizmeti sunuyorken NewsAPI ise her gün 1000 API isteği sunuyor. Dolayısıyla her ikisi de haber desteği ve kaynak bakımından iyi olsa da NewsAPI bu konuda MediastackAPI'ye göre ön plana çıkıyor.
- NewsAPI ve Mediastack dışında herhangi bir API seçmememin nedeni, haber kaynaklarının çok kısıtlı olmasıdır.
- Haber API'lerinin ücretsiz planları doğrultusunda en iyi seçenek yine NewsAPI. Çünkü diğer API'lere göre NewsAPI detaylı kaynak ve kategori filtreleme hizmeti sunuyor. Tüm bu sebeplerden ötürü bu projede NewsAPI tercih edilmiştir.

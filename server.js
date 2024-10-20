// express modülünü dahil ediyoruz. Express, Node.js ile kolayca web sunucuları oluşturmayı sağlar.
const express = require('express');

// express uygulamasını başlatıyoruz. 'app' değişkeni üzerinden uygulamayı kontrol edebiliriz.
const app = express();

// '__dirname', bu dosyanın bulunduğu dizini temsil eder.
// 'root' sabitini, Angular uygulamasının build edilmiş dosyalarının bulunduğu 'dist/angular-book-seller' dizinine işaret ediyoruz.
const root = __dirname + "/dist/angular-book-seller";

// Express'in 'static' fonksiyonu ile 'root' dizinini statik dosyaların sunulacağı dizin olarak belirliyoruz.
// Bu dizinde bulunan dosyalar (örn. CSS, JS) otomatik olarak sunulacaktır.
app.use(express.static(root));

// Tüm istekleri ('*' wildcard ile tüm yolları yakalar) karşılayan bir route tanımlıyoruz.
// Eğer kullanıcı herhangi bir adrese istek gönderirse, ona Angular uygulamasının 'index.html' dosyasını geri döndürüyoruz.
// Böylece Angular uygulaması, client-side routing (ön uç yönlendirmesi) işlemlerini yönetebilir.
app.get('*', (req, res) => {
  // Angular uygulamasının başlangıç dosyası olan 'index.html' dosyasını geri gönderiyoruz.
  // 'root' dizinini baz alarak dosyanın tam yolunu belirtiyoruz.
  res.sendFile('index.html', { root: root });
});

// Sunucuyu başlatıyoruz. 'process.env.PORT' ortam değişkeni ayarlanmışsa bu port kullanılır.
// Eğer ayarlanmamışsa, varsayılan olarak 8081 portunda dinlemeye başlar.
app.listen(process.env.PORT || 8081);

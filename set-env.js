/*
Node.js 'fs' Modülü:
fs, Node.js'in standart bir modülüdür ve dosya sistemiyle etkileşim kurmak için kullanılır. Bu modül dosya okuma, yazma, silme, dizin oluşturma gibi işlemleri yapmamıza olanak tanır.
require('fs'), Node.js'de fs modülünü projeye dahil eder, yani bu modüldeki fonksiyonlara erişim sağlar.

Destructuring Assignment (Parçalama Ataması):
{ writeFile }, destructuring (yapı çözme) adı verilen bir JavaScript özelliğidir.
fs modülünde pek çok farklı fonksiyon vardır (örn. readFile, writeFileSync, unlink, vb.). Burada yalnızca writeFile fonksiyonunu kullanmak istediğimiz için, fs modülünden sadece bu fonksiyonu çıkarıyoruz.
const { writeFile } ifadesi, fs.writeFile fonksiyonunu doğrudan writeFile değişkenine atar. Bu sayede fs.writeFile demek yerine sadece writeFile kullanarak fonksiyonu çağırabiliriz.

writeFile Fonksiyonu:
writeFile fonksiyonu, dosya yazma işlemi gerçekleştirir. Üç parametre alır:
Birinci parametre: Yazılacak dosyanın yolu (örneğin 'path/to/file.txt').
İkinci parametre: Dosyaya yazılacak içerik (örneğin 'Hello, World!').
Üçüncü parametre: Yazma işlemi tamamlandıktan sonra çalışacak olan callback fonksiyonu. Eğer yazma sırasında bir hata oluşursa bu callback fonksiyonu hata parametresi alır.
Bu şekilde, fs modülündeki sadece ihtiyacımız olan fonksiyonu alıp daha temiz ve kısa bir kod yazabiliyoruz.
 */
const { writeFile } = require('fs');

// 'dotenv' paketini kullanarak '.env' dosyasındaki çevresel değişkenleri yükler.
// Böylece 'process.env' üzerinden bu değişkenlere erişebiliriz.
require('dotenv').config();

// Çalışılan ortamın production olup olmadığını kontrol eder.
// Eğer 'NODE_ENV' değişkeni 'production' ise 'isProduction' true olur.
const isProduction = process.env.NODE_ENV === 'production';

// Ortama göre doğru environment dosyasını belirler.
// Production ortamında 'environment.prod.ts', diğer ortamlarda 'environment.ts' dosyasını hedefler.
const targetPath = isProduction ? 'src/environments/environment.prod.ts' : 'src/environments/environment.ts';

// Environment dosyasının içeriği burada oluşturuluyor.
// 'production' değişkeni ve 'BASE_URL' bilgisi dinamik olarak .env dosyasından alınır.
const envFileContent = `
export const environment = {
  production: ${isProduction},
  BASE_URL: "${process.env.BASE_URL}"
};
`;

// 'writeFile' fonksiyonunu kullanarak belirlenen 'targetPath' konumuna 'envFileContent' içeriklerini yazar.
// Eğer bir hata oluşursa, hata konsola yazdırılır ve program durdurulur.
writeFile(targetPath, envFileContent, (err) => {
  if (err) {
    // Hata oluşursa hata bilgisi konsola yazdırılır ve hata fırlatılır.
    throw console.error(err);
  }
});

# Video Kütüphane / MovieLibrary

Bu proje, basit bir Django tabanlı video kütüphanesidir. Film ve dizi veritabanı, poster ve video dosyalarının yönetimi, detay sayfaları ve basit arama işlevselliği sunar.

## Öne çıkanlar
- Django tabanlı küçük bir uygulama (proje klasörü: `website`).
- Modeller: `Movie`, `Series`, `Episode`.
- Medya dosyaları `media/` altında saklanır (poster ve videolar).
- Statik dosyalar `static/` altında (CSS, JS).

## Hızlı Başlangıç

Önerilen: Windows'ta PowerShell kullanarak bir sanal ortam oluşturun.

1) Sanal ortam oluşturma ve aktifleştirme (PowerShell):

```powershell
python -m venv .venv; .\.venv\Scripts\Activate.ps1
```

2) Gerekli paketleri yükleyin.

Bu depoda `requirements.txt` bulunmuyor. Proje `website/settings.py` dosyasında belirtildiği üzere Django 5.2.x ile oluşturulmuş. Aşağıdaki paketler genellikle gereklidir:

```powershell
pip install "Django==5.2.5" Pillow
```

3) Veritabanı migrasyonları ve süper kullanıcı oluşturma:

```powershell
python manage.py migrate
python manage.py createsuperuser
```

4) Geliştirme sunucusunu çalıştırma:

```powershell
python manage.py runserver
```

Tarayıcıda http://127.0.0.1:8000/ adresini açın.

## Proje Yapısı (özet)

- `manage.py` — Django yönetim aracı.
- `website/` — proje ayarları (`settings.py`, `urls.py`, `wsgi.py`, `asgi.py`).
- `MainPage/` — uygulama: modeller, view'lar, url'ler, admin vb.
- `templates/` — proje genel HTML şablonları (ör. `index.html`, `movie_detail.html`).
- `static/` — CSS ve JavaScript (özellikle `javascript/videoplayer.js`, `movie_detail.js`, `css/main.css`).
- `media/` — yüklenmiş poster ve video dosyaları (mevcut alt klasörler: `M_posters`, `M_videos`, `S_posters`, `S_videos`).
- `db.sqlite3` — SQLite veritabanı (varsayılan ayar).

## Modeller (kısa)

- Movie
  - title, description, release_year, duration, poster (ImageField), video_file (FileField), is_watched
- Series
  - title, description, release_year, poster
- Episode
  - series (FK), title, episode_number, season_number, video_file, duration, is_watched

## URL'ler (ana)

- `/` — Ana sayfa (popülerler)
- `/movies/` — Film listesi
- `/series/` — Dizi listesi
- `/movie/<int:movie_id>/` — Film detay
- `/series/<int:series_id>/` — Dizi detay
- `/episode/<int:episode_id>/` — Bölüm detay
- `/search/?q=<sorgu>` — Arama

Admin paneli: `/admin/`

## Medya ve Statik Dosyalar

- Geliştirme sırasında `settings.DEBUG = True` iken `website/urls.py` medya dosyalarını sunacak şekilde ayarlanmıştır.
- `MEDIA_ROOT` proje kökünde `media/` olarak tanımlıdır.
- Video dosyaları ve posterler `media/M_videos`, `media/M_posters`, `media/S_videos`, `media/S_posters` altına yüklenir.

Not: Üretimde medya ve statik dosyalarını servis etmek için uygun bir sunucu (NGINX, CDN vb.) veya bir bulut deposu yapılandırın.

## Eksik / Önerilen İyileştirmeler

- Ortam değişkenleri kullanarak `SECRET_KEY` ve `DEBUG` değerlerini yönetin (şu anda `settings.py` içinde düz metin halinde bulunuyor).
- `requirements.txt` oluşturun (`pip freeze > requirements.txt`) ve README'ye bağımlılık kurulum adımlarını ekleyin.
- Bir `README` içinde örnek veriler veya bir fixture `.json` dosyası varsa yükleme talimatı ekleyin.
- Video dosyaları büyük olabileceğinden, disk alanı ve yükleme sınırlarını göz önünde bulundurun.

## Geliştirme Notları

- Django sürümü: proje `settings.py` üst bilgisinde `Django 5.2.5` ile oluşturulmuş.
- Görüntü alanları için `Pillow` gereklidir (`ImageField` kullanımı).

## Katkıda Bulunma

1. Fork yapın.
2. Yeni bir feature branch oluşturun.
3. Değişiklik yapın, test edin.
4. Pull request gönderin.

## Lisans

Bu proje MIT Lisansı ile lisanslanmıştır. Ayrıntılar için proje kökündeki `LICENSE` dosyasına bakınız.

---

Eğer isterseniz, ben `requirements.txt` oluşturup içinde hangi paketlerin yer alması gerektiğini belirtebilirim; ayrıca README'ye örnek komutlar veya deploy rehberi ekleyebilirim.

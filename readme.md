# 📋 Proje Bilgileri
**Hazırlayan:** Abdullah Toprak Kılıç  
**Öğrenci Numarası:** [Buraya Numaranı Yaz]  
**Ders:** Yazılım Mühendisliği  
**Proje Adı:** Kitabevi Yönetim Sistemi

---


# 📚 Kitabevi Yönetim Sistemi (Full-Stack Simülasyon)

Bu proje, Yazılım Mühendisliği dersi kapsamında geliştirilmiş; uçtan uca envanter yönetimi, satış analizi ve müşteri alışveriş deneyimini simüle eden bir web uygulamasıdır.

## 🛠️ Teknik Mimari

Proje, **NestJS** (Backend) ve **React** (Frontend) kullanılarak geliştirilmiştir. Tüm geliştirme süreci tip güvenliği için **TypeScript** ile yürütülmüştür.

- **Frontend Port:** `http://localhost:3000`
- **Backend Port:** `http://localhost:3001`
- **Veri Yönetimi:** In-memory / JSON 

---

## 🚀 Kurulum ve Çalıştırma

Sistemi yerel makinenizde ayağa kaldırmak için aşağıdaki adımları sırasıyla uygulayınız:

### 1. Back-end ayağa kaldırma 
cd backend
npm install
npm run start:dev

### 1. Front-end ayağa kaldırma
cd /frontend
npm install
npm stat

### Hazır Kullanıcı Rolleri

| Rol | Kullanıcı Adı | Şifre | Yetki Alanı |
| :--- | :--- | :--- | :--- |
| **Yönetici (Admin)** | `admin` | `admin123` | Tüm dashboard, grafikler ve envanter yönetimi. |
| **Kullanıcı (User)** | `user` | `user123` | Kitap mağazası, sepet ve satın alma işlemleri. |


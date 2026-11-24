# Temp Mail R

Aplikasi web temporary inbox untuk QA/testing dengan API Guerrilla Mail.

## Fitur
- Membuat alamat email acak.
- Meminta username custom melalui fungsi `set_email_user` (domain ditentukan penyedia).
- Membaca inbox dan isi email.
- Deteksi kandidat kode OTP 4–8 digit.
- Refresh inbox manual dan otomatis setiap 30 detik.
- Riwayat alamat disimpan lokal di browser.
- Cloudflare Worker meneruskan panggilan API dan menjaga cookie sesi PHPSESSID.

## Deployment
Aplikasi berjalan sebagai Cloudflare Worker dengan Static Assets, bukan Cloudflare Pages.

Repository: `mohammadrizal08061999-alt/Temp-Mail-R`

Konfigurasi `wrangler.jsonc` menggunakan `worker.js` sebagai entry point dan `index.html` sebagai static asset. Setiap commit ke branch `main` memicu deployment otomatis jika integrasi Git Cloudflare aktif.

## Catatan penting
- Guerrilla Mail tidak menyediakan password mailbox pada API publiknya. Akses mailbox bergantung pada sesi browser; karena itu aplikasi tidak membuat password palsu.
- Alamat dan pesan bersifat sementara. Dokumentasi penyedia menyebut masa berlaku alamat/pesan sekitar 60 menit, dan sesi dapat kedaluwarsa setelah tidak aktif.
- Custom username tidak menjamin alamat tertentu akan tersedia; hasil akhir ditentukan oleh penyedia.
- API tidak menerbitkan batas rate limit tetap. Aplikasi melakukan polling inbox setiap 30 detik untuk mengurangi beban.
- Jangan gunakan untuk akun penting, informasi sensitif, atau layanan yang melarang disposable email.
- Gunakan hanya untuk QA/pengujian yang sah. Jangan gunakan untuk spam, pembuatan akun massal, atau menghindari kontrol keamanan.
- Layanan pihak ketiga dapat berubah, membatasi, atau menghentikan API sewaktu-waktu.

## Referensi
- [Dokumentasi API Guerrilla Mail](https://www.guerrillamail.com/GuerrillaMailAPI.html)
- [Ketentuan layanan Guerrilla Mail](https://www.guerrillamail.com/tos)

## Pengembangan lokal
Untuk menguji Worker beserta API route, gunakan Wrangler:
```bash
npx wrangler dev
```

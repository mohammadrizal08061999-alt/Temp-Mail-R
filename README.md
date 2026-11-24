# Temp Mail R

Web app temporary email untuk QA/testing menggunakan API Mail.tm.

## Fitur
- Generate alamat email acak atau custom.
- Mengambil domain aktif dari Mail.tm.
- Password mailbox dibuat otomatis.
- Inbox refresh manual dan otomatis setiap 20 detik.
- Membaca isi pesan dan mendeteksi kandidat kode OTP 4–8 digit.
- Riwayat mailbox disimpan lokal di browser.

## Deploy gratis ke Cloudflare Pages
1. Buka Cloudflare Dashboard → Workers & Pages.
2. Pilih **Create application** → **Pages** → **Connect to Git**.
3. Hubungkan GitHub dan pilih repository `mohammadrizal08061999-alt/Temp-Mail-R`.
4. Production branch: `main`.
5. Framework preset: None.
6. Build command: `exit 0`.
7. Build output directory: `/` (root).
8. Klik **Save and Deploy**.

Setiap commit ke branch `main` akan memicu deployment otomatis.

## Catatan keamanan dan batasan
- Ini layanan temporary email untuk pengujian yang sah, bukan layanan email permanen.
- Mailbox dan password disimpan di localStorage browser. Jangan gunakan untuk akun penting, data pribadi, atau informasi rahasia.
- Email dan ketersediaan domain bergantung pada Mail.tm; layanan dapat membatasi, menghapus, atau menolak mailbox.
- API Mail.tm gratis tanpa API key, tetapi memiliki batas penggunaan dan Terms of Use. Aplikasi ini tidak menjamin semua OTP/pesan akan diterima.
- Tautan atribusi ke Mail.tm ditampilkan pada footer aplikasi.
- Jangan gunakan untuk melewati kontrol keamanan, membuat akun massal, spam, atau aktivitas yang melanggar ketentuan layanan.

## Lokal
Buka `index.html` melalui web server statis lokal (misalnya VS Code Live Server).
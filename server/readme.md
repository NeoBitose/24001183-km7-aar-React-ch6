# Backend API untuk Users, Shops, dan Products

Proyek ini merupakan aplikasi backend yang dibangun menggunakan **Express.js** untuk menangani data **Users**, **Shops**, dan **Products**. Aplikasi ini menyediakan fitur untuk melakukan pencarian (query) data berdasarkan kolom tertentu, filtering, serta mendukung pagination dan pembatasan jumlah data yang ditampilkan (limit) pada respon API.

## Database
<img src="/public/images/db-diagram.png" width="80%" alt="database" />

## Fitur

- **findUsers**: Menampilkan daftar pengguna dengan pencarian berdasarkan kolom tertentu.
- **getAllShops**: Menampilkan daftar toko dengan fitur pencarian dan filter.
- **getAllProducts**: Menampilkan daftar produk dengan kemampuan pencarian dan filter.
- Mendukung **pagination** untuk memudahkan pengambilan data dalam jumlah besar.
- Mendukung **limit** untuk membatasi jumlah data yang diambil dalam satu permintaan.

Contoh penggunaan pada users:
```
GET /api/v1/users?name=John&page=1&limit=10
```
Contoh penggunaan pada shops:
```
GET /api/v1/shops?name=Indoapril&page=2&limit=5
```
Contoh penggunaan pada products:
```
GET /api/v1/products?name=Pizza&page=3&limit=15
```


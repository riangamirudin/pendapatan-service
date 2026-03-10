# Kafka UI – Cara Penggunaan

Kafka UI (Provectus) dipakai untuk melihat cluster Kafka, topic, dan **data pesan** yang dikirim dari pendapatan-service.

## Menjalankan Kafka + Kafka UI

```bash
# Dari root proyek
docker compose -f docker-compose-kafka.yml up -d
```

Ini akan menjalankan:
- **Kafka** (port 9092, 9094)
- **Kafka UI** (port 8080)

## Membuka Kafka UI

1. Buka browser: **http://localhost:8080**
2. Pilih cluster **local** (jika ada pilihan).

## Melihat data yang dikirim

1. Di sidebar kiri, klik **Topics**.
2. Pilih topic yang dipakai oleh pendapatan-service, misalnya **`pendapatan.sts.posted`** (untuk event STS).
3. Buka tab **Messages**.
4. Klik **Produce Message** untuk kirim pesan uji, atau cukup **Refresh** / tunggu agar pesan yang dikirim dari API tampil di sini.
5. Di tab **Messages** bisa dilihat isi pesan (payload) yang dikirim ke topic tersebut.

## Fitur berguna

- **Topics** – Daftar topic, partisi, offset.
- **Messages** – Isi pesan per topic (bisa filter offset, limit).
- **Brokers** – Status broker Kafka.
- **Consumers** – Grup consumer (jika ada).

## Menghentikan

```bash
docker compose -f docker-compose-kafka.yml down
```

#!/bin/bash
# Contoh curl POST STS (Surat Tanda Setoran)
# Pastikan app jalan (npm run start) dan sudah ada data TBP dengan id_tbp_bapenda 800023, 800024 (dari seed).

curl -X POST http://localhost:3000/pendapatan/sts \
  -H "Content-Type: application/json" \
  -d '{
    "id_sts": 1111,
    "no_sts": "3316245000347800",
    "uraian": "RETRIBUSI PENYEDIAAN LAHAN PARKIR DI LUAR BADAN JALAN",
    "total": 442000,
    "list_id_tbp_bapenda": [800023, 800024],
    "tanggal_sts": "2026-03-09",
    "nomor_referensi": "655303",
    "workstation": "QZRCSRVS"
  }'

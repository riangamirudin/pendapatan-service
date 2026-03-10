/**
 * Mock data untuk testing dan dokumentasi tiap endpoint Pendapatan Service.
 * Bisa dipakai untuk seed data atau copy-paste di Postman/curl.
 */

// ==================== TBP (SKR-TBP) ====================

/** POST /pendapatan/skr-tbp - Contoh request buat TBP */
export const mockPostTbpRequest = {
  jenis_dokumen: 3,
  id_skr_bapenda: 796795,
  id_tbp_bapenda: 800023,
  no_skr_bapenda: '3346245000189301',
  no_tbp_bapenda: '3326245000094901',
  org_id_grms: 6245,
  tanggal: '2026-03-09',
  uraian: 'Pembayaran - Roda 2',
  nama_penyetor: 'CASONO',
  alamat_penyetor:
    'WIROSARI DAMAI BLOK G NO. 30 RT 006 RW 007 SAMBONG BATANG',
  npwp_penyetor: '-',
  tanggal_jatuh_tempo: '2026-03-23',
  total: 209000,
  rinci: [
    { id_ssk_grms: null, id_rab_grms: null, id_lvl6_grms: 276, total_grms: 209000 },
  ],
};

/** TBP mock kedua (untuk seed, supaya STS bisa pakai 2 id) */
export const mockPostTbpRequest2 = {
  ...mockPostTbpRequest,
  id_tbp_bapenda: 800024,
  no_tbp_bapenda: '3326245000094902',
  uraian: 'Pembayaran - Roda 4',
  total: 233000,
  rinci: [
    { id_ssk_grms: null, id_rab_grms: null, id_lvl6_grms: 276, total_grms: 233000 },
  ],
};

/** GET /pendapatan/skr-tbp?no_tbp= - Contoh: no_tbp = no_tbp_bapenda dari mock di atas */

/** POST /pendapatan/srk-tbp/batal - Contoh request pembatalan TBP */
export const mockSrkTbpBatalRequest = {
  id_ptbp: 19,
  no_ptbp: '3356164000000102',
  tanggal_pengajuan: '2026-02-10',
  uraian:
    'Pembatalan TBP Pendapatan dikarenakan double input.',
  total: 2156500,
  list_id_tbp_bapenda: [800023, 800024],
  tanggal_verifikasi: '2026-02-11 10:33:50',
};

// ==================== STS ====================

/** POST /pendapatan/sts - Contoh request (list_id_tbp_bapenda harus id TBP yang sudah ada) */
export const mockPostStsRequest = {
  id_sts: 40938,
  no_sts: '3316245000040100',
  uraian: 'RETRIBUSI PENYEDIAAN LAHAN PARKIR DI LUAR BADAN JALAN',
  total: 442000,
  list_id_tbp_bapenda: [800023, 800024],
  tanggal_sts: '2026-03-09',
  nomor_referensi: '655303',
  workstation: 'QZRCSRVS',
};

/** GET /pendapatan/sts?no_sts= - Contoh: no_sts dari mock di atas */

/** POST /pendapatan/sts/pembatalan - Contoh request pembatalan STS */
export const mockStsPembatalanRequest = {
  id_sts: 40938,
  uraian: 'Pembatalan karena salah input data',
};

// ==================== KOREKSI ====================

/** PUT /pendapatan/koreksi - Contoh request koreksi pendapatan */
export const mockKoreksiPendapatanRequest = {
  id_koreksi: 40,
  sts_id_grms: 24472,
  no_surat: '900.1.13.1/058/2026',
  tanggal: '2026-02-18',
  keterangan:
    'denda bbnkb light truck di revisi menjadi denda pkb light truck karena salah input rekening pada sipenari',
  user_input: 'DARA RAHISYA SURYA, S.Kom',
  user_org_input:
    'Badan Pengelola Pendapatan Daerah - Unit Pengelolaan Pendapatan Daerah Ungaran',
  user_verifikasi: 'RIFKA APRIYANI, S.E.',
  user_org_verifikasi:
    'Badan Pengelola Keuangan dan Aset Daerah - Bidang Akuntansi',
  total: 49000,
  rinci: [
    { kode_lvl6_id: 12711, jenis: 1, nilai: 49000 },
    { kode_lvl6_id: 12693, jenis: 2, nilai: 49000 },
  ],
  rinci_tbp: [
    { id_tbp_grms: 43538, nomor_bukti: '3326164000063901', id_tbp_bapenda: 751305 },
    { id_tbp_grms: 43539, nomor_bukti: '3326164000063801', id_tbp_bapenda: 751303 },
  ],
  tanggal_verifikasi: '2026-02-18 13:33:53',
};

// ==================== VERIFIKASI PEMBAYARAN ====================

/** POST /pendapatan/verifikasi-pembayaran - Contoh request */
export const mockVerifikasiPembayaranRequest = {
  idBilling: 'BILL-2026-001',
  kodeVerifikasi: 'VERIF-12345',
};

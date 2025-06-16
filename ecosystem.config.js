module.exports = {
  apps: [{
    name: "be-book-keeping",    // Ganti dengan nama aplikasi Anda
    script: "./dist/index.js",   // Path menuju hasil `npm run build`
    
    // Opsi tambahan (opsional tapi bagus)
    instances: 1,                // Jalankan 1 instance aplikasi
    autorestart: true,           // Restart otomatis jika aplikasi crash
    watch: false,                // Jangan gunakan watch di produksi
    max_memory_restart: '1G',    // Restart jika memori melebihi 1GB
    env: {
      NODE_ENV: "production",    // Set environment ke produksi
      // PORT dan variabel lain dari file .env Anda akan dimuat
      // jika Anda menggunakan `dotenv` di kode Anda.
    }
  }]
};
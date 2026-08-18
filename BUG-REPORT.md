# Bug Report & Resolutions

## 1. Layout Shift & Scrollbar Hilang Saat Dropdown Avatar Ditinggal/Diklik

### Deskripsi Masalah
Saat tombol avatar/user dropdown di navbar diklik, scrollbar browser mendadak hilang dan seluruh konten halaman bergeser (*layout shift*) ke arah kanan.

### Akar Masalah
Library Headless UI (**Reka UI** / Radix Vue) secara otomatis menambahkan atribut `data-reka-scroll-lock` serta inline style `overflow: hidden` dan `padding-right` pada elemen `<body>` saat menu popover/dropdown terbuka. Pada aplikasi yang menggunakan kustom scrollbar container pada `<main>`, penguncian ini memicu penghilangan scrollbar dan pergeseran layout.

### Solusi / Perbaikan
1. **Disable Pointer Lock di Component**:
   Di `src/components/ui/dropdown-menu/DropdownMenuContent.vue`, tambahkan prop `:disable-outside-pointer-events="false"` pada komponen `DropdownMenuContent`.
   
2. **Override Scroll Lock di CSS Global**:
   Di `src/style.css`, tambahkan override CSS pada `@layer base`:
   ```css
   html, body {
     scrollbar-gutter: stable;
   }
   body[data-reka-scroll-lock],
   body[data-radix-scroll-lock],
   body[style*="overflow: hidden"] {
     overflow: auto !important;
     padding-right: 0px !important;
   }
   ```

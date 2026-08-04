const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbw9q2fpkjw--31ymaiIuEqaod11bmv0ogkmv7LsxNYS-jOLDWDru0OEThW8HP17ddaIDg/exec";
const HARGA_KARTU = 50000;
const BIAYA_ADMIN = 6500;

const form = document.getElementById('zeusForm');
const nominal = document.getElementById('nominal');
const total = document.getElementById('total');
const status = document.getElementById('status');
const btnKirim = document.getElementById('btnKirim');

// 1. Auto hitung total: (kartu x 50000) - 6500
nominal.addEventListener('input', () => {
  const jumlah = parseInt(nominal.value);
  if(jumlah >= 7 && jumlah <= 200){
    const hitung = (jumlah * HARGA_KARTU) - BIAYA_ADMIN;
    total.value = "Rp " + hitung.toLocaleString('id-ID');
  } else {
    total.value = "";
  }
});

// 2. Submit form ke Google Sheet
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const jumlah = parseInt(nominal.value);

  if(jumlah < 7 || jumlah > 200){
    alert("Jumlah kartu harus antara 7 sampai 200");
    return;
  }

  btnKirim.disabled = true;
  status.innerText = "Mengirim data...";

  const formData = new FormData(form);
  formData.append('waktu', new Date().toLocaleString('id-ID'));
  formData.append('nominal', jumlah + " Kartu");
  formData.append('total', total.value);

  try {
    await fetch(WEB_APP_URL, {
      method: 'POST',
      body: formData
    });
    
    status.innerText = "✅ Data berhasil dikirim! Kami akan proses.";
    form.reset();
    total.value = "";
    btnKirim.disabled = false;
  } catch(err) {
    status.innerText = "❌ Error: Gagal kirim. Cek koneksi.";
    btnKirim.disabled = false;
  }
});

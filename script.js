const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbygEEGS08KKDT1cEUU55aCY257abpc0qfS_phaIPfRzUecgTgRmVNlLVou_rz6aymZr2g/exec";
const HARGA_KARTU = 50000;
const BIAYA_ADMIN = 6500;

const form = document.getElementById('zeusForm');
const nominal = document.getElementById('nominal');
const total = document.getElementById('total');
const status = document.getElementById('status');
const btnKirim = document.getElementById('btnKirim');

nominal.addEventListener('input', () => {
  const jumlah = parseInt(nominal.value);
  if(jumlah >= 7 && jumlah <= 200){
    const hitung = (jumlah * HARGA_KARTU) - BIAYA_ADMIN;
    total.value = "Rp " + hitung.toLocaleString('id-ID');
  } else {
    total.value = "";
  }
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const jumlah = parseInt(nominal.value);

  if(jumlah < 7 || jumlah > 200){
    alert("Jumlah kartu harus antara 7 sampai 200");
    return;
  }

  btnKirim.disabled = true;
  status.innerText = "Mengirim data...";

  const dataKirim = {
    waktu: new Date().toLocaleString('id-ID'),
    playerId: form.playerId.value,
    jumlah: jumlah + " Kartu",
    total: total.value,
    bank: form.bank.value,
    rek: form.rek.value,
    namaRek: form.namaRek.value,
    wa: form.wa.value
  };

  try {
    const res = await fetch(WEB_APP_URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(dataKirim)
    });
    
    const result = await res.json();

    if(result.result === "sukses"){
      status.innerText = "✅ Data berhasil dikirim! Kami akan proses.";
      form.reset();
      total.value = "";
    } else {
      status.innerText = "❌ Gagal: " + result.error;
    }
    btnKirim.disabled = false;
    
  } catch(err) {
    status.innerText = "❌ Error: Gagal kirim. Cek koneksi.";
    btnKirim.disabled = false;
  }
});

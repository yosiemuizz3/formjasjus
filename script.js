document.addEventListener('DOMContentLoaded', function() {
    
    // KONFIG - UDAH SAYA GANTI NOMOR KAMU
    const HARGA = 50000;
    const ADMIN = 6500;
    const MIN_KARTU = 7;
    const NOMOR_WA_TUJUAN = '6285743230776'; // NOMOR KAMU

    // AMBIL ELEMEN
    const form = document.getElementById('formZeuz');
    const jumlahInput = document.getElementById('jumlah');
    const totalInput = document.getElementById('total');
    const btn = document.getElementById('submitBtn');
    const status = document.getElementById('status');

    if(!form) {
        console.error("ID formZeuz tidak ditemukan di HTML");
        return;
    }

    function hitungTotal() {
        const jumlah = parseInt(jumlahInput.value) || 0;
        let total = (jumlah * HARGA) - ADMIN; 
        if (total < 0) total = 0; 
        
        if (jumlah >= MIN_KARTU) {
            totalInput.value = `Rp ${total.toLocaleString('id-ID')}`;
            btn.disabled = false;
            status.innerText = '';
        } else if (jumlah > 0) {
            totalInput.value = `Minimal ${MIN_KARTU} Kartu`;
            btn.disabled = true;
            status.innerText = `⚠️ Minimal bongkar ${MIN_KARTU} kartu`;
        } else {
            totalInput.value = '';
            btn.disabled = false;
            status.innerText = '';
        }
    }

    jumlahInput.addEventListener('input', hitungTotal);
    hitungTotal();

    // KIRIM KE WA
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const jumlah = parseInt(jumlahInput.value) || 0;
        if (jumlah < MIN_KARTU) {
            status.innerText = `❌ Minimal ${MIN_KARTU} kartu untuk bongkar`;
            return;
        }

        const playerId = document.getElementById('playerId').value;
        const total = totalInput.value;
        const bank = document.getElementById('bank').value;
        const rek = document.getElementById('rek').value;
        const namaRek = document.getElementById('namaRek').value;
        const wa = document.getElementById('wa').value;
        const waktu = new Date().toLocaleString("id-ID");

        const pesan = `*PENGAJUAN BONGKAR ZEUZ*
        
*Waktu:* ${waktu}
*Player ID:* ${playerId}
*Jumlah Kartu:* ${jumlah}
*Total Diterima:* ${total}

*Bank:* ${bank}
*No Rek:* ${rek}
*Atas Nama:* ${namaRek}
*No WA Customer:* ${wa}`;

        const urlWa = `https://wa.me/${NOMOR_WA_TUJUAN}?text=${encodeURIComponent(pesan)}`;
        window.open(urlWa, '_blank');

        status.innerText = '✅ Mengarahkan ke WhatsApp...';
        form.reset();
        hitungTotal(); 
    });

});

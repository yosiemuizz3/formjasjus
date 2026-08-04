document.addEventListener('DOMContentLoaded', function() {
    
    // KONFIG
    const HARGA = 50000;
    const ADMIN = 6500;
    const MIN_KARTU = 7;

    // AMBIL ELEMEN
    const form = document.getElementById('formZeuz');
    const jumlahInput = document.getElementById('jumlah');
    const totalInput = document.getElementById('total');
    const btn = document.getElementById('submitBtn');
    const status = document.getElementById('status');

    if(!form || !jumlahInput || !totalInput) {
        console.error("Elemen form tidak ditemukan. Cek ID di HTML");
        return;
    }

    // 1. FUNGSI HITUNG OTOMATIS
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
    hitungTotal(); // Jalanin pas awal

    // 2. FUNGSI KIRIM DATA
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const jumlah = parseInt(jumlahInput.value) || 0;
        if (jumlah < MIN_KARTU) {
            status.innerText = `❌ Minimal ${MIN_KARTU} kartu untuk bongkar`;
            return;
        }

        btn.disabled = true;
        status.innerText = 'Mengirim data...';

        const data = {
            waktu: new Date().toLocaleString("id-ID"),
            playerId: document.getElementById('playerId').value,
            jumlah: jumlah,
            total: totalInput.value,
            bank: document.getElementById('bank').value,
            rek: document.getElementById('rek').value,
            namaRek: document.getElementById('namaRek').value,
            wa: document.getElementById('wa').value
        };

        try {
            await fetch('GANTI_DENGAN_URL_APPS_SCRIPT_BARU_KAMU', {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify(data)
            });

            status.innerText = '✅ Data berhasil dikirim!';
            form.reset();
            hitungTotal(); 
            
        } catch (error) {
            status.innerText = '❌ Gagal kirim. Coba lagi.';
            console.error('Error:', error);
        } finally {
            btn.disabled = false;
        }
    });

});

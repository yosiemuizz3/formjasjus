document.addEventListener('DOMContentLoaded', function() {
    // KONFIG
    const HARGA_BONGKAR = 50000; const ADMIN = 6500; const MIN_BONGKAR = 7;
    const HARGA_ORDER = 55000; const MIN_ORDER = 1; // TANPA ADMIN
    const NOMOR_WA_TUJUAN = '6285743230776';

    // FUNGSI GANTI TAB
    window.showTab = function(tabName) {
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.getElementById(tabName).classList.add('active');
        event.target.classList.add('active');
    }

    // ===== LOGIKA BONGKAR - ADA ADMIN =====
    const formBongkar = document.getElementById('formZeuz');
    const jumlahInput = document.getElementById('jumlah');
    const totalInput = document.getElementById('total');
    const btn = document.getElementById('submitBtn');
    const status = document.getElementById('status');

    function hitungTotal() {
        const jumlah = parseInt(jumlahInput.value) || 0;
        let total = (jumlah * HARGA_BONGKAR) - ADMIN; // ADA ADMIN
        if (total < 0) total = 0; 
        
        if (jumlah >= MIN_BONGKAR) {
            totalInput.value = `Rp ${total.toLocaleString('id-ID')}`;
            btn.disabled = false; status.innerText = '';
        } else if (jumlah > 0) {
            totalInput.value = `Minimal ${MIN_BONGKAR} Kartu`;
            btn.disabled = true; status.innerText = `⚠️ Minimal bongkar ${MIN_BONGKAR} kartu`;
        } else {
            totalInput.value = ''; btn.disabled = false; status.innerText = '';
        }
    }
    jumlahInput.addEventListener('input', hitungTotal); hitungTotal();

    formBongkar.addEventListener('submit', function(e) {
        e.preventDefault();
        const jumlah = parseInt(jumlahInput.value) || 0;
        if (jumlah < MIN_BONGKAR) { status.innerText = `❌ Minimal ${MIN_BONGKAR} kartu`; return; }
        const pesan = `*PENGAJUAN BONGKAR ZEUZ*%0A*Player ID:* ${document.getElementById('playerId').value}%0A*Jumlah:* ${jumlah} Kartu%0A*Total Diterima:* ${totalInput.value}%0A*Bank:* ${document.getElementById('bank').value}%0A*No Rek:* ${document.getElementById('rek').value}%0A*Atas Nama:* ${document.getElementById('namaRek').value}%0A*No WA:* ${document.getElementById('wa').value}`;
        window.open(`https://wa.me/${NOMOR_WA_TUJUAN}?text=${pesan}`, '_blank');
        status.innerText = '✅ Mengarahkan ke WhatsApp...'; formBongkar.reset(); hitungTotal();
    });

    // ===== LOGIKA ORDER - TIDAK ADA ADMIN =====
    const formOrder = document.getElementById('formOrder');
    const jumlahOrderInput = document.getElementById('jumlahOrder');
    const totalOrderInput = document.getElementById('totalOrder');
    const statusOrder = document.getElementById('statusOrder');

    function hitungOrder() {
        const jumlah = parseInt(jumlahOrderInput.value) || 0;
        let total = jumlah * HARGA_ORDER; // LANGSUNG KALI, TANPA ADMIN
        if (jumlah >= MIN_ORDER) {
            totalOrderInput.value = `Rp ${total.toLocaleString('id-ID')}`;
        } else if (jumlah > 0) {
            totalOrderInput.value = `Minimal ${MIN_ORDER} Kartu`;
        } else {
            totalOrderInput.value = '';
        }
    }
    jumlahOrderInput.addEventListener('input', hitungOrder); hitungOrder();

    formOrder.addEventListener('submit', function(e) {
        e.preventDefault();
        const jumlah = parseInt(jumlahOrderInput.value) || 0;
        if (jumlah < MIN_ORDER) { statusOrder.innerText = `❌ Minimal order ${MIN_ORDER} kartu`; return; }
        const totalBayar = jumlah * HARGA_ORDER;
        const pesan = `*ORDER ZEUZ*%0A*Player ID:* ${document.getElementById('playerIdOrder').value}%0A*Jumlah Order:* ${jumlah} Kartu%0A*Harga/Kartu:* Rp ${HARGA_ORDER.toLocaleString('id-ID')}%0A*Total Bayar:* Rp ${totalBayar.toLocaleString('id-ID')}%0A*Metode Bayar:* ${document.getElementById('metodeBayar').value}%0A*No WA:* ${document.getElementById('waOrder').value}`;
        window.open(`https://wa.me/${NOMOR_WA_TUJUAN}?text=${pesan}`, '_blank');
        statusOrder.innerText = '✅ Mengarahkan ke WhatsApp...'; formOrder.reset(); hitungOrder();
    });
});

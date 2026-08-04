document.getElementById('formZeuz').addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const status = document.getElementById('status');

    btn.disabled = true;
    status.innerText = 'Mengirim data...';

    const data = {
        waktu: new Date().toLocaleString("id-ID"),
        playerId: document.getElementById('playerId').value,
        jumlah: document.getElementById('jumlah').value,
        total: document.getElementById('total').value,
        bank: document.getElementById('bank').value,
        rek: document.getElementById('rek').value,
        namaRek: document.getElementById('namaRek').value,
        wa: document.getElementById('wa').value
    };

    try {
        await fetch('https://script.google.com/macros/s/AKfycbygEEGS08KKDkT1cEUU55aCY257abpc0qFS_phalPfRzUecgTgRmVNILVou_rz6aymZfZg/exec', {
            method: 'POST',
            mode: 'no-cors', // INI KUNCINYA
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        status.innerText = '✅ Data berhasil dikirim!';
        document.getElementById('formZeuz').reset();
        
    } catch (error) {
        status.innerText = '❌ Gagal kirim. Coba lagi.';
        console.error('Error:', error);
    } finally {
        btn.disabled = false;
    }
});


function showCardPayment() {
    document.getElementById('card-payment').style.display = 'block';
    document.getElementById('upi-payment').style.display = 'none';
    document.getElementById('qr-code-payment').style.display = 'none';
}


function showUPIPayment() {
    document.getElementById('upi-payment').style.display = 'block';
    document.getElementById('card-payment').style.display = 'none';
    document.getElementById('qr-code-payment').style.display = 'none';
}

function showQRCode() {
    document.getElementById('qr-code-payment').style.display = 'block';
    document.getElementById('upi-payment').style.display = 'none';
    document.getElementById('card-payment').style.display = 'none';

    const qrCode = new QRious({
        element: document.getElementById('qr-code'),
        size: 200,
        value: 'upi://pay?pa=example@upi&pn=Your%20Name&am=500&cu=INR&tn=Test%20Payment'
    });
}


document.getElementById('card-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Card payment is processing...');
    
});


document.getElementById('upi-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('UPI payment is processing...');
    
});

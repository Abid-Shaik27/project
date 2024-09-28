const products = [
    {
        name: "Apple iPhone 15 (Black, 128 GB).",
        description: "The airpods with black color and 5 hours battery life.",
        mrp: "$150.00",
        discountPrice: "$955.99",
        img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRAyFm5FA_kKRo0mKO-jsq6L79U2Xw50D3X3Jvng0PRXVKRzKAC8LqkrBs0P2mWUPkAq08zZyQzeWlFRMJW71fwtUIBRUnCl0s6yzh7nSklbw1yo1BqLdAO0WLG&usqp=CAE",
    },
    {
        name: "Wireless Headphones",
        description: "Noise-canceling over-ear headphones for an immersive experience.",
        mrp: "$120.00",
        discountPrice: "$89.99",
        img: "https://m.media-amazon.com/images/I/41SVusu4r6L._SX300_SY300_QL70_FMwebp_.jpg",
    },
    {
        name: "Smart Watch",
        description: "Track your fitness and stay connected with our latest smartwatch.",
        mrp: "$200.00",
        discountPrice: "$149.99",
        img: "https://m.media-amazon.com/images/I/41oqe3FSLcL._SX300_SY300_QL70_FMwebp_.jpg",
    },
    {
        name: "Bluetooth Speaker",
        description: "Portable Bluetooth speaker with great sound quality.",
        mrp: "$80.00",
        discountPrice: "$59.99",
        img: "https://m.media-amazon.com/images/I/71wAXhzCmnS._SX679_.jpg",
    },
    {
        name: "Fitness Tracker",
        description: "Monitor your activity and sleep with our advanced fitness tracker.",
        mrp: "$60.00",
        discountPrice: "$39.99",
        img: "https://m.media-amazon.com/images/I/613MGc8BguL.jpg",
    },
    {
        name: "Gaming Mouse",
        description: "High precision gaming mouse with customizable DPI settings.",
        mrp: "$40.00",
        discountPrice: "$29.99",
        img: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcS6FGcKoSWMJ3MuBnx0d5biMUc6jidaatooIrS_KlCbv0lcsfJxxmq6VtT6bs2nLsELh5JbqIGwio9NbI8tdSLc5_Z-WNgTzDGOzCYHm8r7NYWqZgmSzHtMqg&usqp=CAE",
    },
];

function renderProducts(productsToRender) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";
    productsToRender.forEach(product => {
        const col = document.createElement("div");
        col.className = "col-md-4 mb-4";
        col.innerHTML = `
            <div class="product-card">
                <img src="${product.img}" alt="${product.name}">
                <div class="product-description p-3">
                    <h5>${product.name}</h5>
                    <p>${product.description}</p>
                    <p>MRP: <s>${product.mrp}</s></p>
                    <p>Discounted Price: <strong>${product.discountPrice}</strong></p>
                    <button class="custom-buy-now" onclick="goToProductPage('${encodeURIComponent(product.name)}', '${encodeURIComponent(product.description)}', '${encodeURIComponent(product.mrp)}', '${encodeURIComponent(product.discountPrice)}', '${encodeURIComponent(product.img)}')">Buy Now</button>
                </div>
            </div>
        `;
        productList.appendChild(col);
    });
}

function goToProductPage(name, description, mrp, discountPrice, img) {
    const productDetailsURL = `product-details.html?name=${name}&description=${description}&mrp=${mrp}&discountPrice=${discountPrice}&img=${img}`;
    window.location.href = productDetailsURL;
}

document.getElementById("toggleButton").addEventListener("click", function() {
    document.body.classList.toggle("night-mode");
    document.querySelector(".header").classList.toggle("night-mode");
    const productCards = document.querySelectorAll(".product-card");
    productCards.forEach(card => card.classList.toggle("night-mode"));
});

// Search functionality
document.getElementById("search-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const searchQuery = document.getElementById("search-bar").value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchQuery) || 
        product.description.toLowerCase().includes(searchQuery)
    );
    renderProducts(filteredProducts);
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const searchBar = document.getElementById("search-bar");
const micButton = document.getElementById("mic-btn");

micButton.addEventListener("click", () => {
    recognition.start();
});

recognition.onresult = (event) => {
    const speechResult = event.results[0][0].transcript;
    searchBar.value = speechResult;  
    console.log("Speech recognized: " + speechResult);
};

recognition.onspeechstart = () => {
    console.log("Speech has been detected.");
};

recognition.onspeechend = () => {
    recognition.stop();
    console.log("Speech recognition stopped.");
};

recognition.onerror = (event) => {
    console.error("Speech recognition error detected: " + event.error);
};

renderProducts(products);

document.addEventListener('DOMContentLoaded', function () {
    const buyNowButtons = document.querySelectorAll('.buy-now-btn');
    const paymentModal = document.getElementById('payment-modal');
    const paymentOptions = document.querySelector('.payment-options');
    const cardPayment = document.getElementById('card-payment');

    buyNowButtons.forEach(button => {
        button.addEventListener('click', function () {
            const product = this.getAttribute('data-product');
            const price = this.getAttribute('data-price');
            openPaymentModal(product, price);
        });
    });

    // Function to show 3D view
function show3DView(event) {
    event.stopPropagation(); // Prevent the card click event

    // Get the product ID and name for the 3D view
    const productId = event.target.closest('.product-card').getAttribute('data-product-id');
    const productName = event.target.closest('.product-card').querySelector('.card-title').textContent;

    // Assuming you have a 3D model URL based on product ID or name
    const modelURL = `path/to/models/${productId}.glb`; // Update this with your actual model URL

    // Example: Open a modal or a new page to display the 3D view
    // Here is how you might do it using a simple alert (replace with your implementation)
    alert(`Displaying 3D view for ${productName}. Model URL: ${modelURL}`);

    // Alternatively, you could redirect to a new page
    // window.location.href = `3d-view.html?model=${encodeURIComponent(modelURL)}`;
}


    function openPaymentModal(product, price) {
        paymentModal.style.display = 'block';
        document.querySelector('#payment-modal h2').textContent = `Proceed to Payment for ${product} - ${price}`;
    }

    window.showPaymentOptions = function () {
        paymentOptions.style.display = 'block';
    };

    window.showCardPayment = function () {
        paymentOptions.style.display = 'none';
        cardPayment.style.display = 'block';
    };

    window.showUPIPayment = function () {
        paymentOptions.style.display = 'none';
        alert('Proceed with UPI Payment...');
    };

    window.showQRCode = function () {
        paymentOptions.style.display = 'none';
        alert('Proceed with QR Code Payment...');
    };
    
    // When clicking the "Proceed to Buy" button, navigate to the payment page
document.querySelector('.custom-buy-now').addEventListener('click', () => {
    window.location.href = `payment.html?name=${encodeURIComponent(name)}&discountPrice=${encodeURIComponent(discountPrice)}`;
});


    const cardForm = document.getElementById('card-form');
    cardForm.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Processing Card Payment...');
    });
});

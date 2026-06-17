const backend = "https://material-scanner-backend-1.onrender.com";

Quagga.init({
    inputStream: {
        name: "Live",
        type: "LiveStream",
        target: document.querySelector('#camera')
    },
    decoder: {
        readers: ["code_128_reader", "ean_reader"]
    }
}, function(err) {
    if (!err) {
        Quagga.start();
    }
});

Quagga.onDetected(async function(result) {
    const code = result.codeResult.code;

    const res = await fetch(`${backend}/material/${code}`);
    const data = await res.json();

    document.getElementById("result").innerHTML = `
        <h3>${data.name || "Nenalezeno"}</h3>
        <p>Kategorie: ${data.category}</p>
        <p>Použití: ${data.usage}</p>
        <p>Množství: ${data.quantity}</p>
        <p>Umístění: ${data.location}</p>
    `;
});

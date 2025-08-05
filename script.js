const apiKey = "b30bd0ed72a8846418687ee23b388f76"

document.getElementById("cidadeInput").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault()
        const cidade = this.value
        console.log("Cidade digitada:", cidade)
        buscarClima(cidade);
        this.value = "";
    }
});

let latitude;
let longitude;

let nome;
let pais;
let temperatura;
let clima;
let max;
let min;
let humidade;
let vento;

async function buscarClima(cidade) {

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Erro ao buscar dados. Verifique o nome da cidade.");
        }

        const responseJson = await response.json();

        latitude = responseJson.coord.lat;
        longitude = responseJson.coord.lon;

        nome = responseJson.name;
        pais = responseJson.sys.country;
        temperatura = responseJson.main.temp;
        clima = responseJson.weather[0].description;
        max = responseJson.main.temp_max;
        min = responseJson.main.temp_min;
        humidade = responseJson.main.humidity;
        vento = responseJson.wind.speed;

        console.log(responseJson);

        
        mostrarClima()

    } catch (erro) {
        alert("Erro: " + erro.message);
    }

}
function imgClima(descricao){
    descricao = descricao.toLowerCase();

    if (descricao.includes("nublado")) return "img/nublado.png";
    if (descricao.includes("céu limpo")) return "img/ensolarado.png";
    if (descricao.includes("chuva")) return "img/chuva.png";
    if (descricao.includes("tempestade")) return "img/tempestade.png";
    if (descricao.includes("neve")) return "img/neve.png";
    if (descricao.includes("neblina") || descricao.includes("névoa")) return "img/neblina.png";

    return "img/padrao.png";
}


function mostrarClima() {
    let conteudos = document.querySelector(".conteudo");

    conteudos.innerHTML = `
        <h1>${nome}, ${pais}</h1>
        <div class="area-graus">
            <img src="${imgClima(clima)}">
            <div class="content-graus">
                <h2>${temperatura} C°</h2>
                <h3>${clima}</h3>
            </div>
        </div>
        <div class="temp-area">
            <div class="temp">
                <p>MAX</p>
                <h4>${max} C°</h4>
            </div>
            <div class="temp">
                <p>MIN</p>
                <h4>${min} C°</h4>
            </div>
            <div class="temp">
                <p>Humidade</p>
                <h4>${humidade} %</h4>
            </div>
            <div class="temp">
                <p>Vento</p>
                <h4>${vento} KM/h</h4>
            </div>
        </div>
        <div id="map"></div>
    `;
    montarMap(latitude, longitude)
}

let map;

function montarMap(lat, lon) {
    
    if (map) {
        map.remove();
    }
    map = L.map('map', {
        center: [lat, lon],
        zoom: 10,
        zoomControl: false 
    });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

}
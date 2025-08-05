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

function mostrarClima() {
    let conteudos = document.querySelector(".conteudo");

    conteudos.innerHTML = `

            <h1>${nome}, ${pais}</h1>
            <div class="area-graus">
                <img src="img/wb_sunny_50dp_E3E3E3_FILL0_wght400_GRAD0_opsz48.png">
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

    `;
}
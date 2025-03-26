console.log("criptoScript Iniciado");
    
const moedaOrigem = document.getElementById("moedaOrigem");
const moedaDestino = document.getElementById("moedaDestino");//variavel dos select
const valorOrigem = document.getElementById("valorOrigem");
const valorConvertido = document.getElementById("valorConvertido");//variavel dos input

document.addEventListener("DOMContentLoaded", function () 
{
    moedaDestino.innerHTML = moedaOrigem.innerHTML; 
    fetchData();
});

async function fetchData() 
{
        const from = moedaOrigem.value; //guarda o codigo da cripto selecionada dentro de cada option do select
        const to = moedaDestino.value;
        const valor = parseFloat(valorOrigem.value) || 0; //pega o valor do imput e converte para float

        try {
            const responseFrom = await fetch(`https://api.coinlore.net/api/ticker/?id=${from}`);
            const responseTo = await fetch(`https://api.coinlore.net/api/ticker/?id=${to}`);

            if (!responseFrom.ok || !responseTo.ok) {
                throw new Error("Could not fetch");
            }

            const dataFromJson = await responseFrom.json(); 
            const dataToJson = await responseTo.json(); //guarda o .json da response

            const priceFrom = parseFloat(dataFromJson[0].price_usd);
            const priceTo = parseFloat(dataToJson[0].price_usd); //pega os valores em dollar

            const convertido = (valor * priceFrom) / priceTo; 
            valorConvertido.value = convertido.toFixed(2);
        } catch (error) {
            console.error("Erro ao buscar taxa de câmbio", error);
        }
    }

    fetchData();

valorOrigem.addEventListener("input", fetchData);
moedaOrigem.addEventListener("change", fetchData);
moedaDestino.addEventListener("change", fetchData);

//funçao para pegar url da imagem da api da bandeira dos países das moedas

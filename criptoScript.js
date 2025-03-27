console.log("criptoScript Iniciado");
//mapeamento para converter pra api de icones
const criptoMap = {
    "90": 1,        "80": 1027,      "518": 825,   
    "2710": 1839,   "33285": 3408,   "58": 52,     
    "257": 2010,    "2": 74,         "48543": 5426,
    "45219": 6636 
};


const moedaOrigem = document.getElementById("moedaOrigem");
const moedaDestino = document.getElementById("moedaDestino");//variavel dos select
const valorOrigem = document.getElementById("valorOrigem");
const valorConvertido = document.getElementById("valorConvertido");//variavel dos input

document.addEventListener("DOMContentLoaded", function () 
{
    valorOrigem.addEventListener("input", fetchData);
    moedaOrigem.addEventListener("change", function()
    {
        fetchData();
        atualizarCripto();
    });
    moedaDestino.addEventListener("change", function()
    {
        fetchData();
        atualizarCripto();
    });
    
    fetchData();
    atualizarCripto();
    moedaDestino.innerHTML = moedaOrigem.innerHTML;
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

async function getCriptoUrl(codigoCripto)
{
    if(typeof codigoCripto !== 'string' || !codigoCripto)
    {
        console.error(`Codigo da cripto inválido: ${codigoCripto}`);
        return null;
    }

    const codigoImg = criptoMap[codigoCripto];

    if(!codigoImg)
    {
        console.error(`Nenhuma codigo correspondente para essa moeda : 
            ${codigoImg}`);
            return null;
    }

    return `https://s2.coinmarketcap.com/static/img/coins/64x64/${codigoImg}.png`;
}

async function atualizarCripto()
{
    try
    {
    const iconeOrigem = await getCriptoUrl(moedaOrigem.value);
    const iconeDestino = await getCriptoUrl(moedaDestino.value);

    document.getElementById("criptoImgOrigem").src = iconeOrigem;
    document.getElementById("criptoImgDestino").src = iconeDestino;
    }
    catch(error)
    {
        console.error(`Erro ao atualizar icone das criptos`, error);
    }

}

function copyButton()
{
    const result = document.getElementById("valorConvertido").value;
    navigator.clipboard.writeText(result);

    alert('Resultado copiado para área de transferência!');
}





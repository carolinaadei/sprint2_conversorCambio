console.log("homeScript.js iniciado");
// dicionario de cada código da moeda para o pais com o objetivo de puxar a bandeira da api
const moedaParaPais = 
{
    "USD": "us",    "EUR": "eu",    "JPY": "jp",    
    "GBP": "gb",    "AUD": "au",    "CAD": "ca",    
    "CHF": "ch",    "CNY": "cn",    "HKD": "hk",    
    "SGD": "sg",    "SEK": "se",    "NOK": "no",    
    "DKK": "dk",    "INR": "in",    "BRL": "br",    
    "RUB": "ru",    "MXN": "mx",    "THB": "th",    
    "ZAR": "za",    "KRW": "kr",    "TRY": "tr",    
    "AED": "ae",    "NZD": "nz",    "PHP": "ph",    
    "MYR": "my"     
};

let moedaOrigem, moedaDestino, valorOrigem; //variaveis globais

document.addEventListener("DOMContentLoaded", function() 
{
    moedaOrigem = document.getElementById("moedaOrigem");
    moedaDestino = document.getElementById("moedaDestino");
    valorOrigem = document.getElementById("valorOrigem");
    
    valorOrigem.addEventListener("input", fetchData);
    moedaOrigem.addEventListener("change", function() 
    {
        fetchData();
        atualizarBandeiras();
    });

    moedaDestino.addEventListener("change", function() 
    {
        fetchData();
        atualizarBandeiras();
    });
    
    moedaDestino.innerHTML = moedaOrigem.innerHTML;
    fetchData();
    atualizarBandeiras();
});

async function fetchData() 
{
    const valor = parseFloat(valorOrigem.value) || 0; // o 0 serve para tratar valor vazio
    const from = moedaOrigem.value;
    const to = moedaDestino.value;

    try  
    {
        const apikey = `${from}-${to}`;
        const key = `${from}${to}`;
        const response = await fetch(`https://economia.awesomeapi.com.br/json/last/${apikey}`);

        if(!response.ok) 
        {
            throw new Error("Could not fetch");
        }
        
        const data = await response.json();
        const taxa = parseFloat(data[key].bid);
        document.getElementById("valorConvertido").value = (valor * taxa).toFixed(2);
    } 
    catch(error) 
    {
        console.error("Erro ao buscar taxa de Cambio", error);
    }
}

async function getFlagUrl(codigoMoeda)
 {
    if(typeof codigoMoeda !== 'string' || !codigoMoeda) 
    {
        console.error(`Código de moeda inválido: ${codigoMoeda}`);
        return null;
    }
    
    const paisCodigo = moedaParaPais[codigoMoeda.toUpperCase()]; 
    
    if(!paisCodigo) 
    {
        console.error(`Nenhum país para essa moeda: ${codigoMoeda}`);
        return null;
    }
    
    return `https://flagcdn.com/w160/${paisCodigo.toLowerCase()}.png`;
}

async function atualizarBandeiras() 
{
    try 
    {
        const bandeiraOrigem = await getFlagUrl(moedaOrigem.value);
        const bandeiraDestino = await getFlagUrl(moedaDestino.value);


        document.getElementById("flagOrigem").src = bandeiraOrigem;
        document.getElementById("flagDestino").src = bandeiraDestino;
    }
    catch(error)
    {
        console.error("Erro ao atualizar bandeiras", error);
    }
}
function copyButton()
{
    const result = document.getElementById("valorConvertido").value;
    navigator.clipboard.writeText(result);

    alert('Resultado copiado para área de transferência!');
}

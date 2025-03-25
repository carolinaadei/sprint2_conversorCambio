console.log("criptoScript Inciado");

fetchData();

document.addEventListener("DOMContentLoaded", function () {
    const selectOrigem = document.getElementById("moedaOrigem");
    const selectDestino = document.getElementById("moedaDestino");

    selectDestino.innerHTML = selectOrigem.innerHTML;
});

async function fetchData() 
{
    const valorOrigem = document.getElementById("valorOrigem"); //input origem
    const valorConvertido = document.getElementById("valorConvertido"); //input destino
    
    var valor = valorOrigem.value; //variavel contendo o valor que deseja converter
    var from =  moedaOrigem.value; //variavel contendo o codigo da moeda origem
    var to = moedaDestino.value; //variavel contendo o codigo da moeda de destino

    try
    {
        var apiFrom;
        var apiTo;
        const responseFrom = await fetch(`https://api.coinlore.net/api/ticker/?id=${apiFrom}`);
        const responseTo = await fetch(`https://api.coinlore.net/api/ticker/?id=${apiFrom}`);
        if(!responseFrom.ok || !responseTo.ok)
        {
            throw new Error("Could not fetch");
        }
        const data = await response.json();
        console.log(data);//debug
        
    }
    catch(error)
    {
        console.error("Erro ao buscar taxa de Cambio",error);
    }
}

valorOrigem.addEventListener("input", fetchData);
moedaOrigem.addEventListener("change", fetchData);
moedaDestino.addEventListener("change", fetchData);
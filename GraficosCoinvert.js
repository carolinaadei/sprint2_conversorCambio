console.log("homeScript.js iniciado")

fetchData();


document.addEventListener("DOMContentLoaded", function () { //Para copiar os dados dos seletores
    const selectOrigem = document.getElementById("moedaOrigem");
    const selectDestino = document.getElementById("moedaDestino");

    selectDestino.innerHTML = selectOrigem.innerHTML;
});


async function fetchData() 
{
    const valorOrigem = document.getElementById("valorOrigem"); //input origem
    const valorConvertido = document.getElementById("valorConvertido"); //input destino
    
    const valor = parseFloat(valorOrigem.value); //variavel contendo o valor que deseja converter
    const from =  moedaOrigem.value; //variavel contendo o codigo da moeda origem
    const to = moedaDestino.value; //variavel contendo o codigo da moeda de destino
    


    try
    {
        var apikey = from + "-" + to; //para colar na url da api
        var key = from  + to; //para chamar a bid
        const response = await fetch(`https://economia.awesomeapi.com.br/json/last/${apikey}`);

        if(!response.ok)
        {
            throw new Error("Could not fetch");
        }
        const data = await response.json();
        console.log(data);//debug
        console.log(data[key].bid);//debug

        var taxa = parseFloat(data[key].bid);
        valorConvertido.value = (valor * taxa).toFixed(2);
    }
    catch(error)
    {
        console.error("Erro ao buscar taxa de Cambio",error);
    }
}

valorOrigem.addEventListener("input", fetchData);
moedaOrigem.addEventListener("change", fetchData);
moedaDestino.addEventListener("change", fetchData);
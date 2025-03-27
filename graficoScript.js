console.log("homeScript.js iniciado");

document.addEventListener("DOMContentLoaded", function() 
{
    moeda = document.getElementById("moeda");

    moeda.addEventListener("change", () => 
    {
        fetchData(moeda.value);
    });

    fetchData(moeda.value); // Inicia com a moeda selecionada por padrão
});

// Função para buscar os últimos 15 dias e atualizar o gráfico
async function fetchData(moedaSelecionada) 
{
    const url = `https://economia.awesomeapi.com.br/json/daily/${moedaSelecionada}/15`;

    try 
    {
        const resposta = await fetch(url);
        const dados = await resposta.json();

        // Ordena os dados do mais antigo para o mais recente
        dados.reverse();

        const barras = document.querySelectorAll(".container-barra");

        dados.forEach((dia, index) => 
        {
            if (barras[index]) 
            {
                let valor = parseFloat(dia.high); // Cotação máxima do dia
                let dataFormatada = new Date(dia.timestamp * 1000).toLocaleDateString("pt-BR");

                // Define a altura proporcional das barras
                barras[index].querySelector(".barra").style.height = `${(valor *10)}px`;
                barras[index].querySelector(".grafChar").innerText = valor.toFixed(2);
                barras[index].querySelector(".dia").innerText = dataFormatada;
            }
        });

        console.log("Gráfico atualizado para:", moedaSelecionada);
    } 
    catch (erro) 
    {
        console.error("Erro ao buscar dados:", erro);
    }
}

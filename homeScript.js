fetchData();

function populationSelects(data)
{
	const selectOrigem = document.getElementById("moedaOrigem");
    const selectDestino = document.getElementById("moedaDestino");    

    //limpar os selects
    selectOrigem.innerHTML = "";
    selectDestino.innerHTML = "";

    Object.entries(data).forEach(([codigo, nome]) => 
    {
        let optionOrigem = document.createElement("option");
        optionOrigem.value = codigo;
        optionOrigem.textContent = `${codigo} - ${nome}`;

        let optionDestino = optionOrigem.cloneNode(true); // clona o tudo do optionOrigem para o optionDestino

        selectOrigem.appendChild(optionOrigem);
        selectDestino.appendChild(optionDestino);
        
    });
    
}

async function fetchData() 
{
    try
    {
        const response = await fetch("https://economia.awesomeapi.com.br/json/available/uniq");

        if(!response.ok)
        {
            throw new Error("Could not fetch");
        }
        const data = await response.json();
        console.log(data);

        populationSelects(data);
    }
    catch(error)
    {
        console.error(error);
    }
}

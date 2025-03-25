// document.addEventListener("DOMContentLoaded", function() {
//     const inputCurrency = document.querySelector('.currency-input');
//     const resultCurrency = document.querySelector('.result-input');
    
//     inputCurrency.addEventListener('input', function() {
//         const value = parseFloat(inputCurrency.value);
        
//         if (!isNaN(value)) {
//             const conversionRate = 5.2;
//             const convertedValue = value * conversionRate;
//             resultCurrency.value = convertedValue.toFixed(2);
//         } else {
//             resultCurrency.value = '';
//         }
//     });
// });


// Script 2
// const currencies = {};
// let sourceCurrency = null;
// let targetCurrency = null;

// document.addEventListener("DOMContentLoaded", () => {
//   const sourceSelect = document.getElementById("currency-source-select");
//   const targetSelect = document.getElementById("currency-target-select");
//   const sourceInput = document.querySelectorAll("input")[0];
//   const targetInput = document.querySelectorAll("input")[1];

//   const updateConversion = () => {
//     if (!sourceCurrency || !targetCurrency) return;

//     const sourceValue = parseFloat(sourceInput.value) || 0;
//     const sourceRate = parseFloat(currencies[sourceCurrency]);
//     const targetRate = parseFloat(currencies[targetCurrency]);

//     if (!isNaN(sourceRate) && !isNaN(targetRate)) {
//       const converted = (sourceValue * targetRate) / sourceRate;
//       targetInput.value = converted.toFixed(2);
//     }
//   };

//   fetch("https://api.currencyfreaks.com/v2.0/rates/latest?apikey=2d53eab9fd544f69b6eabfe6caeaa891")
//     .then((response) => {
//       if (!response.ok) throw new Error("Erro ao buscar moedas");
//       return response.json();
//     })
//     .then((data) => {
//       const rates = data.rates;

//       sourceSelect.innerHTML = "";
//       targetSelect.innerHTML = "";

//       Object.entries(rates).forEach(([code, value]) => {
//         currencies[code] = value;

//         const option1 = document.createElement("option");
//         option1.value = code;
//         option1.textContent = code;
//         sourceSelect.appendChild(option1);

//         const option2 = document.createElement("option");
//         option2.value = code;
//         option2.textContent = code;
//         targetSelect.appendChild(option2);
//       });

//       // Define valores iniciais
//       sourceSelect.value = "USD";
//       targetSelect.value = "BRL";
//       sourceCurrency = sourceSelect.value;
//       targetCurrency = targetSelect.value;

//       updateConversion();
//     })
//     .catch((error) => {
//       console.error("Erro:", error);
//       sourceSelect.innerHTML = '<option value="">Erro ao carregar moedas</option>';
//       targetSelect.innerHTML = '<option value="">Erro ao carregar moedas</option>';
//     });

//   sourceSelect.addEventListener("change", (event) => {
//     sourceCurrency = event.target.value;
//     updateConversion();
//   });

//   targetSelect.addEventListener("change", (event) => {
//     targetCurrency = event.target.value;
//     updateConversion();
//   });

//   sourceInput.addEventListener("input", () => {
//     updateConversion();
//   });
// });


//Script 3
// console.log("homeScript.js iniciado")

// fetchData();


// document.addEventListener("DOMContentLoaded", function () { //Para copiar os dados dos seletores
//     const selectOrigem = document.getElementById("moedaOrigem");
//     const selectDestino = document.getElementById("moedaDestino");

//     selectDestino.innerHTML = selectOrigem.innerHTML;
// });


// async function fetchData() 
// {
//     const valorOrigem = document.getElementById("valorOrigem"); //input origem
//     const valorConvertido = document.getElementById("valorConvertido"); //input destino
    
//     const valor = parseFloat(valorOrigem.value); //variavel contendo o valor que deseja converter
//     const from =  moedaOrigem.value; //variavel contendo o codigo da moeda origem
//     const to = moedaDestino.value; //variavel contendo o codigo da moeda de destino
    


//     try
//     {
//         var apikey = from + "-" + to; //para colar na url da api
//         var key = from  + to; //para chamar a bid
//         const response = await fetch(`https://economia.awesomeapi.com.br/json/last/${apikey}`);

//         if(!response.ok)
//         {
//             throw new Error("Could not fetch");
//         }
//         const data = await response.json();
//         console.log(data);//debug
//         console.log(data[key].bid);//debug

//         var taxa = parseFloat(data[key].bid);
//         valorConvertido.value = (valor * taxa).toFixed(2);
//     }
//     catch(error)
//     {
//         console.error("Erro ao buscar taxa de Cambio",error);
//     }
// }

// valorOrigem.addEventListener("input", fetchData);
// moedaOrigem.addEventListener("change", fetchData);
// moedaDestino.addEventListener("change", fetchData);
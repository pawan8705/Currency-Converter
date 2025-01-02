let fromelementamount = document.querySelector(".amount");
let convertamountelement = document.querySelector(".convertedamount");
let fromcurrencyelement = document.querySelector(".fromcurrency");
let tocurrencyelement = document.querySelector(".tocurrency");
let resultelement = document.querySelector(".result");
let container = document.querySelector(".container");

let countries = [
    { code: "AED", name: "United Arab Emirates Dirham" },
    { code: "ARS", name: "Argentine Peso" },
    { code: "AUD", name: "Australian Doller" },
    { code: "BRL", name: "Brazillian Real" },
    { code: "CAD", name: "Canadian Doller" },
    { code: "CHF", name: "Swiss Franc" },
    { code: "CLP", name: "Chilean Peso" },
    { code: "CNY", name: "Chinese Yuan" },
    { code: "COP", name: "Colombian Peso" },
    { code: "CZK", name: "Czech Koruna" },
    { code: "DKK", name: "Danish Krone" },
    { code: "EGP", name: "Egyptian Pound" },
    { code: "EUR", name: "Euro" },
    { code: "GBP", name: "British Pound Sterling" },
    { code: "HKD", name: "Hong Kong Doller" },
    { code: "HRK", name: "Croatian Forint" },
    { code: "HUF", name: "Hungraian Forint" },
    { code: "IDR", name: "Indonesian Rapiah" },
    { code: "ILS", name: "Israeli New Shekel" },
    { code: "INR", name: "Indian Rupee" },
    { code: "ISK", name: "Icelandic Krona" },
    { code: "JPY", name: "Japanese Yen" },
    { code: "KRW", name: "South Korean Won" },
    { code: "MXN", name: "Mexican Peso" },
    { code: "MYR", name: "Malaysian Ringgit" },
    { code: "NOK", name: "Norwegian Krone" },
    { code: "NZD", name: "New Zealand Doller" },
    { code: "PEN", name: "Peruvian Sol" },
    { code: "PHP", name: "Philippine Peso" },
    { code: "PLN", name: "Polish Zeoty" },
    { code: "RON", name: "Romanian Leu" },
    { code: "RUB", name: "Russian Ruble" },
    { code: "SEK", name: "Swedish Krona" },
    { code: "SGD", name: "Singapore Doller" },
    { code: "THB", name: "Thai Baht" },
    { code: "TRY", name: "Turkish Lira" },
    { code: "TWD", name: "Taiwan New Doller" },
    { code: "UAH", name: "Ukrainian Hryvnia" },
    { code: "USD", name: "United States Doller" },
    { code: "UYU", name: "Uruguayan Peso" },
    { code: "VND", name: "Vietnamese" },
    { code: "ZAR", name: "South African Rand" }
];

//Showing counyries from array to select tag

countries.forEach(country => {
    let option1 = document.createElement("option");
    let option2 = document.createElement("option");

    option1.value = option2.value = country.code;
    option1.textContent = option2.textContent = `${country.code} (${country.name})`;

    fromcurrencyelement.appendChild(option1);
    tocurrencyelement.appendChild(option2);

    //By default values of select tag
    fromcurrencyelement.value = "USD";
    tocurrencyelement.value = "INR";
});

//Function to get exchange rate using API

let getexchangerate = async () => {
    let amount = parseFloat(fromelementamount.value);
    let fromcurrency = fromcurrencyelement.value;
    let tocurrency = tocurrencyelement.value;
    resultelement.textContent = "fetching Exchange Rates.....";

    //Fetch data from API
    try {
        let response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromcurrency}`);
        let data = await response.json();
        let conversionrate = data.rates[tocurrency];
        let convertedAmount = (amount * conversionrate).toFixed(2);

        if (typeof conversionrate === "undefined") {
            resultelement.textContent = "Exchange rate data is not available for selected countries !!!. ";
            convertamountelement = "";
        } else {
            convertamountelement.value = convertedAmount;
            resultelement.textContent = `${amount} ${fromcurrency} = ${convertedAmount} ${tocurrency}`;
        }
    } catch (error) {
        container.innerHTML = `<h2>Error while fetching exchange rates |||</h2>`;
    }
};

//Fetching exchange rate when user inputs the amount
fromelementamount.addEventListener('input', getexchangerate);

//Fetching exchange rate when user change currency
fromcurrencyelement.addEventListener('change', getexchangerate);
tocurrencyelement.addEventListener('change', getexchangerate);

window.addEventListener('load', getexchangerate);

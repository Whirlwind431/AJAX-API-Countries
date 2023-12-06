"use strict"

// ------------ M A I N    F U N C T I O N S   F O R    A L L    C O U N T R I E S-------------------------

document.getElementById("myForm").addEventListener('click', function (e) {
    e.preventDefault()
})
// test 1 - ajaxRequest + display all countries
async function test1() {
    const countries = await AjaxRequest()
    drawAllCountries(countries)
}

// test 2 - ajaxRequest + display average citizen and population
async function test2() {
    const countries = await AjaxRequest()
    getAvgAndTotalPopulation(countries)
    drawAvgAndTotalPopulation(countries)
}

// test 3 - ajaxRequest + display  Region Table
async function test3() {
    const countries = await AjaxRequest()
    drawRegionTable(countries)
}


// -------------------------------------------------------------------

// Get all countries
async function AjaxRequest() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all')
        const countries = await response.json()
        console.log(countries);
        return countries
    }
    catch (error) {
        console.log(error.message);
    }
}
// ------------ M A I N    F U N C T I O N    F O R    S P E C I F I C    S E A R C H-------------------------

// test 4 - ajaxRequest + display  countries
async function test4() {
    try {
        const countries = await AjaxRequestForIncludeName()
        drawAllCountries(countries)
        drawAvgAndTotalPopulation(countries)
        drawRegionTable(countries)
    }


    catch (error) {
        console.log(error.message);
    }
}


// Get specify country(ies)
async function AjaxRequestForIncludeName() {
    const inputName = document.getElementById("inputName").value.toLowerCase()
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${inputName}`)
        const countries = await response.json()
        if (countries.status === 404) {
            alert("This country doesn't exist")
            throw new Error("This country doesn't exist")
        }
        if (countries.message === "Page Not Found") {
            alert("You need to enter a country!")
            throw new Error("Enter a country")
        }
        console.log(countries);
        return countries
    }
    catch (error) {
        console.log(error.message);
    }
    document.getElementById("inputName").value = ''

}


// QUESTIONS 
function getAvgAndTotalPopulation(countries) {
    let totalPopulation = 0;
    let totalCountriesResult = 0;
    let counter = 0
    let avg = 0
    let americas = 0
    let asia = 0
    let europe = 0
    let africa = 0
    let oceania = 0

    for (const country of countries) {
        country.region === "Africa" ? africa++ : +0
        country.region === "Asia" ? asia++ : +0
        country.region === "Europe" ? europe++ : +0
        country.region === "Americas" ? americas++ : +0
        country.region === "Oceania" ? oceania++ : +0
        totalPopulation += country.population
        totalCountriesResult++
        counter++
    }



    avg = totalPopulation / counter
    const obj = { totalPopulation, avg, totalCountriesResult, americas, asia, europe, africa, oceania }
    return obj
}

// test commit
async function test5() {
    try {
        const countries = await AjaxRequestForIncludeName()
        getCurrencies(countries)
        displayCurrencies(countries)
    } catch (error) {
        console.log(error.message);
    }
}


function getCurrencies(countries) {
    let obj
    let arraycurrencies = []
    let currency
    let newObj
    let currencyArray = []
    for (let country of countries) {
        obj = country.currencies
        currency = Object.keys(obj)
        currencyArray.push(currency)
        newObj = {
            country: country.name,
            currencies: currency
        }
        arraycurrencies.push(newObj);
    }

    let map = currencyArray.reduce((cnt, cur) => (cnt[cur] = cnt[cur] + 1 || 1, cnt), {});

    console.log(arraycurrencies);
    return { map, arraycurrencies }
}

function displayCurrencies(countries) {
    const tHeaderBonus = document.getElementById("tHeaderBonus")
    const tBodyBonus = document.getElementById("tBodyBonus")
    const spanny = document.getElementById('spanny')
    const obj = getCurrencies(countries)
    const currencies = obj.arraycurrencies
    const mapping = obj.map
    let arrayCurrencies = []
    for (const item in mapping) {
        arrayCurrencies.push(item);

    }
    const counter = {};
    let html2 = ''
    arrayCurrencies.forEach(item => {
        counter[item] = (counter[item] || 0) + 1;

    });

    // Display the counts
    for (const item in counter) {
        console.log(`${item}: ${counter[item]} `);
        html2 += `${item}: ${counter[item]}`
    }




    let HeaderHtmlBonus = `<tr>
    <th> Country Name</th>
    <th>Currency</th>
    </tr>`
    let html = ''
    for (const country of currencies) {
        html += '<tr>'
        html += `<td> ${country.country.official}</td> `
        html += `<td> ${country.currencies}</td> `
        html += `</tr>`
    }

    tHeaderBonus.innerHTML = HeaderHtmlBonus
    tBodyBonus.innerHTML = html
    spanny.innerHTML = html2
}



function drawAvgAndTotalPopulation(countries) {
    const obj = getAvgAndTotalPopulation(countries)

    const totalCountriesResultHeader = document.getElementById('totalCountriesResultHeader')
    const divCountriesResult = document.getElementById("divCountriesResult")
    const totalCountriesPopulationHeader = document.getElementById('totalCountriesPopulationHeader')
    const divPopulation = document.getElementById("divPopulation")
    const averagePopulationHeader = document.getElementById("averagePopulationHeader")
    const divAvgPopulation = document.getElementById("divAvgPopulation")

    const totalPopulation = obj.totalPopulation
    const avg = obj.avg
    const totalCountries = obj.totalCountriesResult

    totalCountriesResultHeader.innerHTML = 'Total countries result:'
    divCountriesResult.innerHTML = totalCountries
    totalCountriesPopulationHeader.innerHTML = 'Total Countries Population:'
    divPopulation.innerHTML = totalPopulation
    averagePopulationHeader.innerHTML = 'Average Population:'
    divAvgPopulation.innerHTML = avg
}


function drawAllCountries(countries) {
    const tBody = document.getElementById('tBody')
    const tHeader = document.getElementById('tHeader')

    let HeaderHtml = `<tr>
                      <th> Country Name</th>
                      <th>Number of citizens</th>
                      </tr>`
    let html = ''
    for (const country of countries) {
        html += '<tr>'
        html += `<td> ${country.name.common}</td> `
        html += `<td> ${country.population}</td> `
        html += `</tr>`
    }
    tHeader.innerHTML = HeaderHtml
    tBody.innerHTML = html
}

function drawRegionTable(countries) {
    const obj = getAvgAndTotalPopulation(countries)
    const regionsHeader = document.getElementById("regionsHeader")
    const tBodyRegionTable = document.getElementById('tBodyRegionTable')
    const tHeaderRegionTable = document.getElementById('tHeaderRegionTable')
    let HeaderHtml = `<tr>
                      <th>Region</th>
                      <th>Number of Countries</th>
                      </tr>`
    let html = ''

    html += '<tr>'
    html += `<td>Americas</td> `
    html += `<td> ${obj.americas}</td> `
    html += `</tr>`

    html += '<tr>'
    html += `<td>Asia</td> `
    html += `<td> ${obj.asia}</td> `
    html += `</tr>`

    html += '<tr>'
    html += `<td>Europe</td> `
    html += `<td> ${obj.europe}</td> `
    html += `</tr>`

    html += '<tr>'
    html += `<td>Africa</td> `
    html += `<td> ${obj.africa}</td> `
    html += `</tr>`

    html += '<tr>'
    html += `<td>Oceania</td> `
    html += `<td> ${obj.oceania}</td> `
    html += `</tr>`

    regionsHeader.innerHTML = 'Regions:'
    tHeaderRegionTable.innerHTML = HeaderHtml
    tBodyRegionTable.innerHTML = html
}

// ------------- S C R O O L    A R R O W---------------------------------
function scroolToTop() {
    const showOnPx = 100;
    const backToTopButton = document.querySelector(".back-to-top")
    const scrollContainer = () => {
        return document.documentElement || document.body
    };

    // statement for btn and adding event listener to btn 
    document.addEventListener("scroll", () => {
        if (scrollContainer().scrollTop > showOnPx) {
            backToTopButton.classList.remove("hidden")
        } else {
            backToTopButton.classList.add("hidden")
        }
    })
    const goToTop = () => {
        document.body.scrollIntoView()
    }
    backToTopButton.addEventListener("click", goToTop)
}
scroolToTop()


document.getElementById("testBtn1").addEventListener('click', test1)
document.getElementById("testBtn2").addEventListener('click', test2)
document.getElementById("testBtn3").addEventListener('click', test3)
document.getElementById("testBtn4").addEventListener('click', test4)
document.getElementById("testBtn5").addEventListener('click', test5)

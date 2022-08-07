function showCountry() {
    let xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://restcountries.com/v2/all', true);

    // Request Finished. Do Something here.
    //The load event is fired when an XMLHttpRequest transaction completes successfully.
    xhr.onload = function() {       
        if (xhr.status == 200) {
            console.log('Success!');

            let countires = JSON.parse(this.response); // gets JSON data from the server
            console.log(countires);

           countires.forEach(country => {

                let search = document.querySelector('.search'); // gets the input element

                if (country.name == search.value) { // gets the country name from the search input
                    let cardHeader = document.createElement('span');
                    let cardBody = document.createElement('img');
                    
                    cardHeader.innerText = country.name;
                    cardBody.src = country.flag;

                    document.querySelector('.card-header').appendChild(cardHeader);
                    document.querySelector('.card-body').appendChild(cardBody);

                    let card2Header = document.createElement('span');

                    card2Header.innerText = 'Informations for ' + country.name ;
                    document.querySelector('.card2-header').appendChild(card2Header);

                    let card2BodyListsCapital = document.createElement('li');
                    card2BodyListsCapital.innerText = `Capital of ${country.name} : ${country.capital}`;

                    let card2BodyListsRegion = document.createElement('li');
                    card2BodyListsRegion.innerText = `Region : ${country.region}`;

                    let card2BodyListsSubregion = document.createElement('li');
                    card2BodyListsSubregion.innerText = `Subregion : ${country.subregion}`;

                    let card2BodyListsEthnic = document.createElement('li');
                    card2BodyListsEthnic.innerText = `Ethnic : ${country.demonym}`;

                    let card2BodyListsPopulation = document.createElement('li');
                    card2BodyListsPopulation.innerText = `Population : ${country.population}`;

                    let card2BodyListsTimezones = document.createElement('li');
                    card2BodyListsTimezones.innerText = `Timezone : ${country.timezones[0].toString()}`;

                    document.querySelector('.card2BodyLists').appendChild(card2BodyListsCapital);
                    document.querySelector('.card2BodyLists').appendChild(card2BodyListsRegion);
                    document.querySelector('.card2BodyLists').appendChild(card2BodyListsSubregion);
                    document.querySelector('.card2BodyLists').appendChild(card2BodyListsEthnic);
                    document.querySelector('.card2BodyLists').appendChild(card2BodyListsPopulation);
                    document.querySelector('.card2BodyLists').appendChild(card2BodyListsTimezones);

                    document.querySelector('.card').style.display = 'block';
                    document.querySelector('.card2').style.display = 'block';
                }
           })

        }
    }

    xhr.send();
}

function reloadPage() {
    window.location.reload();
}
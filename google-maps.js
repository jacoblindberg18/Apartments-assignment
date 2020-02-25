const h1 = document.getElementById("h1");
const apartmentArea = document.getElementById("apartment-area");
const buttons = document.querySelectorAll(".button");

getApartments = async () => {
    try {
        const result = axios.get("https://api.myjson.com/bins/2sadq?pretty=1");

        const { data: apartments } = await result;

        console.log("this is apartments", apartments);
        addEventListeners(apartments.apartments);
        renderApartments(apartments.apartments);
    } catch (err) {
        console.log("ERROR", err);
    }
};
getApartments();

function removeActiveClass() {
    let li = document.querySelectorAll("li");
    li.forEach(object => {
        object.classList.remove("active");
    });
}

function addEventListeners(apartments) {
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            removeActiveClass();
            button.classList.add("active");
            if (button.innerText !== "All") {
                let filtered = filterApartments(apartments, button.innerText);
                renderApartments(filtered);
            } else {
                renderApartments(apartments);
            }
        });
    });
}

//kanske en if-sats här inne istället för i eventlyssnaren?? KOLLA PÅ DET OCH FÖRENKLA!
function filterApartments(allApartments, buttonText) {
    let filtered = allApartments.filter(apartment => {
        return apartment.city === buttonText;
    });
    return filtered;
}

function renderApartments(apartments) {
    apartmentArea.innerHTML = "";
    apartments.forEach(apartment => {
        renderContent(apartment);
    });
}

function renderContent(apartment){
    apartmentArea.innerHTML += `<a target="_blank" href="http://maps.google.com?q=${apartment.address}" class="list-group-item list-group-item-action">
        <div class="d-flex w-100 justify-content-between">
            <div>
                <p class="mb-1">${apartment.description}</p>
                <p class="mb-1">${apartment.address}</p>
            </div>
            <small>${apartment.price}</small>
        </div>
        <small>Bedrooms: ${apartment.bedrooms} / Neighborhood: ${apartment.neighborhood}</small>
    </a>`;
}

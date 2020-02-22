const h1 = document.getElementById("h1");
const buttons = document.querySelectorAll(".button");

getApartments = async () => {
    try {
        const result = axios.get("https://api.myjson.com/bins/2sadq?pretty=1");

        const { data: apartments } = await result;

        console.log("this is apartments", apartments);
        h1.innerHTML += `${apartments.apartments[0].city}`;
        addEventListeners();
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

function addEventListeners() {
    buttons.forEach(button => {
        console.log("hej", button);
        button.addEventListener("click", () => {
            removeActiveClass();
            button.classList.add("active");
            console.log(button.innerText);
        });
    });
}

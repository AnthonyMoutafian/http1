const peopleContainer = document.getElementById("people-container")
const paginationContainer = document.getElementById("pagination")
const loadingSpinner = document.getElementById("loading-spinner")

let currentPage = 1
let totalPeople;
const peopleperPage = 10

function showLoadingSpinner(){
  loadingSpinner.classList.add('loading-spinner-visible')
}

function hideLoadingSpinner(){
  loadingSpinner.classList.remove('loading-spinner-visible')
}

function renderPeople(people){
    peopleContainer.innerHTML = '';

    people.forEach((people2) => {
        const peopleElement = document.createElement('div')
        peopleElement.classList.add("people2")
        peopleElement.innerHTML = `
          <h2>${people2.name}</h2>
          <p><strong>Gender:</strong>${people2.gender}</p>
          <p><strong>skin_color:</strong>${people2.skin_color}</p>
          <p><strong>height:</strong>${people2.height}</p>
          <p><strong>BirthYear:</strong>${people2.birth_year}</p>
        `;

        peopleContainer.appendChild(peopleElement);
    });
}


function renderPagination() {
    const totalPages = Math.ceil(totalPeople/peopleperPage);
    paginationContainer.innerHTML=''

    for(let i = 1;i<totalPages;i++){
       const button = document.createElement('button')
       button.innerHTML= i

       if(i===currentPage){
        button.classList.add("active")
       }

       button.addEventListener("click",()=>{
        currentPage=i
        fetchPeople()
       })

       paginationContainer.appendChild(button)
    }
}

function fetchPeople() {
    showLoadingSpinner()

    fetch(`https://swapi.dev/api/people/?page=${currentPage}`)
    .then((response)=>{
       return response.json()
    })
    .then((data)=>{
       totalPeople = data.count
       renderPeople(data.results);
       renderPagination();
       hideLoadingSpinner();
    })
    .catch((err)=>{
       console.log(err);
    })
}

fetchPeople()
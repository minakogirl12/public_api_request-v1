//Add search bar
const searchDiv = document.querySelector('.search-container');
searchDiv.innerHTML = `
    <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>'`;


//array of 12 random users populated by a call to the Random User API
fetch('https://randomuser.me/api/?results=12')
    .then(response => response.json())
    .then(data =>{ 
        let randomUsers = data.results;

        addUsersToPage(randomUsers);
        
        
        document.getElementById('gallery').addEventListener('click', (event) => {
            console.log(event.target);
     
            const element = event.target;

            //create modal window if card clicked
            if(element.className.includes('card')){
                //determine which card was clicked
                //get user and send to createModalWindow

            }
            
            
        });
        
        //add click event to users div
        //create function that takes index and data to display modal window
        //add click event to buttons to paginate through users
    
    
    })
    .catch(error => console.log(error));

function addUsersToPage(users){
    let cardContainer = '';
    for(let i = 0; i < users.length; i++){
        //extract all user data from array
        let img = users[i]['picture'].thumbnail;
        let id = 'name' + users[i]['name'].last;
        let name = users[i]['name'].first + " " + users[i]['name'].last;
        let email = users[i]['email'];
        let city = users[i]['location'].city;

        //Markup for the card div to hold all users
        //added the data position attribute for determing user to display in modal window
        cardContainer += `
            <div class="card">
            <div class="card-img-container" data-position="${i}">
                <img class="card-img" src="${img}" alt="profile picture">
            </div>
            <div class="card-info-container" data-position="${i}">
                <h3 id="${id}" class="card-name cap">${name}</h3>
                <p class="card-text">${email}</p>
                <p class="card-text cap">${city}</p>
            </div>
            </div>
            `;

 }

 //add container to the DOM
document.getElementById('gallery').innerHTML = cardContainer;
}

/**
 * 
 * @param {*} user An object from the Random Users array containing all information on the user
 */
function createModalWindow(user){

    let window = `<div class="modal-container">
         <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
                    <h3 id="name" class="modal-name cap">name</h3>
                    <p class="modal-text">email</p>
                    <p class="modal-text cap">city</p>
                    <hr>
                    <p class="modal-text">(555) 555-5555</p>
                    <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
                    <p class="modal-text">Birthday: 10/21/2015</p>
            </div>
        </div>`;
}
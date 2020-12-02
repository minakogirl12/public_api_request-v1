
//array of 12 random users populated by a call to the Random User API
fetch('https://randomuser.me/api/?results=12')
    .then(response => response.json())
    .then(data =>{ 
        let randomUsers = data.results;

        addUsersToPage(randomUsers);
        
        
        document.getElementById('gallery').addEventListener('click', (event) => {
            //console.log(event.target); - check that event is triggered properly
     
            const element = event.target;

            //create modal window if card clicked
            if(element.className.includes('card')){
                //determine which card was clicked using the position attribute on each div
                if(element.dataset.position){
                    createModalWindow(randomUsers, element.dataset.position);
                    //console.log(element.dataset.position);
                }
                else if(element.parentNode.dataset.position){
                    createModalWindow(randomUsers,element.parentNode.dataset.position)
                    //console.log(element.parentNode.dataset.position);
                }
            }         
        });
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
            <div class="card" data-position="${i}">
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
function createModalWindow(data, position){
    //console.log(data[position]); //check that user object was properly passsed to the functionxs

    const user = data[position];
    //extract user info
    const name = user['name'].first + " " + user['name'].last;
    const address = buildAddress(user.location);
    const dob = buildDOB(user['dob'].date);

    let window = `<div class="modal-container">
         <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${user['picture'].thumbnail}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${name}</h3>
                    <p class="modal-text">${user.email}</p>
                    <p class="modal-text cap">${user['location'].city}</p>
                    <hr>
                    <p class="modal-text">${user.cell}</p>
                    <p class="modal-text">${address}</p>
                    <p class="modal-text">Birthday: ${dob}</p>
            </div>
        </div>
            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
        </div>`;

        //add to the DOM
        document.querySelector('body').insertAdjacentHTML('beforeend', window);
        

        //add event listeners to the buttons
        //delete div when closed
        const closeButton = document.getElementById('modal-close-btn');
        closeButton.addEventListener('click', () => {
            remove();
        })

        //event listener for pagination buttons
        const paginationButtons = document.querySelector('.modal-btn-container');
        paginationButtons.addEventListener('click', (event) => {
            //event will not be triggered if first user in list
            if(event.target.id == "modal-prev" && position != 0){
                remove();
                createModalWindow(data, (position-1))
            }
            //event will nto be triggered if last user in list
            if(event.target.id == "modal-next" && position < (data.length-1)){
                remove();
                createModalWindow(data, (position+1));
            }

        });
    }
    
//helper funtion to remove overlay item
function remove(){
    document.querySelector('.modal-container').remove();
}
//helper function to format address
function buildAddress (userLocation){
    const address = `${userLocation.street.number} ${userLocation.street.name} ${userLocation.city}, ${userLocation.state} ${userLocation.postcode}`;
    return address;
}
//helper function to format DOB
function buildDOB(userDate){
    let dateArray = userDate.split(/[-T]/, 3);
    const date = `${dateArray[1]}/${dateArray[2]}/${dateArray[0]}`;
    return date;
}
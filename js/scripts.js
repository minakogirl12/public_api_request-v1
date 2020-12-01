//Add search bar
const searchDiv = document.querySelector('.search-container');
searchDiv.innerHTML = `
    <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>'`;

//array of 12 random users populated by a call to the Random User API
const users = fetch('https://randomuser.me/api/?results=12')
    .then(response => response.json())
    .then(data => addUsersToPage(data.results))
    .catch(error => console.log(error));



function addUsersToPage(users){
    let cardContainer = '';
    console.log(users);
    for(let i = 0; i < users.length; i++){
        //extract all user data from array
        let img = users[i]['picture'].thumbnail;
        let id = 'name' + users[i]['name'].last;
        let name = users[i]['name'].first + " " + users[i]['name'].last;
        let email = users[i]['email'];
        let city = users[i]['location'].city;
        let state = users[i]['location'].state;
        let location = users[i]['location'].city + ", " + users[i]['location'].state;

        //Markup for the card div to hold all users
        cardContainer += `
            <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${img}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="${id}" class="card-name cap">${name}</h3>
                <p class="card-text">${email}</p>
                <p class="card-text cap">${city}, ${state}</p>
            </div>
            </div>
            `;

        //create html for all overlay items

 }

 //add container to the DOM
document.getElementById('gallery').innerHTML = cardContainer;
}
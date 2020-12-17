import reddit from './redditapi';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

// Form event listener

searchForm.addEventListener('submit' ,e => {
    //Get search term
    const searchTerm = searchInput.value;
    //console.log(searchTerm);

    //Get sort
    const sortBy = document.querySelector('input[name="sortby"]:checked').value;
    //console.log(sortBy);

    // Get Limit
    const searchLimit = document.getElementById('limit').value;

    // Check Input
    if(searchTerm == ''){
        //show messsage
        showMessage('Please add a search term','alert-danger')
    }

    searchInput.value = '';

    // Search Reddit 
    reddit.search(searchTerm,searchLimit,sortBy).then( results => {
        //console.log(results);
        let output = '<div class="card-columns">';
        //Loop through posts
        results.forEach(post => {
            //Check for image
            let image = post.preview ? post.preview.images[0].source.url : 'https://www.slashgear.com/wp-content/uploads/2019/09/reddit_logo_main.jpg' ;
            output += `
            <div class="card">
            <img src="${image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">
            ${post.title}</h5>
            <p class="card-text">${truncateText(post.selftext,100)}</p>
            <a href="${post.url}" target="_blank" class="btn btn-primary">Read more</a>
            <hr>
            <span class="badge badge-secondary">Subreddit: ${post.subreddit}</span>
            <span class="badge badge-dark">Score: ${post.score}</span>
            </div>
        </div>

            
            `;
        });
        output += '</div>'
        document.getElementById('results').innerHTML = output;

    });




    e.preventDefault();
});

// show message
function showMessage(message, className){
    // create a div
    const div = document.createElement('div');

    // add a class
    div.className = `alert ${className}`;

    // add a text
    div.appendChild(document.createTextNode(message));

    // get a parent
    const searchContainer = document.getElementById('search-container');

    // Get search
    const search = document.getElementById('search');

    // insert div into webpage
    searchContainer.insertBefore(div,search);

    // timeout alert
    setTimeout(() => document.querySelector('.alert').remove(),3000);

}

//Truncate Text
function truncateText(text,limit){
    const shortened = text.indexOf(' ',limit);
    if(shortened == -1) return text;
    return text.substring(0,shortened);
}
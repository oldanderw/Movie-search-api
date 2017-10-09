const form = document.querySelector('.js-form');

document.addEventListener("DOMContentLoaded", () => {
  if(localStorage.getItem("lastQuery") && localStorage.getItem("lastQueryTerm")) {
    const inputField = document.querySelector('#search');
    inputField.value = localStorage.getItem("lastQueryTerm");
    buildResults(JSON.parse(localStorage.getItem("lastQuery")));
  }
});

form.addEventListener('submit', event => {
  event.preventDefault();
  //inputVal = inputVal;
  const inputField = document.querySelector('#search');
  const inputVal = inputField.value;
  // https://api.themoviedb.org/3/search/movie?api_key=554cd9a9bd4a2048f7690b9050c6afa1&query=The+Lord+of+the+Rings
  let api = `https://api.themoviedb.org/3/search/movie?api_key=554cd9a9bd4a2048f7690b9050c6afa1&query=${encodeURIComponent(inputVal)}`;

  console.log(api);
  fetch(api).then(response => response.json()).then(json => {
    // example: https://api.themoviedb.org/3/search/movie?api_key=554cd9a9bd4a2048f7690b9050c6afa1&language=en-US&query=dead&page=1
    console.log(json);
    // console.log(json.results[0].volumeInfo.imageLinks.thumbnail);
    localStorage.setItem("lastQuery", JSON.stringify(json));
    localStorage.setItem("lastQueryTerm", inputVal);
    buildResults(json);
  });
})

function buildResults(data) {
  const inputField = document.querySelector('#search');
  const content = document.querySelector('.content');
  const inputVal = inputField.value;

  const poster_path = "https://image.tmdb.org/t/p/w500/";

  let text = `<h1 class="Rusults">Results for "${inputField.value}"</h1>`;
  if (data.results == 0){
     text += "No Results Found"
   }else{text += `<div class="titles">`
    //variables declared before loop so they aren't being re-made everytime the loop go over it but instead being over writen
    let image, title; //description;
    for (let i = 0; i < data.results.length; i++) {
      if(i <= 10){
        title = data.results[i].title;
        title.substring(0,30);
        let description = data.results[i].overview;
       description = description.toString().substring(0,300)+ `...`;
        //if thumbnail exist then is the thumbnail if not then use the local image in the Assets folder
       if(data.results[i].poster_path  == undefined){
         image = "../Assets/No_Image_Available.gif";
       }else{
         image = poster_path + data.results[i].poster_path
         console.log(image);
       }
       text += `<article>
      <img src="${image}" alt="" />
      <div>
        <a href="#">${title}</a>
        <a target="_blank" href="#">${description}</a>
      </div>
      </article>`
      }
    }
  }
  content.innerHTML = text;
}

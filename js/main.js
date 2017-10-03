const form = document.querySelector('.js-form');
form.addEventListener('submit', event => {
  event.preventDefault();
  const inputField = document.querySelector('#search');
  const content = document.querySelector('.content');
  const inputVal = inputField.value;
  //inputVal = inputVal;
  // https://api.themoviedb.org/3/search/movie?api_key=554cd9a9bd4a2048f7690b9050c6afa1&query=The+Lord+of+the+Rings
  let api = `https://api.themoviedb.org/3/search/movie?api_key=554cd9a9bd4a2048f7690b9050c6afa1&query=${encodeURIComponent(inputVal)}`;

  console.log(api)
  fetch(api).then(response => response.json())
  .then(json => {

    const poster_path = `https://image.tmdb.org/t/p/w500/`
    // example: https://api.themoviedb.org/3/search/movie?api_key=554cd9a9bd4a2048f7690b9050c6afa1&language=en-US&query=dead&page=1
    console.log(json)
    // console.log(json.results[0].volumeInfo.imageLinks.thumbnail);

    let text = `<h1 class="Rusults">Rusults for "${inputField.value}"</h1>`;
    if (json.results == 0){
       text += "No Results Found"
     }else{text += `<div class="titles">`
      //variables declared before loop so they aren't being re-made everytime the loop go over it but instead being over writen
      let image, title; //description;
      for (let i = 0; i < json.results.length; i++) {
        if(i <= 10){
          title = json.results[i].title;
          title.substring(0,30);
          let description = json.results[i].overview;
          description.toString().substring(0,3);
          //if thumbnail exist then is the thumbnail if not then use the local image in the Assets folder
         if(json.results[i].poster_path  == undefined){
           image = "../Assets/No_Image_Available.gif";
         }else{
           image = poster_path + json.results[i].poster_path
           console.log(image);
         }
         text += `<article>
        <img src="${image}" alt="" />
          <a href="#">${title}</a>
          <a target="_blank" href="#">${description}</a>
        </article>`
      }
    }
  }
  text += `</div>`
  text += `<a class="btn" href="#">view more</a>`
  content.innerHTML = text;

  })
})

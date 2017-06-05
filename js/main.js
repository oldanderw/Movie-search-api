const form = document.querySelector('.js-form');
form.addEventListener('submit', event => {
  event.preventDefault();
  const inputField = document.querySelector('#search');
  var content = document.querySelector('.content');
  var inputVal = inputField.value;
  //inputVal = inputVal;
  let api = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(inputVal)}&limit=10&key=AIzaSyCmsymhfpEYIcNK3uEF7Ld_Xm1a0tt3vPQ`;
  console.log(api)
  fetch(api).then(response => response.json())
  .then(json => {
    console.log(json.items)
    let text = `<h1 class="Rusults">Rusults for "${inputField.value}"</h1>`;
    if (json.totalItems == 0){
      text += "No Results Found"
    }else{text += `<div class="titles">`
      // variables declared before loop so they aren't being re-made everytime the loop go over it but instead being over writen
      let image, title, description;
      for (var i = 0; i < json.items.length; i++) {
        console.log(`i got to the ${i+1} item`)
        title = json.items[i].volumeInfo.title;
        //title.substring(0,30);
        description = json.items[i].volumeInfo.description;
        //description.substring(0,150);
        //if thumbnail exist then is the thumbnail if not then use the local image in the Assets folder
         if(json.items[i].volumeInfo.imageLinks.thumbnail == null){
           image = json.items[i].volumeInfo.imageLinks.thumbnail;
         }else{
           image = "../Assets/No_Image_Available.gif";
           console.log("i tried to work");
         }
        text += `<article>
        <img src="${image}" alt="" />
          <a href="${json.items[i].selfLink}">${title}</a>
          <a target="_blank" href="${json.items[i].selfLink}">${description}</a>
      </article>`
    }
  }
  text += `</div>`
  text += `<a class="btn" href="#">view more</a>`
  content.innerHTML = text;

  })
})

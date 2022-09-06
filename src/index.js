let addToy = false;
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let divCollect = document.querySelector('#toy-collection')

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function getToys() {
  return fetch('http://localhost:3000/toys')
  .then(res => res.json())
}

function postToy(toy_data) {
  fetch('http://localhost:3000/toys',{
    method: 'POST',
      headers: {
      'Content-Type': 'application/json',
        Accept: 'application/json'
    },
    body: JSON.stringify({
      "name": toy_data.name.value,
      "image": toy_data.image.value,
      "likes":0
    })
  })
    .then(res => res.json())
    .then((obj_toy) => {
      let new_toy = renderToys(obj_toy)
      divCollect.append(new_toy)
  })
}

function likes(e) {
  e.preventDefault()
  let more = parseInt(e.target.previousElementSibling.innerText)+1

  fetch('http://localhost:3000/toys', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      "likes": more
    })
  })
    .then(res => res.json())
    .then((like_obj => {
      e.target.previousElementSibling.innerText = '${more}likes';
  }))
}
// local reviews data
const reviews = [
    {
      id: 1,
      name: "Sara Souza",
      job: "UX DESIGNER",
      img:
        "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883334/person-1_rfzshl.jpg",
      text:
        "I'm baby meggings twee health goth +1. Bicycle rights tumeric chartreuse before they sold out chambray pop-up. Shaman humblebrag pickled coloring book salvia hoodie, cold-pressed four dollar toast everyday carry",
    },
    {
      id: 2,
      name: "Anna Marques",
      job: "web designer",
      img:
        "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883409/person-2_np9x5l.jpg",
      text:
        "Helvetica artisan kinfolk thundercats lumbersexual blue bottle. Disrupt glossier gastropub deep v vice franzen hell of brooklyn twee enamel pin fashion axe.photo booth jean shorts artisan narwhal.",
    },
    {
      id: 3,
      name: "Pedro Aquino",
      job: "intern",
      img:
        "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883417/person-3_ipa0mj.jpg",
      text:
        "Sriracha literally flexitarian irony, vape marfa unicorn. Glossier tattooed 8-bit, fixie waistcoat offal activated charcoal slow-carb marfa hell of pabst raclette post-ironic jianbing swag.",
    },
    {
      id: 4,
      name: "Rodrigo Pertes",
      job: "the boss",
      img:
        "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883423/person-4_t9nxjt.jpg",
      text:
        "Edison bulb put a bird on it humblebrag, marfa pok pok heirloom fashion axe cray stumptown venmo actually seitan. VHS farm-to-table schlitz, edison bulb pop-up 3 wolf moon tote bag street art shabby chic. ",
    },
  ];

const previous = document.getElementById('previous')
const next = document.getElementById('next')
const nome = document.querySelector('h4')
const job = document.querySelector('#job')
const info = document.querySelector('#info')
const image = document.getElementById("person-img")
var cont = 0

//carrega item inicial na página
window.addEventListener('DOMContentLoaded', function(){
    showPerson(cont)
})

//carrega proxima pessoa 
function showPerson(cont){
  nome.textContent = reviews[cont].name
  job.textContent = reviews[cont].job
  info.textContent = reviews[cont].text
  image.src= reviews[cont].img
}

next.addEventListener('click', function(){
    if(cont === reviews.length - 1){
        cont = -1
    }
    cont +=1
    showPerson(cont)
    
})


previous.addEventListener('click', function(){
    if(cont === 0){
        cont = reviews.length
    }
    cont -=1
    showPerson(cont)
    
})
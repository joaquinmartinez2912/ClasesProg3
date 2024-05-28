async function Carrousel () {
  try {
    const response = await fetch('https://fakestoreapi.com/products')
    const data = await response.json()
    console.log(data)

    const divCarrousel = document.getElementById('carouselExampleFade')
    const div = document.createElement('div')

    const largo = data.length
    const numeroAleatorio = Math.floor(Math.random() * largo) + 1
    const numeroAleatorio2 = Math.floor(Math.random() * largo) + 1
    const numeroAleatorio3 = Math.floor(Math.random() * largo) + 1
    const numeroAleatorio4 = Math.floor(Math.random() * largo) + 1

    div.innerHTML = `
        <div class="carousel-inner" style = "margin-top:10px">
            <div class="carousel-item active">
                <div style="max-width: 750px; margin: 0 auto; text-align: center; height: 500px;">
                    <img src=${data[numeroAleatorio].image} style="height: 100%; width: 100%;" class="d-block w-100">
                </div>
                <div class="carousel-caption d-none d-md-block">
                    <h5 style="color:black; background-color:white">${data[numeroAleatorio].title}</h5>
                </div>
            </div>

            <div class="carousel-item">
                <div style="max-width: 750px; margin: 0 auto; text-align: center; height: 500px;">
                    <img src=${data[numeroAleatorio2].image} style="height: 100%; width: 100%;" class="d-block w-100">
                </div>
                <div class="carousel-caption d-none d-md-block">
                    <h5 style="color:black; background-color:white">${data[numeroAleatorio2].title}</h5>
                </div>
            </div>

            <div class="carousel-item">
                <div style="max-width: 750px; margin: 0 auto; text-align: center; height: 500px;">
                    <img src=${data[numeroAleatorio3].image} style="height: 100%; width: 100%;" class="d-block w-100">
                </div>
                <div class="carousel-caption d-none d-md-block">
                    <h5 style="color:black; background-color:white">${data[numeroAleatorio3].title}</h5>
                </div>
            </div>

            <div class="carousel-item">
                <div style="max-width: 750px; margin: 0 auto; text-align: center; height: 500px;">
                    <img src=${data[numeroAleatorio4].image} style="height: 100%; width: 100%;" class="d-block w-100">
                </div>
                <div class="carousel-caption d-none d-md-block">
                    <h5 style="color:black; background-color:white">${data[numeroAleatorio4].title}</h5>
                </div>
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true" style="background-color: black;"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true" style="background-color: black;"></span>
            <span class="visually-hidden">Next</span>
        </button>
    `

    divCarrousel.appendChild(div)
  } catch (error) {
    console.error('Error al obtener categorias:', error)
  }
}

Carrousel()

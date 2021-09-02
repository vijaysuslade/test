import React from 'react';
const Corousal = () => {
  const image = {
    height: '25rem',
    width: '100%'
  }

  return (
    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img style={image} class="d-block" src='./images/b3.jpg' alt="First slide" />
        </div>
        <div class="carousel-item">
          <img style={image} class="d-block" src='./images/b2.jpg' alt="Second slide" />
        </div>
        <div class="carousel-item">
          <img style={image} class="d-block" src='./images/e.jpg' alt="Third slide" />
        </div>
      </div>
      <div>
        <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>
  )
}
export default Corousal
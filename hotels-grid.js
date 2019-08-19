document.addEventListener('DOMContentLoaded', () => {
    const data = [{
      title: 'hotel title',
      description: 'some desct',
      image: 'http://kukrejagrouphotels.com/wp-content/uploads/2018/07/hotel-mandakini-jaya-international-hyderabad.jpg'
    }, {
      title: 'hotel title 2',
      description: 'some descr 2',
      image: 'http://kukrejagrouphotels.com/wp-content/uploads/2018/07/hotel-mandakini-jaya-international-hyderabad.jpg'
    }]

    const hotelItem = ({ title, description, image }) => (
      `
  	<div>
    	<h4>${title}</h4>
    	<img src="${image}" />
      <p>${description}</p>
    </div>
  `
    )

    const hotelListContent = data.map(hotelItem).join('');
    const hotelContainer = document.querySelector('.container');
    hotelContainer.innerHTML = hotelListContent
});
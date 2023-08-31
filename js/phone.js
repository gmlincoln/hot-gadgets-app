const loadPhones = async (searchPhones) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchPhones}`);
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones);
}

function displayPhones(phones) {
  const phoneContainer = document.getElementById('phone-container');
  phones.forEach(phone => {
    const phoneCard = document.createElement('div');
    phoneCard.classList = 'card w-96 bg-base-100 shadow-xl p-5';
    phoneCard.innerHTML =
      `
    <figure>
        <img
          src="${phone.image}"
          alt="Phones"
        />
      </figure>
      <div class="card-body">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p></p>
        <div class="card-actions justify-end">
          <button class="btn btn-primary">Show Details</button>
        </div>
      </div>
        `;

    phoneContainer.appendChild(phoneCard);
    console.log(phone);
  });
}



const searchPhone = () => {
  const searchField = document.getElementById('search-field');
  const searchFieldValue = searchField.value;
  loadPhones(searchFieldValue);
}

// loadPhones();

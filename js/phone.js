const loadPhones = async (searchPhones, isShowAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchPhones}`);
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones, isShowAll);
}

function displayPhones(phones, isShowAll) {
  const phoneContainer = document.getElementById('phone-container');
  phoneContainer.innerHTML = '';

  // Display Show All Button
  const showAllBtn = document.getElementById('showAll-btn');
  if (phones.length > 12 && !isShowAll) {
    showAllBtn.classList.remove('hidden');
  } else {
    showAllBtn.classList.add('hidden');
  }

  // Display Maximum 12 Phones but after click show all button then show all phones 

  if (!isShowAll) {
    phones = phones.slice(0, 12);
  } else {
    phones;
  }

  // Display Phones
  phones.forEach(phone => {
    const phoneCard = document.createElement('div');
    phoneCard.classList = 'card bg-base-100 shadow-xl p-5';
    phoneCard.innerHTML =
      `
    <figure>
        <img
          src="${phone.image}"
          alt="Phones"
        />
      </figure>
      <div class="card-body">
        <h2 class="card-title justify-center">${phone.phone_name}</h2>
        <p></p>
        <div class="card-actions justify-center">
          <button class="btn btn-primary">Show Details</button>
        </div>
      </div>
        `;

    phoneContainer.appendChild(phoneCard);
    loadingSpinner(false);
  });
}


// Search Phone
const searchPhone = (isShowAll) => {
  loadingSpinner(true);
  const searchField = document.getElementById('search-field');
  const searchFieldValue = searchField.value;
  loadPhones(searchFieldValue, isShowAll);
}

// Show All Phones
document.getElementById('showAll-btn').addEventListener('click', function () {
  searchPhone(true);
});

// Display Loading Spinner 
const loadingSpinner = (showSpinner) => {
  const loadSpinner = document.getElementById('loading-spinner');
  if (showSpinner) {
    loadSpinner.classList.remove('hidden');
  } else {
    loadSpinner.classList.add('hidden');
  }

}

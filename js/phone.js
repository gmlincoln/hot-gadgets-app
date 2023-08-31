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
          <button onclick="showDetailsHandler('${phone.slug}')" class="btn btn-primary">Show Details</button>
        </div>
      </div>
        `;

    phoneContainer.appendChild(phoneCard);
    loadingSpinner(false);
  });
}

// Show Details Button Handler

const showDetailsHandler = async (id) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const phoneData = data.data;
  showDetails(phoneData);
}

const showDetails = phoneData => {
  show_phone_details.showModal();
  console.log(phoneData);
  const showDataForm = document.getElementById('showDetails-form');
  showDataForm.innerHTML = `
      <figure class="grid justify-center">
      <img src="${phoneData.image}" alt="Shoes" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">${phoneData.name}</h2>
        <p class="text-[#403F3F] font-bold">
          Storage: <span class="text-[#706F6F] font-medium">${phoneData.mainFeatures.storage}</span>
        </p>
        <p class="text-[#403F3F] font-bold">
          Display Size: <span class="text-[#706F6F] font-medium">${phoneData.mainFeatures.displaySize}</span>
        </p>
        <p class="text-[#403F3F] font-bold">
          Chipset: <span class="text-[#706F6F] font-medium">${phoneData.mainFeatures?.chipSet}</span>
        </p>
        <p class="text-[#403F3F] font-bold">
          Memory: <span class="text-[#706F6F] font-medium">${phoneData.mainFeatures?.memory}</span>
        </p>
        <p class="text-[#403F3F] font-bold">
          Slug: <span class="text-[#706F6F] font-medium">${phoneData?.slug}</span>
        </p>
        <p class="text-[#403F3F] font-bold">
          Release data: <span class="text-[#706F6F] font-medium">${phoneData?.releaseDate}</span>
        </p>
        <p class="text-[#403F3F] font-bold">
          Brand: <span class="text-[#706F6F] font-medium">${phoneData.brand}</span>
        </p>
        <p class="text-[#403F3F] font-bold">
          Sensors: <span class="text-[#706F6F] font-medium">${phoneData.mainFeatures.sensors}</span>
        </p>
        <div class="modal-action justify-center">
          <button class="btn btn-primary">Close</button>
        </div>
      </div>
      
  `;

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

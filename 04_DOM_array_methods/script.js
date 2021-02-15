const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMilBtn = document.getElementById('show-mil');
const sortBtn = document.getElementById('sort');
const calculateBtn = document.getElementById('calculate');

let data = [];

// Fetch random user and add money
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

// Add new object to data array
function addData(obj) {
  data.push(obj);

  updateDOM();
}

// Updatea DOM
function updateDOM(providedData = data) {
  // Clear main div
  main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';

  providedData.forEach(data => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${data.name}</strong>${formatMoney(
      data.money
    )}`;
    main.appendChild(element);
  });
}

// Format numbers as money
function formatMoney(number) {
  return '$ ' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Event listeners
addUserBtn.addEventListener('click', getRandomUser);

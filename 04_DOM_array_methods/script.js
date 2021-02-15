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

// Double users' money
function doubleMoney() {
  data = data.map(user => {
    return { ...user, money: user.money * 2 };
  });

  updateDOM();
}

// sort by Money
function sortUsers() {
  data = data.sort((a, b) => b.money - a.money);

  // sort by the least richest
  // data = data.sort((a, b) => a.money - b.money);

  updateDOM();
}

// Filter by mil
function showMilUsers() {
  data = data.filter(user => user.money > 1000000);

  updateDOM();
}

// Calculate the entire sum of money
function calculateSum() {
  // the second paramater ( 0 in this case )
  // is the starting value
  const wealth = data.reduce(
    (accumulator, currentValue) => (accumulator += currentValue.money),
    0
  );

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;

  main.appendChild(wealthEl);
}

// Add new object to data array
function addData(obj) {
  data.push(obj);

  updateDOM();
}

// Update DOM
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
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortUsers);
showMilBtn.addEventListener('click', showMilUsers);
calculateBtn.addEventListener('click', calculateSum);

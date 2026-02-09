const korisnik = JSON.parse(localStorage.getItem("prijavljeniKorisnik"));

// Ako nema korisnika → redirect na login
if (!korisnik) {
  window.location.href = "index.html"; // ili login.html
}
const prijavljeniId = localStorage.getItem("prijavljeniKorisnik");
const racuni = [
  {
    userId: 1,
    amount: 5000,
    listOfTransaction: [
      { description: "uplata", who: "me", value: 500, date: "01-03-2022" },
      { description: "uplata", who: "me", value: 100, date: "02-10-2022" },
      { description: "transakcija", who: "me", value: 100, date: "01-10-2022" },
    ],
  },
  {
    userId: 2,
    amount: 3000,
    listOfTransaction: [
      { description: "uplata", who: "me", value: 300, date: "05-01-2022" },
    ],
  },
];

const logoutBtn = document.getElementById("logout");

logoutBtn.addEventListener("click", function () {
  localStorage.removeItem("prijavljeniKorisnik");
  window.location.href = "index.html";
});

const mojRacun = racuni.find((account) => account.userId == prijavljeniId);

const iznos = document.getElementById("iznos");
iznos.textContent = mojRacun.amount + "€";

const transactionList = document.getElementById("transaction-list");

mojRacun.listOfTransaction.forEach((tr) => {
  const li = document.createElement("li");
  let currentValue =
    tr.description == "transakcija"
      ? `<span class="redtype">-${tr.value}</span>`
      : `<span class="greentype">+${tr.value}</span>`;
  li.innerHTML = `
    <span>${tr.date}</span>
    <span>${tr.description}</span>
    ${currentValue}
  `;
  transactionList.appendChild(li);
});

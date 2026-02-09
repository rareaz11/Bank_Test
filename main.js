const korisnik = JSON.parse(localStorage.getItem("prijavljeniKorisnik"));

// Ako nema korisnika → redirect na login
if (!korisnik) {
  window.location.href = "index.html"; // ili login.html
}
const addMoney = document.getElementById("add-money");
const prijavljeniId = localStorage.getItem("prijavljeniKorisnik");
const racuni = [
  {
    userId: 1,
    amount: 5000,
    listOfTransaction: [
      { description: "uplata", who: "me", value: 500 },
      { description: "uplata", who: "me", value: 100 },
      { description: "transakcija", who: "me", value: 100 },
    ],
  },
  {
    userId: 2,
    amount: 3000,
    listOfTransaction: [{ description: "uplata", who: "me", value: 300 }],
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
    <span>${tr.description}</span>
    <span>${tr.who}</span>
    ${currentValue}
  `;
  transactionList.appendChild(li);
});

addMoney.addEventListener("click", function () {
  let addMoneyintoAccount = document.getElementById("firstInput").value;

  if (addMoneyintoAccount == "" || !parseInt(addMoneyintoAccount)) {
    document.getElementById("errMess2").textContent =
      "Vrijednost nije ispravna ili je polje prazno";
    return;
  } else {
    console.log("ok je");

    mojRacun.amount = mojRacun.amount + parseInt(addMoneyintoAccount);
    mojRacun.listOfTransaction.push({
      description: "uplata",
      who: "me",
      value: parseInt(addMoneyintoAccount),
    });

    iznos.textContent = mojRacun.amount + "€";

    const li = document.createElement("li");

    li.innerHTML = `
    <span>UPLATA</span>
    <span>OWNER</span>
    <span class="greentype">${addMoneyintoAccount}</span>
  `;
    transactionList.insertBefore(li, transactionList.firstChild);
  }
  console.log(mojRacun);
});

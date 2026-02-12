const korisnik = JSON.parse(localStorage.getItem("prijavljeniKorisnik"));
const vrijeme = JSON.parse(localStorage.getItem("time"));
// Ako nema korisnika → redirect na login
if (!korisnik) {
  window.location.href = "index.html"; // ili login.html
}

// logout option with localstorage- currently works-after one minut logout
// need to add option for tracking clicks on page
let minuts = 160000;
const numTime = parseInt(vrijeme) + minuts;
let currentTime = Date.now();
if (numTime < currentTime) {
  localStorage.removeItem("prijavljeniKorisnik");
  localStorage.removeItem("time");
  window.location.href = "index.html";
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
const loadingModal = document.getElementById("loadingModal");

logoutBtn.addEventListener("click", function (e) {
  e.preventDefault();
  loadingModal.classList.add("active");

  setTimeout(() => {
    localStorage.removeItem("prijavljeniKorisnik");
    localStorage.removeItem("time");
    window.location.href = "index.html";
  }, 2000);
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
    loadingModal.classList.add("active");

    setTimeout(() => {
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
    <span class="greentype">+${addMoneyintoAccount}</span>
  `;
      transactionList.insertBefore(li, transactionList.firstChild);
      document.getElementById("errMess2").textContent = "";
      document.getElementById("firstInput").value = 0;

      loadingModal.classList.remove("active");
    }, 2000);
  }
});
// transfer money

const transferMoneyBtn = document.getElementById("transfer-money");

transferMoneyBtn.addEventListener("click", function () {
  let transferMoney = document.getElementById("secInput").value;
  let nameForTransfer = document.getElementById("transferName").value;

  if (transferMoney == "" || nameForTransfer == "") {
    document.getElementById("errMess3").textContent =
      "Vrijednost nije ispravna ili je polje prazno";
    return;
  } else {
    if (mojRacun.amount < parseInt(transferMoney)) {
      document.getElementById("errMess3").textContent =
        `za iznos: ${transferMoney}, trenutno nemate dovoljno novaca na racunu!`;
      return;
    }
    loadingModal.classList.add("active");
    setTimeout(() => {
      mojRacun.amount = mojRacun.amount - parseInt(transferMoney);
      iznos.textContent = mojRacun.amount;

      const li = document.createElement("li");

      li.innerHTML = `
    <span>ISPLATA</span>
    <span>${nameForTransfer}</span>
    <span class="redtype">-${transferMoney}</span>
  `;
      transactionList.insertBefore(li, transactionList.firstChild);
      document.getElementById("secInput").value = 0;
      document.getElementById("transferName").value = "";
      loadingModal.classList.remove("active");
      document.getElementById("errMess3").textContent = "";
    }, 2000);
  }
});

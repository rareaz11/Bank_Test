const users = [
  {
    id: 1,
    userName: "ivan",
    password: 1234,
  },
  {
    id: 2,
    userName: "pero",
    password: 1234,
  },
];

const form = document.getElementById("loginForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let user = document.querySelector("#userName").value;
  let password = document.querySelector("#password").value;
  let errMessge = document.getElementById("errMesspass");

  if (user == "" || password == "") {
    displayErorrMessage("Sva polja su obavezna!", errMessge, "red");
    return;
  }
  if (user == "") {
    displayErorrMessage("Polje korisnicko ime je prazno", errMessge, "red");
    return;
  }
  if (password == "") {
    displayErorrMessage("Polje korisnicko ime je prazno", errMessge, "red");
    return;
  }

  const foundUser = users.find(
    (userx) => userx.userName == user && userx.password == password,
  );

  if (!foundUser) {
    displayErorrMessage(
      "Pogresno korisnicko ime ili lozinka",
      errMessge,
      "red",
    );
    return;
  } else {
    localStorage.setItem("prijavljeniKorisnik", JSON.stringify(foundUser.id));
    //displayErorrMessage("Super, pogodak", errMessge, "green");
    window.location.href = "main.html";
  }
});

function displayErorrMessage(mess, selec, color) {
  selec.textContent = mess;
  selec.style.color = color;
}

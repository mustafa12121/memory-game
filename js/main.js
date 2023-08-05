let muinet = document.getElementById("muinet");
let second = document.getElementById("secnd");
let secondPast = 0,
  muinetPast = 0,
  timeconter;
let userNameTostor;
[muinet.innerHTML, second.innerHTML] = [5, 00];
let intervalOne, intervalTow;
let boxsContainer = document.querySelector(".cards");
//creating cards
let cardsTypes = [
  "code",
  "map",
  "star",
  "user",
  "cat",
  "dog",
  "phone",
  "clock",
  "book",
  "male",
];

cardsTypes.forEach((cardType, i) => {
  if (window.innerWidth < 500) {
    if (i < 12) {
      creatCard(cardType, boxsContainer);
      creatCard(cardType, boxsContainer);
    }
  } else {
    creatCard(cardType, boxsContainer);
    creatCard(cardType, boxsContainer);
  }
});

//starting the game
document.querySelector(".uper-layer span").addEventListener("click", (e) => {
  let userName = prompt("what's your name?");
  if (userName === "" || userName === null) {
    document.querySelector(".game-info .name span").innerHTML = "Mr.Unknown";
    userName = "Mr.Unknown";
  } else {
    document.querySelector(".game-info .name span").innerHTML = userName;
  }
  userNameTostor = userName;

  e.target.parentElement.remove();
  document.querySelector("#root").requestFullscreen();
  startTimer();
  showCards();
});

let duration = 1000;
let rongTrays = 0;
let boxs = Array.from(boxsContainer.children);
let orderRange = [...Array(boxs.length).keys()];

range = swap(orderRange);
boxs.forEach((box, ind) => {
  box.style.order = range[ind];
  box.addEventListener("click", () => {
    flipBox(box);
  });
});

let gamEnd = setInterval(() => {
  if (muinet.innerHTML == 0 && second.innerHTML == 0) {
    endGame(false);
    clearInterval(gamEnd);
    document.querySelector(".timer").classList.remove("denger");
  }
}, 500);

function creatCard(type, container) {
  let card = document.createElement("div");
  card.className = "box";
  document.createAttribute("data-icon");
  card.dataset.icon = type;
  let frontF = document.createElement("div");
  frontF.classList.add("face", "front");
  let icon = document.createElement("i");
  icon.classList.add("fas", `fa-${type}`);
  frontF.appendChild(icon);
  card.appendChild(frontF);
  let backF = document.createElement("div");
  backF.classList.add("face", "back");
  card.appendChild(backF);
  container.appendChild(card);
}

function fullScreen() {
  document.querySelector("#root").requestFullscreen();
}
function flipBox(box) {
  box.classList.add("is-fleppid");

  let flippidCard = boxs.filter((box) => box.classList.contains("is-fleppid"));
  if (flippidCard.length == 2) {
    stopClicking();
    matchCards(flippidCard[0], flippidCard[1]);
  }
  let matchedCards = boxs.filter((box) => {
    return box.classList.contains("is-matched");
  });
  if (matchedCards.length == 20) {
    endGame(true);
  }
}

function endGame(win) {
  let div = document.createElement("div");
  let innerdiv = document.createElement("div");
  let h2 = document.createElement("h2");
  let p = document.createElement("p");

  if (win) {
    h2.appendChild(document.createTextNode("you win"));
    stopTimer();
    let folts;
    switch (rongTrays) {
      case range < 5:
        p.appendChild(document.createTextNode(`you are brilian only `));
        folts = `<span>${rongTrays}</span> folt`;
        break;
      case rongTrays < 10:
        p.appendChild(document.createTextNode(`you are Good you got `));
        folts = `<span>${rongTrays}</span> folt`;
        break;
      case rongTrays < 15:
        p.appendChild(document.createTextNode(`not Bad `));
        folts = `<span>${rongTrays}</span> folt`;
        break;
      case rongTrays < 20:
        p.appendChild(document.createTextNode(`wow you need to work on it `));
        folts = `<span>${rongTrays}</span> folt`;
        break;
      default:
        p.appendChild(document.createTextNode(`dam i have nothing to say `));
        folts = `<span>${rongTrays}</span> folt`;
    }
    p.innerHTML += folts;
    colectAndStor();
  } else {
    h2.appendChild(document.createTextNode("you lose"));
    stopTimer();
  }
  let a = document.createElement("a");
  a.href = "index.html";
  a.append("replay");
  innerdiv.appendChild(h2);
  innerdiv.appendChild(p);
  innerdiv.appendChild(leaderBord());
  innerdiv.appendChild(a);
  //Befor appeding the div fullScreen mode have to stop| I don't remeber the command  for that -_-
  document.exitFullscreen();
  //It's fony thoght that I am coding a memory game ^o^
  div.appendChild(innerdiv);
  div.classList.add("game-end");
  document.querySelector("#root");
  document.body.prepend(div);
  // document.querySelector(".game-end #replay").onclick = () => {
  //   location.reload();
  // };
}

function stopClicking() {
  boxsContainer.classList.add("unclickabl");
  setTimeout(() => {
    boxsContainer.classList.remove("unclickabl");
  }, duration);
}

function matchCards(fierst, secand) {
  let wrongTrays = document.querySelector(".score span");
  if (fierst.dataset.icon === secand.dataset.icon) {
    fierst.classList.remove("is-fleppid");
    secand.classList.remove("is-fleppid");

    fierst.classList.add("is-matched");
    secand.classList.add("is-matched");
  } else {
    wrongTrays.innerHTML = ++rongTrays;
    setTimeout(() => {
      fierst.classList.remove("is-fleppid");
      secand.classList.remove("is-fleppid");
    }, duration);
  }
}
function swap(array) {
  let random,
    corent = array.length,
    temp;
  while (corent > 0) {
    random = Math.floor(Math.random() * corent);
    corent--;
    temp = array[corent];
    array[corent] = array[random];
    array[random] = temp;
  }
  return array;
}

function startTimer() {
  //conting the the time taken. to store it with the pleayer object
  timeconter = setInterval(() => {
    secondPast++;
    if (secondPast == 60) {
      muinetPast++;
      secondPast = 0;
    }
  }, 1000);

  intervalOne = setInterval(() => {
    if (second.innerHTML == 0) {
      second.innerHTML = 60;
      muinet.innerHTML = `0${--muinet.innerHTML}`;
    }
    second.innerHTML--;
    //Adding additional zero if the seconds are less than 10
    if (second.innerHTML < 10) {
      second.innerHTML = `0${second.innerHTML}`;
    }
    if (muinet.innerHTML == 0) {
      document.querySelector(".timer").classList.add("denger");
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(intervalOne);
  clearInterval(intervalTow);
  clearInterval(timeconter);
}

function showCards() {
  boxs.forEach((box) => {
    box.style.transform = "rotateX(0deg)";
    setTimeout(() => {
      box.style.transform = "";
    }, 2000);
  });
  stopClicking();
}

function leaderBord() {
  let a = document.createElement("a");
  a.href = "./bags/leaderBord.html";
  a.append("Leader Bord");
  return a;
}

function colectAndStor() {
  let playerInLeader = [];
  //chacking if leaderBord is in localStorg
  if (localStorage.getItem("player")) {
    playerInLeader = JSON.parse(localStorage.getItem("player"));
    playerInLeader.push({
      userName: userNameTostor,
      folts: rongTrays,
      time: {
        secontd: secondPast,
        muinet: muinetPast,
      },
    });
  } else {
    playerInLeader = [
      {
        userName: userNameTostor,
        folts: rongTrays,
        time: {
          secontd: secondPast,
          muinet: muinetPast,
        },
      },
    ];
  }

  //sorting the player from the best to the worsd
  playerInLeader.sort((a, b) => {
    if (a.folts !== b.folts) return a.folts - b.folts;
  });

  playerInLeader.sort((a, b) => {
    if (a.folts === b.folts) {
      if (a.time.muinet !== b.time.muinet)
        return +b.time.muinet - +a.time.muinet;
      else if (a.time.secontd !== b.time.secontd)
        return +a.time.secontd - +b.time.secontd;
    }
  });

  let jsonOpject = JSON.stringify(playerInLeader);

  localStorage.setItem("player", jsonOpject);
}

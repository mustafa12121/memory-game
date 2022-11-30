if (localStorage.getItem("player")) {
  let playerInfo = JSON.parse(localStorage.getItem("player"));
  for (const ind in playerInfo) {
    let {
      userName: user,
      folts,
      time: { secontd, muinet },
    } = playerInfo[ind];
    let table = document.getElementById("table");
    let tr = document.createElement("tr");
    let nameTd = document.createElement("td");
    nameTd.classList.add("name");
    nameTd.appendChild(document.createTextNode(`${+ind + 1}-${user}`));
    tr.appendChild(nameTd);
    let foltsTd = document.createElement("td");
    foltsTd.appendChild(document.createTextNode(folts));
    tr.appendChild(foltsTd);
    let timeTd = document.createElement("td");
    let theTime =
      secontd < 10
        ? document.createTextNode(`0${muinet}:0${secontd}`)
        : document.createTextNode(`0${muinet}:${secontd}`);
    timeTd.appendChild(theTime);
    tr.appendChild(timeTd);
    table.appendChild(tr);
  }
} else {
  console.log("none");
}

// contadores estados
let estados = [0, 0, 0, 0, 0, 0, 0, 0];

function reflex_agent(location, state) {
  if (state == "DIRTY") return "CLEAN";
  else if (location == "A") return "RIGHT";
  else if (location == "B") return "LEFT";
}

function test(states) {
  visitState(states);
  if (states[2] === "CLEAN" && states[1] === "CLEAN") {
    let random = Math.random();
    if (random > 0.4) {
      states[1] = "DIRTY";
      states[2] = "DIRTY";
      document.getElementById("log").innerHTML += "<br> A & B DIRTY";
    } else if (random > 0.25) {
      states[1] = "DIRTY";
      document.getElementById("log").innerHTML += "<br> A DIRTY";
    } else {
      states[2] = "DIRTY";
      document.getElementById("log").innerHTML += "<br>B DIRTY";
    }
    visitState(states);
  }

  var location = states[0];
  var state = states[0] == "A" ? states[1] : states[2];
  var action_result = reflex_agent(location, state);
  document.getElementById("log").innerHTML += "<br>Location: "
    .concat(location)
    .concat(" | Action: ")
    .concat(action_result);
  let output = "";
  estados.forEach((x) => {
    output += "<td>" + x + "</td>";
  });
  document.getElementById("estados").innerHTML =
    `<table border="1">
		 <tr>
		 <td>Location: A Dirty-Dirty</td>
		 <td>Location: B Dirty-Dirty</td>
		 <td>Location: A Dirty-Clean</td>
		 <td>Location: B Dirty-Clean</td>
		 <td>Location: A Clean-Dirty</td>
		 <td>Location: B Clean-Dirty</td>
		 <td>Location: A Clean-Clean</td>
		 <td>Location: B Clean-Clean</td>
		 </tr>
		 <tr>
		 ` +
    output +
    `</tr>
		 </table>`;
  if (action_result == "CLEAN") {
    if (location == "A") states[1] = "CLEAN";
    else if (location == "B") states[2] = "CLEAN";
  } else if (action_result == "RIGHT") states[0] = "B";
  else if (action_result == "LEFT") states[0] = "A";

  if (estados.filter((x) => x >= 2).length == 8) {
    document.getElementById("status").innerHTML = "<h1>Finalizado!</h1>";

    return;
  }

  setTimeout(function () {
    test(states);
  }, 1000);
}

function visitState(states) {
  let position = 0;

  if (states[1] === "CLEAN") {
    position = 4;
  }
  if (states[0] === "B" && states[2] === "DIRTY") {
    position += 1;
  } else if (states[0] === "A" && states[2] === "CLEAN") {
    position += 2;
  } else if (states[0] === "B" && states[2] === "CLEAN") {
    position += 3;
  }
  estados[position] = estados[position] + 1;
  return;
}

var states = ["A", "DIRTY", "DIRTY"];
test(states);

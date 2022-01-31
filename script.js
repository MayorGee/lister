const ul = document.getElementById("list");
const saveBtn = document.getElementById("save-btn");

const clearBtn = document.getElementById("clear-btn");

const input = document.getElementById("input");

let list = JSON.parse(localStorage.getItem("list")) ?? [];

input.addEventListener("keypress", (e) => {
  e.key === "Enter" ? addItem() : null;
});

saveBtn.addEventListener("click", addItem);
clearBtn.addEventListener("click", clearList);

function addItem() {
  let text = input.value.trim();

  if (text === "" || text === " ") {
    alert("cannot save empty input!");
    return;
  } else {
    //creating all required elements and attributes

    let paragraph = document.createElement("P");
    let span = document.createElement("SPAN");
    span.classList.add("delete");
    span.addEventListener("click", deleteItem);
    span.textContent = "X";
    let li = document.createElement("LI");
    li.classList.add("list-item");

    paragraph.textContent = text;

    li.appendChild(paragraph);
    li.appendChild(span);

    ul.appendChild(li);

    list.push(text);

    localStorage.setItem("list", JSON.stringify(list));

    input.value = "";
  }
}

for (let item in list) {
  //creating all required elements and attributes for...
  //...items coming from local storage

  let paragraph = document.createElement("P");
  let span = document.createElement("SPAN");
  span.classList.add("delete");
  span.addEventListener("click", deleteItem);
  span.textContent = "X";
  let li = document.createElement("LI");
  li.classList.add("list-item");

  paragraph.textContent = list[item];

  li.appendChild(paragraph);
  li.appendChild(span);

  ul.appendChild(li);
}

function deleteItem() {
  let liParent = this.parentElement;
  ul.removeChild(liParent);

  for (let i = 0; i < list.length; i++) {
    if (list[i] === liParent.firstChild.textContent) {
      console.log("splice!");
      list.splice(i, 1);
      localStorage.setItem("list", JSON.stringify(list));
    }
  }
}

function clearList() {
  ul.innerHTML = "";
  localStorage.clear();
  list = [];
}

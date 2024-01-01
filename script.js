const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".input");
const ulEl  = document.querySelector(".list");

let list = JSON.parse(localStorage.getItem("list"));

if (list){

    list.forEach((task)=>{
        toDoList(task);
    });
}

formEl.addEventListener("submit", (event)=>{

    event.preventDefault();
    toDoList();
});

function toDoList(task){
    let newTask = inputEl.value;

    if(task){
        newTask = task.name;
    }

    const liEL = document.createElement("li");

    if(task && task.checked){
        liEL.classList.add("checked");   
    }

    liEL.innerText = newTask;
    ulEl.appendChild(liEL);
    inputEl.value = "";

    const checkBtnEl = document.createElement("div");
    checkBtnEl.innerHTML = `<i class="fa-solid fa-square-check"></i>`
    liEL.appendChild(checkBtnEl)

    const trashBtnEl = document.createElement("div");
    trashBtnEl.innerHTML = `<i class="fa-solid fa-trash"></i>`
    liEL.appendChild(trashBtnEl)

    checkBtnEl.addEventListener("click", ()=>{
        liEL.classList.toggle("checked");
        updateLocalStorage();
    });

    trashBtnEl.addEventListener("click", ()=>{
        liEL.remove();
        updateLocalStorage();
    });

    updateLocalStorage();
};


function updateLocalStorage(){
    const liEls = document.querySelectorAll("li");

    list = [];

    liEls.forEach((liEl)=>{
        list.push({
            name:liEl.innerText,
            checked: liEl.classList.contains("checked")
        });
    });

    localStorage.setItem("list", JSON.stringify(list));
};

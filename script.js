const mainTodoElem = document.querySelector(".todo-lists-elem");
const inputValue = document.getElementById("inputValue");


const getTodoListFromLocal = () =>{
    return JSON.parse(localStorage.getItem("youtubeTodoList"));
};

const addTodoListLocalStorage = (localTodoLists)=>{
    return localStorage.setItem("youtubeTodoList",JSON.stringify(localTodoLists));
};

let localTodoLists = getTodoListFromLocal() || [];

const addTodoDynamicElement = (currElem) => {
    const divElement = document.createElement("div");
    divElement.classList.add("main_todo_div");
    divElement.innerHTML = `<li>${currElem}</li> <button class="deleteBtn">Delete</button`;
    mainTodoElem.append(divElement);
    
};

const addTodoList = (e) =>{
    e.preventDefault();


    const todoListValue = inputValue.value.trim();

    inputValue.value = "";

    if( todoListValue !="" && !localTodoLists.includes(todoListValue)){
    localTodoLists.push(todoListValue);
    localTodoLists = [...new Set(localTodoLists)];
    console.log(localTodoLists);
    localStorage.setItem("youtubeTodoList",JSON.stringify(localTodoLists));


    addTodoDynamicElement(todoListValue);
    }
    
};
const showTodoList = () => {
    console.log(localTodoLists);

    localTodoLists.forEach((currElem) => {
        addTodoDynamicElement(currElem);
    });
};
showTodoList();

const removeTodoElem = (e) =>{
    const todoToRemove = e.target;
    let todoListContent = todoToRemove.previousElementSibling.innerText;
    let parentElem = todoToRemove.parentElement;
    console.log(todoListContent);

    localTodoLists = localTodoLists.filter((curTodo) => {
       return curTodo != todoListContent.toLowerCase();
    });

    addTodoListLocalStorage(localTodoLists);
    parentElem.remove();
    console.log(localTodoLists);
};

mainTodoElem.addEventListener("click",(e) => {
    e.preventDefault();
    if(e.target.classList.contains("deleteBtn")){
    removeTodoElem(e);
    }
});
    document.querySelector(".btn").addEventListener("click",(e) =>{
        addTodoList(e);
    
});
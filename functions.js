let rawdata = [];
function fetchData() {
    fetch('https://jsonplaceholder.typicode.com/todos/')
        .then(response => response.json())
        .then(json => {
            rawdata = json;
            json.forEach(element => {
                addElemToList("list-1", makeTodoItem(element.completed, element.title), false)
            });
        })
}

function addElemToList(listId, elem, addToTop) {
    const listElem = document.getElementById(listId);
    if (!listElem) {
        console.error("Cannot find the list with id ", listId)
    }
    addToTop ? listElem.prepend(elem) : listElem.append(elem);
}

function makeTodoItem(checked, text) {
    const input = document.createElement('input')
    input.type = "checkbox";
    input.checked = checked;

    const label = document.createElement('label');
    label.textContent = text;

    const wrapper = document.createElement('div');
    wrapper.append(input);
    wrapper.append(label);
    return wrapper;
}

function vraagNieuweTaak(){
    return prompt("Geef de naam van een nieuwe taak")
}

function refreshList() {
    clearElementsInList("list-1");
    clearElementsInList("list-2");
    rawdata.forEach(dataEntry => addElemToList("list-1", makeTodoItem(dataEntry.completed, dataEntry.title), false))
}

function addItem2(listId) {
    addElemToList(listId, makeTodoItem(false, vraagNieuweTaak()), true)
}

function addItem() {
    let newItem = { completed: false, title: vraagNieuweTaak() }
    rawdata = [newItem, ...rawdata];
    refreshList();
}

function clearElementsInList(listId) {
    const element = document.getElementById(listId);
    while (element?.firstChild) {
        element.firstChild.remove();  //alternative: element.removeChild(element.firstChild); 
    }
}

function filterTodoItems(isChecked) {
    Array.from(document.querySelectorAll('#list-1 > *'))
        .filter(elem => elem.querySelector('input').checked === isChecked).forEach(elem => addElemToList('list-2', elem), false);
}

function filterChecked2() {
    filterTodoItems(true);
}

function filterUnchecked() {
    filterTodoItems(false);
}
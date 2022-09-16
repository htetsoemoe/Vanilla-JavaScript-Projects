// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const groceryInput = document.getElementById('grocery');// input element
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

// edit option
let editElement;
let editFlag = false;
let editID = "";

// ****** EVENT LISTENERS **********
// submit form
form.addEventListener('submit', addItem);

// clear list
clearBtn.addEventListener('click', clearItems);

// display items form local storage when page was refreshed
window.addEventListener('DOMContentLoaded', setupItmes)

// ****** FUNCTIONS **********
function addItem(e) {
    e.preventDefault();
    const value = groceryInput.value;
    const id = new Date().getTime().toString();

    if (value !== "" && editFlag === false) {

        createListItem(id, value);

        // display alert
        displayAlert('Item added to the list.', 'success');

        // show container
        container.classList.add('show-container');

        // store to local storage
        addToLocalStorage(id, value);

        // set back to default
        setBackToDefault();
        
    } else if (value !== "" && editFlag === true) {
       editElement.innerHTML = value;
       displayAlert('Value Changed', 'success');

       // edit local storage
       editLocalStorage(editID, value);
       setBackToDefault();
    } else {
        displayAlert('Please enter value!', 'danger');
    }
}

// clear items from list
function clearItems() {
    const items = document.querySelectorAll('.grocery-item');
    if (items.length > 0) {
        items.forEach(item => {
            list.removeChild(item);
        });
    }

    container.classList.remove('show-container');
    displayAlert('Empty List', 'danger');
    setBackToDefault();

    localStorage.removeItem('list');
}

// display alert 
function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);

    // remove alert after 3 seconds
    setTimeout(() => {
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`);
    }, 1000);
}

// ****** delete item & edit item *******
function deleteItem(e) {
    let groceryItem = e.currentTarget.parentElement.parentElement; // get article.grocery-item
    list.removeChild(groceryItem);
    if (list.children.length === 0) {
        container.classList.remove('show-container');
    }
    displayAlert('Item Removed', 'danger');
    setBackToDefault();

    // remove from local storage
    removeFromLocalStorage(id);
}

function editItem(e) {
    const element = e.currentTarget.parentElement.parentElement;// get article.grocery-item
    console.log(element);
    // set edit item
    editElement = e.currentTarget.parentElement.previousElementSibling;
    console.log(editElement);

    // set form value
    groceryInput.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;

    submitBtn.textContent = 'Edit';
}

// ****** Set Back to Default ******
function setBackToDefault() {
    groceryInput.value = '';
    editFlag = false;
    editID = '';
    submitBtn.textContent = 'Submit';
}

// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value) {
    const grocery = {id, value};
    let items = getLocalStorage();
    console.log(items);

    items.push(grocery);
    localStorage.setItem('list', JSON.stringify(items));
}

// helper function
function getLocalStorage() {
    return localStorage.getItem('list')
        ? JSON.parse(localStorage.getItem('list'))
        : [];
}

function removeFromLocalStorage(id) {
    let items = getLocalStorage();

    items = items.filter(item => {
        if (item.id !== id) {// if input id is same from localStorage item's id, item of input id was removed from filter return array
            return item;
        }
    });

    localStorage.setItem('list', JSON.stringify(items));
}

function editLocalStorage(id, value) {
    let items = getLocalStorage(); // return array
    
    items = items.map(item => {
        if (item.id === id) {
            item.value = value;
        }
        return item;
    });

    localStorage.setItem('list', JSON.stringify(items));
}

// ****** SETUP ITEMS **********
function setupItmes() {
    let items = getLocalStorage();

    if (items.length > 0) {
        items.forEach(item => {
            createListItem(item.id, item.value);
        });
        container.classList.add('show-container');
    }
}

// helper function of setupItems()
function createListItem(id, value) {
    const element = document.createElement('article');
    let arr = document.createAttribute('data-id');
    arr.value = id;

    element.setAttributeNode(arr);
    element.classList.add('grocery-item');
    element.innerHTML = `
    <p class="title">${value}</p>
    <div class="btn-container">
      <button type="button" class="edit-btn">
        <i class="fas fa-edit"></i>
      </button>
      <button type="button" class="delete-btn">
        <i class="fas fa-trash"></i>
      </button>
    </div>
    `;

    // add event listeners to both buttons of grocery-item
    const deleteBtn = element.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', deleteItem);

    const editBtn = element.querySelector('.edit-btn');
    editBtn.addEventListener('click', editItem);

    // append child(article) to parent(grocery-list)
    list.appendChild(element);

}

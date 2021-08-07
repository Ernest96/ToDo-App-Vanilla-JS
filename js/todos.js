const todoList = document.getElementById("todo-list");
const createBtn = document.getElementById("btn-create");

const closeCreateBtn = document.getElementById("close-create");
const createModal = document.getElementById("create-modal");
const createTitleInput = document.getElementById("create-title");
const createTextInput = document.getElementById("create-text");
const submitCreate = document.getElementById("submit-create");


const closeEditBtn = document.getElementById("close-edit");
const editModal = document.getElementById("edit-modal");
const editTitleInput = document.getElementById("edit-title");
const editTextInput = document.getElementById("edit-text");
const editIdInput = document.getElementById("edit-id");
const submitEdit = document.getElementById("submit-edit");



const todoSection = document.getElementById("todo-section");
const emptyListMessage = document.getElementById("empty-list");
const loadingMessage = document.getElementById("loading");
const currentUser = document.getElementById("current-user");


let user;
let todosRef;

closeCreateBtn.onclick = closeCreateModal;
closeEditBtn.onclick = closeEditModal;

createBtn.onclick = function () {
    createModal.style.display = "block";
    clearCreateModal();
    todoSection.classList.toggle("hide");
}


submitCreate.onclick = function () {
    let title = createTitleInput.value;
    let text = createTextInput.value.split("\n").join("<br />");
    console.log(text);
    let createdString = getCurrentDateTime();

    if (title && text && title.length > 0 && text.length > 0) {
        todosRef.add({
            title,
            text,
            createdString,
            createdTimeStamp: Date.now()
        });
        closeCreateModal();
    }
    else {
        alert("Please fill all the data");
    }
}

submitEdit.onclick = function () {
    let title = editTitleInput.value;
    let text = editTextInput.value.split("\n").join("<br />");
    let id = editIdInput.value;

    if (id && text && title && text.length > 0 && title.length > 0) {
        todosRef.doc(id).update({ title, text });
        closeEditModal();
    }
    else {
        alert("Please fill all the data");
    }
}

function closeCreateModal() {
    createModal.style.display = "none";
    todoSection.classList.toggle("hide");
}

function closeEditModal() {
    editModal.style.display = "none";
    todoSection.classList.toggle("hide");
}

function clearCreateModal() {
    createTitleInput.value = "";
    createTextInput.value = "";
}

function clearEditModal() {
    editTitleInput.value = "";
    editTextInput.value = "";
}

function getCurrentDateTime() {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let minutes = date.getMinutes();
    minutes = minutes < 10 ? "0" + minutes : minutes;

    let time = date.getHours() + ":" +  minutes;
    let dateTime = day + "/" + month + "/" + year + " " + time;

    return dateTime;
}


function renderTodos(items) {
    let html = "";
    console.log(items);
    if (items && items.length > 0) {
        items.forEach(item => {
            html += `
            <div class="todo">
                <span class="todo-date">${item.data.createdString}</span>
                <button class="delete-btn white" onclick="deleteTodo('${item.id}')">
                    <i class="fas fa-trash"></i>
                </button>
                <button class="edit-btn white" onclick="editTodo('${item.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <h3 class="centered">${item.data.title}</h3>
                <hr />
                <p>${item.data.text}</p>
            </div>
            `
        });

        todoList.innerHTML = html;
        emptyListMessage.style.display = "none";
    }
    else {
        todoList.innerHTML = "";
        emptyListMessage.style.display = "block";
    }
    loadingMessage.style.display = "none";
}

function deleteTodo(id) {
    if (confirm("Are you sure you want to delete this To Do ?")) {
        todosRef.doc(id).delete();
    }
}

function editTodo(id) {
    editModal.style.display = "block";
    clearEditModal();
    todoSection.classList.toggle("hide");

    todosRef.doc(id).get().then((docRef) => {
        let item = docRef.data();

        editTitleInput.value = item.title;
        editTextInput.value = item.text.split("<br />").join("\n");
        editIdInput.value = id;

    })
}



function getTodos() {
    todosRef = db.collection(`todos/${user.uid}/todoList`);

    todosRef.orderBy("createdTimeStamp", "desc")
        .onSnapshot(querySnapshot => {
            let items = querySnapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    data: doc.data()
                }
            });

            renderTodos(items);
        })
}


auth.onAuthStateChanged(function (firebaseUser) {
    if (firebaseUser != null) {
        user = firebaseUser;
        currentUser.innerHTML = user.displayName;
        getTodos();
    }
    else {
        window.location = "/index.html";
    }
})

//Constants
const USERS_LOCAL_STORAGE_KEY = "users";
const TASKS_LOCAL_STORAGE_KEY = "tasks"
const DATE_FORMAT = "Y-m-d"
const SAME_USERNAME_ERROR = "Van már ilyen nevű felhasználó! Kérlek, válassz másik nevet."
const EMPTY_USERNAME_ERROR = "Kérlek, adj meg egy nevet!"
const USER_SAVED_SUCCESSFULLY = "Felhasználó sikeresen létrehozva!"
const TASK_SAVED_SUCCESSULLY = "Feladat sikeresen létrehozva!"
const TASK_UPDATED_SUCCESSULLY = "Feladat sikeresen módosítva!"
const DELETE_CONFIRMATION = "Biztosan törölni akarja?"
const NO_TASK = "Nincs feladat"
const REQUIRED_FIELD = "Ez a mező kötelező"
// Components
const skeleton = () =>
  `<nav class="navbar navbar-expand-lg bg-body-tertiary" id="nav-bar">
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <button class="btn btn-outline-primary" id="home">Főoldal</button>
        </li>
        <li class="nav-item">
          <button class="btn btn-outline-primary" id="newTask">Feladat hozzáadása</button>
        </li>
        <li class="nav-item">
          <button class="btn btn-outline-primary" id="newUser">Új felhasználó</button>
        </li>
      </ul>
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <select class="form-select" id="select-user"></select>
        </li>
      </ul>
    </div>
  </div>
</nav>

<div class="main">
</div>`;

const welcomeScreenComponent = () => {
  return `
    
    <div id="add-username">
      <h2>Kérlek, add meg a neved!</h2>
      <form>
        <div class="mb-3">
        <label for="username"  class="form-label">Név</label>
        <input type="text" id="username" name="username" class="form-control"/>
        <p id="username-error"></p>
        </div>
        <button class="btn btn-primary" id="submit-username">Rendben</button>
      </form>
    </div>
  `;
};
const addNewTaskComponent = () => `
<form id="task-form">
  <div class="mb-3">
    <label for="task-description" class="form-label">Feladat neve</label>
    <input type="text" class="form-control" id="task-description" placeholder="Add meg a feladat nevét">
    <p id="taskname-error" class="required-task-field"></p>
  </div>
  <div class="mb-3">
    <label for="day" class="form-label">Nap</label>
    <input type="text" class="form-control" id="day" placeholder="Válassz dátumot" >
    <p id="taskdate-error" class="required-task-field"></p>
  </div>
  <div class="mb-3">
    <label for="start" class="form-label">Kezdés</label>
    <input type="text" class="form-control" id="start" placeholder="Válaszd ki a kezdés idejét" >
    <p id="taskstart-error" class="required-task-field"></p>
  </div>
  <div class="mb-3">
    <label for="end" class="form-label">Befejezés</label>
    <input type="text" class="form-control" id="end" placeholder="Válaszd ki a befejezés idejét" >
    <p id="taskend-error" class="required-task-field"></p>
  </div>
  <div class="mb-3">
    <label for="tag" class="form-label">Címkék</label>
    <input type="text" class="form-control" id="tag" placeholder="Adj hozzá címkéket, ','-vel elválasztva" >
  </div>
  <button class="btn btn-primary" id="submit-task">Küldés</button>
  <button class="btn btn-secondary" id="cancel-task">Mégse</button>
</form>
`;

const taskTable = () => `
<div class="table-responsive">
<table class="table">
  <thead>
    <tr>
      <th scope="col">Leírás</th>
      <th scope="col">Nap</th>
      <th scope="col">Kezdés</th>
      <th scope="col">Befejezés</th>
      <th scope="col">Címkék</th>
      <th scope="col">Műveletek</th>
    </tr>
  </thead>
  <tbody>
    
  </tbody>
</table>
</div>`;

const singleTask = (task) => `
 <tr>
          <th scope="row">${task.task}</th>
          <td>${task.day}</td>
          <td>${task.start}</td>
          <td>${task.end}</td>
          <td>${task.tags.map(tag => `<span class="task-tag">${tag}</span>`).join(",")}</td>
          <td style="text-align:center"><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash delete-task" data-id="${task.id}" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg></span>
          <span> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil edit-task" data-id="${task.id}"  viewBox="0 0 16 16">
  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
</svg></span>
        </tr>`;
const userHomeComponent = (user) => `
  <div id="home-page">
    <h1>Hello, ${user} !</h1>
    
    <div id="filter-tasks-container">
    <select id="filter-tasks" class="form-select">
      <option value="">Minden feladat</option>
      <option value="today-tasks">Mai Feladatok</option>
      <option value="weekly-tasks">Heti Feladatok</option>
      <option value="monthly-tasks">Havi Feladatok</option>
    </select>
    </div>
    <div id="tasks-container">
    </div>
  </div>
`;

const confirmDeleteTaskComponent = (text) => `
<div class="modal" id="confirm-modal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Megerősítés</h5>
      </div>
      <div class="modal-body">
        <p>${text}</p>
      </div>
      <div class="modal-footer">
        <button id="cancel" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Mégse</button>
        <button id="confirm" type="button" class="btn btn-primary">Igen</button>
      </div>
    </div>
  </div>
</div>`;

const noTaskComponent = () => `
  <p id="no-task"></p>
`;
const confirmSuccess = (text) => `
<div  id="success-alert" class="alert alert-success" role="alert">
  ${text}
</div>`;

const canvasComponent = () => `
<div id=canvas-container>
<canvas id="tasksChart" width="400" height="200"></canvas>
<button class="btn btn-primary" id="changeDiagram">${
  diagramType === 0 ? "Kör" : "Oszlop"
}</button>
</div>`;

function updateTask(editedTaskId, taskName, startDate, endDate, day, tagsArray) {
  let tasks = JSON.parse(localStorage.getItem(TASKS_LOCAL_STORAGE_KEY)) || [];
  const newTasks = tasks.map((task) => {if(task.id == editedTaskId) {
      return {
        id: editedTaskId,
        uid: task.uid,
        task: taskName,
        start: startDate,
        end: endDate,
        day: day,
        tags: tagsArray,
      }
    } else {
      return task
    }}
)
  localStorage.setItem(TASKS_LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
}

function saveTask(taskName, startDate, endDate, day, tagsArray, user) {
  let tasks = JSON.parse(localStorage.getItem(TASKS_LOCAL_STORAGE_KEY)) || [];
  let taskId =
    tasks.length > 0
      ? tasks.reduce((max, task) => Math.max(max, task.id), 0) + 1
      : 1;

  tasks.push({
    id: taskId,
    uid: user,
    task: taskName,
    start: startDate,
    end: endDate,
    day: day,
    tags: tagsArray,
  });
  localStorage.setItem(TASKS_LOCAL_STORAGE_KEY, JSON.stringify(tasks));
}

//Date configuration
function configTime() {
  const existingPickers = document.querySelectorAll(".flatpickr-input");
  existingPickers.forEach((picker) => {
    if (picker._flatpickr) {
      picker._flatpickr.destroy();
    }
  });
  flatpickr("#day", {
    dateFormat: DATE_FORMAT,
    disableMobile: true,
  });
  flatpickr("#start", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    disableMobile: true,
  });
  flatpickr("#end", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    disableMobile: true,
  });
}
const getWeekInterval = () => {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay() + 1);
  const endOfWeek = new Date(today);
  endOfWeek.setDate(today.getDate() - today.getDay() + 7);
  const start = flatpickr.formatDate(startOfWeek, DATE_FORMAT);
  const end = flatpickr.formatDate(endOfWeek, DATE_FORMAT);
  return { start, end };
};

//Functions for diagram
const countWorkTime = (arr) => {
  let worktime = 0;
  arr.forEach((el) => {
    const startminutes =
      parseInt(el.start.split(":")[0]) * 60 + parseInt(el.start.split(":")[1]);
    const endminutes =
      parseInt(el.end.split(":")[0]) * 60 + parseInt(el.end.split(":")[1]);
    worktime += (endminutes - startminutes) / 60;
  });
  return Math.round(worktime * 2) / 2;
};

function makeDiagram(diagramData) {
  const ctx = document.getElementById("tasksChart").getContext("2d");
  new Chart(ctx, {
    type: diagramType === 0 ? "bar" : "doughnut",
    data: {
      labels: ["Napi", "Heti", "Havi"],
      datasets: [
        {
          label: "Munkaidő órákban",
          data: [
            countWorkTime(diagramData.todayTasks),
            countWorkTime(diagramData.weeklyTasks),
            countWorkTime(diagramData.monthlyTasks),
          ],
          backgroundColor: [
            "rgba(75, 192, 192, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
          ],
          borderColor: [
            "rgba(75, 192, 192, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "",
          },
        },
      },
    },
  });
}
function countDiagramData(usersTasks) {
  const today = flatpickr.formatDate(new Date(), DATE_FORMAT);
  const todayTasks = usersTasks.filter((task) => task.day === today);
  
  const thisMonth = today.split("-")[1];
  const monthlyTasks = usersTasks.filter(
    (task) => String(thisMonth) === String(task.day.split("-")[1])
  );

  const weekInterval = getWeekInterval();
  const weeklyTasks = usersTasks.filter(
    (task) => task.day >= weekInterval.start && task.day <= weekInterval.end
  );
  return { todayTasks, monthlyTasks, weeklyTasks };
}

let diagramType = 0;
const changeDiagramDisplay = (e, mainElement, selectUserEl) => {
    diagramType = diagramType === 0 ? 1 : 0;
    makeHomePageContent(mainElement, selectUserEl);
};

//Functions for user handling

const openNewUserForm = (mainElement) => {
    mainElement.innerHTML = "";
    mainElement.insertAdjacentHTML("beforeend", welcomeScreenComponent());
    addUser(mainElement);
};

function addUser(element) {
  let addUserButton = document.getElementById("submit-username");
  let userElement = document.getElementById("username");
  const userNameError = document.getElementById("username-error");
  addUserButton.addEventListener("click", (e) => {
    e.preventDefault();
    let users = JSON.parse(localStorage.getItem(USERS_LOCAL_STORAGE_KEY)) || [];
    let userId =
      users.length > 0
        ? users.reduce((max, user) => Math.max(max, user.uid), 0) + 1
        : 1;

    let isItExists = users.find(
      (user) => user.username.toLowerCase() === userElement.value.toLowerCase()
    );
    if (isItExists) {
      userNameError.innerHTML =
        SAME_USERNAME_ERROR;
        return
    } else if (userElement.value === "") {
      userNameError.innerHTML = EMPTY_USERNAME_ERROR;
      return;
    } else {
      users.push({ username: userElement.value, uid: userId });
      localStorage.setItem(USERS_LOCAL_STORAGE_KEY, JSON.stringify(users));
      addUserButton.disabled = true;
    }
    refreshUsers();
    const selectUserEl = document.getElementById("select-user");
    selectUserEl.value = userId;
    let text = USER_SAVED_SUCCESSFULLY;
    element.insertAdjacentHTML("beforeend", confirmSuccess(text));
    setTimeout(() => {
      makeHomePageContent(element, selectUserEl);
    }, 800);
  });
}

const refreshUsers = () => {
  const headerElement = document.getElementById("nav-bar");
  headerElement.hidden = false;
  const selectUserEl = document.getElementById("select-user");
  selectUserEl.innerHTML = "";
  let updatedUsers = JSON.parse(localStorage.getItem(USERS_LOCAL_STORAGE_KEY));
  updatedUsers.forEach((user) => {
    selectUserEl.insertAdjacentHTML(
      "beforeend",
      `<option value="${user.uid}">${user.username}</option>`
    );
  });
};

const changeUser = (e, selectUserEl, mainElement) => {
  e.preventDefault();
  if (e.target === selectUserEl) {
    makeHomePageContent(mainElement, selectUserEl);
  }
};

//Functions for tasks handling
const openNewTask = (mainElement, selectUserEl) => {
  mainElement.innerHTML = "";
  mainElement.insertAdjacentHTML("beforeend", addNewTaskComponent());
  showEditTaskPage(mainElement, selectUserEl, null);
};

const showEditTaskPage = (mainElement, selectUserEl, editedTaskId) => {
  mainElement.innerHTML = "";
  mainElement.insertAdjacentHTML("beforeend", addNewTaskComponent());

  if(editedTaskId) {
      prefillTaskForm(editedTaskId)
  }

  configTime();
  const submitTaskButton = document.getElementById("submit-task");
  setUpCancelTaskButton(mainElement,selectUserEl)

  let addingNewTask = !editedTaskId

  
    submitTaskButton.addEventListener("click", (e) => {
      e.preventDefault();
      const taskName = document.getElementById("task-description").value;
      const taskNameError = document.getElementById("taskname-error")
      taskNameError.innerHTML = ""
      const startDate = document.getElementById("start").value;
      const startDateError = document.getElementById("taskstart-error")
      startDateError.innerHTML = ""
      const endDate = document.getElementById("end").value;
      const endDateError = document.getElementById("taskend-error")
      endDateError.innerHTML = ""
      const day = document.getElementById("day").value;
      const dayError = document.getElementById("taskdate-error")
      dayError.innerHTML = ""
      const tags = document.getElementById("tag").value;
      const tagsArray =[...new Set(tags.split(","))];
      switch (true) {
        case !taskName:
          taskNameError.innerHTML = REQUIRED_FIELD
          return;
        case !day:
            dayError.innerHTML = REQUIRED_FIELD
            return;
        case !startDate:
          startDateError.innerHTML = REQUIRED_FIELD
          return;
        case !endDate:
            endDateError.innerHTML = REQUIRED_FIELD
          return
       
      }
      if(addingNewTask) {
        const user = document.getElementById("select-user").value;
        saveTask(taskName, startDate, endDate, day, tagsArray, user)
        let text = TASK_SAVED_SUCCESSULLY;
        mainElement.insertAdjacentHTML("beforeend", confirmSuccess(text));
      }else{
        editedTaskId = parseInt(editedTaskId)
        updateTask(editedTaskId, taskName, startDate, endDate, day, tagsArray)
        let text = TASK_UPDATED_SUCCESSULLY;
        mainElement.insertAdjacentHTML("beforeend", confirmSuccess(text));
      }
      submitTaskButton.disabled = true;
      setTimeout(() => {
        makeHomePageContent(mainElement, selectUserEl);
      }, 800);
    }); 

};

function prefillTaskForm(taskId) {
    const taskDescription = document.getElementById("task-description");
    const day = document.getElementById("day");
    const start = document.getElementById("start");
    const end = document.getElementById("end");
    const tags = document.getElementById("tag");
    const tasks = JSON.parse(localStorage.getItem(TASKS_LOCAL_STORAGE_KEY));
    const selectedTask = tasks.find(
      (task) => String(task.id) === String(taskId)
    );
    taskDescription.value = selectedTask.task;
    day.value = selectedTask.day;
    start.value = selectedTask.start;
    end.value = selectedTask.end;
    tags.value =
      selectedTask.tags.length > 0 ? selectedTask.tags.join(",") : "";
}

const deleteTask = (e,mainElement, selectUserEl) => {
    let text = DELETE_CONFIRMATION;
    mainElement.insertAdjacentHTML(
      "beforeend",
      confirmDeleteTaskComponent(text)
    );
    const taskId = e.target.getAttribute("data-id");
    const modal = document.getElementById("confirm-modal");
    const confirmDeleteButton = document.getElementById("confirm");
    const cancelDeleteButton = document.getElementById("cancel");
    modal.style.display = "block";

    confirmDeleteButton.addEventListener("click", () => {
      const tasks = JSON.parse(localStorage.getItem(TASKS_LOCAL_STORAGE_KEY)) || [];
      const tasksToKeep = tasks.filter(
        (el) => String(el.id) !== String(taskId)
      );
      localStorage.setItem(TASKS_LOCAL_STORAGE_KEY, JSON.stringify(tasksToKeep));
      modal.style.display = "none";

      makeHomePageContent(mainElement, selectUserEl);
    });

    cancelDeleteButton.addEventListener("click", () => {
      modal.style.display = "none";
    });
};

const setUpCancelTaskButton = (mainElement,selectUserEl) => {
  const cancelTaskBtn = document.getElementById("cancel-task")
  cancelTaskBtn.addEventListener("click",(e) => {
    e.preventDefault()
    makeHomePageContent(mainElement,selectUserEl)
  })
}
//functions for display content
const makeHomePageContent = (mainElement, selectUserEl) => {
   configTime();
  const today = flatpickr.formatDate(new Date(), DATE_FORMAT);

  const userName = selectUserEl.options[selectUserEl.selectedIndex].text;
  const userId = selectUserEl.value;
  mainElement.innerHTML = "";
  mainElement.insertAdjacentHTML("beforeend", userHomeComponent(userName));

  const tasksEl = document.getElementById("tasks-container");
  const selectFilterType = document.getElementById("filter-tasks");
  const noTaskText = NO_TASK;

  const tasks = JSON.parse(localStorage.getItem(TASKS_LOCAL_STORAGE_KEY)) || [];
  const usersTasks = tasks.filter((el) => String(el.uid) === String(userId));
  tasksEl.innerHTML = "";
  tasksEl.insertAdjacentHTML("beforeend", taskTable());
  const tableElement = document.querySelector("tbody");
  mainElement.insertAdjacentHTML("beforeend", noTaskComponent());
  const noTaskElement = document.getElementById("no-task");
  mainElement.insertAdjacentHTML("beforeend", canvasComponent());
  const diagramData = countDiagramData(usersTasks);
  makeDiagram(diagramData);
  usersTasks.length === 0
    ? (noTaskElement.innerHTML = noTaskText)
    : usersTasks.forEach((el) =>
        tableElement.insertAdjacentHTML("beforeend", singleTask(el))
      );
  selectFilterType.addEventListener("change", (e) => {
    e.preventDefault();
    noTaskElement.innerHTML = "";
    const pickedFilter = e.target.value;
    if (pickedFilter === "today-tasks") {
      const todaytasks = usersTasks.filter((task) => task.day === today);
      tableElement.innerHTML = "";
      todaytasks.length === 0
        ? (noTaskElement.innerHTML = noTaskText)
        : todaytasks.forEach((el) =>
            tableElement.insertAdjacentHTML("beforeend", singleTask(el))
          );
    } else if (pickedFilter === "monthly-tasks") {
      const thisMonth = today.split("-")[1];
      const monthlyTasks = usersTasks.filter(
        (task) => String(thisMonth) === String(task.day.split("-")[1])
      );
      tableElement.innerHTML = "";
      monthlyTasks.length === 0
        ? (noTaskElement.innerHTML = noTaskText)
        : monthlyTasks.forEach((task) =>
            tableElement.insertAdjacentHTML("beforeend", singleTask(task))
          );
    } else if (pickedFilter === "weekly-tasks") {
      let weekInterval = getWeekInterval();
      let startDay = weekInterval.start;
      let endDay = weekInterval.end;
      let weeklyTasks = [];
      usersTasks.forEach((task) => {
        if (task.day >= startDay && task.day <= endDay) {
          weeklyTasks.push(task);
        }
      });
      tableElement.innerHTML = "";
      weeklyTasks.length === 0
        ? (noTaskElement.innerHTML = noTaskText)
        : weeklyTasks.forEach((task) =>
            tableElement.insertAdjacentHTML("beforeend", singleTask(task))
          );
    } else {
      tableElement.innerHTML = "";
      usersTasks.length === 0
        ? (noTaskElement.innerHTML = noTaskText)
        : usersTasks.forEach((task) =>
            tableElement.insertAdjacentHTML("beforeend", singleTask(task))
          );
    }
  });
};

const makeDom = (mainElement, headerElement, selectUserEl) => {
  if (localStorage.length === 0) {
    headerElement.hidden = true;
    mainElement.insertAdjacentHTML("beforeend", welcomeScreenComponent());
    addUser(mainElement);
  } else {
    refreshUsers();
    makeHomePageContent(mainElement, selectUserEl);
  }
};

function init() {
  const rootElement = document.getElementById("root");
  rootElement.insertAdjacentHTML("beforeend", skeleton());
  const headerElement = document.getElementById("nav-bar");
  const selectUserEl = document.getElementById("select-user");
  const mainElement = document.querySelector(".main");
  makeDom(mainElement, headerElement, selectUserEl);

  headerElement.addEventListener("click", (e) => {
    e.preventDefault();
    switch(e.target.id) {
      case "newTask": openNewTask(mainElement, selectUserEl)
        break;
      case "newUser": openNewUserForm(mainElement)
        break;
      case "home": makeHomePageContent(mainElement, selectUserEl)
        break;
    }
  });
  headerElement.addEventListener("change", (e) => {
    changeUser(e, selectUserEl, mainElement);
  });
  mainElement.addEventListener("click", (e) => {
    e.preventDefault();
    if(e.target.classList.contains("delete-task")) {
      deleteTask(e,mainElement, selectUserEl); 
    } else if (e.target.classList.contains("edit-task")) {
      showEditTaskPage(mainElement, selectUserEl, e.target.getAttribute("data-id"));
    }else if(e.target.id === "changeDiagram") {
      changeDiagramDisplay(e, mainElement, selectUserEl);
    }
   
  });
}
init();

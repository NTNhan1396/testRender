const btn_login = document.querySelector("#login_btn");
const listTask = document.querySelector("#task_list");
const createTask = document.querySelector(".create-task");
const fetchTask = async (token) => {
  const res = await fetch(
    "https://task-manager-api-v2-6i9o.onrender.com/tasks",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.json();
};

const renderTask = function (tasks) {
  listTask.innerHTML = "";

  tasks.forEach((task) => {
    listTask.innerHTML += `
    <li class="task">
    <div class="task-title-item">${task.title}</div>
    <div class="task-desc-item">${task.description}</div>
    </li>
    `;
  });
};

//
btn_login.addEventListener("click", async () => {
  const name = document.querySelector("#name").value;
  const password = document.querySelector("#password").value;

  const response = await fetch(
    "https://task-manager-api-v2-6i9o.onrender.com/tasks/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name,
        password,
      }),
    },
  );

  const data = await response.json();

  localStorage.setItem("token", data.token);

  const token = localStorage.getItem("token");

  const tasks = await fetchTask(token);
  renderTask(tasks);
  listTask.classList.add("show");
  createTask.classList.add("show");
});

//create task
const btn_createTask = document.querySelector("#add_task_btn");

btn_createTask.addEventListener("click", async () => {
  const task_title = document.querySelector("#task_title").value;
  const task_description = document.getElementById("task_description").value;
  const token = localStorage.getItem("token");

  const newTask = {
    title: task_title,
    status: "todo",
    priority: "medium",
    description: task_description,
  };

  const res = await fetch(
    "https://task-manager-api-v2-6i9o.onrender.com/tasks",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    },
  );

  console.log(await res.json());

  const tasks = await fetchTask(token);
  renderTask(tasks);
});

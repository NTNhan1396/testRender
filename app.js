const listTask = document.querySelector("#task_list");

const fetchTasks = async (token) => {
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
    <div class="task-content">
      <div class="task-title-item">${task.title}</div>
      <div class="task-desc-item">${task.description}</div>
    </div>
    <button class="btn_delete" data-id="${task._id}">X</button>
  </li>
`;

    console.log(task._id);
  });

  bindDeleteEvents();
};

//create task
const btn_createTask = document.querySelector("#add_task_btn");

btn_createTask.addEventListener("click", async (e) => {
  e.preventDefault();
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

  const tasks = await fetchTasks(token);
  renderTask(tasks);
});

//delete
const bindDeleteEvents = function () {
  const btn_delete = document.querySelectorAll(".btn_delete");

  btn_delete.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.preventDefault();

      const taskId = e.currentTarget.dataset.id;
      if (!taskId) {
        console.error("Không tìm thấy taskId!");
        return;
      }
      const token = localStorage.getItem("token");
      const res = await fetch(
        `https://task-manager-api-v2-6i9o.onrender.com/tasks/${taskId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(await res.json());

      const tasks = await fetchTasks(token);
      renderTask(tasks);
    });
  });
};

const autoLoad = async () => {
  const token = localStorage.getItem("token");
  const tasks = await fetchTasks(token);
  renderTask(tasks);
};

autoLoad();

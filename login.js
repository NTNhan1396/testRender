const btn_login = document.querySelector("#login_btn");

//
btn_login.addEventListener("click", async (e) => {
  e.preventDefault();
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

  console.log("Login success full");

  window.location.href = "./task.html";
});

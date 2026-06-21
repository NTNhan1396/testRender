const btn_sign_up = document.getElementById("register_btn");

btn_sign_up.addEventListener("click", async (e) => {
  e.preventDefault();
  const name = document.getElementById("reg_name").value;
  const password = document.getElementById("reg_password").value;
  const password_confirm = document.getElementById(
    "reg_confirm_password",
  ).value;

  if (name === "" || name.trim() === "") return alert("Name is undefined");
  if (password !== password_confirm) return alert("Password is different");

  if (password.length < 6 || password_confirm.length < 6)
    return alert("Password must be 6 characters");
  const res = await fetch(
    "https://task-manager-api-v2-6i9o.onrender.com/tasks/register",
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

  const data = await res.json();
  console.log(data);

  if (data.success === true) {
    alert("Register successful");
    window.location = "index.html";
  } else {
    alert(data.message);
  }
});

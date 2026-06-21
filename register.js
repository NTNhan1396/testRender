const btn_sign_up = document.getElementById("register_btn");

btn_sign_up.addEventListener("click", async (e) => {
  e.preventDefault();

  const name = document.getElementById("reg_name").value;
  const password = document.getElementById("reg_password").value;
  const password_confirm = document.getElementById(
    "reg_confirm_password",
  ).value;

  if (!name || name.trim() === "") {
    alert("Please enter your name");
    return;
  }

  if (password !== password_confirm) {
    alert("Passwords do not match");
    return;
  }

  if (password.length <= 6) {
    alert("Password must be at least 6 characters long");
    return;
  }

  try {
    const res = await fetch(
      "https://task-manager-api-v2-6i9o.onrender.com/tasks/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          password: password,
        }),
      },
    );

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return alert(
        errorData.message || "Something went wrong with the server.",
      );
    }

    const data = await res.json();
    console.log(data);

    if (data.success === true) {
      alert("Register successful! 🎉");

      window.location.href = "./login.html";
    } else {
      alert(data.message || "Registration failed");
    }
  } catch (error) {
    console.error("Fetch error:", error);
    alert("Cannot connect to server. Please try again later! 🌐");
  }
});

const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", async () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!username || !password) {
    document.getElementById("message").textContent = "Please enter all fields.";
    return;
  }

  try {
    const response = await fetch("http://localhost:6060/login", {
      // Correct backend URL
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uname: username, pword: password }),
    });

    const data = await response.json();

    if (response.ok) {
      document.getElementById(
        "message"
      ).textContent = `Login successful! PersonID: ${data.personID}`;
    } else {
      document.getElementById("message").textContent = data.message;
    }
  } catch (error) {
    document.getElementById("message").textContent =
      "Error connecting to server.";
    console.error("Error:", error);
  }
});

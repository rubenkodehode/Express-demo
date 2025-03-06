document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault(); // Prevent page reload

      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;

      if (!email || !password) {
        document.getElementById("message").textContent =
          "Please enter all fields.";
        return;
      }

      try {
        const response = await fetch("http://localhost:6060/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem("token", data.token);
          document.getElementById("message").textContent = "Login successful!";
          setTimeout(() => {
            window.location.href = "index.html";
          }, 1000);
        } else {
          document.getElementById("message").textContent = data.message;
        }
      } catch (error) {
        document.getElementById("message").textContent =
          "Error connecting to server.";
        console.error("Error:", error);
      }
    });
  }

  const token = localStorage.getItem("token");
  if (token) {
    document.getElementById("registerLink")?.classList.add("hidden");
    document.getElementById("loginLink")?.classList.add("hidden");
    document.getElementById("createFactLink")?.classList.remove("hidden");
  }
});

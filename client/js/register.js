async function handleRegister() {
  try {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await axios.post(
      "http://localhost:5000/api/auth/register",
      {
        username: username,
        email: email,
        password: password,
      }
    );
    if (response.status == 200) {
      window.location.href = "./login.html";
    }
  } catch (error) {
    console.log("register-error", error);
  }
}

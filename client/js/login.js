async function handleLogin() {
  try {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await axios.post("http://localhost:5000/api/auth/login", {
      email: email,
      password: password,
    });

    // console.log('response', response);
    if (response.status == 200) {
      const accessToken = response.data.accessToken;
      // decode lay ra trong payload
      const payloadDecoded = jwt_decode(accessToken);

      if(payloadDecoded.role === 'regular') {
         window.location.href = '/client/home_page.html';
      } else {
         window.location.href = '/client/admin_page.html';
      }

      // save accessetoken to client
      localStorage.setItem('access_token', accessToken);
    }
  } catch (error) {
    console.log("login-error", error);
  }
}

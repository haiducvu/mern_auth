async function getListUser() {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/auth/admin/user"
    );
    showListUser(response);
    const accessToken = localStorage.getItem("access_token");
    const payloadDecoded = jwt_decode(accessToken);
    document.querySelector(".username").innerHTML = payloadDecoded.username;
  } catch (error) {
    // error
    // call refresh token
    // token expired -> redirect to admin
    // solution 1
    if (error.response.status === 401) {
      window.location.href = "/client/login.html";
    }
  }
}

function showListUser(data) {
  console.log("data", data);
  let htmlUser = `<table class="table table-hover text-nowrap">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>User</th>
                        <th>Role</th>
                        <th>Email</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>`;
  data.data.forEach((user, index) => {
    htmlUser += `  <tr>
                    <td>${index + 1}</td>
                    <td>${user.username}</td>
                    <td>${user.role}</td>
                    <td>${user.email}</td>
                    <td>
                    <button id='${
                      user._id
                    }' type="button" class="btn btn-danger" onclick="handleDeleteUser(this.id)">Delete</button>
                    </td>
                  </tr>`;
  });
  htmlUser += `<tbody>
              </table`;

  document.querySelector(".list_user").innerHTML = htmlUser;
}

async function handleDeleteUser(userId) {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/auth/admin/user/delete/${userId}`
    );
    if (response.status === 200) {
      window.location.reload();
    }
  } catch (error) {
    console.log(error);
  }
}

function addUser() {
  window.location.href = "./create_user.html";
}

function handleLogoutUser() {
  console.log("ccc");
  localStorage.removeItem("access_token");
  window.location.href = "./login.html";
}

getListUser();

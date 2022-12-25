import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import AdminLayout from "../layouts/admin.layout";

function AdminPage() {
  const dispatch = useDispatch();
  const users = useSelector((state) => {
    return state.user;
  });

  useEffect(() => {
    async function getListUser() {
      const response = await axios.get("/api/auth/admin/user");
      dispatch({
        type: "GET_USER_LIST",
        payload: response.data,
      });
    }

    getListUser();
  }, []);

  const handleDelete = async (userId) => {
    const response = await axios.delete(
      `/api/auth/admin/user/delete/${userId}`
    );
    if (response.status === 200) {
      window.location.reload();
    }
  };

  return (
    <AdminLayout>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">List User</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a className="btn btn-primary" href="/admin/user/create">
                      Create
                    </a>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body table-responsive p-0">
                    <table className="table table-hover text-nowrap">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>UserName</th>
                          <th>Role</th>
                          <th>Email</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => {
                          return (
                            <tr key={user._id}>
                              <td>{user.username}</td>
                              <td>{user.role}</td>
                              <td>{user.email}</td>
                              <td>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => {
                                    handleDelete(user._id);
                                  }}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminPage;

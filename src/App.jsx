import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [dataUsers, setDataUsers] = useState([]); // data of all users
  const [valueUser, setValueUser] = useState([]); // data of each user
  const [addUser, setAddUser] = useState([]); // add new data of new user
  const [reload, setReload] = useState(false); // reload

  useEffect(() => {
    listUsers();
  }, [reload]);

  const URI = "https://ttsoftware-server.onrender.com/api/";

  const listUsers = async () => {
    await axios
      .get(URI + "/ttsoftware/")
      .then((res) => {
        setDataUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showDataUser = (data) => {
    setValueUser(data);
  };

  const addNew = async (addUser) =>
    await axios.post(URI + "/ttsoftware/", addUser, {
      headers: {
        "Content-Type": "application/json",
      },
    });

  const addNewUser = () => {
    console.log(addUser);
    addNew(addUser)
      .then((res) => {
        console.log(res.data);
        setReload(!reload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateUser = async () => {
    await axios
      .put(
        URI + "/ttsoftware/" + valueUser._id,
        {
          name: addUser.name,
          lastname: addUser.lastname,
          telephone: addUser.telephone,
          email: addUser.email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        setReload(!reload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setAddUser({
      ...addUser,
      [e.target.name]: e.target.value,
    });
    console.log(addUser);
  };

  const deleteUser = async () => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (shouldDelete) {
      await axios
        .delete(URI + "/ttsoftware/" + valueUser._id)
        .then((res) => {
          console.log(res);
          setReload(!reload);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <h2>Find Owner</h2>
      <table>
        <thead>
          <tr>
            <th>Operation</th>
            <th>ID Owner</th>
            <th>Name</th>
            <th>Lastname</th>
            <th>Telephone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {dataUsers.map((data) => (
            <tr key={data._id}>
              <td>
                <button onClick={() => showDataUser(data)}>Show Data</button>
              </td>
              <td>{data._id}</td>
              <td>{data.name}</td>
              <td>{data.lastname}</td>
              <td>{data.telephone}</td>
              <td>{data.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <form>
        <hr />
        <h2>Owner</h2>
        <label htmlFor="_id">
          {" "}
          ID :{" "}
          <input
            type="text"
            id="_id"
            defaultValue={valueUser ? valueUser._id : ""}
          />
        </label>
        <label htmlFor="name">
          {" "}
          Name :{" "}
          <input
            type="text"
            name="name"
            id="name"
            onChange={handleChange}
            required
            defaultValue={valueUser ? valueUser.name : ""}
          />{" "}
          *{" "}
        </label>
        <label htmlFor="lastname">
          {" "}
          Lastname :{" "}
          <input
            type="text"
            name="lastname"
            id="lastname"
            onChange={handleChange}
            required
            defaultValue={valueUser ? valueUser.lastname : ""}
          />{" "}
          *{" "}
        </label>{" "}
        <br />
        <br />
        <label htmlFor="telephone">
          {" "}
          Telephone :{" "}
          <input
            type="text"
            name="telephone"
            id="telephone"
            onChange={handleChange}
            required
            defaultValue={valueUser ? valueUser.telephone : ""}
          />{" "}
          *{" "}
        </label>
        <label htmlFor="email">
          {" "}
          Email :{" "}
          <input
            type="text"
            name="email"
            id="email"
            onChange={handleChange}
            required
            defaultValue={valueUser ? valueUser.email : ""}
          />{" "}
          *{" "}
        </label>{" "}
        <br />
        <br />
        <button onClick={() => setAddUser("")}>Clear</button>
        <button type="reset">Cancel</button>
        <button
          type="submit"
          onClick={addNewUser}
          // disabled={
          //   !valueUser.name &&
          //   !valueUser.lastname &&
          //   !valueUser.telephone &&
          //   !valueUser.email
          // }
        >
          Add User
        </button>
        <button type="submit" onClick={updateUser}>
          Update User
        </button>
        <button onClick={deleteUser}>Delete User</button>
        <hr />
      </form>
    </div>
  );
}

export default App;

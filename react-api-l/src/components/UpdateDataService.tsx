import { useEffect, useState } from "react";
import userService, { User } from "../services/userService";




const UpdateDataService = () => {
  //we need a useState to help us hold the state of our users
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  //UseState for our isLoading indicator
  const [isLoading, setIsLoading] = useState(false);

  ///Create a function to helps us fetch our data with axios
  const FetchData = () => {
    setIsLoading(true);
    const {request} = userService.getAll<User>()
    request
      .then((response) => {
        setUsers(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  //UseEffect to help us with our FetchingData

  useEffect(() => {
    FetchData();
  }, []);

  ///Lets create a helper function to help us Update our user
  const updateUser = (user:User) => {

    const originalUsers = [...users]
    const updatedUser = {...user, name: user.name + "!"}
    setUsers(users.map(u => u.id === user.id ? updatedUser : u))
    userService.update(updatedUser)
    .catch(error => {
      setError(error.message)
      setUsers(originalUsers)
    })
  }

  return (
    <>
      <h1 className="text-center">CRUD Update with apiClient</h1>
      
      <ul className="list-group">
        {users.map((user) => (
          <li
            className="list-group-item d-flex justify-content-between"
            key={user.id}
          >
            {user.name}
            <button className="btn btn-outline-secondary" onClick={() => updateUser(user)}>Update</button>{" "}
          </li>
        ))}

        {error && <p className="text-danger">{error}</p>}
        {isLoading && <div className="spinner-border"></div>}
      </ul>
    </>
  );
};

export default UpdateDataService;
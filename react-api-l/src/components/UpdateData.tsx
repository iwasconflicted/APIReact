import { useEffect, useState } from "react";
import apiClient,{CanceledError} from "../services/apiClient";

interface User {
  id: number;
  name: string;
 
}

const UpdateData = () => {
  //we need a useState to help us hold the state of our users
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  //UseState for our isLoading indicator
  const [isLoading, setIsLoading] = useState(false);

  ///Create a function to helps us fetch our data with axios
  const FetchData = () => {
    setIsLoading(true);
    apiClient
      .get("https://jsonplaceholder.typicode.com/users")
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

  ///Lets create a helper function to help us delete our users from our front end UI


const UpdateUser = (user: User) => {

  const originalUsers = [...users]
  const updatedUser = {...user, name: user.name + "!"}
  setUsers(users.map(u => u.id === user.id ? updatedUser : u))
  apiClient.put('https://jsonplaceholder.typicode.com/users/' + user.id, updatedUser)
  .catch(error => {
    setError(error.message)
    setUsers(originalUsers)
  })

}


  return (
    <>
      <h1 className="text-center">CRUD Update with Axios</h1>
      
      <ul className="list-group">
        {users.map((user) => (
          <li
            className="list-group-item d-flex justify-content-between"
            key={user.id}
          >
            {user.name}
            <button
              className="btn btn-outline-secondary" onClick={() => UpdateUser(user)}>Update</button>{" "}
          </li>
        ))}

        {error && <p className="text-danger">{error}</p>}
        {isLoading && <div className="spinner-border"></div>}
      </ul>
    </>
  );
};

export default UpdateData;

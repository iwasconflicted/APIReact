import { useEffect, useState } from "react";

import userService, { User } from "../services/userService";



const DeleteDataService = () => {
  //we need a useState to help us hold the state of our users
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');
  //UseState for our isLoading indicator
  const [isLoading, setIsLoading] = useState(false);

  ///Create a function to helps us fetch our data with axios
  const FetchData = () => {
    setIsLoading(true);
    const {request} = userService.getAll<User>()
    request
      .then((response) => {
        setUsers(response.data)
        setIsLoading(false);
      } )
      .catch(error => {
        setError(error.message)
        setIsLoading(false);
      }
      )
  };

  //UseEffect to help us with our FetchingData

  useEffect(() => {
    FetchData();
  }, []);


  ///Lets create a helper function to help us delete our users from our front end UI
  const userDelete =(user:User) => {
    const originalUsers = [...users]
    setUsers(users.filter(u => u.id != user.id))
    userService.delete(user.id)
    .catch(error => {
      setError(error.message)
      setUsers(originalUsers)
    })


  }

  return (
    <>
      <h1 className="text-center">CRUD delete with Axios</h1>
      <ul className="list-group">
        {users.map((user) => (
          <li className="list-group-item d-flex justify-content-between" key={user.id}>{user.name}<button onClick={() => userDelete(user)} className="btn btn-outline-danger">Delete</button> </li>
        ))}
     
        { error && <p className="text-danger">{error}</p>}
        { isLoading && <div className="spinner-border"></div>}
      </ul>
    </>
  );
};

export default DeleteDataService;
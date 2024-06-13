import { useEffect, useState } from "react";

import userService, { User } from "../services/userService";



const FetchingAxiosService = () => {
  //we need a useState to help us hold the state of our users
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('')

  ///Create a function to helps us fetch our data with axios
  const FetchData = () => {
    const {request} = userService.getAll<User>()
    request
      .then((response) => setUsers(response.data))
      .catch(error => setError(error.message)
      )
  };

  //UseEffect to help us with our FetchingData

  useEffect(() => {
    FetchData();
  }, []);

  return (
    <>
      <h1 className="text-center">Fetching Data with apiClient</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
        { error && <p className="text-danger">{error}</p>}
      </ul>
    </>
  );
};

export default FetchingAxiosService;
import { useEffect, useState } from "react";
import userService, { User } from "../services/userService";



const CreateDataService = () => {
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

  ///Lets create a helper function to help us Create our user
  const addUser = () => {
    //original users []
    const originalUsers = [...users]
    //wer are going to have a new object with id and name
    const newUser = {id: 0, name: 'Aaron'};
    //set our users and spread all users and add our new user
    setUsers([newUser,...users])
    //we need to send this updated data to our back-end
    userService.create(newUser)
    .then(response => setUsers([response.data,...users]))
    .catch(error => {
      setError(error.message);
      setUsers(originalUsers);

    })
    
  }
  

  return (
    <>
      <h1 className="text-center">CRUD Create with apiClient</h1>
      <button className="btn btn-outline-primary mx-3 mb-3" onClick={addUser}>Add</button>
      <ul className="list-group">
        {users.map((user) => (
          <li
            className="list-group-item d-flex justify-content-between"
            key={user.id}
          >
            {user.name}
            <button
              
              className="btn btn-outline-danger"
            >
              Delete
            </button>{" "}
          </li>
        ))}

        {error && <p className="text-danger">{error}</p>}
        {isLoading && <div className="spinner-border"></div>}
      </ul>
    </>
  );
};

export default CreateDataService;
import userService, { User } from "../services/userService";
import useUsers from "../hooks/useUsers";




const UpdateDataService = () => {
  const {users,setUsers,error,setError,isLoading,setIsLoading} = useUsers();

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
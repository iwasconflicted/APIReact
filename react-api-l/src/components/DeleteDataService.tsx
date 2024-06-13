import userService, { User } from "../services/userService";
import useUsers from "../hooks/useUsers";



const DeleteDataService = () => {
  const {users,setUsers,error,setError,isLoading,setIsLoading} = useUsers();


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
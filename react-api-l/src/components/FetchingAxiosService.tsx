import useUsers from "../hooks/useUsers";


const FetchingAxiosService = () => {
  const {users,setUsers,error,setError,isLoading,setIsLoading} = useUsers();

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
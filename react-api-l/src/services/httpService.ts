import apiClient from "./apiClient";

// Create a class and a method
interface Entity {
    id: number
}

class HttpService {
    // type string endpoint
    endpoint: string;
    // need a constructor any time you call the class, it will create and instance of that class
    constructor(endpoint: string) {
        this.endpoint = endpoint
    }

//lets create a getAllUsers method
getAll<T>() {
    const request = apiClient.get<T[]>(this.endpoint)
    return {request}
} 

// Delete User Method
delete(id: number){
    return apiClient.delete(this.endpoint + '/' + id)
}

// Add User method

create<T>(entity: T) {
    return apiClient.post('/users', entity)
}

// Update user method

update<T extends Entity>(entity: T) {
    return apiClient.put('/users' + entity.id, entity)
}

}

const create = (endpoint: string) => new HttpService(endpoint);

export default create;
# GraphQL Full Stack MERN Project

## Tech Stack

- Frontend: React, Apollo Client
- Backend: Node.js, Express, GraphQL, Mongoose
- Database: MongoDB Atlas

### Install all dependencies (server and client) from root

```
npm run install-all
```

### Start Application Frontend (client) / Backend (server)/ API

```
npm run start-app (client/server)
npm start --> http://localhost:4000 (frontend/client)
npm run dev --> http://localhost:5000 (backend/server)
GraphiQL --> http://localhost:5000/graphql (API)
```

### Start Application Frontend (client)

```
cd client
npm run start --> running http://localhost:4000 (frontend/client)
```

### Start Application Backend (server)

```
cd server
npm run start --> running http://localhost:5000 (backend/server)
npm run dev --> running http://localhost:5000 with nodemon (backend/server)
GraphiQL --> running http://localhost:5000/graphql (API)
```

### Docs

- https://graphql.org/learn/
- https://getbootstrap.com/docs/5.3/getting-started/introduction/
- https://react-icons.github.io/react-icons/

### Add .env file (for environment variables) in server folder

```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://{username}:{password}@{username}.jb7l6.mongodb.net/{database}
```

## GraphQL Queries & Mutations

### Get names of all clients

```
{
  clients {
    name
  }
}
```

### Get a single client name, email and phone

```
query {
  client(id: ObjectId) {
    name
    email
    phone
  }
}
```

### Get name and status of all projects

```
{
  projects {
    name
    status
  }
}
```

### Get a single project name, description along with the client name and email

```
{
  project(id: ObjectId) {
    name
    description,
    client {
      name
      email
    }
  }
}
```

### Create a new client and return all data

```
mutation {
  addClient(name: "Test User", email: "test@gmail.com", phone: "012-3456789") {
    id
    name
    email
    phone
  }
}
```

### Delete a client and return id

```
mutation {
  deleteClient(id: ObjectId) {
    id
  }
}
```

### Create a new project and return name and description

```
mutation {
  addProject(name: "Mobile App", description: "This is the project description", status: "new", clientId: ObjectId) {
   name
   description
  }
}
```

### Update a project status (new, progress, completed) and return name and status

```
mutation {
  updateProject(status: "completed") {
   name
   status
  }
}
```

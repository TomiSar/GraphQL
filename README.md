# GraphQL Crash Course With Full Stack MERN Project

### Install all dependencies (server and client) from root

```
npm run install-all
```

### Application Frontend (client) / Backend (server) / API

```
npm start --> localhost:4000 (frontend)
npm run dev --> http://localhost:5000 (backend)
GraphiQL --> http://localhost:5000/graphql (API)
```

### Docs

- https://graphql.org/learn/
- https://getbootstrap.com/docs/5.3/getting-started/introduction/

### Add .env file (for environment variables) in server folder

```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://{username}:{password}@{username}.jb7l6.mongodb.net/{database}
```

### init index.js file

```
npm init -y
```

### Backend install dependencies (server)

```
npm i express express-graphql graphql mongoose cors colors
npm i -D nodemon dotenv
```

### Create client react app

```
npx create-react-app client
```

### Frontend install dependencies (client)

```
npm i @apollo/client graphql react-router-dom react-icons
```

# GraphQL Queries & Mutations

## Get names of all clients

```
{
  clients {
    name
  }
}
```

## Get a single client name and email

```
query {
  client(id: "63e52e975e533c6eed28036d") {
    name
    email
    phone
  }
}
```

## Get name and status of all projects

```
{
  projects {
    name
    status
  }
}
```

## Get a single project name, description along with the client name and email

```
{
  project(id: 1) {
    name
    description,
    client {
      name
      email
    }
  }
}
```

## Create a new client and return all data

```
mutation {
  addClient(name: "Tony Stark", email: "ironman@gmail.com", phone: "955-365-3376") {
    id
    name
    email
    phone
  }
}
```

## Delete a client and return id

```
mutation {
  deleteClient(id: 1) {
    id
  }
}
```

## Create a new project and return name and description

```
mutation {
  addProject(name: "Mobile App", description: "This is the project description", status: "new", clientId: "1") {
   name
   description
  }
}
```

## Update a project status and return name and status

```
mutation {
  updateProject(status: "completed") {
   name
   status
  }
}
```

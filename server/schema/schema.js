// const { projects, clients } = require("../sampleData.js");
const Project = require('../models/Project');
const Client = require('../models/Client');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = require('graphql');

// Project type
const ProjectType = new GraphQLObjectType({
  name: 'Project',
  description: 'A project owned by a client',
  fields: () => ({
    id: { type: GraphQLID, description: 'Unique identifier for the project' },
    clientId: {
      type: GraphQLString,
      description: 'ID of the client owning the project',
    },
    name: { type: GraphQLString, description: 'Name of the project' },
    description: {
      type: GraphQLString,
      description: 'Detailed description of the project',
    },
    status: {
      type: GraphQLString,
      description:
        'Current status of the project (Not Started/In Progress/Completed)',
    },
    client: {
      type: ClientType,
      description: 'Reference to the client who owns this project',
      resolve(parent, args) {
        return Client.findById(parent.clientId);
      },
    },
  }),
});

// Client type
const ClientType = new GraphQLObjectType({
  name: 'Client',
  description: 'Client represents a customer who can have multiple projects',
  fields: () => ({
    id: { type: GraphQLID, description: 'Unique identifier for the client' },
    name: { type: GraphQLString, description: 'The full name of the client' },
    email: { type: GraphQLString, description: 'Client contact email address' },
    phone: { type: GraphQLString, description: 'Client contact phone number' },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  description: 'Root query object for GraphQL API',
  fields: {
    projects: {
      type: new GraphQLList(ProjectType),
      description: 'Get all projects in the system',
      resolve(parent, args) {
        return Project.find();
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      description: 'Get a specific project by ID',
      resolve(parent, args) {
        return Project.findById(args.id);
      },
    },
    clients: {
      type: new GraphQLList(ClientType),
      description: 'Get all clients in the system',
      resolve(parent, args) {
        return Client.find();
      },
    },
    client: {
      type: ClientType,
      description: 'Get a specific client by ID',
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Client.findById(args.id);
      },
    },
  },
});

// Mutations
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  description:
    'Mutations for adding, deleting, and updating clients and projects',
  fields: {
    // Add a client
    addClient: {
      type: ClientType,
      description: 'Add a new client to the system',
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const client = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });
        return await client.save();
      },
    },
    // Delete a client
    deleteClient: {
      type: ClientType,
      description: 'Delete a client and their associated projects',
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        try {
          await Project.deleteMany({ clientId: args.id });
          return Client.findByIdAndDelete(args.id);
        } catch (error) {
          throw new Error(`Failed to delete client: ${error.message}`);
        }
      },
    },
    // Add a project
    addProject: {
      type: ProjectType,
      description: 'Add a new project associated with a client',
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: 'ProjectStatus',
            values: {
              new: { value: 'Not Started' },
              progress: { value: 'In Progress' },
              completed: { value: 'Completed' },
            },
          }),
          defaultValue: 'Not Started',
        },
        clientId: { type: GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        const project = new Project({
          name: args.name,
          description: args.description,
          status: args.status,
          clientId: args.clientId,
        });
        return await project.save();
      },
    },
    // Delete a project
    deleteProject: {
      type: ProjectType,
      description: 'Delete a specific project',
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Project.findByIdAndDelete(args.id);
      },
    },
    // Update a project
    updateProject: {
      type: ProjectType,
      description: 'Update project details',
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: 'ProjectStatusUpdate',
            values: {
              new: { value: 'Not Started' },
              progress: { value: 'In Progress' },
              completed: { value: 'Completed' },
            },
          }),
        },
      },
      async resolve(parent, args) {
        return await Project.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              description: args.description,
              status: args.status,
            },
          },
          { new: true }
        );
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});

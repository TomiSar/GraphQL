import { useNavigate } from 'react-router-dom';
import { FaInfoCircle, FaTrash } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { DELETE_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';
import { GET_PROJECTS } from '../queries/projectQueries';

export default function ClientRow({ client }) {
  const navigate = useNavigate();
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
    // update(cache, { data: { deleteClient } }) {
    //   const { clients } = cache.readQuery({ query: GET_CLIENTS });
    //   cache.writeQuery({
    //     query: GET_CLIENTS,
    //     data: {
    //       clients: clients.filter((client) => client.id !== deleteClient.id),
    //     },
    //   });
    // },
  });

  return (
    <tr id='clientRow'>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>{client.id}</td>
      <td>
        <button
          className='btn btn-success btn-sm'
          id='infoClientBtn'
          type='button'
          onClick={() => navigate(`/client/${client.id}`)}
        >
          <FaInfoCircle />
        </button>
      </td>
      <td>
        <button
          className='btn btn-danger btn-sm'
          id='deleteClientBtn'
          type='button'
          onClick={deleteClient}
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}

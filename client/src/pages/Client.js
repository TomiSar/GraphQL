import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_CLIENT } from '../queries/clientQueries';
import ClientInfo from '../components/ClientInfo';

export default function Client() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_CLIENT, { variables: { id } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Link className='btn btn-light btn-sm w-25 d-inline ms-auto' to='/'>
        Back to Home
      </Link>
      <ClientInfo client={data?.client} />
    </>
  );
}

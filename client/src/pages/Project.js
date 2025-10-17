import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PROJECT } from '../queries/projectQueries';
import Spinner from '../components/Spinner';
import ClientInfo from '../components/ClientInfo';
import DeleteProjectButton from '../components/DeleteProjectButton';
import EditProjectForm from '../components/EditProjectForm';

export default function Project() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, { variables: { id } });

  const statusColor =
    data?.project?.status === 'Not Started'
      ? 'red'
      : data?.project?.status === 'In Progress'
      ? 'blue'
      : 'green';

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      {!loading && !error && data && (
        <div className='mx-auto w-75 card p-5'>
          <Link className='btn btn-light btn-sm w-25 d-inline ms-auto' to='/'>
            Back to Home
          </Link>

          <h1>{data.project.name}</h1>
          <p>{data.project.description}</p>

          <h5 className='mt-3'>Project Status</h5>
          <h6
            className='lead'
            style={{
              fontStyle: 'oblique',
              color: statusColor,
            }}
          >
            {data.project.status}
          </h6>

          <h6 className='mt-3'>Project Id</h6>
          <p className='lead'>{data.project.id}</p>

          <ClientInfo client={data.project.client} />
          <EditProjectForm project={data.project} />
          <DeleteProjectButton projectId={data.project.id} />
        </div>
      )}
    </>
  );
}

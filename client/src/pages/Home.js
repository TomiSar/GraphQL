import { useQuery } from '@apollo/client';
import AddClientModal from '../components/AddClientModal';
import AddProjectModal from '../components/AddProjectModal';
import Clients from '../components/Clients';
import Projects from '../components/Projects';
import { GET_CLIENTS } from '../queries/clientQueries';

export default function Home() {
  const { loading, data } = useQuery(GET_CLIENTS);
  const hasClients = !loading && data && data?.clients?.length > 0;

  return (
    <>
      <div className='d-flex gap-3 mb-4'>
        <AddClientModal />
        {hasClients && <AddProjectModal />}
      </div>
      {hasClients && <Projects />}
      <div className='border border-black' />
      <Clients />
    </>
  );
}

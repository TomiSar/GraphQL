import { useQuery } from '@apollo/client';
import { GET_PROJECTS } from '../queries/projectQueries';
import Spinner from './Spinner';
import ProjectCard from './ProjectCard';

export default function Projects() {
  const { loading, error, data } = useQuery(GET_PROJECTS);
  if (loading) return <Spinner />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      {data.projects.length > 0 && data.projects ? (
        <>
          <h5 className='mt-3'>Projects</h5>
          <div className='row mt-4'>
            {data.projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </>
      ) : (
        <h5 className='mt-3'>
          No projects (Use New Project modal to add Project for existing
          client(s))
        </h5>
      )}
    </>
  );
}

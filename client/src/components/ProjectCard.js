export default function ProjectCard({ project }) {
  const statusColor =
    project.status === 'Not Started'
      ? 'red'
      : project.status === 'In Progress'
      ? 'blue'
      : 'green';

  return (
    <div className='col-md-6'>
      <div className='card mb-3'>
        <div className='card-body'>
          <div className='d-flex justify-content-between align-items-center'>
            <h5 className='card-title'>{project.name}</h5>
            <a className='btn btn-light' href={`/project/${project.id}`}>
              View Details
            </a>
          </div>
          <p className='small' style={{ fontStyle: 'italic' }}>
            <strong>Status: </strong>
            <strong
              style={{
                color: statusColor,
              }}
            >
              {project.status}
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
}

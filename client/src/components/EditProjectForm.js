import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { GET_PROJECT } from '../queries/projectQueries';
import { UPDATE_PROJECT } from '../mutations/projectMutations';

export default function EditProjectForm({ project }) {
  const [name, setName] = useState(project.name);
  const [errors, setErrors] = useState({ name: '', description: '' });
  const [description, setDescription] = useState(project.description);
  const navigate = useNavigate();
  const [status, setStatus] = useState(() => {
    switch (project.status) {
      case 'Not Started':
        return 'new';
      case 'In Progress':
        return 'progress';
      case 'Completed':
        return 'completed';
      default:
        throw new Error(`Unknown status: ${project.status}`);
    }
  });

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { id: project.id, name, description, status },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
  });

  const validateForm = () => {
    let newErrors = { name: '', description: '' };

    if (!name || name.trim() === '') {
      newErrors.name = 'Name is required';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }

    if (!description || description.trim() === '') {
      newErrors.description = 'Description is required';
    } else if (description.trim().length < 4) {
      newErrors.description = 'Description must be at least 4 characters long';
    }

    setErrors(newErrors);
    return !newErrors.name && !newErrors.description;
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    try {
      await updateProject();
      navigate('/');
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        description: error.message || 'Updating project failed',
      }));
    }
  };

  return (
    <div className='mt-5'>
      <h3>Update Project Details</h3>
      <form onSubmit={onSubmit}>
        <div className='mb-3'>
          <label className='form-label'>Name</label>
          <input
            type='text'
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            id='name'
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
            }}
            onBlur={validateForm}
          />
          {errors.name && <div className='invalid-feedback'>{errors.name}</div>}
        </div>
        <div className='mb-3'>
          <label className='form-label'>Description</label>
          <textarea
            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
            id='description'
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
              if (errors.description)
                setErrors((prev) => ({ ...prev, description: '' }));
            }}
            onBlur={validateForm}
          />
          {errors.description && (
            <div className='invalid-feedback'>{errors.description}</div>
          )}
        </div>
        <div className='mb-3'>
          <label className='form-label'>Status</label>
          <select
            id='status'
            className='form-select'
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option value='new'>Not Started</option>
            <option value='progress'>In Progress</option>
            <option value='completed'>Completed</option>
          </select>
        </div>
        <button className='btn btn-primary' type='submit'>
          Submit
        </button>
      </form>
    </div>
  );
}

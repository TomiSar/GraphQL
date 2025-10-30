import { useEffect, useState } from 'react';
import { FaList } from 'react-icons/fa';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CLIENTS } from '../queries/clientQueries';
import { ADD_PROJECT } from '../mutations/projectMutations';
import { GET_PROJECTS } from '../queries/projectQueries';

export default function AddProjectModal() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [clientId, setClientId] = useState('');
  const [status, setStatus] = useState('new');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({ name: '', description: '' });

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, status, clientId },
    update(cache, { data: { addProject } }) {
      const existingProjects = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...(existingProjects?.projects || []), addProject] },
      });
    },
  });

  const { loading, error, data } = useQuery(GET_CLIENTS);

  // Select first client as default
  useEffect(() => {
    if (data && data.clients.length > 0) {
      setClientId(data.clients[0].id);
    }
  }, [data]);

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
    setIsSubmitting(true);

    if (!validateForm()) return;

    try {
      await addProject({ variables: { clientId, name, description, status } });

      // hide bootstrap modal programmatically after successful addition
      const modalElement = document.getElementById('addProjectModal');
      if (modalElement) {
        const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
        modalInstance.hide();
      }

      // Reset form fields
      setName('');
      setDescription('');
      setStatus('new');
      setClientId('');
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        description: error.message || 'Adding project failed',
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetFrom = () => {
    setName('');
    setDescription('');
    setStatus('');
    setClientId(data.clients[0]?.id || '');
  };

  return (
    <>
      {!loading && !error && (
        <>
          <button
            type='button'
            className='btn btn-primary'
            data-bs-toggle='modal'
            data-bs-target='#addProjectModal'
          >
            <div className='d-flex align-items-center'>
              <FaList className='icon' />
              <div>New Project</div>
            </div>
          </button>
          <div
            className='modal fade'
            id='addProjectModal'
            aria-labelledby='addProjectModalLabel'
            aria-hidden='true'
          >
            <div className='modal-dialog'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h1 className='modal-title fs-5' id='addProjectModalLabel'>
                    New Project Information
                  </h1>
                  <button
                    type='button'
                    className='btn-close'
                    data-bs-dismiss='modal'
                    aria-label='Close'
                  ></button>
                </div>
                <div className='modal-body'>
                  <form onSubmit={onSubmit}>
                    <div className='mb-3'>
                      <label className='form-label'>Name</label>
                      <input
                        className={`form-control ${
                          errors.name ? 'is-invalid' : ''
                        }`}
                        id='name'
                        type='text'
                        value={name}
                        onChange={(event) => {
                          setName(event.target.value);
                          if (errors.name)
                            setErrors((prev) => ({ ...prev, name: '' }));
                        }}
                        onBlur={validateForm}
                      />
                      {errors.name && (
                        <div className='invalid-feedback'>{errors.name}</div>
                      )}
                    </div>
                    <div className='mb-3'>
                      <label className='form-label'>Description</label>
                      <textarea
                        className={`form-control ${
                          errors.description ? 'is-invalid' : ''
                        }`}
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
                        <div className='invalid-feedback'>
                          {errors.description}
                        </div>
                      )}
                    </div>
                    <div className='mb-3'>
                      <label className='form-label'>Status</label>
                      <select
                        className='form-select'
                        id='status'
                        value={status}
                        onChange={(event) => setStatus(event.target.value)}
                      >
                        <option value='new'>Not Started</option>
                        <option value='progress'>In Progress</option>
                        <option value='completed'>Completed</option>
                      </select>
                    </div>
                    <div className='mb-3'>
                      <label className='form-label'>Client</label>
                      <select
                        id='clientId'
                        className='form-select'
                        value={clientId}
                        onChange={(event) => setClientId(event.target.value)}
                      >
                        {data.clients.map((client) => (
                          <option key={client.id} value={client.id}>
                            {client.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <>
                      <div className='d-flex align-items-center justify-content-between mt-lg-5'>
                        <button
                          className='btn btn-info btn-lg'
                          onClick={resetFrom}
                          type='reset'
                        >
                          Reset
                        </button>
                        <button
                          className='btn btn-success btn-lg'
                          // data-bs-dismiss='modal'
                          disabled={isSubmitting}
                          type='submit'
                        >
                          {isSubmitting ? 'Sumitting' : 'Submit'}
                        </button>
                      </div>
                    </>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';

export default function AddClientModal() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({ name: '', email: '', phone: '' });

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });

      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: clients.concat([addClient]) },
      });
    },
  });

  const { loading, error } = useQuery(GET_CLIENTS);
  if (loading) return null;
  if (error) return <p>Error: {error.message}</p>;

  const validateForm = () => {
    let newErrors = { name: '', email: '', phone: '' };

    if (!name || name.trim() === '') {
      newErrors.name = 'Name is required';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }

    if (!email || email.trim() === '') {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i.test(email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!phone || phone.trim() === '') {
      newErrors.phone = 'Phone is required';
    } else if (phone.trim().length < 6) {
      newErrors.phone = 'Phone must be at least 6 characters long';
    }

    setErrors(newErrors);
    return !newErrors.name && !newErrors.email && !newErrors.phone;
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    try {
      await addClient();

      // hide bootstrap modal programmatically after successful addition
      const modalElement = document.getElementById('addClientModal');
      if (modalElement) {
        const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
        modalInstance.hide();
      }

      setName('');
      setEmail('');
      setPhone('');
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        phone: error.message || 'Adding client failed',
      }));
    }
  };

  const resetFrom = () => {
    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <>
      <button
        type='button'
        className='btn btn-secondary'
        data-bs-toggle='modal'
        data-bs-target='#addClientModal'
      >
        <div className='d-flex align-items-center'>
          <FaUser className='icon' />
          <div>New Client</div>
        </div>
      </button>
      <div
        className='modal fade'
        id='addClientModal'
        aria-labelledby='addClientModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title fs-5' id='addClientModalLabel'>
                New Client Information
              </h1>
              <button
                className='btn-close'
                id='closeAddClientModal'
                type='button'
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
                  <label className='form-label'>Email</label>
                  <input
                    className={`form-control ${
                      errors.email ? 'is-invalid' : ''
                    }`}
                    id='email'
                    type='email'
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      if (errors.email)
                        setErrors((prev) => ({ ...prev, email: '' }));
                    }}
                    onBlur={validateForm}
                  />
                  {errors.email && (
                    <div className='invalid-feedback'>{errors.email}</div>
                  )}
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Phone</label>
                  <input
                    className={`form-control ${
                      errors.phone ? 'is-invalid' : ''
                    }`}
                    id='phone'
                    type='text'
                    value={phone}
                    onChange={(event) => {
                      setPhone(event.target.value);
                      if (errors.phone)
                        setErrors((prev) => ({ ...prev, phone: '' }));
                    }}
                    onBlur={validateForm}
                  />
                  {errors.phone && (
                    <div className='invalid-feedback'>{errors.phone}</div>
                  )}
                </div>
                <>
                  <div className='d-flex align-items-center justify-content-between mt-lg-5'>
                    <button
                      className='btn btn-info btn-lg'
                      type='reset'
                      onClick={resetFrom}
                    >
                      Cancel
                    </button>
                    <button className='btn btn-success btn-lg' type='submit'>
                      Submit
                    </button>
                  </div>
                </>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

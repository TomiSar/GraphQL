import { GRAPHQL_URI } from '../config/constants';

export default function Footer() {
  return (
    <footer
      style={{ padding: '1rem 0', textAlign: 'center', marginTop: '2rem' }}
    >
      <h6 style={{ display: 'inline', margin: 0 }}>Api for GraphQL:</h6>{' '}
      <a
        className='api-link'
        href={GRAPHQL_URI}
        target='_blank'
        rel='noopener noreferrer'
      >
        <strong>GraphQL Project API</strong>
      </a>
    </footer>
  );
}

import logo from "./assets/logo.png";

export default function Header() {
  return (
    <nav className='navbar bg-light mb-4 p-0'>
      <a className='navbar-brand' href='/'>
        <div className='d-flex'>
          <img className='mr-2' src={logo} alt='logo' />
          <div>Project management app</div>
        </div>
      </a>
    </nav>
  );
}

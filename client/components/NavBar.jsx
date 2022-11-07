import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";

const NavBar = () => {
  const history = useRouter();
  const [logout, setLogout] = useState(false);
  useEffect(() => {
      !window.localStorage.getItem('loggedUser') && history.push('/login');
  }, [logout]);
  return(
      <nav>
          <ul className="flex flex-row justify-between">
              <li>
              <Link href='/select-company'>
                <div>Companies</div>
              </Link>
              </li>
              <li>
              <Link href='/appointments'>
                <div>Click here to get an Appointment</div> 
              </Link>
              </li>
              <li>
              <button onClick={e => { setLogout(true); window.localStorage.removeItem('loggedUser'); Swal.fire('Desconected successfully', '', 'success' )}}>LOG OUT</button>
              </li>
          </ul>
      </nav>
  )
};
export default NavBar;
import { useRouter } from "next/router";
import { useEffect } from "react";
import NavBar from '../components/NavBar'
export default function Home() {
  const history = useRouter();
  useEffect(()=> {
    !window.localStorage['loggedUser'] && history.push('/');
  }, []);
  return (
    <>
    <NavBar/>
      INICIO
    <br/>
      THIS IS AN MULTIPLECOMPANIES TURNER
    </>
  )
}

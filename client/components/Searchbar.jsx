import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCompanie } from "../store/actions";

const Searchbar = () => {
    const history = useRouter();
    const [companie, setCompanie] = useState('');
    const [logout, setLogout] = useState(false);
    const handleChange = (e) => {
        setCompanie(e.target.value);
    };
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getCompanie(companie));
        e.target.reset();
    };
    useEffect(()=> {
        !window.localStorage['loggedUser'] && history.push('/login');
    },[logout]);
    return(
        <div>
            <form onSubmit={e => handleSubmit(e)}>
                <input placeholder="Search" value={companie} onChange={e => handleChange(e)}></input>
                <button type="submit">Search</button>
            </form>
           { !logout ? <button onClick={e => { setLogout(true); window.localStorage.removeItem('loggedUser')}}>LOG OUT</button> : <h1>YOU ARENT LOGGED.</h1>}
        </div>
    )
};

export default Searchbar;
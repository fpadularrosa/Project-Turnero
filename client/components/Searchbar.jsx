import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCompanie } from "../store/actions";

const Searchbar = () => {
    const [companie, setCompanie] = useState('');

    const handleChange = (e) => {
        setCompanie(e.target.value);
    };
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getCompanie(companie));
        e.target.reset();
    };
    
    return(
        <div>
            <form onSubmit={e => handleSubmit(e)}>
                <input placeholder="Search" value={companie} onChange={e => handleChange(e)}></input>
                <button type="submit">Search</button>
            </form>
        </div>
    )
}

export default Searchbar;
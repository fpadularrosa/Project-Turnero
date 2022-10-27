import { useState } from "react"
import { postRegisterUser } from "../store/actions";

const Register = () => {
    const [user, setUser] = useState(
    {
        name: "",
        password: "",
        email: "",
        last_name: "",
    });
    const [company, setCompany] = useState(
    {
        name: "",
        ceo: "",
        password: "",
        email: "",
        employees: 0,
    });
    const [formRegisterCompany, setFormRegisterCompany] = useState(false);
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };
    const handleChangeCompany = (e) => {
        setCompany({
            ...company,
            [e.target.name]: e.target.value
        });
    }
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        if((user.name && user.email && user.password && user.last_name) && (!company.name && !company.ceo && !company.email && !company.employees && !company.password)){
            postRegisterUser(user);
            setUser({
                name: "",
                password: "",
                email: "",
                last_name: ""
            });
        };
        if((company.name && company.ceo && company.email && company.employees && company.password) && (!user.name && !user.email && !user.password && !user.last_name)){
            postRegisterUser(company);
            setCompany({
                name: "",
                ceo: "",
                password: "",
                email: "",
                employees: 0
            });
        };
    };
    return(
        <div className="xl:flex xl:flex-col xl:items-center xl:mt-[30vh]">
            {!formRegisterCompany ? 
            <form className="xl:flex xl:flex-col xl:w-48 xl:border-black xl:border-2 xl:items-center" onSubmit={e => handleRegisterSubmit(e)}>
                <label>New User:</label>
                <input name='name' placeholder="name" value={user['name']} onChange={e => handleChange(e)}></input>
                <input name='password' type='password' placeholder="password" value={user['password']} onChange={e => handleChange(e)}></input>
                <input name='email' type='email' placeholder="email" value={user['email']} onChange={e => handleChange(e)}></input>
                <input name='last_name' placeholder="last_name" value={user['last_name']} onChange={e => handleChange(e)}></input>
                <button type="submit">Register</button>
            </form> : 
            <form className="xl:flex xl:flex-col xl:w-48 xl:border-black xl:border-2 xl:items-center" onSubmit={e => handleRegisterSubmit(e)}>
                <label>New Company:</label>
                <input name='name' placeholder="name" value={company['name']} onChange={e => handleChangeCompany(e)}></input>
                <input name='ceo' placeholder="ceo" value={company['ceo']} onChange={e => handleChangeCompany(e)}></input>
                <input name='password' placeholder="password" type='password' value={company['password']} onChange={e => handleChangeCompany(e)}></input>
                <input name='email' placeholder="email" value={company['email']} onChange={e => handleChangeCompany(e)}></input>
                <input name='employees' type='number' placeholder="employees" value={company['employees']} onChange={e => handleChangeCompany(e)}></input>
                <button type="submit">Register</button>
            </form>}
            <button onClick={e => setFormRegisterCompany(!formRegisterCompany)}>{formRegisterCompany ? 'Click here to register your user' : 'Click here to register your company'}</button>
        </div>
    );
};

export default Register;
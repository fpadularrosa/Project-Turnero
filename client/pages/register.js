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
        <div className="xl:flex xl:flex-col xl:items-center xl:mt-[10vh]">                
           <div className="border-[75px] border-teal-400 drop-shadow">
                <h1 className='text-2xl text-gray-300 font-extrabold ml-5'>Sign Up</h1>
                {!formRegisterCompany ?             
                    <form className="xl:flex xl:justify-center xl:w-2/3 xl:h-[300px]" onSubmit={e => handleRegisterSubmit(e)}>
                        <div className="xl:border-teal-800 xl:border-[2px]">
                            <div className='xl:grid'>
                                <div>
                                    <div className='xl:flex xl:flex-col xl:my-12'>
                                     <input className='xl:w-[200px] border-b-[1px] outline-0 bg-inherit placeholder-black xl:mx-2' name='name' placeholder="Name" value={user['name']} onChange={e => handleChange(e)}></input>
                                     <input className='xl:w-[200px] xl:py-2 border-b-[1px] outline-0 bg-inherit placeholder-black xl:mx-2' name='password' type='password' placeholder="Password" value={user['password']} onChange={e => handleChange(e)}></input>
                                     <input className='xl:w-[200px] xl:py-2 border-b-[1px] outline-0 bg-inherit placeholder-black xl:mx-2' name='email' type='email' placeholder="Email" value={user['email']} onChange={e => handleChange(e)}></input>
                                     <input className='xl:w-[200px] xl:py-2 border-b-[1px] outline-0 bg-inherit placeholder-black xl:mx-2' name='last_name' placeholder="Last_name" value={user['last_name']} onChange={e => handleChange(e)}></input>
                                    </div>
                                    <div className="xl:flex xl:justify-center xl:mt-5">
                                        <button className='xl:w-[120px] border border-black' type="submit">
                                            <strong>
                                                <h1 className="font-medium text-gray-400 hover:blur-lg">
                                                    Register
                                                </h1>
                                            </strong>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form> : 
                    <form className="xl:flex xl:justify-center xl:w-2/3 xl:h-[300px]" onSubmit={e => handleRegisterSubmit(e)}>
                        <div className="xl:border-teal-800 xl:border-[2px]">
                            <div>
                             <div className='xl:grid xl:flex-col xl:my-12'>
                                 <input className='xl:w-[200px] border-b-[1px] outline-0 bg-inherit placeholder-black xl:mx-2 xl:pb-2' name='name' placeholder="Name" value={company['name']} onChange={e => handleChangeCompany(e)}></input>
                                 <input className='xl:w-[200px] py-2 border-b-[1px] outline-0 bg-inherit placeholder-black xl:mx-2' name='ceo' placeholder="Ceo" value={company['ceo']} onChange={e => handleChangeCompany(e)}></input>
                                 <input className='xl:w-[200px] py-2 border-b-[1px] outline-0 bg-inherit placeholder-black xl:mx-2' name='password' placeholder="Password" type='password' value={company['password']} onChange={e => handleChangeCompany(e)}></input>
                                 <input className='xl:w-[200px] py-2 border-b-[1px] outline-0 bg-inherit placeholder-black xl:mx-2' name='email' placeholder="Email" value={company['email']} onChange={e => handleChangeCompany(e)}></input>
                                 <input className='xl:w-[200px] border-b-[1px] outline-0 bg-inherit xl:mx-2 xl:py-2' name='employees' type='number' placeholder="Employees" value={company['employees']} onChange={e => handleChangeCompany(e)}></input>
                                <div className="xl:flex xl:justify-center xl:py-3">
                                    <button className='xl:w-[120px] border border-black' type="submit">
                                        <strong>
                                            <h1 className="font-medium text-gray-400 hover:blur-lg ">
                                                Register
                                            </h1>
                                        </strong>
                                    </button>
                                </div>
                             </div>
                            </div>
                        </div>
                    </form>}
            </div>
            <button 
            onClick={e => setFormRegisterCompany(!formRegisterCompany)}>
                {formRegisterCompany ? 
                <h1 className="">
                    Click here to register your user
                </h1>
                :
                <h1 className="">
                    Click here to register your company
                </h1>}
                </button>
        </div>
    );
};

export default Register;
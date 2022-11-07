import { useDispatch } from "react-redux";
import { postLogin } from "../store/actions";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";

const Login = () => {
    const history = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    useEffect(()=> {
       window.localStorage['loggedUser'] && history.push('/');
    });

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        if(!email && !password) return;
        dispatch(postLogin({ email, password }));
        setTimeout(()=> {
            window.localStorage['loggedUser'] && history.push('/');
        }, 1500);
        setEmail('');
        setPassword('');
        e.target.reset();
    };

    return(
        <div className="h-screen">
            <div className="grid place-items-center ">
            <h1 className='xl:text-3xl xl:font-bold xl:my-20'>Sign in to your account</h1>
                <form className="w-[30%] xl:border-2 xl:shadow-sm xl:drop-shadow xl:shadow-blue-400 xl:border-slate-100" onSubmit={e => handleLoginSubmit(e)}>
                    <div className="xl:grid xl:drop-shadow-md xl:grid-flow-row xl:justify-center xl:items-center xl:place-items-center xl:px-32 xl:py-2" id='container-LoginForm'>
                        <div className="xl:py-4">
                            <div className="flex flex-col items-center">
                              <input className="xl:mb-1 xl:min-w-[370px] outline-blue-200 caret-black border border-slate-200 xl:min-h-[36px]" onChange={e => setEmail(e.target.value)} value={email}></input>
                              <label>Email address</label>
                            </div>
                            <div className="flex flex-col items-center">
                              <input className="xl:mb-1 xl:min-w-[370px] outline-blue-200 caret-black border border-slate-200 xl:relative xl:min-h-[36px]" type="password" onChange={e => setPassword(e.target.value)} value={password}></input>
                              <label>Password</label>
                            </div>
                        </div>
                        <div>
                            <button className="xl:min-h-[40px] xl:min-w-[140px] bg-blue-800 xl:my-4 text-white text-md active:border-white active:border active:bg-blue-400" type="submit">Sign in</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default Login;
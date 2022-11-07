import { companys, appointmentStateAndHandleChangeForm } from '../components/utils';
import { newAppointment } from '../store/actions';
import { useRouter } from 'next/router';
import NavBar from '../components/NavBar';
const Appointments = ({ companies }) => {
    const history = useRouter();
    const { companyDesired, setCompanyDesired, dispatch, useEffect } = companys();
    const { appointment, handleChangeFormAppointment } = appointmentStateAndHandleChangeForm();
    useEffect(() => {
        !window.localStorage.getItem('loggedUser') && history.push('/login');
    }, []);
    const submitFormAppoitment = (e) => {
        e.preventDefault();
        dispatch(newAppointment({...appointment, nameCompany: companyDesired}));
        e.target.reset();
    };
    return(
        <>
            <NavBar/>
            <h1>
            Thanks a lot for the visite, confirm your Appointment here:
            </h1>
            <label>Select your company desired</label>
            <select onChange={e => setCompanyDesired(e.target.value)} value={companyDesired} className="border border-slate-300"><option value="">Select your company</option>{companies?.map(com => <option key={com._id} value={com.name}>{com.name}</option>) }</select>
            {
                companyDesired ? <div>
                    <form onSubmit={(e) => submitFormAppoitment(e)}>
                        <label>Date</label>
                        <input value={appointment.date} name='date' onChange={(e) => handleChangeFormAppointment(e)}></input>
                        <label>Month</label>
                        <input value={appointment.month} name='month' onChange={(e) => handleChangeFormAppointment(e)}></input>
                        <label>Year</label>
                        <input value={appointment.year} name='year' onChange={(e) => handleChangeFormAppointment(e)}></input>
                        <label>Time</label>
                        <input value={appointment.time} name='time' onChange={(e) => handleChangeFormAppointment(e)}></input>
                        <button type='submit'>Create appointment</button>
                    </form>
                </div> 
                : 
                <div>No deseaste</div>
            }
        </>
    )
}

export async function getServerSideProps() {
    const res = await fetch(`http://localhost:3000/companies`)
    const companies = await res.json()
    return {
      props: { companies },
    }
  }

export default Appointments;
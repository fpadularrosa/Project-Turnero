import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getCompanie, getCompanies } from '../../store/actions';

export const appointmentStateAndHandleChangeForm = () => {
    const [appointment, setAppointment] = useState({
        date: '',
        month: '',
        year: '',
        time: ''
      });
      const handleChangeFormAppointment = (e) => {
        setAppointment({
          ...appointment,
          [e.target.name]: e.target.value
        });
      };
      return {
        appointment, setAppointment, handleChangeFormAppointment
      };
};

export const companieDetails = (nameCompany) => {
  const companie = useSelector(state => state.companies);
  const dispatch = useDispatch();
  useEffect(()=>{
      dispatch(getCompanie(nameCompany));
  }, []);
  return companie;
}

export const companys = () => {
    const [companyDesired, setCompanyDesired] = useState('');
    const companies = useSelector(state => state.companies);
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(getCompanies());
    }, []);
    return {
        companyDesired,
        setCompanyDesired,
        companies,
        dispatch,
        useEffect
    };
};
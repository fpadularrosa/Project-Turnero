import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCompanies } from "../store/actions";
const Companies = () => {
    const companys = useSelector(state => state.companies);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getCompanies());
    },[]);
    return(
        <div>
            {
                companys?.map(company => <div key={company._id}><h1>{company.name}</h1> <h2>Founded by: {company.ceo}</h2></div>)
            }
        </div>
    )
}
export default Companies;
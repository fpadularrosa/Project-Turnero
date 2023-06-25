import Companies from '../components/Companies'
import NavBar from '../components/NavBar';
import SearchCompanies from '../components/SearchCompanies'

const SelectCompany = () => {
    return(
        <>
        <NavBar/>
            <SearchCompanies/>
        <Companies/>
        </>
    )
}

export default SelectCompany;
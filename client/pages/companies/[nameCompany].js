import { useRouter } from "next/router";
import CompanieDetail from "../../components/CompanieDetail"
import NavBar from "../../components/NavBar";

const CompaniePage = () => {
    const router = useRouter();
    const {nameCompany} = router.query;
    return(
        <>
            <NavBar/>
            <CompanieDetail nameCompany={nameCompany}/>
        </>
    )
}
export default CompaniePage;
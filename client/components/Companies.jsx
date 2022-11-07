import Link from "next/link";
import Companie from '../components/Companie';
import { companys } from "./utils";
const Companies = () => {
    const { companies } = companys();
    return(
        <div>
            {
                companies?.map(company => <Link key={company._id} href={`/companies/${company.name}`}><a key={company._id} href=""><Companie name={company.name} ceo={company.ceo} id={company._id}/></a></Link>)
            }
        </div>
    )
}
export default Companies;
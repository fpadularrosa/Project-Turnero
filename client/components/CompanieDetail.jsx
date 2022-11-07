import { companieDetails } from "./utils";

const CompanieDetail = ({ nameCompany }) => {
    const { name, ceo, employees } = companieDetails(nameCompany);
    return(
        <div>
            <h1 className="text-3xl">{name}</h1>
            <h3>{ceo}</h3>
            <h3>Employees: {employees}</h3>
        </div>
    )
}
export default CompanieDetail;
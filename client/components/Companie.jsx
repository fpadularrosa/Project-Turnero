const Companie = ({ id, name, ceo }) => {

    return(
        <div key={id}>
            <h1>{name}</h1> 
            <h2>Founded by: {ceo}</h2>
        </div>
    );
}

export default Companie;
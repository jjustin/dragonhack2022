import { Link } from 'react-router-dom';


export default function AllListings() {
    return (
        <main style={{ padding: "1rem 0" }}>
            <Link to="1" >
                <h2>Listing 1</h2>
            </Link>
            <Link to="2" >
                <h2>Listing 2</h2>
            </Link>
            <Link to="3" >
                <h2>Listing 3</h2>
            </Link>
            <Link to="4" >
                <h2>Listing 4</h2>
            </Link>
        </main>
    );
}

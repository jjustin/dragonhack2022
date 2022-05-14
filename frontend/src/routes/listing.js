import { useParams } from 'react-router-dom';


export default function Listing() {
    let { id } = useParams();

    return (
        <main style={{ padding: "1rem 0" }}>
            <h2>Listing {id}</h2>
        </main>
    );
}

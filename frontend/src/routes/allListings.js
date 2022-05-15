import { Link } from 'react-router-dom';
import ListingShort from '../components/listingShort';
import { useEffect, useState } from 'react';
import { getApi } from '../utils/api'


export default function AllListings() {
    let [listings, setListings] = useState([]);
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        getApi("/listings")
            .then(res => res.json())
            .then(res => {
                console.log(res)
                setListings(res);
                setLoading(false);
            })
    }, [])

    return (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-evenly" }}>
            {
                listings.map(listing => (
                    <Link to={"/listings/" + listing.id} key={listing.id}>
                        <ListingShort
                            name={listing.imeListinga}
                            img={"http://localhost:5000/images?name=" + listing.url}
                            cost={listing.cena}
                            id={listing.id}
                            style={{ margin: "10px" }}
                        ></ListingShort>
                    </Link>
                ))
            }
        </div >
    );
};
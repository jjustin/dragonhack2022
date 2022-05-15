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
                    <Link to={"/listings/" + listing.id + "?owner=" + listing.owner} key={listing.id}>
                        <ListingShort
                            name={listing.title}
                            img={listing?.images?.length ? listing.images[0] : undefined}
                            cost={listing.price}
                            id={listing.id}
                            type={listing.type}
                            style={{ margin: "10px" }}
                        ></ListingShort>
                    </Link>
                ))
            }
        </div >
    );
};
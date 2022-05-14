import { Link } from 'react-router-dom';
import ListingShort from '../components/listingShort';


export default function AllListings() {
    let listings = [{
        name: "Pants",
        img: "https://www.lafuma.com/media/catalog/product/cache/18/image/9df78eab33525d08d6e5fb8d27136e95/l/f/lfv11318-2768-pantalon-homme-access-cargo-pants-m-beige_2.jpg",
        cost: 3,
        id: 1,
    }, {
        name: "Shoes",
        img: "https://m.media-amazon.com/images/I/51q2t2DUpaL._AC_SX425_.jpg",
        cost: 3,
        id: 2,
    },
    {
        name: "Shirt",
        img: "https://static.zajo.net/content/mediagallery/zajo_dcat/image/product/types/X/9086.png",
        cost: 5,
        id: 3,
    }, {
        name: "Shirt",
        img: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/fb473147-731b-4440-9703-f9c8e0165583/t-shirt-f7PRLl.png",
        cost: 3,
        id: 4,
    }, {
        name: "Child",
        img: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/fb473147-731b-4440-9703-f9c8e0165583/t-shirt-f7PRLl.png",
        cost: 22,
        id: 5,
    }]

    return (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-evenly" }}>
            {
                listings.map(listing => (
                    <Link to={"/listings/" + listing.id} key={listing.id}>
                        <ListingShort
                            name={listing.name}
                            img={listing.img}
                            cost={listing.cost}
                            id={listing.id}
                            style={{ margin: "10px" }}
                        ></ListingShort>
                    </Link>
                ))
            }
        </div>
    );
}

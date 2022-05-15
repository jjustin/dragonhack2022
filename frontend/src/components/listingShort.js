let types = {
    "shirt": "Shirt",
    "sweater": "Sweater",
    "cardigan": "Cardigan",
    "pants": "Pants",
    "pants": "Shoes",
    "accessory": "Accessory",
}

export default function ListingShort({ name, img, cost, id, style, type }) {
    return (
        <div className="listing-short" style={style}>
            <img
                src={img ? "http://localhost:5000/images?name=" + img : "https://via.placeholder.com/300"}
                alt={name}
                style={{ objectFit: "cover", width: "300px", height: "400px" }} />
            <h2>{name}</h2>
            <div>{types[type]}</div>
            <p>{cost} swapcoins</p>
        </div>
    )
} 
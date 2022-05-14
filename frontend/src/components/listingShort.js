export default function ListingShort({ name, img, cost, id, style }) {
    return (
        <div className="listing-short" style={style}>
            <img src={img} alt={name} style={{ objectFit: "cover", width: "300px", height: "400px" }} />
            <h2>{name}</h2>
            <p>{cost}€</p>
        </div>
    )
} 
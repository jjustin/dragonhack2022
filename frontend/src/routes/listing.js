import { useParams, Link } from 'react-router-dom';
import { Row, Col } from 'react-grid-system';
import { useEffect, useState } from 'react';
import { getApi, postApi } from '../utils/api';
import { Divider } from 'antd';

let types = {
    "shirt": "Shirt",
    "sweater": "Sweater",
    "cardigan": "Cardigan",
    "pants": "Pants",
    "pants": "Shoes",
    "accessory": "Accessory",
}

export default function Listing() {
    let { id } = useParams();

    let [user, setUser] = useState({});
    let [listing, setListing] = useState({});

    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });


    let owner = params.owner ? params.owner : localStorage.getItem("token");

    useEffect(() => {
        getApi("/user?username=" + owner)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                setUser(res);
                setListing(res.listings[id]);
            })
    }, [])

    const buy = () => {
        if (!localStorage.getItem("token")) {
            alert("You must be logged in to buy or sell")
            return
        }

        postApi("/requestBuy", { listingID: id, owner: owner }).
            then(res => res.json).then(res => {
                console.log(res)
                alert("Request sent")
            })

    }


    const sell = (buyer) => {
        if (!localStorage.getItem("token")) {
            alert("You must be logged in to buy or sell")
            return
        }

        postApi("/sell", { listingID: id, buyer: buyer }).then(res => res.json()).then(res => {
            localStorage.setItem("balance", res.balance);
            console.log(res)
            alert("Transaction successful")
            window.location.pathname = "/"
        })

    }

    if (user // 👈 null and undefined check
        && Object.keys(user).length === 0
        && Object.getPrototypeOf(user) === Object.prototype
    ) {
        return null
    }


    return (
        <main style={{ padding: "1rem 0", paddingLeft: "100px", paddingRight: "100px" }}>
            <h2 style={{ marginBottom: "30px", fontSize: "35px" }} >{listing.title}</h2>
            <div style={{ display: "flex", justifyItems: "center", flexWrap: "wrap", alignItems: "center" }}>
                {listing.images.map(img =>
                    <Row style={{ width: "360px" }} key={img}>
                        <img
                            src={"http://localhost:5000/images?name=" + img}
                            style={{ padding: "10px", display: "block", width: "auto", height: "auto", maxWidth: "340px", maxHeight: "340px" }} ></img>
                    </Row>
                )
                }
            </div>
            <Divider style={{ background: "white" }} /> 
            <div>
                <Row >
                    <Col sm={2.85} style={{
                        marginTop: "20px", fontWeight: "bold", fontSize: "25px",
                        marginLeft: "7px"
                    }} >
                        Price: {listing.price} swapcoins
                    </Col>
                    <Col sm={5} style={{ marginTop: "20px", fontSize: "20px", paddingRight: "20px" }}>
                        <div>
                            Type: {types[listing.type]}
                        </div>
                        <div>
                            Size: {listing.size}
                        </div>
                        {listing.gender ?
                            <div>
                                Gender: {listing.gender}
                            </div>
                            : null
                        }

                        <div style={{ paddingTop: "20px" }}>
                            {listing.description}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={2.5}>
                        {
                            localStorage.getItem("token") == owner || owner == null ?
                                (listing.requested ?
                                    listing.requested.map(requestingUser =>
                                        <button id='knof' className="home-button link" style={{
                                            backgroundColor: "rgb(0, 21, 41)", border: "none", fontSize: "30px",
                                            marginTop: "40px", paddingBottom: "7px", paddingTop: "7px", paddingLeft: "15px",
                                            paddingRight: "15px", borderRadius: "12px"
                                        }} onClick={() => sell(requestingUser)} key="requestingUser" > Sell to {requestingUser}
                                        </button>) : <div style={{ paddingTop: "40px", fontSize: "20px" }}>No requests to buy</div>)
                                : localStorage.getItem("balance") > listing.price && !(listing.requested && listing.requested.includes(localStorage.getItem("token"))) ?
                                    <button id='knof' className="home-button link" style={{
                                        backgroundColor: "rgb(0, 21, 41)", border: "none", fontSize: "30px",
                                        marginTop: "40px", paddingBottom: "7px", paddingTop: "7px", paddingLeft: "15px",
                                        paddingRight: "15px", borderRadius: "12px"
                                    }} onClick={buy}> Request Buy
                                    </button>
                                    : <button id='knof' className="home-button link" style={{
                                        backgroundColor: "rgb(0, 21, 41)", border: "none", fontSize: "30px",
                                        marginTop: "40px", paddingBottom: "7px", paddingTop: "7px", paddingLeft: "15px",
                                        paddingRight: "15px", borderRadius: "12px", pointerEvents: "none"
                                    }} > {listing.requested && listing.requested.includes(localStorage.getItem("token")) ? "Already requested to buy" : localStorage.getItem("token") ? "Balance to low" : "You must be logged in to buy"}
                                    </button>

                        }
                    </Col>
                    <Col sm={5} style={{ marginTop: "46px", fontSize: "25px", marginLeft: "50px" }}>
                        {localStorage.getItem("token") ?
                            <div>Contact : {listing.owner}, {"0" + user.phone_number.slice(5)}</div> :
                            <div><Link to="/login">Login</Link> to see contact</div>
                        }
                    </Col>
                </Row>
            </div>
        </main >
    );
}

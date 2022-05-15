import { getApi } from "../utils/api";
import { useEffect } from "react";
import { useState } from "react";
import { Row, Col } from 'react-grid-system';
import { Link } from 'react-router-dom';
import ListingShort from '../components/listingShort';
import { List, Avatar } from 'antd';

const data = [
    {
        title: 'First item sold',
    },
    {
        title: 'Tenth item sold',
    },
    {
        title: '100 swapcoins rotated',
    },
    {
        title: '250 swapcoins rotated',
    },
    {
        title: 'Fist item bought',
    },
    {
        title: 'Tenth item bought',
    },
    {
        title: 'Traded with 10 different users',
    }
];



export default function Account() {

    let [user, setUser] = useState([]);
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        getApi("/user?username=" + localStorage.getItem("token"))
            .then(res => res.json())
            .then(res => {
                console.log(res)
                setUser(res);
                setLoading(false);
            })
    }, [])

    let mnozina = "";
    if (user.coins_balance == 1) {
        mnozina = "Swapcoin"
    } else {
        mnozina = "Swapcoins"
    }

    if (loading) {
        return null
    }
    let listings = Object.values(user.listings ? user.listings : []);
    console.log(listings);

    return (
        <main>
            <div>
                <h2 style={{ paddingLeft: "15px", paddingTop: "40px" }}>Account info: </h2>
            </div>
            <div style={{ marginLeft: "20px" }}>
                <Row style={{
                    paddingLeft: "20px",
                    paddingRight: "20px"
                }}>
                    <Col sm={10}>
                        <div style={{ fontSize: "17px" }} >Username: <b style={{ fontSize: "21px" }}>{localStorage.getItem("token")}</b></div>
                        <div style={{ fontSize: "17px" }}>Phone Number: <b style={{ fontSize: "21px" }}>{"0" + user.phone_number.slice(5)}</b></div>
                        <div style={{ fontSize: "17px" }}>Current Balance: <b style={{ fontSize: "21px" }}>{user.coins_balance} {mnozina}</b></div>
                        <div style={{ paddingTop: "30px" }}>
                            <List
                                itemLayout="horizontal"
                                dataSource={data}
                                renderItem={item => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<Avatar src="https://www.seekpng.com/png/detail/431-4310855_achievement-icon-icon.png" />}
                                            title={<h3>{item.title}</h3>}
                                            description="<Achivement details></Achivement details>"
                                        />
                                    </List.Item>
                                )}
                            />
                        </div>
                    </Col>
                </Row >

                <h1 style={{ paddingTop: "30px" }}>Your Listings</h1>
                    <Col>
                        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-evenly" }}>
                            {
                                listings.map(listing => (
                                    <Link to={"/listings/" + listing.id} key={listing.id}>
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
                </Col>
            </div>
        </main >

    );
}




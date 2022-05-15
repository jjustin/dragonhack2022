import { getApi } from "../utils/api";
import { useEffect } from "react";
import { useState } from "react";
import { Row, Col } from 'react-grid-system';
import { Link } from 'react-router-dom';
import ListingShort from '../components/listingShort';
import { List, Avatar } from 'antd';

const podatki = [
    {
        title: 'Ant Design Title 1',
    },
    {
        title: 'Ant Design Title 2',
    },
    {
        title: 'Ant Design Title 3',
    },
    {
        title: 'Ant Design Title 4',
    },
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
    let listings = Object.values(user.listings);
    console.log(listings);

    return (
        <main>
            <div>
                <h2 style={{ padding: "15px" }}>Account info: </h2>
            </div>
            <div style={{ marginLeft: "20px" }}>
                <Row style={{
                    padding: "20px"
                }}>
                    <Col sm={2.5}>
                        <div>Username:</div>
                        <div>Phone Number:</div>
                        <div>Current Balance:</div>
                        <div>Achievements:</div>
                    </Col>
                    <Col sm={7}>
                        <div>{localStorage.getItem("token")}</div>
                        <div>{user.phone_number}</div>
                        <div>{user.coins_balance} {mnozina}</div>

                        <div>
                            <List
                                itemLayout="horizontal"
                                dataSource={podatki}
                                renderItem={item => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                            title={<a href="https://ant.design">{item.title}</a>}
                                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                        />
                                    </List.Item>
                                )}
                            />
                        </div>
                    </Col>
                </Row>
                <Row style={{ marginTop: "20px" }}>

                    <Col sm={0.5}>
                        <div>Listings:</div>
                    </Col>
                    <Col>
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
                    </Col>
                </Row>
            </div>
        </main >

    );
}




const data = [
    {
        title: 'Ant Design Title 1',
    },
    {
        title: 'Ant Design Title 2',
    },
    {
        title: 'Ant Design Title 3',
    },
    {
        title: 'Ant Design Title 4',
    },
];


<List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={item => (
        <List.Item>
            <List.Item.Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={<a href="https://ant.design">{item.title}</a>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
        </List.Item>
    )}
/>

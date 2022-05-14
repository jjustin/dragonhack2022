import { useParams } from 'react-router-dom';
import img1 from "../img/majca1.jpg";
import img2 from "../img/majca2.jpg";
import img3 from "../img/majca3.jpg";
import { Row, Col } from 'react-grid-system';

export default function Listing() {
    let { id } = useParams();

    return (
        <main style={{ padding: "1rem 0", marginLeft: "100px", }}>
            <h2 style={{ marginBottom: "30px", fontSize: "35px" }} >Listing {id}</h2>
            <Row style={{ marginLeft: "100px" }} >
                <img src={img1} alt="" style={{ padding: "30px" }} ></img>
                <img src={img2} alt="" style={{ padding: "30px" }} ></img>
                <img src={img3} alt="" style={{ padding: "30px" }} ></img>
            </Row>
            <div class="wrapper">
                {/* <div class="column" style={{ marginTop: "20px", fontWeight: "bold" }}>
                    Price: 5 thrift coins
                </div>
                <div class="column" style={{ marginTop: "20px", fontWeight: "bold" }}>
                    Price: 5 thrift coins
                </div> */}
                <Row >
                    <Col sm={2} style={{ marginTop: "20px", fontWeight: "bold" }} >
                        Price: 5 thrift coins
                    </Col>
                    <Col sm={6} style={{ marginTop: "20px" }}>
                        Toj ubistvu ful kul majca, nosena v barci tko leta letos, 2022 pa to,
                        ceprov so bli dost shit je majca se zmer kr kul pa to ane
                        Stara je dobr let, nosena skor nc, bl zbirateljsk value,
                        je pa bla ena mojih ljubsih dokler klub ni zasrov situacije in prodov messija
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <button id='knof' onclick="" style={{
                            color: "cyan", backgroundColor: "transparent", border: "", fontSize: "25px",
                            fontWeight: "bold"
                        }} >
                            I'm interested!
                        </button>
                    </Col>
                    <Col>
                        Contact: Janez Justin,
                        051 373 268
                    </Col>
                </Row>
            </div>
        </main >
    );
}

function H() {

    <Header>
        <div style={{ display: "flex" }}>
            <Link to="/" className="home-button link">
                Triftify
            </Link>
            <div style={{ flexGrow: "1" }} />

            {shouldHideLogin() ? null : <Link to="/login" className="link">Login</Link>}
        </div>
    </Header>
}

let shouldHideLogin = () => {
    return window.location.pathname == "/login" ||
        window.location.pathname == "/register" ||
        false // hasToken
}


export default withRouter(H)
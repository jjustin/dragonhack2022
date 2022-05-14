import "antd/dist/antd.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  QuestionOutlined,
  BarChartOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Login from "./views/Login";

function App() {
  const { Content, Header } = Layout;
  return (
    <Router>
      <Switch>
        <Route>
          <Layout className="site-layout">
            <Header className="header">
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={
                  ["add", "prediction", "stats"].indexOf(
                    window.location.pathname.substr(1)
                  ) +
                  1 +
                  ""
                }
              >
                <Menu.Item key="1" icon={<PlusOutlined />}>
                  <Link to="add">Contribute</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<QuestionOutlined />}>
                  <Link to="prediction">Prediction</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<BarChartOutlined />}>
                  <Link to="stats">Statistics</Link>
                </Menu.Item>
              </Menu>
            </Header>
            <Layout className="site-layout">
              <Content className="site-layout" style={{ marginTop: 0 }}>
                <div
                  className="site-layout-background"
                  style={{ textAlign: "center" }}
                >
                  <Switch>
                    <Route exact path="/login">
                      <Login />
                    </Route>
                  </Switch>
                </div>
              </Content>
            </Layout>
          </Layout>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

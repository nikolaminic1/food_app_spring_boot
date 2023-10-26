import React, { FC, ReactElement, useState, useEffect, useRef } from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import logo from "../assets/icon.svg";
import "../style/layout.scss";
import { BsCart4 } from "react-icons/bs";
import { IoMdRestaurant } from "react-icons/io";
import {
  Link,
  redirect,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Modal } from "antd";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { closeModals } from "../app/store/actions/layouyActions";
import { Button } from "antd";
import { login, register } from "../app/service/auth";
import { App } from "antd";
import { logout } from "../app/store/actions/auth";

const { Header, Content, Footer, Sider } = Layout;

interface LayoutProps {
  children: ReactElement;
}

const CLayout: FC<LayoutProps> = ({ children }): ReactElement => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [modal, contextHolder] = Modal.useModal();
  const [modalType, setModalType] = useState(1);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const run = useRef(false);
  const isAuthenticated = useAppSelector((state: RootState) => {
    return state.auth.jwt.isAuthenticated;
  });

  useEffect(() => {
    if (run.current === false) {
      // if (!localStorage.getItem("access")) {
      //   logout();
      //   if (location.pathname == "/login") {
      //     setModalType(1);
      //     console.log("login");
      //   } else if (location.pathname == "/register") {
      //     setModalType(2);
      //   } else if (location.pathname == "/account-activation") {
      //     setModalType(4);
      //   }
      //   // get_modal();
      // } else {
      //   redirect("/login");
      // }
    }

    return () => {
      // Modal.destroyAll();
      // closeModals();
      run.current = true;
    };
  }, [modalType, location.pathname]);

  // const get_modal = () => {
  //   switch (modalType) {
  //     case 1:
  //       Modal.destroyAll();
  //       loginModal();
  //       break;
  //     case 2:
  //       Modal.destroyAll();
  //       registerModal();
  //       break;
  //     case 3:
  //       Modal.destroyAll();
  //       break;
  //     case 4:
  //       Modal.destroyAll();
  //       activationModal();
  //   }
  // };

  // const activationModal = () => {
  //   modal.info({
  //     closable: true,
  //     title: null,
  //     icon: null,
  //     footer: null,
  //     content: <ActivationComponent setModal={setModalType} />,
  //     onOk() {},
  //   });
  // };

  // const loginModal = () => {
  //   modal.info({
  //     closable: true,
  //     title: null,
  //     icon: null,
  //     footer: null,
  //     content: <LoginComponent setModal={setModalType} />,
  //     onOk() {},
  //   });
  // };

  // const registerModal = () => {
  //   modal.info({
  //     closable: true,
  //     title: null,
  //     icon: null,
  //     footer: null,
  //     content: <RegisterComponent setModal={setModalType} />,
  //     onOk() {},
  //   });
  // };

  // const success = () => {
  //   modal.success({
  //     content: "some messages...some messages...",
  //   });
  // };
  const authLabel = () => {
    if (isAuthenticated) {
      return <Link to="/profile">Profile</Link>;
    } else {
      return <Link to={"/login"}>Login</Link>;
    }
  };
  return (
    <App>
      <Layout style={{ minHeight: "100vh" }} className="main-layout">
        {contextHolder}
        <Sider
          className="sider"
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken: any) => {
            // console.log(broken);
          }}
          onCollapse={(collapsed: any, type: any) => {
            console.log(collapsed, type);
          }}
        >
          <div className="sider-logo">
            <Link to={"/"}>
              <img src={logo} />
            </Link>
          </div>
          <div className="text-center avatar">Customer</div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <UserOutlined />,
                label: authLabel(),
              },
              {
                key: "2",
                icon: <IoMdRestaurant />,
                label: <Link to="/restaurants">Restaurants</Link>,
              },
              {
                key: "3",
                icon: <BsCart4 />,
                label: <Link to="/order">Order</Link>,
              },
            ]}
          >
            {/* <Menu.Item></Menu.Item> */}
          </Menu>
        </Sider>
        <Layout>
          {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
          <Content style={{ margin: "24px 16px 0" }}>
            <div
              style={{
                padding: 24,
                background: colorBgContainer,
                minHeight: "100%",
              }}
            >
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>Food App - Customer</Footer>
        </Layout>
      </Layout>
    </App>
  );
};

export default CLayout;

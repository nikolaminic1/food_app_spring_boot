import React, {
  FC,
  ReactElement,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useRef,
} from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { MainAuthDiv } from "../../style/Layout";
import { App, Button, Form } from "antd";
import { Navigate, redirect, useSearchParams } from "react-router-dom";
import { activateAccount } from "../../app/service/auth";
import { RootState } from "../../app/store";

interface AccountActivationProps {}

const AccountActivation: FC<AccountActivationProps> = ({}): ReactElement => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [params, setParams] = useSearchParams();
  const run = useRef(false);
  const { notification } = App.useApp();

  const isAuthenticated = useAppSelector((state: RootState) => {
    return state.auth.jwt.isAuthenticated;
  });

  useEffect(() => {
    if (run.current === false) {
    }
    return () => {
      run.current = true;
    };
  }, []);

  const onFinish = () => {
    const data = {
      uid: `${params.get("uid")}`,
      token: `${params.get("token")}`,
    };

    dispatch(activateAccount(data))
      .unwrap()
      .then((res) => {
        if (res.message == "OK") {
          notification.success({
            message: "Successful activation",
            description: "Successful account activation",
          });
          return redirect("/");
        }
      })
      .catch((error) => {
        console.log(error);
        notification.error({
          message: "Unsuccessful activation",
          description: `${error.message}`,
        });
      });
  };

  return (
    <>
      {isAuthenticated ? (
        <Navigate to={"/"} replace />
      ) : (
        <MainAuthDiv>
          <div className="main-wrapper">
            <div className="title">
              <h2>Activate your account</h2>
            </div>

            <div className="message">
              <h6>
                By clicking <strong> Activate</strong> button, your account will
                be activated after which you can login to your account.
              </h6>
            </div>
            <div className="form">
              <Form
                name="basic"
                layout="vertical"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
                form={form}
              >
                <Form.Item
                  wrapperCol={{ offset: 0, span: 24 }}
                  className="submit-button-item-register"
                >
                  <Button type="primary" htmlType="submit">
                    Activate
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </MainAuthDiv>
      )}
    </>
  );
};

export default AccountActivation;

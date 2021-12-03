import React, { useState } from "react";
import Helmet from "../../../components/Helmet/Helmet";
import AdminHeader from "../header/adminHeader";
import Header from "../../../containers/header/header";
import { Form, Button, Row, Col } from "react-bootstrap";

import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";
import { Link } from "react-router-dom";

export default function AddClub() {
  const [name, setName] = useState("");
  const [name_refe, setNameRefe] = useState("");
  const [name_stadium, setNameStadium] = useState("");
  const [discount, setDiscount] = useState("");
  const [image, setImage] = useState("");
  const [detail, setDetail] = useState("");
  const [product_type, setProductType] = useState("");
  const [product_status, setProductStatus] = useState("");
  const [quantity, setQuantity] = useState("");

  async function addClub() {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("name_refe", name_refe);
    formData.append("name_stadium", name_stadium);
    formData.append("discount", discount);
    formData.append("image", image);
    formData.append("detail", detail);
    formData.append("product_type", product_type);
    formData.append("product_status", product_status);
    formData.append("quantity", quantity);

    let result = await fetch("http://127.0.0.1:8000/api/clb", {
      method: "post",
      body: formData,
    });
    result = await result.json();

    console.log("Trả về addClub :", result);
    store.addNotification({
      title: "Thêm sản phẩm thành công !",
      message: "Hãy kiểm tra list sản phẩm của bạn !",
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 10000,
        onScreen: true,
      },
    });
  }

  return (
    <Helmet title="Thêm câu lạc bộ">
      <AdminHeader />
      <Header title="Thêm câu lạc bộ" />
      <ReactNotification />

      <Row style={{paddingTop:'50px', background:'#ccc'}}>
        <Col md={{ span: 4, offset: 4 }}>
          <Form className="form">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                <b>Tên câu lạc bộ</b>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên câu lạc bộ"
                onChange={(e) => setName(e.target.value)}
              />
              <Form.Text className="text-muted">
                Hãy nhập tên câu lạc bộ
              </Form.Text>
              <Form.Label className="err">--</Form.Label>
            </Form.Group>

            <Form.Group className="mb-3" controlId="form------">
              <Form.Label>
                <b>Sân vận động</b>
              </Form.Label>
              <Form.Control
                maxlength="11"
                type="text"
                placeholder="Hãy nhập sân vận động"
                onChange={(e) => setNameStadium(e.target.value)}
              />
              <Form.Text className="text-muted">------</Form.Text>
              <Form.Label className="err">----</Form.Label>
            </Form.Group>
           

            <Form.Group className="mb-3" controlId="form------">
              <Form.Label>
                <b>Huấn luyện viên trưởng</b>
              </Form.Label>
              <Form.Control
                maxlength="11"
                type="text"
                placeholder="Huấn luyện viên trưởng"
                onChange={(e) => setNameRefe(e.target.value)}
              />
              <Form.Text className="text-muted">------</Form.Text>
              <Form.Label className="err">----</Form.Label>
            </Form.Group>

            <Form.Group className="mb-3" controlId="form------">
              <Form.Label>
                <b>Chọn Logo câu lạc bộ</b>
              </Form.Label>
              <Form.Control
                type="file"
                placeholder="Chọn Logo câu lạc bộ"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <Form.Text className="text-muted">-</Form.Text>
              <Form.Label className="err">-</Form.Label>
            </Form.Group>

            <Form.Group className="mb-3" controlId="form------">
              <Form.Label>
                <b>Trụ sở</b>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Trụ sở câu lạc bộ"
                onChange={(e) => setDetail(e.target.value)}
              />
              <Form.Text className="text-muted">-</Form.Text>
              <Form.Label className="err">-</Form.Label>
            </Form.Group>

            <Link to='/admin'>
              <Button onClick={addClub} variant="outline-success">
                <b>Thêm ngay</b>
              </Button>{" "}
            </Link>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </Form>
        </Col>
      </Row>
    </Helmet>
  );
}

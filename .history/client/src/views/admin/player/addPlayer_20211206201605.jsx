import React, { useState, useEffect } from "react";
import Helmet from "../../../components/Helmet/Helmet";
import AdminHeader from "../header/adminHeader";
import Header from "../../../containers/header/header";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";
import { Link } from "react-router-dom";
import PLayer from "./player";

export default function AddPlayer() {
  const [val, setValidator] = useState([]);
  const [TenCT, setTenCT] = useState("");
  const [TenCLB, setTenCLB] = useState("");
  const [SoAo, setNumberClother] = useState("");
  const [ChieuCao, setChieuCao] = useState("");
  //   const [image, setViTri] = useState("");
  const [ViTri, setViTri] = useState("");
  //   const [ID, setPlayerType] = useState("");
  const [LoaiCauThu, setPlayerType] = useState("");
  const [date, setDate] = useState("");
  const [img, setImg] = useState("");
  const [clb, setCLB] = useState([]);
  useEffect(() => {
    getCLB();
  }, []);

  async function getCLB() {
    let result = await fetch("http://127.0.0.1:8000/api/clb");
    result = await result.json();
    setCLB(result);
  }

  async function addPlayer() {
    const formData = new FormData();
    formData.append("TenCT", TenCT);
    formData.append("TenCLB", TenCLB);
    formData.append("SoAo", SoAo);
    formData.append("ChieuCao", ChieuCao);
    formData.append("LoaiCauThu", LoaiCauThu);
    formData.append("ViTri", ViTri);
    formData.append("NgaySinh", date);
    formData.append("AnhDaiDien", img);

    console.log(TenCLB, SoAo, ChieuCao, LoaiCauThu, ViTri, TenCT,date,img);

    let taikhoan = JSON.parse(localStorage.getItem("taikhoan"));

    let result = await fetch("http://127.0.0.1:8000/api/auth/cauthu/store", {
      method: "post",
      headers: {
        Authorization: "Bearer " + taikhoan.access_token,
        "X-Requested-With": "XMLHttpRequest",
        // "Content-Type": "multipart/form-data",
        // Accept: "application/json",
        type: "formData",
      },
      body: formData,
    });

    result = await result.json();

    console.log("Trả về addPlayer>>>>>>> :", result);

    if (result.val_err) {
      //Nếu có lối thì truyền vào cho setValidator

      setValidator(result.val_err);
    } else {
      store.addNotification({
        title: "Thêm  thành công !",
        message: "Hãy kiểm tra danh sách của bạn !",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
    }
  }

  let history = useHistory();
  function backData() {
    history.push("/admin/cau-thu");
  }

  function formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
  return (
    <Helmet title="Thêm câu lạc bộ">
      <AdminHeader />
      <Header title="Thêm câu lạc bộ" />
      <ReactNotification />
      <Row style={{ paddingTop: "50px", background: "#ccc" }}>
        <div className="btn__back" style={{ transform: "translateX(100px)" }}>
          <button onClick={backData}>
            <i class="bx bx-arrow-back"></i>
            <p>Trở lại</p>
          </button>
        </div>
        <Col md={{ span: 4, offset: 4 }}>
          <Form className="form">
            <Form.Group className="mb-3">
              <Form.Label>
                <b>Tên câu cầu thủ</b>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên cầu thủ"
                onChange={(e) => setTenCT(e.target.value)}
                maxlength="30"
              />
              <Form.Text className="text-muted"></Form.Text>
              <Form.Label className="err">--</Form.Label>
              <Form.Label className="err">{val.TenCT}</Form.Label>
            </Form.Group>
            <Form.Group className="mb-3" controlId="form------">
              <Form.Label>
                <b>Ảnh đại diện</b>
              </Form.Label>
              <Form.Control
                id="imgPreview"
                type="file"
                placeholder="Chọn ảnh đại diện"
                onInput={(event) => setImg(event.target.files[0])}
              />

              <Form.Text className="text-muted">-</Form.Text>
              <Form.Label className="err">{val.Logo}</Form.Label>
            </Form.Group>

            <Form.Label>
              <b>Câu lạc bộ</b>
            </Form.Label>
            <br/><br/>
            <Form.Select
              style={{ padding: "10px 15px" }}
              aria-label="Chọn Câu lạc bộ"
            >
              <option>Hãy chọn CLB</option>
              {clb.map((item) => (
                <option
                  onClick={(e) => setTenCLB(e.target.value)}
                  value={item.idCLB}
                >
                  {item.TenCLB}
                </option>
              ))}
            </Form.Select>
            <br />
            <br />
            <br />

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                <b>Ngày sinh cầu thủ</b>
              </Form.Label>
              <Form.Control
                // value="2018-07-22"
                min="1995-01-01"
                max="2010-1-1"
                name="begin"
                
                type="date"
                maxlength="50"
                placeholder="yyyy-mm-dd"
                onChange={(e) => setDate(formatDate(e.target.value))}
              />
              <Form.Text className="text-muted"></Form.Text>
              <Form.Label className="err">--</Form.Label>
              <Form.Label className="err">{val.date}</Form.Label>
            </Form.Group>

            <Form.Group className="mb-3" controlId="form------">
              <Form.Label>
                <b>Chiều cao</b>
              </Form.Label>
              <Form.Control
                maxlength="5"
                type="number"
                placeholder="Hãy nhập chiều cao cầu thủ"
                onChange={(e) => setChieuCao(e.target.value)}
              />
              <Form.Text className="text-muted">------</Form.Text>
              <Form.Label className="err">{val.ChieuCao}</Form.Label>
            </Form.Group>

            <Form.Group className="mb-3" controlId="form------">
              <Form.Label>
                <b>Số áo</b>
              </Form.Label>
              <Form.Control
                maxlength="20"
                type="number"
                placeholder="Số áo cầu thủ"
                onChange={(e) => setNumberClother(e.target.value)}
              />
              <Form.Text className="text-muted">------</Form.Text>
              <Form.Label className="err">{val.SoAo}</Form.Label>
            </Form.Group>

            <Form.Group className="mb-3" controlId="form------">
              <Form.Label>
                <b>Vị trí</b>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Chọn vị trí"
                onChange={(e) => setViTri(e.target.value)}
              />
              <Form.Text className="text-muted">-</Form.Text>
              <Form.Label className="err">{val.ViTri}</Form.Label>
            </Form.Group>

            <Form.Label>
              <b>Loại cầu thủ</b>
            </Form.Label>
            <br />
            <Form.Select
              style={{ padding: "5px 10px" }}
              onChange={(e) => setPlayerType(e.target.value)}
              aria-label="Chọn loại cầu thủ"
            >
               <option value="trongnuoc" >
                Hãy chọn loại cầu thủ
              </option>
              <option value="trongnuoc" >
                Trong nước
              </option>
              <option value="ngoainuoc">Ngoài nước</option>
            </Form.Select>
            <br />
            <br />
            <br />
            <Link
              onClick={addPlayer}
              to={
                TenCLB && TenCT && ViTri && SoAo && ChieuCao &&date 
                  ? "/admin/cau-thu"
                  : "#"
              }
            >
              <Button variant="outline-success">
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

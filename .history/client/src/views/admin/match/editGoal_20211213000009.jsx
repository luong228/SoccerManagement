import React, { useState } from "react";
import Helmet from "../../../components/Helmet/Helmet";
import AdminHeader from "../header/adminHeader";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";

import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";
import { Link } from "react-router-dom";
import Header from "../../../containers/header/header";

export default function EditGoal() {
  const [val, setValidator] = useState([]);
  const [data, setData] = useState([]);

  let id = use;
  useEffect(() => {
    // getHlv();
    showID();
  }, []);

  async function editGoal(id) {
    const idKQ = document.getElementById("idKQ");
    const idCT = document.getElementById("idCT");
    const LoaiBT = document.getElementById("LoaiBT");
    const ThoiDiem = document.getElementById("ThoiDiem");

    const formData = new FormData();
    formData.append("idCT", idCT.value);
    formData.append("idKQ", idKQ.value);
    formData.append("ThoiDiem", ThoiDiem.value);
    formData.append("LoaiBT", LoaiBT.value);

    //lay thong tin bàn thắng
    async function showID() {
      let result = await fetch("http://localhost:8000/api/trandau/" + id);
      result = await result.json();
      setData(result);
      // console.log(">>>>>>>>>>>>>>: " + result);
    }

    let taikhoan = JSON.parse(localStorage.getItem("taikhoan"));
    let result = await fetch(
      "http://127.0.0.1:8000/api/auth/ghiban/update/" + id,
      {
        method: "post",
        headers: {
          Authorization: "Bearer " + taikhoan.access_token,
          "X-Requested-With": "XMLHttpRequest",
          // "Content-Type": "multipart/form-data",
          // Accept: "application/json",
          type: "formData",
        },
        body: formData,
      }
    );
    result = await result.json();

    console.log(
      "Trả về EditGoal>>>>>>> :" + JSON.stringify(result) + " <<<<<<<<,"
    );

    if (result.status !== 200) {
      //Nếu có lối thì truyền vào cho setValidator

      store.addNotification({
        title: "Thêm thất bại !",
        message: " Kiểm tra lại thông tin của bạn !",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 2000,
          onScreen: true,
        },
      });
      setValidator(result.message);
    } else {
      setTimeout(() => history.push("/admin/lich-dau"), 1000);

      store.addNotification({
        title: "Thêm  thành công !",
        message: "Hãy kiểm tra danh sách của bạn !",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 1000,
          onScreen: true,
        },
      });
    }
  }

  let history = useHistory();

  function backData() {
    history.push("/admin/ghi-ban");
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
            <Form.Group className="mb-3" controlId="form------">
              <Form.Label>
                <b>Id kết quả trận đấu</b>
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Nhập id kết quả trận đấu"
                onChange={(e) => setidKetQua(e.target.value)}
              />
              <Form.Text className="text-muted"></Form.Text>
              <Form.Label className="err">--</Form.Label>
              <Form.Label className="err">{val.idKetQua}</Form.Label>
            </Form.Group>
            <Form.Group className="mb-3" controlId="form------">
              <Form.Label>
                <b>ID cầu thủ</b>
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Nhập id cầu thủ"
                onChange={(e) => setIdCauThu(e.target.value)}
              />
              <Form.Text className="text-muted"></Form.Text>
              <Form.Label className="err">--</Form.Label>
              <Form.Label className="err">{val.idCauThu}</Form.Label>
            </Form.Group>
            <Form.Group className="mb-3" controlId="form------">
              <Form.Label>
                <b>Thời điểm</b>
              </Form.Label>
              <Form.Control
                min="1"
                max="100"
                type="number"
                placeholder="Nhập thời điểm"
                onChange={(e) => setThoiDiem(e.target.value)}
              />
              <Form.Text className="text-muted">------</Form.Text>
              <Form.Label className="err">{val.ThoiDiem}</Form.Label>
            </Form.Group>
            <Form.Group className="mb-3" controlId="form------">
              <Form.Label>
                <b>Loại bàn thắng</b>
              </Form.Label>
              <br />

              <Form.Select
                //   defaultValue={'A'}
                style={{ minWidth: "300px", padding: "10px 20px" }}
                maxLength="11"
                type="text"
                onChange={(e) => setLoaiBT(e.target.value)}
              >
                <option>Hãy chọn bàn thắng</option>

                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </Form.Select>
              <br />
              <br />
              <br />

              <Form.Text className="text-muted">------</Form.Text>
              <Form.Label className="err">{val.LoaiBT}</Form.Label>
            </Form.Group>
            {/* <Link
              to={
                idCauThu && idToTT && ThoiGian && ThoiDiem && LoaiBT
                  ?
                  "/admin"
                  : "#" 
              }
            > */}
            <Button onClick={() => editGoal()} variant="outline-success">
              <b>Sửa ngay</b>
            </Button>{" "}
            {/* </Link> */}
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

import Helmet from "../../../components/Helmet/Helmet";
import AdminHeader from '../header/adminHeader';
import Header from "../../../containers/header/header";
//ip data
import card_player_data from "../../../assets/fake-data/CardPlayers";
const ResultMatch = (props) => {
  return (

    <Helmet title="Quản Lý KQTD">
        <AdminHeader/>
      <Header title="Quản lý kết quả trận đấu" />
      <div className="component" >
      <div className="table">
          <div className="btn__back">
            <button onClick={backData}>
              <i class="bx bx-arrow-back"></i>
              <p>Trở lại</p>
            </button>
          </div>
          <h1 className="table__title">Kết quả trận đấu</h1>
          <table className="table__content">
            <tr>
              <th>STT</th>
              <th>Ngày thi đấu</th>
              <th>Các đội thi đấu</th>
              <th>Sân vận động</th>
              <th>Trọng tài</th>
              {/* <th>Trọng tài</th> */}
              <th>Tỉ số</th>
              <th>Chi tiết</th>
            </tr>
            {
            result.map(res =>(
              cardsSorted.slice(0, 9).map((item) =>res.idTD===item.idTD (
                <tr key={item.idKQ}>
                  <td>{n++}</td>
                  <td>{item.ThoiGian}</td>
                  <td className="team__match team__logo">
                    <div className="img_clb">
                      {card_team_data
                        .getAllCards()
                        .map(
                          (element) =>
                            element.title === item.TenDoi1 && (
                              <img
                                className="img logo"
                                src={element.img}
                                alt="not found"
                              />
                            )
                        )}
  
                      <p>{item.TenDoi1}</p>
                    </div>
                    <p class="sologan">VS</p>
                    <div className="img_clb">
                      {card_team_data
                        .getAllCards()
                        .map(
                          (element) =>
                            element.title === item.TenDoi2 && (
                              <img
                                className="img logo"
                                src={element.img}
                                alt="not found"
                              />
                            )
                        )}
                      <p>{item.TenDoi2}</p>
                    </div>
                  </td>
                  <td>{item.SanDau}</td>
                  <td>
                    {refe.map(
                      (e) =>
                        e.idToTT === item.idToTT && (
                          <p className="group__refe">
                            {e.to_trong_tai.TenTT}(
                            {e.to_trong_tai.ViTri === "Trọng Tài Chính"
                              ? "TTC"
                              : "TTB"}
                            )
                          </p>
                        )
                    )}
                  </td>
                  <td>
                    <p>{item.BTDoi1}</p>
                    <p> - </p>
                    <p>{item.BTDoi2}</p>
                  </td>
                  <td>
                    <Link to={`/giai-dau/ket-qua-tran-dau/${item.idTD}`}>
                      <i class="bx bx-right-arrow-alt bx-fade-right"></i>
                    </Link>
                  </td>
                </tr>
              ))
            ))
            
            }
          </table>
        </div>
      </div>
    </Helmet>
  );
};

export default ResultMatch;

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleUp,
  faAngleDown,
  faPenAlt,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";
import { Sort } from "./Sort";
import { Pagination } from "../../components/Pagination";
import { DatePickers } from "./DatePickers";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

export const TableClients = ({
  currentConnectors,
  setCurrentConnectors,
  searchFullname,
  searchId,
  setPageSize,
  setCurrentPage,
  countPage,
  changeStart,
  changeEnd,
  currentPage,
  commentSelect,
  sortComment,
}) => {
  return (
    <div className="table-container">
      <div className="table-container">
        <div className="table-responsive">
          <table className="table m-0" id="discount-table">
            <thead className="bg-white">
              <tr>
                <th>
                  <select
                    className="form-control form-control-sm selectpicker"
                    placeholder="Bo'limni tanlang"
                    onChange={setPageSize}
                    style={{ minWidth: "50px" }}
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                </th>
                <th>
                  <input
                    onChange={searchFullname}
                    style={{ maxWidth: "100px", minWidth: "100px" }}
                    type="search"
                    className="w-100 form-control form-control-sm selectpicker"
                    placeholder="F.I.O"
                  />
                </th>
                <th>
                  <input
                    onChange={searchId}
                    style={{ maxWidth: "60px" }}
                    type="search"
                    className="form-control form-control-sm selectpicker"
                    placeholder="ID"
                  />
                </th>
                <th className="text-center">
                  <Pagination
                    setCurrentDatas={setCurrentConnectors}
                    datas={currentConnectors}
                    setCurrentPage={setCurrentPage}
                    countPage={countPage}
                    totalDatas={currentConnectors.length}
                  />
                </th>
                <th
                  className="d-flex justify-content-between"
                  style={{ maxWidth: "200px", overflow: "hidden" }}
                >
                  <DatePickers changeDate={changeStart} />
                  <DatePickers changeDate={changeEnd} />
                </th>
                <th className="text-center">
                  <button className="btn btn-primary">
                    <ReactHTMLTableToExcel
                      table="discount-table"
                      sheet="Sheet"
                      buttonText="Export to Excel"
                      filename="Chegirma"
                    />
                  </button>
                </th>

                <th className="text-center">
                  <select
                    className="form-control form-control-sm selectpicker"
                    onChange={sortComment}
                  >
                    <option value="none">hamma</option>
                    {commentSelect.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </th>
              </tr>
            </thead>
            <thead>
              <tr>
                <th className="border py-1">№</th>
                <th className="border py-1">
                  F.I.O
                  <div className="btn-group-vertical ml-2">
                    <FontAwesomeIcon
                      onClick={() =>
                        setCurrentConnectors(
                          [...currentConnectors].sort((a, b) =>
                            a.client.fullname > b.client.fullname ? 1 : -1
                          )
                        )
                      }
                      icon={faAngleUp}
                      style={{ cursor: "pointer" }}
                    />
                    <FontAwesomeIcon
                      icon={faAngleDown}
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        setCurrentConnectors(
                          [...currentConnectors].sort((a, b) =>
                            b.client.fullname > a.client.fullname ? 1 : -1
                          )
                        )
                      }
                    />
                  </div>
                </th>
                <th className="border py-1">
                  ID
                  <div className="btn-group-vertical ml-2">
                    <FontAwesomeIcon
                      onClick={() =>
                        setCurrentConnectors(
                          [...currentConnectors].sort((a, b) =>
                            a.client.id > b.client.id ? 1 : -1
                          )
                        )
                      }
                      icon={faAngleUp}
                      style={{ cursor: "pointer" }}
                    />
                    <FontAwesomeIcon
                      icon={faAngleDown}
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        setCurrentConnectors(
                          [...currentConnectors].sort((a, b) =>
                            b.client.id > a.client.id ? 1 : -1
                          )
                        )
                      }
                    />
                  </div>
                </th>
                <th className="border py-1">
                  Jami to'lov
                  <Sort
                    data={currentConnectors}
                    setData={setCurrentConnectors}
                    property={"totalprice"}
                  />
                </th>
                <th className="border py-1">
                  Procient
                  <div className="btn-group-vertical ml-2">
                    <FontAwesomeIcon
                      onClick={() =>
                        setCurrentConnectors(
                          [...currentConnectors].sort((a, b) =>
                            a.procient > b.procient ? 1 : -1
                          )
                        )
                      }
                      icon={faAngleUp}
                      style={{ cursor: "pointer" }}
                    />
                    <FontAwesomeIcon
                      icon={faAngleDown}
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        setCurrentConnectors(
                          [...currentConnectors].sort((a, b) =>
                            b.procient > a.procient ? 1 : -1
                          )
                        )
                      }
                    />
                  </div>
                </th>
                <th className="border py-1">
                  Chegirma summasi
                  <Sort
                    data={currentConnectors}
                    setData={setCurrentConnectors}
                    property={"createdAt"}
                  />
                </th>
                <th className="border py-1">Izoh</th>
              </tr>
            </thead>
            <tbody>
              {currentConnectors.map((connector, key) => {
                return (
                  <tr key={key}>
                    <td
                      className="border py-1 font-weight-bold text-right"
                      style={{ maxWidth: "30px !important" }}
                    >
                      {currentPage * countPage + key + 1}
                    </td>
                    <td className="border py-1 font-weight-bold">
                      {connector.client.fullname}
                    </td>
                    <td className="border py-1 text-right">
                      {connector.client.id}
                    </td>
                    <td className="border py-1 text-right">
                      {
                        connector.discounts[connector.discounts.length - 1]
                          .total
                      }
                    </td>
                    <td className="border py-1 text-right">
                      {
                        connector.discounts[connector.discounts.length - 1]
                          .procient
                      }
                    </td>
                    <td className="border py-1 text-right">
                      {
                        connector.discounts[connector.discounts.length - 1]
                          .discount
                      }
                    </td>
                    <td className="border py-1 text-right">
                      {
                        connector.discounts[connector.discounts.length - 1]
                          .comment
                      }
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <table
            className="table"
            style={{ marginLeft: "auto", maxWidth: "300px" }}
          >
            <tbody>
              <tr>
                <td className="py-1 text-right font-weight-bold" colSpan={2}>
                  Jami:
                </td>
                <td className="py-1 font-weight-bold" colSpan={4}>
                  {currentConnectors &&
                    currentConnectors.reduce((total, el) => {
                      return (
                        total + el.discounts[el.discounts.length - 1].discount
                      );
                    }, 0)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

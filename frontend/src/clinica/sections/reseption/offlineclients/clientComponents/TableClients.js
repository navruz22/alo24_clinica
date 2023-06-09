import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleUp,
  faAngleDown,
  faPenAlt,
  faPrint,
  faPlus,
} from '@fortawesome/free-solid-svg-icons'
import { Sort } from './Sort'
import { Pagination } from '../../components/Pagination'
import { DatePickers } from './DatePickers'

export const TableClients = ({
  baseUrl,
  setVisible,
  setCheck,
  setModal1,
  modal,
  changeStart,
  changeEnd,
  searchPhone,
  setClient,
  searchId,
  searchFullname,
  searchProbirka,
  connectors,
  setConnector,
  setCurrentPage,
  countPage,
  currentConnectors,
  setCurrentConnectors,
  currentPage,
  setPageSize,
  loading,
  getConnectorsByClientBorn,
  setClientDate,
  setIsAddConnector,
  getClientsById
}) => {
  return (
    <div className="border-0 table-container">
      <div className="border-0 table-container">
        <div className="table-responsive">
          <div className="bg-white flex gap-6 items-center py-2 px-2">
            <div>
              <select
                className="form-control form-control-sm selectpicker"
                placeholder="Bo'limni tanlang"
                onChange={setPageSize}
                style={{ minWidth: '50px' }}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
            <div>
              <input
                onChange={searchFullname}
                style={{ maxWidth: '100px', minWidth: '100px' }}
                type="search"
                className="w-100 form-control form-control-sm selectpicker"
                placeholder="F.I.O"
              />
            </div>
            <div>
              <input
                onChange={searchPhone}
                style={{ maxWidth: '100px', minWidth: '100px' }}
                type="search"
                className="w-100 form-control form-control-sm selectpicker"
                placeholder="Tel"
              />
            </div>
            <div>
              <input
                onChange={searchId}
                style={{ maxWidth: '80px' }}
                type="search"
                className="form-control form-control-sm selectpicker"
                placeholder="ID"
                onKeyDown={(e) => e.key === 'Enter' && getClientsById()}
              />
            </div>
            <div>
              <input
                onChange={searchProbirka}
                style={{ maxWidth: '70px' }}
                type="search"
                className="form-control form-control-sm selectpicker"
                placeholder="Probirka"
              />
            </div>
            <div
              className="text-center"
              style={{ maxWidth: '120px', overflow: 'hidden' }}
            >
              <input
                type="date"
                name="born"
                className="form-control inp"
                placeholder=""
                style={{ color: '#999' }}
                onKeyDown={(e) => e.key === 'Enter' && getConnectorsByClientBorn(e)}
              />
            </div>
            <div className="text-center ml-auto ">
              <Pagination
                setCurrentDatas={setCurrentConnectors}
                datas={connectors}
                setCurrentPage={setCurrentPage}
                countPage={countPage}
                totalDatas={connectors.length}
              />
            </div>
            <div
              className="text-center ml-auto flex gap-2"
              style={{ overflow: 'hidden' }}
            >
              <DatePickers changeDate={changeStart} />
              <DatePickers changeDate={changeEnd} />
            </div>
          </div>
          <table className="table m-0">
            <thead>
              <tr>
                <th className="border py-1 bg-alotrade text-[16px]">№</th>
                <th className="border py-1 bg-alotrade text-[16px]">
                  F.I.O
                  <div className="btn-group-vertical ml-2">
                    <FontAwesomeIcon
                      onClick={() =>
                        setCurrentConnectors(
                          [...currentConnectors].sort((a, b) =>
                            a.client.fullname > b.client.fullname ? 1 : -1,
                          ),
                        )
                      }
                      icon={faAngleUp}
                      style={{ cursor: 'pointer' }}
                    />
                    <FontAwesomeIcon
                      icon={faAngleDown}
                      style={{ cursor: 'pointer' }}
                      onClick={() =>
                        setCurrentConnectors(
                          [...currentConnectors].sort((a, b) =>
                            b.client.fullname > a.client.fullname ? 1 : -1,
                          ),
                        )
                      }
                    />
                  </div>
                </th>
                <th className='border py-1 bg-alotrade text-[16px]'>Tel</th>
                <th className="border py-1 bg-alotrade text-[16px]">
                  ID
                  <div className="btn-group-vertical ml-2">
                    <FontAwesomeIcon
                      onClick={() =>
                        setCurrentConnectors(
                          [...currentConnectors].sort((a, b) =>
                            a.client.id > b.client.id ? 1 : -1,
                          ),
                        )
                      }
                      icon={faAngleUp}
                      style={{ cursor: 'pointer' }}
                    />
                    <FontAwesomeIcon
                      icon={faAngleDown}
                      style={{ cursor: 'pointer' }}
                      onClick={() =>
                        setCurrentConnectors(
                          [...currentConnectors].sort((a, b) =>
                            b.client.id > a.client.id ? 1 : -1,
                          ),
                        )
                      }
                    />
                  </div>
                </th>
                <th className="border py-1 bg-alotrade text-[16px]">
                  Probirka
                  <Sort
                    data={currentConnectors}
                    setData={setCurrentConnectors}
                    property={'probirka'}
                  />
                </th>
                <th className="border py-1 bg-alotrade text-[16px]">
                  Summa
                  <Sort
                    data={currentConnectors}
                    setData={setCurrentConnectors}
                    property={'totalprice'}
                  />
                </th>
                <th className="border py-1 bg-alotrade text-[16px]">
                  Xizmatlar
                  <div className="btn-group-vertical ml-2">
                    <FontAwesomeIcon
                      onClick={() =>
                        setCurrentConnectors(
                          [...currentConnectors].sort((a, b) =>
                            a.services.length > b.services.length ? 1 : -1,
                          ),
                        )
                      }
                      icon={faAngleUp}
                      style={{ cursor: 'pointer' }}
                    />
                    <FontAwesomeIcon
                      icon={faAngleDown}
                      style={{ cursor: 'pointer' }}
                      onClick={() =>
                        setCurrentConnectors(
                          [...currentConnectors].sort((a, b) =>
                            b.services.length > a.services.length ? 1 : -1,
                          ),
                        )
                      }
                    />
                  </div>
                </th>
                <th className="border py-1 bg-alotrade text-[16px]">
                  Kelgan vaqti
                  <Sort
                    data={currentConnectors}
                    setData={setCurrentConnectors}
                    property={'createdAt'}
                  />
                </th>
                <th className="border py-1 bg-alotrade text-[16px]">
                  Qo'shish
                </th>
                <th className="border py-1 bg-alotrade text-[16px]">
                  Tahrirlash
                </th>
                <th className="border py-1 bg-alotrade text-[16px]">
                  Chop etish
                </th>
              </tr>
            </thead>
            <tbody>
              {currentConnectors.map((connector, key) => {
                return (
                  <tr key={key}>
                    <td
                      className="border py-1 font-weight-bold text-right"
                      style={{ maxWidth: '30px !important' }}
                    >
                      {currentPage * countPage + key + 1}
                    </td>
                    <td className="border py-1 font-weight-bold text-[16px]">
                      {connector.client.lastname +
                        ' ' +
                        connector.client.firstname}
                    </td>
                    <td className="border py-1 text-right text-[16px]">
                      +998{connector.client.phone}
                    </td>
                    <td className="border py-1 text-right text-[16px]">
                      {connector.client.id}
                    </td>
                    <td className="border py-1 text-right text-[16px]">
                      {connector.probirka}
                    </td>
                    <td className="border py-1 text-right text-[16px]">
                      {connector.totalprice}
                    </td>
                    <td className="border py-1 text-right text-[16px]">
                      {connector.services.length}
                    </td>
                    <td className="border py-1 text-right text-[16px]">
                      {new Date(connector.createdAt).toLocaleDateString()} {' '}
                      {new Date(connector.createdAt).toLocaleTimeString()}
                    </td>
                    <td className="border py-1 text-center text-[16px]">
                      {loading ? (
                        <button className="btn btn-success" disabled>
                          <span className="spinner-border spinner-border-sm"></span>
                          Loading...
                        </button>
                      ) : (
                        <button
                          className="btn btn-success py-0"
                          onClick={() => {
                            setClient({ ...connector.client })
                            setClientDate(connector.client.born.slice(0, 10))
                            setIsAddConnector(true);
                            setVisible(true)
                          }}
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                      )}
                    </td>
                    <td className="border py-1 text-center text-[16px]">
                      {loading ? (
                        <button className="btn btn-success" disabled>
                          <span className="spinner-border spinner-border-sm"></span>
                          Loading...
                        </button>
                      ) : (
                        <button
                          className="btn btn-success py-0"
                          onClick={() => {
                            setClient({ ...connector.client })
                            setClientDate(connector.client.born.slice(0, 10))
                            setConnector({
                              ...connector,
                              _id: connector._id,
                              services: [...connector.services],
                            })
                            setIsAddConnector(false);
                            setVisible(true);
                          }}
                        >
                          <FontAwesomeIcon icon={faPenAlt} />
                        </button>
                      )}
                    </td>
                    <td className="border py-1 text-center text-[16px]">
                      {loading ? (
                        <button className="btn btn-success" disabled>
                          <span className="spinner-border spinner-border-sm"></span>
                          Loading...
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary py-0"
                          onClick={() => {
                            setCheck(connector)
                            setModal1(true)
                          }}
                        >
                          <FontAwesomeIcon icon={faPrint} />
                        </button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

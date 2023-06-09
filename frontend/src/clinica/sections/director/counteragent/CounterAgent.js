import { useToast } from '@chakra-ui/react'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext'
import { useHttp } from '../../../hooks/http.hook'
import { Pagination } from '../../reseption/components/Pagination'
import { DatePickers } from '../../reseption/offlineclients/clientComponents/DatePickers'
import { Sort } from '../../reseption/offlineclients/clientComponents/Sort'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

const animatedComponents = makeAnimated()

const CounterAgent = () => {

    const history = useHistory()

    const [beginDay, setBeginDay] = useState(
        new Date(new Date().setUTCHours(0, 0, 0, 0)),
    )
    const [endDay, setEndDay] = useState(
        new Date(new Date().setDate(new Date().getDate() + 1)),
    )
    //====================================================================
    //====================================================================

    //====================================================================
    //====================================================================
    // RegisterPage
    const [visible, setVisible] = useState(false)

    const changeVisible = () => setVisible(!visible)

    //====================================================================
    //====================================================================

    //====================================================================
    //====================================================================
    // Pagination
    const [currentPage, setCurrentPage] = useState(0)
    const [countPage, setCountPage] = useState(10)

    const indexLastConnector = (currentPage + 1) * countPage
    const indexFirstConnector = indexLastConnector - countPage
    const [currentConnectors, setCurrentConnectors] = useState([])

    //====================================================================
    //====================================================================

    //====================================================================
    //====================================================================
    const toast = useToast()

    const notify = useCallback(
        (data) => {
            toast({
                title: data.title && data.title,
                description: data.description && data.description,
                status: data.status && data.status,
                duration: 5000,
                isClosable: true,
                position: 'top-right',
            })
        },
        [toast],
    )
    //====================================================================
    //====================================================================

    //====================================================================
    //====================================================================
    const { request, loading } = useHttp()
    const auth = useContext(AuthContext)

    //====================================================================
    //====================================================================

    const [clinicaDataSelect, setClinicaDataSelect] = useState({
        value: auth?.clinica?._id,
        label: auth?.clinica?.name,
    });
    const [clinicaValue, setClinicaValue] = useState(auth?.clinica?._id)

    //====================================================================
    //====================================================================
    // getConnectors
    const [connectors, setConnectors] = useState([])
    const [searchStorage, setSearchStrorage] = useState([])

    const getConnectors = useCallback(
        async (beginDay, endDay, clinica) => {
            try {
                const data = await request(
                    `/api/counter_agent/get`,
                    'POST',
                    { clinica: clinica, beginDay, endDay },
                    {
                        Authorization: `Bearer ${auth.token}`,
                    },
                )
                setConnectors(data)
                setSearchStrorage(data)
                setCurrentConnectors(
                    data.slice(indexFirstConnector, indexLastConnector),
                )
            } catch (error) {
                notify({
                    title: error,
                    description: '',
                    status: 'error',
                })
            }
        },
        [request, auth, notify, indexFirstConnector, indexLastConnector],
    )
    //====================================================================
    //====================================================================+

    const [baseUrl, setBaseurl] = useState();

    const getBaseUrl = useCallback(async () => {
        try {
            const data = await request(`/api/baseurl`, "GET", null);
            setBaseurl(data.baseUrl);
        } catch (error) {
            notify({
                title: error,
                description: "",
                status: "error",
            });
        }
    }, [request, notify]);

    //====================================================================
    //====================================================================
    // SEARCH
    const searchFullname = useCallback(
        (e) => {
            const searching = searchStorage.filter((item) =>
                item.client.fullname
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase()),
            )
            setConnectors(searching)
            setCurrentConnectors(searching.slice(0, countPage))
        },
        [searchStorage, countPage],
    )
    //====================================================================
    //====================================================================

    const changeStart = (e) => {
        setBeginDay(new Date(new Date(e).setUTCHours(0, 0, 0, 0)));
        getConnectors(new Date(new Date(e).setUTCHours(0, 0, 0, 0)), endDay, clinicaValue);
    };

    const changeEnd = (e) => {
        const date = new Date(
            new Date(new Date().setDate(new Date(e).getDate() + 1)).setUTCHours(
                0,
                0,
                0,
                0
            )
        );

        setEndDay(date);
        getConnectors(beginDay, date, clinicaValue);
    }

    //====================================================================
    //====================================================================
    const setPageSize = useCallback(
        (e) => {
            setCurrentPage(0)
            setCountPage(e.target.value)
            setCurrentConnectors(connectors.slice(0, countPage))
        },
        [countPage, connectors],
    )
    //====================================================================
    //====================================================================

    //====================================================================
    //====================================================================
    // useEffect

    const [t, setT] = useState(0)

    useEffect(() => {
        if (!t) {
            setT(1)
            getConnectors(beginDay, endDay, clinicaValue)
            getBaseUrl()
        }
    }, [getConnectors, getBaseUrl, t, beginDay, endDay, clinicaValue])

    //====================================================================
    //====================================================================
    return (
        <div className="min-h-full">
            <div className="bg-slate-100 content-wrapper px-lg-5 px-3">
                <div className="row gutters">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        {auth?.clinica?.mainclinica && auth?.clinica?.filials.length > 0 && <div className="w-[300px] mb-2">
                            <Select
                                value={clinicaDataSelect}
                                onChange={(e) => {
                                    setClinicaDataSelect(e)
                                    setClinicaValue(e.value);
                                    getConnectors(beginDay, endDay, e.value);
                                }}
                                components={animatedComponents}
                                options={[
                                    {
                                        value: auth?.clinica?._id,
                                        label: auth?.clinica?.name,
                                    },
                                    ...[...auth?.clinica?.filials].map(el => ({
                                        value: el._id,
                                        label: el.name
                                    }))]}
                                theme={(theme) => ({
                                    ...theme,
                                    borderRadius: 0,
                                    padding: 0,
                                    height: 0,
                                })}
                            />
                        </div>}
                        <div className="border-0 table-container">
                            <div className="border-0 table-container">
                                <div className="table-responsive">
                                    <div className="bg-white flex items-center justify-between py-2 px-2">
                                        <div>
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
                                        </div>
                                        {/* <div>
                            <input
                                onChange={searchFullname}
                                style={{ maxWidth: "100px", minWidth: "100px" }}
                                type="search"
                                className="w-100 form-control form-control-sm selectpicker"
                                placeholder="F.I.O"
                            />
                        </div>
                        <div>
                            <input
                                onChange={searchPhone}
                                style={{ maxWidth: "100px", minWidth: "100px" }}
                                type="search"
                                className="w-100 form-control form-control-sm selectpicker"
                                placeholder="Tel"
                            />
                        </div>
                        <div>
                            <input
                                onChange={searchId}
                                style={{ maxWidth: "60px" }}
                                type="search"
                                className="form-control form-control-sm selectpicker"
                                placeholder="ID"
                            />
                        </div>
                        <div>
                            <input
                                onChange={searchProbirka}
                                style={{ maxWidth: "50px" }}
                                type="search"
                                className="form-control form-control-sm selectpicker"
                                placeholder="Probirka"
                            />
                        </div> */}
                                        <div className="text-center">
                                            <Pagination
                                                setCurrentDatas={setCurrentConnectors}
                                                datas={connectors}
                                                setCurrentPage={setCurrentPage}
                                                countPage={countPage}
                                                totalDatas={connectors.length}
                                            />
                                        </div>
                                        <div
                                            className="text-center flex gap-2"
                                            style={{ maxWidth: "200px", overflow: "hidden" }}
                                        >
                                            <DatePickers changeDate={changeStart} />
                                            <DatePickers changeDate={changeEnd} />
                                        </div>
                                    </div>
                                    <table className="table m-0 table-sm">
                                        <thead>
                                            <tr>
                                                <th className="border py-1 bg-alotrade text-[16px]">№</th>
                                                <th className="border py-1 bg-alotrade text-[16px]">
                                                    Kontragent
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
                                                <th className="border py-1 bg-alotrade text-[16px]">
                                                    Mijozlar
                                                </th>
                                                <th className="border py-1 bg-alotrade text-[16px]">
                                                    Shifokorlar
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
                                                <th className="border py-1 bg-alotrade text-[16px]">
                                                    Umumiy
                                                    <Sort
                                                        data={currentConnectors}
                                                        setData={setCurrentConnectors}
                                                        property={"probirka"}
                                                    />
                                                </th>
                                                <th className="border py-1 bg-alotrade text-[16px]">
                                                    Ulushi
                                                    <Sort
                                                        data={currentConnectors}
                                                        setData={setCurrentConnectors}
                                                        property={"totalprice"}
                                                    />
                                                </th>
                                                <th className="border py-1 bg-alotrade text-[16px]">
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentConnectors.map((connector, key) => {
                                                return (
                                                    <tr key={key}>
                                                        <td
                                                            className={`border py-1 font-weight-bold text-right text-[16px]`}
                                                            style={{ maxWidth: "30px !important" }}
                                                        >
                                                            {currentPage * countPage + key + 1}
                                                        </td>
                                                        <td className="border py-1 text-[16px] font-weight-bold">
                                                            {connector.lastname +
                                                                " " +
                                                                connector.firstname}
                                                        </td>
                                                        <td className="border py-1 text-[16px] text-right">
                                                            {connector.clients}
                                                        </td>
                                                        <td className="border py-1 text-[16px] text-right">
                                                            {connector.counterdoctors}
                                                        </td>
                                                        <td className="border py-1 text-[16px] text-right">
                                                            {connector.totalprice}
                                                        </td>
                                                        <td className="border py-1 text-[16px] text-right">
                                                            {connector?.counteragent_profit}
                                                        </td>
                                                        <td className="border py-1 text-[16px] text-center">
                                                            {loading ? (
                                                                <button className="btn btn-success" disabled>
                                                                    <span class="spinner-border spinner-border-sm"></span>
                                                                    Loading...
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    onClick={() => {
                                                                        history.push('/alo24/counteragent_info', {
                                                                            connector
                                                                        })
                                                                    }}
                                                                    type="button"
                                                                    className="bg-alotrade rounded text-white font-semibold py-1 px-2"
                                                                    style={{ fontSize: '75%' }}
                                                                >
                                                                    Batafsil
                                                                </button>
                                                            )}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CounterAgent
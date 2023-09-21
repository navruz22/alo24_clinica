import { useToast } from '@chakra-ui/react'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext'
import { useHttp } from '../../../hooks/http.hook'
import { DatePickers } from '../../reseption/offlineclients/clientComponents/DatePickers'
import { Sort } from '../adver/Sort'
import { Pagination } from '../components/Pagination'
import Select from "react-select"
import ReactHtmlTableToExcel from 'react-html-table-to-excel'
import { useTranslation } from 'react-i18next'

const CounterAgentInfo = () => {

    //===================================================================
    //===================================================================

    const { t } = useTranslation()

    //===================================================================
    //===================================================================

    const location = useLocation()
    //===================================================================
    //===================================================================

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

    const [type, setType] = useState('offline')

    //====================================================================
    //====================================================================
    // getConnectors
    const [connectors, setConnectors] = useState([])
    const [searchStorage, setSearchStrorage] = useState([])

    const getConnectors = useCallback(
        async (beginDay, endDay, counterdoctor) => {
            try {
                const data = await request(
                    `/api/counter_agent/doctors_services/get`,
                    "POST",
                    {
                        clinica: location?.state?.connector?.clinica,
                        counter_agent: location?.state?.connector?._id,
                        beginDay,
                        endDay,
                        counterdoctor: counterdoctor
                    },
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
                    title: t(`${error}`),
                    description: '',
                    status: 'error',
                })
            }
        },
        [request, auth, notify, indexFirstConnector, indexLastConnector],
    )
    //====================================================================
    //====================================================================

    const getCounterDoctorsService = useCallback(async (beginDay, endDay, counterdoctor) => {
        try {
            const data = await request(
                `/api/counter_agent/statsionar/get`,
                "POST",
                {
                    clinica: location?.state?.connector?.clinica,
                    counter_agent: location?.state?.connector?._id,
                    counterdoctor,
                    beginDay,
                    endDay
                },
                {
                    Authorization: `Bearer ${auth.token}`,
                }
            );
            setConnectors(data)
            setSearchStrorage(data)
            setCurrentConnectors(
                data.slice(indexFirstConnector, indexLastConnector),
            )
        } catch (error) {
            notify({
                title: error,
                description: "",
                status: "error",
            });
        }
    }, [auth, request, notify, beginDay, endDay, indexFirstConnector, indexLastConnector])

    //====================================================================
    //====================================================================

    const [baseUrl, setBaseurl] = useState();

    const getBaseUrl = useCallback(async () => {
        try {
            const data = await request(`/api/baseurl`, "GET", null);
            setBaseurl(data.baseUrl);
        } catch (error) {
            notify({
                title: t(`${error}`),
                description: "",
                status: "error",
            });
        }
    }, [request, notify]);

    //====================================================================
    //====================================================================

    const changeCounterDoctor = (e) => {
        setSelected(e) 
        if (e.value === 'none') {
            type === 'offline' ? getConnectors(beginDay, endDay, '') : getCounterDoctorsService(beginDay, endDay, '')
        } else {
            type === 'offline' ? getConnectors(beginDay, endDay, e.value) : getCounterDoctorsService(beginDay, endDay, e.value)
        }
    }

    const [doctors, setDoctors] = useState([]);

    const getDoctorsList = useCallback(async () => {
        try {
            const data = await request(
                `/api/counter_agent/counterdoctorall/get`,
                "POST",
                {
                    clinica: location?.state?.connector?.clinica,
                    counter_agent: location?.state?.connector?._id,
                },
                {
                    Authorization: `Bearer ${auth.token}`,
                }
            );
            setDoctors([...data].map(item => ({
                value: item._id,
                label: item.firstname + ' ' + item.lastname
            })))
        } catch (error) {
            notify({
                title: t(`${error}`),
                description: "",
                status: "error",
            });
        }
    }, [auth, request, notify])

    useEffect(() => {
        getDoctorsList()
    }, [getDoctorsList])

    //====================================================================
    //====================================================================

    const changeStart = (e) => {
        setBeginDay(new Date(new Date(e).setUTCHours(0, 0, 0, 0)));
        type === 'offline' ? getConnectors(new Date(new Date(e).setUTCHours(0, 0, 0, 0)), endDay) : getCounterDoctorsService(new Date(new Date(e).setUTCHours(0, 0, 0, 0)), endDay)
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
        type === 'offline' ? getConnectors(beginDay, date) : getCounterDoctorsService(beginDay, date)
    }

    //====================================================================
    //====================================================================
    const setPageSize = (e) => {
        setCurrentPage(0)
        setCountPage(e.target.value)
        setCurrentConnectors(connectors.slice(0, countPage))
    }
    //====================================================================
    //====================================================================

    const changeType = (e) => {
        if (e.target.value === 'offline') {
            getConnectors(beginDay, endDay)
            setType(e.target.value)
        } else {
            getCounterDoctorsService(beginDay, endDay)
            setType(e.target.value)
        }
        setSelected({
            label: t("Hammasi"),
            value: "none"
        })
    }

    //====================================================================
    //====================================================================
    // useEffect

    const [s, setS] = useState(0)

    useEffect(() => {
        if (auth.clinica && !s) {
            setS(1)
            getConnectors(beginDay, endDay)
            getBaseUrl()
        }
    }, [auth, getConnectors, getBaseUrl, s, beginDay, endDay])

    //====================================================================
    //====================================================================

    const [selected, setSelected] = useState(null)

    //====================================================================
    //====================================================================
    return (
        <div className="min-h-full">
            <div className="bg-slate-100 content-wrapper px-lg-5 px-3">
                <div className="row gutters">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="border-0 table-container">
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
                                <div className='font-weight-bold'>
                                    {location?.state?.connector?.firstname + ' ' + location?.state?.connector?.lastname}
                                </div>
                                <div className='w-[300px]'>
                                    <Select
                                        onChange={changeCounterDoctor}
                                        // styles={CustomStyle}
                                        value={selected}
                                        options={[{
                                            label: t("Hammasi"),
                                            value: "none"
                                        }, ...doctors]}
                                        // isDisabled={isDisabled}
                                        // placeholder={placeholder}
                                        components={{
                                            IndicatorSeparator: () => null,
                                        }}
                                        placeholder={t('Tanlang...')}
                                    />
                                </div>
                                <div className='w-[100px]'>
                                    <select
                                        className="form-control form-control-sm selectpicker"
                                        placeholder="Bo'limni tanlang"
                                        onChange={changeType}
                                    >
                                        <option value={'offline'}>Kunduzgi</option>
                                        <option value={'statsionar'}>Statsionar</option>
                                    </select>
                                </div>
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
                                <div className="text-center">
                                    <div className="btn btn-primary">
                                        <ReactHtmlTableToExcel
                                            id="reacthtmltoexcel"
                                            table="counter_agent_info-table"
                                            sheet="Sheet"
                                            buttonText="Excel"
                                            filename="Konter agent ulushi"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="table-responsive">
                                {type === "offline" ? <table className="table m-0">
                                    <thead>
                                        <tr>
                                            <th className="border py-1 bg-alotrade text-[16px]">№</th>
                                            <th className='border py-1 bg-alotrade text-[16px]'>{t("Mijoz")}</th>
                                            <th className="border py-1 bg-alotrade text-[16px]">
                                                {t("Kelgan vaqti")}
                                            </th>
                                            <th className="border py-1 bg-alotrade text-[16px]">
                                                {t("Xizmat nomi")}
                                            </th>
                                            <th className="border py-1 bg-alotrade text-[16px]">
                                                {t("Umumiy narxi")}
                                            </th>
                                            <th className="border py-1 bg-alotrade text-[16px]">
                                                {t("Kounteragent ulushi")}
                                            </th>
                                            <th className="border py-1 bg-alotrade text-[16px]">
                                                {t("Shifokor ulushi")}
                                            </th>
                                            <th className="border py-1 bg-alotrade text-[16px]">
                                                {t("Yunaltiruvchi shifokor")}
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
                                                    <td className="border py-1 text-left font-weight-bold text-[16px]">
                                                        {connector?.client?.lastname +
                                                            ' ' +
                                                            connector?.client?.firstname}
                                                    </td>

                                                    <td className="border py-1 text-left text-[16px]">
                                                        {new Date(connector?.createdAt).toLocaleDateString()}
                                                    </td>
                                                    <td className="border py-1 text-left text-[16px]">
                                                        {connector?.service?.name}
                                                    </td>
                                                    <td className="border py-1 text-right text-[16px]">
                                                        {connector.totalprice}
                                                    </td>
                                                    <td className="border py-1 text-right text-[16px]">
                                                        {connector?.counteragent_profit}
                                                    </td>
                                                    <td className="border py-1 text-right text-[16px]">
                                                        {connector.counterdoctor_profit}
                                                    </td>
                                                    <td className="border py-1 font-weight-bold text-[16px]">
                                                        {connector?.counterdoctor?.lastname +
                                                            ' ' +
                                                            connector?.counterdoctor?.firstname}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        <tr>
                                            <td
                                                className="border py-1 font-weight-bold text-right"
                                                style={{ maxWidth: '30px !important' }}
                                            >
                                            </td>
                                            <td className="border py-1 text-left font-weight-bold text-[16px]">
                                            </td>
                                            <td className="border py-1 text-left text-[16px]">
                                            </td>
                                            <td className="border py-1 text-left text-[16px]">
                                            </td>
                                            <td className="border py-1 text-right font-weight-bold text-[18px]">
                                                {searchStorage.reduce((prev, item) => prev + item?.totalprice, 0)}
                                            </td>
                                            <td className="border py-1 text-right font-weight-bold text-[18px]">
                                                {searchStorage.reduce((prev, item) => prev + (item?.counteragent_profit || 0), 0)}
                                            </td>
                                            <td className="border py-1 text-right font-weight-bold text-[18px]">
                                                {searchStorage.reduce((prev, item) => prev + (item?.counterdoctor_profit || 0), 0)}
                                            </td>
                                            <td className="border py-1 font-weight-bold text-[16px]">
                                            </td>
                                        </tr>
                                    </tbody>
                                </table> :
                                    <table className="table m-0">
                                        <thead>
                                            <tr>
                                                <th className="border py-1 bg-alotrade text-[16px]">№</th>
                                                <th className="border py-1 bg-alotrade text-[16px]">
                                                    {t("Mijoz")}
                                                </th>
                                                <th className="border py-1 bg-alotrade text-[16px]">
                                                    {t("Kelgan sa'nasi")}
                                                </th>
                                                <th className='border py-1 bg-alotrade text-[16px]'>{t("Kuni")}</th>
                                                <th className="border py-1 bg-alotrade text-[16px]">
                                                    {t("Ulushi")}
                                                </th>
                                                <th className="border py-1 bg-alotrade text-[16px]">
                                                    {t("Yullanma")}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentConnectors.map((connector, key) => {
                                                return (
                                                    <tr key={key}>
                                                        <td
                                                            className="border py-1 text-right"
                                                            style={{ maxWidth: '30px !important' }}
                                                        >
                                                            {currentPage * countPage + key + 1}
                                                        </td>
                                                        <td className="border py-1 text-[16px]">
                                                            {connector?.client?.lastname +
                                                                ' ' +
                                                                connector?.client?.firstname}
                                                        </td>
                                                        <td className="border py-1 text-[16px]">
                                                            {new Date(connector?.beginday).toLocaleDateString()}
                                                        </td>
                                                        <td className="border py-1 text-left text-[16px]">
                                                            {connector?.endday ?
                                                                Math.round((new Date(connector?.endday) - new Date(connector?.beginday)) / (60 * 60 * 24 * 1000)) :
                                                                Math.round((new Date() - new Date(connector?.beginday)) / (60 * 60 * 24 * 1000))
                                                            }
                                                        </td>
                                                        <td className="border py-1 text-left text-[16px]">
                                                            {connector?.counterdoctor?.statsionar_profit || 0}
                                                        </td>
                                                        <td className="border py-1 text-left text-[16px]">
                                                            {connector?.counterdoctor?.lastname +
                                                                ' ' +
                                                                connector?.counterdoctor?.firstname}
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                            <tr>
                                                <td className="border py-1 font-weight-bold text-right">
                                                </td>
                                                <td className="border py-1 font-weight-bold text-[16px]"></td>
                                                <td className="border py-1 font-weight-bold text-[16px]"></td>
                                                <td className="border py-1 text-left text-[16px]"></td>
                                                <td className="border py-1 text-left text-[16px] font-bold">
                                                    {currentConnectors.reduce((prev, el) => prev + (el?.counterdoctor?.statsionar_profit || 0), 0)}
                                                </td>
                                                <td className="border py-1 text-left text-[16px]"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CounterAgentInfo
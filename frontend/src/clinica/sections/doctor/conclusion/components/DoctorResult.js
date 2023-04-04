import { useEffect, useRef, useState } from "react";
import ReactHtmlParser from 'react-html-parser'
import { useReactToPrint } from "react-to-print";


const DoctorResult = ({ connector }) => {

    const [doctorServices, setDoctorServices] = useState([])
    const [labServices, setLabServices] = useState([])
    console.log(labServices);
    useEffect(() => {
        setDoctorServices([...connector.services].filter(service => service.department.probirka == false));
        const serviceTypes = []
        const serviceIdArr = []
        for (const service of connector.services) {
            if (service.department.probirka) {
                const check = service.serviceid.servicetype._id
                if (!serviceIdArr.includes(check)) {
                    serviceTypes.push({
                        servicetypeid: check,
                        servicetypename: service.serviceid.servicetype.name,
                        services: [service],
                        column: service.column
                    })
                    serviceIdArr.push(check);
                } else {
                    const checkCols = Object.keys(service?.column).filter(el => el.includes('col')).length;
                    const index = serviceTypes.findIndex(el =>
                        el.servicetypeid === check
                        && Object.keys(el?.column).filter(el => el.includes('col')).length === checkCols)
                    if (index >= 0) {
                        serviceTypes[index].services.push(service)
                        serviceTypes[index].column = service.column
                    } else {
                        serviceTypes.push({
                            servicetypeid: check,
                            servicetypename: service.serviceid.servicetype.name,
                            services: [service],
                            column: service.column
                        })
                    }
                }
            }
        }
        setLabServices([...serviceTypes].map(section =>
            ({ ...section, services: section.services })).filter(el => el.services.length > 0))
    }, [connector]);
    const getWidth = (table) => {
        if (table.col5) {
            return `${1280 / 5}px`
        }
        if (!table.col5 && table.col4) {
            return `${1280 / 4}px`
        }
        if (table.col3 && !table.col4) {
            return `${1280 / 3}px`
        }
    }

    const componentRef = useRef()
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    return (
        <>
            <div ref={componentRef} className="container ">
            <div className="flex justify-between items-center w-full mb-4">
                <div className="text-[16px] font-bold">
                    Ўзбекистон Республикаси <br />
                    Соғлиқни сақлаш вазирлиги <br />
                    {connector?.clinica?.name}
                </div>
                <div className="text-[16px] font-bold">
                    Ўзбекистон Республикаси <br />
                    Соғлиқни сақлаш вазирининг <br />
                    2020 йил 31 декабрдаги   № 363-сонли <br />
                    буйруғи билан тасдиқланган <br />
                    003- рақамли тиббий хужжат шакли <br />
                </div>
            </div>
            <h1 className="text-center mb-4 text-[18px] font-bold">СТАЦИОНАР БЕМОРНИНГ ТИББИЙ КАРТАСИ №: {connector?.client?.id}</h1>
            <div className="col-12" style={{ padding: "0" }}>
                <table
                    style={{
                        width: "100%",
                        border: "2px solid",
                        borderTop: "3px solid",
                    }}
                >
                    <tr style={{ textAlign: "center" }}>
                        <td
                            className="p-0"
                            style={{
                                width: "25%",
                                backgroundColor: "white",
                                border: "1px solid #000",
                            }}
                        >
                            Mijozning F.I.SH
                        </td>
                        <td
                            className="p-0"
                            style={{
                                fontSize: "20px",
                                width: "25%",
                                backgroundColor: "white",
                                border: "1px solid #000",
                            }}
                        >
                            <h4>
                                {connector?.client && connector.client.lastname + " " + connector.client.firstname}
                            </h4>
                        </td>
                        <td colSpan={2} style={{ width: "25%" }}>
                            <p className="fw-bold fs-5 m-0">
                                {connector?.client?.department}
                            </p>
                        </td>
                    </tr>
                    <tr style={{ textAlign: "center" }}>
                        <td
                            className="p-0"
                            style={{
                                width: "25%",
                                backgroundColor: "white",
                                border: "1px solid #000",
                            }}
                        >
                            Tug'ilgan yili
                        </td>
                        <td
                            className="p-0"
                            style={{
                                width: "25%",
                                backgroundColor: "white",
                                border: "1px solid #000",
                                fontSize: "20px",
                            }}
                        >
                            {connector?.client && new Date(connector.client.born).toLocaleDateString()}
                        </td>
                        <td
                            className="p-0"
                            style={{
                                width: "25%",
                                backgroundColor: "white",
                                border: "1px solid #000",
                            }}
                        >
                            Jinsi
                        </td>
                        <td
                            className="p-0"
                            style={{
                                width: "25%",
                                backgroundColor: "white",
                                border: "1px solid #000",
                                fontSize: "20px",
                            }}
                        >
                            {connector?.client?.gender === 'man' && 'Erkak'}
                            {connector?.client?.gender === 'women' && 'Ayol'}
                        </td>
                    </tr>
                    <tr style={{ textAlign: "center" }}>
                        <td
                            className="p-0"
                            style={{
                                width: "25%",
                                backgroundColor: "white",
                                border: "1px solid #000",
                            }}
                        >
                            Kelgan sanasi
                        </td>
                        <td
                            className="p-0"
                            style={{
                                width: "25%",
                                backgroundColor: "white",
                                border: "1px solid #000",
                                fontSize: "20px",
                            }}
                        >
                            {connector &&
                                new Date(connector?.room?.beginday).toLocaleDateString()}
                        </td>
                        <td
                            className="p-0 fw-bold"
                            style={{
                                width: "100px",
                                backgroundColor: "white",
                                border: "1px solid #000",
                            }}
                        >
                            Ketgan vaqti
                        </td>
                        <td
                            className="p-0"
                            style={{
                                width: "100px",
                                backgroundColor: "white",
                                border: "1px solid #000",
                                fontSize: "20px",
                            }}
                        >
                            {connector?.room?.endday && new Date(connector?.room?.endday).toLocaleDateString()}
                        </td>
                    </tr>

                    <tr style={{ textAlign: "center" }}>
                        <td
                            className="p-0"
                            style={{
                                width: "25%",
                                backgroundColor: "white",
                                border: "1px solid #000",
                            }}
                        >
                            Manzil
                        </td>
                        <td
                            className="p-0"
                            style={{
                                width: "25%",
                                backgroundColor: "white",
                                border: "1px solid #000",
                                fontSize: "20px",
                            }}
                        >
                            {connector.client && connector.client.address}
                        </td>
                        <td
                            className="p-0 fw-bold"
                            style={{
                                backgroundColor: "white",
                                border: "1px solid #000",
                            }}
                        >
                            ID
                        </td>
                        <td
                            className="p-0"
                            style={{
                                backgroundColor: "white",
                                border: "1px solid #000",
                                fontSize: "20px",
                            }}
                        >
                            {connector.client && connector.client.id}
                        </td>
                    </tr>
                </table>
            </div>
                <div className="row pt-4 w-full">
                    {doctorServices.length > 0 &&
                        doctorServices.map((section, index) => (
                            <div key={index} className={"w-full"}>
                                <div className="w-full flex justify-center items-center mb-2">
                                    <h2 className="block text-[24px] font-bold">
                                        {section?.service?.name}
                                    </h2>
                                </div>
                                {section.templates && section.templates.length > 0 &&
                                    section.templates.map((template, index) => (
                                        <div
                                            key={index}
                                            className="w-full text-[16px] mb-2 print_word"
                                        >

                                            {ReactHtmlParser(template.template)}

                                        </div>
                                    ))}
                                <div>
                                    <div className="mt-2">
                                        {section.files && section.files.length > 0 && section.files.map((file) => <div className="w-full">
                                            <img src={file} alt='file' />
                                        </div>)}
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
                <div className="pt-2 w-full text-center">
                    {labServices.length > 0 &&
                        labServices.map((section, index) => (
                            <div key={index} className={"w-full text-center mb-4"}>
                                <div className="w-full flex justify-center items-center mb-4">
                                    <h2 className="block text-[24px] font-bold">
                                        {section?.servicetypename}
                                    </h2>
                                </div>
                                <table className="w-full text-center">
                                    <thead>
                                        <tr>
                                            <th className="border-[1px] border-black bg-gray-400 text-[16px] px-[12px] py-1 text-center">{section?.column?.col1}</th>
                                            {section?.column?.col2 && <th className="text-[16px] border-[1px] border-black bg-gray-400 px-[12px] py-1 text-center">{section?.column?.col2}</th>}
                                            {section?.column?.col3 && <th className="text-[16px] border-[1px] border-black bg-gray-400 px-[12px] py-1 text-center">{section?.column?.col3}</th>}
                                            {section?.column?.col4 && <th className="text-[16px] border-[1px] border-black bg-gray-400 px-[12px] py-1 text-center">{section?.column?.col4}</th>}
                                            {section?.column?.col5 && <th className="text-[16px] border-[1px] border-black bg-gray-400 px-[12px] py-1 text-center">{section?.column?.col5}</th>}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {section?.services.map((service, ind) => {
                                            return service.tables.map((table, key) => (
                                                <tr key={key} >
                                                    <td className={`border-[1px] text-[16px] border-black py-1 px-[12px]`}> <pre

                                                        className="border-none outline-none text-left"
                                                    >
                                                        {table?.col1}
                                                    </pre> </td>
                                                    <td className={`border-[1px] text-[16px] border-black py-1 px-[12px]`}>
                                                        <pre

                                                            className="border-none outline-none"
                                                        >
                                                            {table?.col2}
                                                        </pre>
                                                    </td>
                                                    <td className={`border-[1px] text-[16px] border-black py-1 px-[12px]`}>
                                                        <pre

                                                            className="border-none outline-none"
                                                        >
                                                            {table?.col3}
                                                        </pre>
                                                    </td>
                                                    {section?.column?.col4 && <td className={`border-[1px] text-[16px] border-black py-1 px-[12px]`}>
                                                        <pre

                                                            className="border-none outline-none"
                                                        >
                                                            {table?.col4}
                                                        </pre></td>}
                                                    {section?.column?.col5 && <td className={`border-[1px] text-[16px] border-black py-1 px-[12px]`}>
                                                        <pre

                                                            className="border-none outline-none"
                                                        >
                                                            {table?.col5}
                                                        </pre></td>}
                                                </tr>
                                            ))
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    {labServices.map((section => <div className='py-[20px]'>
                        <div className="">
                            {section.services.map(service => service.files && service.files.map((file) => <div className="w-[400px]">
                                <img src={file} alt='file' />
                            </div>))}
                        </div>
                    </div>))}
                </div>
            </div>
            <div className="container p-4 bg-white">
                <div className="row">
                    <div className="col-12 text-center my-4">
                        <button className="btn btn-success px-4 mx-4"  > Tasdiqlash</button>
                        <button className="btn btn-info px-5" onClick={handlePrint} >Chop etish</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DoctorResult;
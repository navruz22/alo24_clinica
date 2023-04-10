import React from 'react'
import parse from "html-react-parser"
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser'
import './Print.css'
import QRcode from "../../../../qrcode.png"

const Print = ({ client, connector, sections, clinica, baseUrl, doctor }) => {
    return (
        <div className="bg-white">
            <div>
                <div className="flex justify-between items-center" style={{ fontSize: "20pt", marginBottom: "30px" }}>
                    <div className="" style={{ textAlign: "center" }}>
                        <pre className="" style={{ fontFamily: "-moz-initial", border: 'none', outline: "none" }}>
                            {clinica?.name}
                        </pre>
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <img style={{ width: "150px" }} src={baseUrl + '/api/upload/file/' + clinica?.image} alt="logo" />
                    </div>
                    <div className="" style={{ textAlign: "center" }}>
                        <pre className="" style={{ fontFamily: "-moz-initial", border: 'none', outline: "none" }}>
                            {clinica?.name2}
                        </pre>
                    </div>
                    <div className="" style={{ textAlign: "center" }}>
                        <p className="text-end m-0">
                            <img width="100" src={QRcode} alt="QR" />
                        </p>
                    </div>
                </div>
                <div className="">
                    <div className="" style={{ padding: "0" }}>
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
                                        width: "33%",
                                        backgroundColor: "white",
                                        border: "1px solid #000",
                                    }}
                                >
                                    Mijozning F.I.SH
                                </td>
                                <td
                                    className="p-0"
                                    style={{
                                        width: "33%",
                                        backgroundColor: "white",
                                        border: "1px solid #000",
                                    }}
                                >
                                    <h4 className='text-[20px]'>
                                        {client && client.lastname + " " + client.firstname}
                                    </h4>
                                </td>
                                <td rowSpan="2" colSpan={2} style={{ width: "33%" }}>
                                    <p className="fw-bold fs-5 m-0">
                                        TAHLIL <br /> NATIJALARI
                                    </p>
                                </td>
                            </tr>
                            <tr style={{ textAlign: "center" }}>
                                <td
                                    className="p-0"
                                    style={{
                                        width: "33%",
                                        backgroundColor: "white",
                                        border: "1px solid #000",
                                    }}
                                >
                                    Tug'ilgan yili
                                </td>
                                <td
                                    className="p-0"
                                    style={{
                                        width: "33%",
                                        backgroundColor: "white",
                                        border: "1px solid #000",
                                        fontSize: "20px",
                                    }}
                                >
                                    {client && new Date(client.born).toLocaleDateString()}
                                </td>
                            </tr>
                            <tr style={{ textAlign: "center" }}>
                                <td
                                    className="p-0"
                                    style={{
                                        width: "33%",
                                        backgroundColor: "white",
                                        border: "1px solid #000",
                                    }}
                                >
                                    Kelgan sanasi
                                </td>
                                <td
                                    className="p-0"
                                    style={{
                                        width: "33%",
                                        backgroundColor: "white",
                                        border: "1px solid #000",
                                        fontSize: "20px",
                                    }}
                                >
                                    {connector &&
                                        new Date(connector.createdAt).toLocaleDateString()}
                                </td>
                                <td
                                    className="p-0 fw-bold"
                                    style={{
                                        width: "100px",
                                        backgroundColor: "white",
                                        border: "1px solid #000",
                                    }}
                                >
                                    Namuna
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
                                    {connector && connector.probirka}
                                </td>
                            </tr>

                            <tr style={{ textAlign: "center" }}>
                                <td
                                    className="p-0"
                                    style={{
                                        width: "33%",
                                        backgroundColor: "white",
                                        border: "1px solid #000",
                                    }}
                                >
                                    Manzil
                                </td>
                                <td
                                    className="p-0"
                                    style={{
                                        width: "33%",
                                        backgroundColor: "white",
                                        border: "1px solid #000",
                                        fontSize: "20px",
                                    }}
                                >
                                    {client && client.address}
                                </td>
                                <td
                                    className="p-0 fw-bold"
                                    style={{
                                        width: "200px",
                                        backgroundColor: "white",
                                        border: "1px solid #000",
                                    }}
                                >
                                    ID
                                </td>
                                <td
                                    className="p-0"
                                    style={{
                                        width: "200px",
                                        backgroundColor: "white",
                                        border: "1px solid #000",
                                        fontSize: "20px",
                                    }}
                                >
                                    {client && client.id}
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                {/* <div className="row mt-3" style={{ backgroundColor: "#C0C0C0" }}>
                    <div className="col-4">
                        <p className="px-2 m-0">"GEMO-TEST" х/к</p>
                    </div>
                    <div className="col-8">
                        <p className="px-2 m-0 text-end pr-5">
                            Xizmatlar litsenziyalangan. LITSENZIYA №21830906 03.09.2020. SSV
                            RU
                        </p>
                    </div>
                </div> */}
            </div>
            <div className="row pt-4 w-full">
                {sections.length > 0 &&
                    sections.map((section, index) => (
                        <div key={index} className={"w-full"}>
                            {section.templates && section.templates.length > 0 &&
                                section.templates.map((template, index) => (
                                    <div>
                                        <h2 className="block text-center mb-4 text-[24px] font-bold">
                                            {template?.name}
                                        </h2>
                                        <div
                                            key={index}
                                            className="w-full text-[20px] mb-2 print_word"
                                        >

                                            {ReactHtmlParser(template.template)}

                                        </div>
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
            <div className='mt-[50px] text-center'>
                <div>
                    ___________________<span className='font-bold'>{doctor?.lastname} {doctor?.firstname[0].toUpperCase()}</span>.
                </div>
            </div>
        </div>

    );
}

export default Print
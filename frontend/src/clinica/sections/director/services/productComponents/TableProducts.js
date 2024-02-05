import React from "react";
import { Sort } from "./Sort";
import { Tooltip } from "@chakra-ui/react";
import { ExcelUpload } from "./ExcelUpload";
import { Pagination } from "../../components/Pagination";
import { useTranslation } from "react-i18next";

export const TableProducts = ({
  searchName,
  products,
  setRemove,
  setModal,
  setProducts,
  setProduct,
  setCurrentPage,
  countPage,
  setCountPage,
  currentProducts,
  setCurrentProducts,
  currentPage,
  setPageSize,
  setModal1,
  setImports,
  setModal2,
  loading
}) => {
  const {t} = useTranslation()
  return (
    <div className="border-0 shadow-lg table-container">
      <div className="border-0 table-container">
        <div className="table-responsive">
          <table className="table m-0">
            <thead className="bg-white">
              <tr>
                <th>
                  <select
                    className="form-control form-control-sm selectpicker"
                    placeholder={t("Bo'limni tanlang")}
                    onChange={setPageSize}
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                </th>
                <th>
                  <input
                    onChange={searchName}
                    style={{ maxWidth: "100px" }}
                    type="search"
                    className="w-100 form-control form-control-sm selectpicker"
                    placeholder={t("Maxsulot nomini kiriting")}
                  />
                </th>
                <th colSpan={3}>
                  <Pagination
                    setCurrentDatas={setCurrentProducts}
                    datas={products}
                    setCurrentPage={setCurrentPage}
                    countPage={countPage}
                    totalDatas={products.length}
                  />
                </th>
                <th className="text-center">
                  <ExcelUpload setData={setImports} setModal={setModal2} loading={loading} />
                </th>
                {/* <th>
                  <Tooltip
                    hasArrow
                    label="Barcha mahsulotlarni import qilish"
                    bg="blue.400"
                  >
                    <button
                      onClick={() => setModal1(true)}
                      className="btn btn-info py-1 px-3 pt-1 align-middle"
                    >
                      <FontAwesomeIcon
                        className="mr-2"
                        style={{ fontSize: "12pt" }}
                        icon={faFileExcel}
                      />
                      Export
                    </button>
                  </Tooltip>
                </th> */}
                <th className="text-center">
                  <Tooltip
                    hasArrow
                    label={t("Barcha mahsulotlarni o'chirish")}
                    bg="red.500"
                  >
                    {loading ? <button className="btn btn-danger" disabled>
                      <span class="spinner-border spinner-border-sm"></span>
                      Loading...
                    </button>
                      :
                      <button
                        onClick={() => setModal1(true)}
                        className="btn btn-danger py-0 px-3 pt-1"
                      >
                        <span className="icon-trash-2"></span>
                      </button>
                    }
                  </Tooltip>
                </th>
              </tr>
            </thead>
            <thead>
              <tr>
                <th className="border-right bg-alotrade text-[16px]">№</th>
                <th className="border-right bg-alotrade text-[16px]">
                  {t("Nomi")}
                </th>
                <th className="border-right bg-alotrade text-[16px]">
                  {t("O'lchov birligi")}
                </th>
                <th className="border-right bg-alotrade text-[16px]">
                  {t("Narxi")}
                </th>
                <th className="border-right bg-alotrade text-[16px]">
                  {t("Soni")}
                </th>
                <th className="border-right bg-alotrade text-[16px]">
                  {t("Minimum")}
                </th>
                <th className="border-right text-center bg-alotrade text-[16px]">{t("Tahrirlash")}</th>
                <th className="text-center bg-alotrade text-[16px]">{t("O'chirish")}</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product, key) => {
                return (
                  <tr key={key}>
                    <td className="border-right font-weight-bold text-[16px]">
                      {currentPage * countPage + key + 1}
                    </td>
                    <td className="border-right text-[16px]">{product.name}</td>
                    <td className="border-right text-[16px]">{product.unit}</td>
                    <td className="border-right text-[16px]">{product.price}</td>
                    <td className="border-right text-[16px]">{product.total}</td>
                    <td className="border-right text-[16px]">{product?.minimum}</td>
                    <td className="border-right text-[16px] text-center">
                      <button
                        id={`btn${key}`}
                        onClick={(e) => {
                          setProduct(product)
                        }}
                        type="button"
                        className="text-white font-semibold bg-alotrade rounded py-1 px-2"
                        style={{ fontSize: "75%" }}
                      >
                        {t("Tahrirlash")}
                      </button>
                    </td>
                    <td className="text-center text-[16px]">
                      <button
                        onClick={() => {
                          setRemove(product);
                          setModal(true);
                        }}
                        type="button"
                        className="text-white font-semibold bg-red-400 rounded py-1 px-2"
                        style={{ fontSize: "75%" }}
                      >
                        {t("O'chirish")}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

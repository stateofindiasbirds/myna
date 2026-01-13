import React from "react";
import Navbar from "../Navbar/Navbar";
import logo from "../../assets/images/logo.png";
// import HeatMapReport from "../HeatMapReport";
const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const today = new Date();
const formattedDate =
today.getDate() +
" " +
monthNames[today.getMonth()] +
" " +
today.getFullYear();

function About() {
  return (
    <>
      <Navbar />
      {/* <HeatMapReport /> */}
      <div className="container mt-12 leading-8 gandhi-family">
        <b>M</b>apping <b>Y</b>our <b>N</b>eighbourhood <b>A</b>vifauna (MYNA) is a data exploration tool
        published by the{" "}
        <a href="https://www.stateofindiasbirds.in/" target="_blank">State of India's Birds</a>{" "}
        (SoIB) partnership to explore the underlying large-scale data used in
        the SoIB assessments. This data is based entirely on eBird data that was
        downloaded from
        <a href="https://ebird.org/india" target="_blank">
          {" "}
          www.ebird.org/india  
        </a>
        {" "}  ,and includes public observations uploaded until 30 November 2025. MYNA can
        be typically used to explore the birds found in small regions like a
        district, taluk, panchayat, protected area, an eBird locality, or even a
        custom boundary defined by the user. It provides broad summaries of the
        bird species found there in terms of national and international
        priorities, together with a complete list of species. Data on sensitive
        species (
        <a
          href="https://ebird.org/india/news/ebird-sensitive-species"
          target="_blank"
        >
          https://ebird.org/india/news/ebird-sensitive-species
        </a>
        ) is not included in these summaries.{" "}
      </div>
      <div className="grid place-content-center ">
        <img width={250} src={logo}></img>
      </div>
      <div className="container mt-12 leading-8 gandhi-family">
        Contact us at{" "}
        <a href="mailto:myna@stateofindiasbirds.in">
          myna@stateofindiasbirds.in
        </a>{" "}
        for queries, bug reports, support/feature requests, or any other
        comments.<br></br>
        For more details on State of India's Birds write to{" "}
        <a href="mailto:contact@stateofindiasbirds.in">
          contact@stateofindiasbirds.in
        </a>.
        {" "}MYNA is hosted in Amazon Web Services (AWS) and Microsoft Azure cloud platforms and we are thankful for their respective free credits programs for supporting MYNA.
      </div>
      <div
        className="grid grid-cols-3 text-center text-gray-100 p-3  font-sans bg-[#9A7269] fixed bottom-0 w-100"
      >
        <div className="col-span-2 text-right me-4 gandhi-family">
          Generated from myna.stateofindiasbirds.in v.2.2 on {formattedDate}
        </div>
        <div
          className={` font-medium gandhi-family text-right`}
        >
          Developed by{" "}
          <a
            style={{ textDecoration: "none" }}
            className="text-[#dbb931]"
            target="_blank"
            href="https://www.alphanzo.io"
          >
            Alphanzo Technology Pvt Ltd
          </a>
        </div>
      </div>
    </>
  );
}

export default About;

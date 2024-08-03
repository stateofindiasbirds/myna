import React from "react";
import Navbar from "../Navbar/Navbar";
import logo from "../../assets/images/logo.png";
// import HeatMapReport from "../HeatMapReport";

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
        {" "}  ,and includes public observations uploaded until 31 May 2023. MYNA can
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
        </a>
      </div>
    </>
  );
}

export default About;

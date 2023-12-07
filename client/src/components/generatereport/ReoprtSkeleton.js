import { Skeleton } from "@mui/material";
import React, { Fragment } from "react";
import { Col, Container, Row } from "reactstrap";

const ReoprtSkeleton = () => {
  return (
    <Fragment>
      <div className="report-skeleton-container">
        <div className="report-skleton-header-div">
          <Skeleton
            variant="text"
            className="report-skleton-header-text"
            style={{ backgroundColor: "#eee7a875" }}
          />
        </div>
        <div style={{ width: "100%" }} className="">
          <Row style={{ width: "100%" }}>
            <Col sm={4}>
              <div className="d-flex justify-content-center align-items-center mt-28">
                <Skeleton
                  variant="circular"
                  width={200}
                  height={200}
                  style={{ backgroundColor: "#eee7a875" }}
                />
                <Skeleton
                  variant="rectangular"
                  width={280}
                  height={120}
                  style={{
                    marginLeft: "-20px",
                    zIndex: 0,
                    backgroundColor: "#eee7a875",
                  }}
                />
              </div>
            </Col>
            <Col sm={4}>
              <div className="d-flex justify-content-center align-items-center mt-28">
                <Skeleton
                  variant="circular"
                  width={200}
                  height={200}
                  style={{ backgroundColor: "#eee7a875" }}
                />
                <Skeleton
                  variant="rectangular"
                  width={280}
                  height={120}
                  style={{
                    marginLeft: "-20px",
                    zIndex: 0,
                    backgroundColor: "#eee7a875",
                  }}
                />
              </div>
            </Col>
            <Col sm={4}>
              <div className="d-flex justify-content-center align-items-center mt-28">
                <Skeleton
                  variant="circular"
                  width={200}
                  height={200}
                  style={{ backgroundColor: "#eee7a875" }}
                />
                <Skeleton
                  variant="rectangular"
                  width={280}
                  height={120}
                  style={{
                    marginLeft: "-20px",
                    zIndex: 0,
                    backgroundColor: "#eee7a875",
                  }}
                />
              </div>
            </Col>
            <Col sm={4}>
              <div className="d-flex justify-content-center align-items-center mt-28">
                <Skeleton
                  variant="circular"
                  width={200}
                  height={200}
                  style={{ backgroundColor: "#eee7a875" }}
                />
                <Skeleton
                  variant="rectangular"
                  width={280}
                  height={120}
                  style={{
                    marginLeft: "-20px",
                    zIndex: 0,
                    backgroundColor: "#eee7a875",
                  }}
                />
              </div>
            </Col>
            <Col sm={4}>
              <div className="d-flex justify-content-center align-items-center mt-28">
                <Skeleton
                  variant="circular"
                  width={200}
                  height={200}
                  style={{ backgroundColor: "#eee7a875" }}
                />
                <Skeleton
                  variant="rectangular"
                  width={280}
                  height={120}
                  style={{
                    marginLeft: "-20px",
                    zIndex: 0,
                    backgroundColor: "#eee7a875",
                  }}
                />
              </div>
            </Col>
            <Col sm={4}>
              <div className="d-flex justify-content-center align-items-center mt-28">
                <Skeleton
                  variant="circular"
                  width={200}
                  height={200}
                  style={{ backgroundColor: "#eee7a875" }}
                />
                <Skeleton
                  variant="rectangular"
                  width={280}
                  height={120}
                  style={{
                    marginLeft: "-20px",
                    zIndex: 0,
                    backgroundColor: "#eee7a875",
                  }}
                />
              </div>
            </Col>
          </Row>
        </div>
        <div className="report-skleton-header-div mt-28">
          <Skeleton
            variant="text"
            className="report-skleton-header-text"
            style={{ backgroundColor: "#eee7a875" }}
          />
        </div>
        <div>
          <Row style={{ width: "100%" }}>
            <Col sm={4}>
              <div className="d-flex justify-content-center align-items-center mt-28">
                <div>
                  <Skeleton
                    variant="circular"
                    width={200}
                    height={200}
                    style={{ backgroundColor: "#eee7a875" }}
                  />
                  <Skeleton
                    variant="text"
                    width={200}
                    className="ms-4"
                    style={{ fontSize: "60px", backgroundColor: "#eee7a875" }}
                  />
                </div>
              </div>
            </Col>
            <Col sm={4}>
              <div className="d-flex justify-content-center align-items-center mt-28">
                <div>
                  <Skeleton
                    variant="circular"
                    width={200}
                    height={200}
                    style={{ backgroundColor: "#eee7a875" }}
                  />
                  <Skeleton
                    variant="text"
                    width={200}
                    className="ms-4"
                    style={{ fontSize: "60px", backgroundColor: "#eee7a875" }}
                  />
                </div>
              </div>
            </Col>
            <Col sm={4}>
              <div className="d-flex justify-content-center align-items-center mt-28">
                <div>
                  <Skeleton
                    variant="circular"
                    width={200}
                    height={200}
                    style={{ backgroundColor: "#eee7a875" }}
                  />
                  <Skeleton
                    variant="text"
                    width={200}
                    className="ms-4"
                    style={{ fontSize: "60px", backgroundColor: "#eee7a875" }}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Fragment>
  );
};

export default ReoprtSkeleton;

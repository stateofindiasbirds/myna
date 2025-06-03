import { Skeleton } from "@mui/material";
import React, { Fragment } from "react";
import { Col, Row } from "reactstrap";

const ReoprtSkeleton = () => {
  const renderSkeletonCard = () => (
    <div className="d-flex justify-content-center align-items-center mt-28 ">
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
          marginTop: "-20px",
          zIndex: 0,
          backgroundColor: "#eee7a875",
        }}
      />
    </div>
  );

  const renderCircleTextCard = () => (
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
          className="ms"
          style={{ fontSize: "60px", backgroundColor: "#eee7a875" }}
        />
      </div>
    </div>
  );

  return (
    <Fragment>
      <div className="report-skeleton-container p-2">
        {/* Header */}
        <div className="report-skleton-header-div">
          <Skeleton
            variant="text"
            className="report-skleton-header-text"
            style={{ backgroundColor: "#eee7a875" }}
          />
        </div>

        {/* Top Grid of 6 Items */}
        <Row>
          {[...Array(6)].map((_, idx) => (
            <Col xs={12} sm={6} md={4} key={idx}>
              {renderSkeletonCard()}
            </Col>
          ))}
        </Row>

        {/* Another Header */}
        <div className="report-skleton-header-div mt-28">
          <Skeleton
            variant="text"
            className="report-skleton-header-text"
            style={{ backgroundColor: "#eee7a875" }}
          />
        </div>

        {/* Bottom 3 Circles with Text */}
        <Row>
          {[...Array(3)].map((_, idx) => (
            <Col xs={12} sm={6} md={4} key={`circle-${idx}`}>
              {renderCircleTextCard()}
            </Col>
          ))}
        </Row>
      </div>
    </Fragment>
  );
};

export default ReoprtSkeleton;

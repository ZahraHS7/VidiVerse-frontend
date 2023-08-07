import React from "react";
import { Container } from "react-bootstrap";
import { Link } from 'react-router-dom';
import '../404style.css';

const NotFound = () => {
  return (
    <Container className="justify-content-center">
      <section className="page_404">
        <div className="four_zero_four_bg">
          <h1 className="text-center text-black">404</h1>
        </div>
        <div className="contant_box_404">
          <h3 className="text-center text-black">
            Look like you're lost
          </h3>
          <p className="text-center text-black fs-6">the page you are looking for not available!</p>
          <Link to="/" className="btn btn-success link_404">Go to Home</Link>
        </div>
      </section>
    </Container>
  );
};

export default NotFound;

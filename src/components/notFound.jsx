import React from "react";
import { Container } from "react-bootstrap";
import { Link } from 'react-router-dom';
import '../css files/404style.css';

const NotFound = () => {
  return (
    <Container className="justify-content-center">
      <section className="page_404">
        <div className="four_zero_four_bg">
          <h1 className="text-center text-black">Oops!</h1>
        </div>
        <div className="contant_box_404">
          <h3 className="text-center text-black">
            What on earth are you doing here!?
          </h3>
          <p className="text-center text-black fs-6">Well, this is awkward, the page you were trying to view does not exist.</p>
          <Link to="/" className="btn btn-success link_404">Get yourself home</Link>
        </div>
      </section>
    </Container>
  );
};

export default NotFound;

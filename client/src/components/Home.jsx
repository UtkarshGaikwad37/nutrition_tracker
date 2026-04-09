import React from "react";
import { Link } from "react-router-dom";
import Navbar2 from "./Navbar2";
import "../css/Home.css";

export default function Home() {
  return (
    <>
      <Navbar2 />
      <div className="container-fluid bg-gradient py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-8 mx-auto text-center text-white fade-in">
              <h1>Welcome to Fitness Club</h1>
              <p>
                Start your fitness journey with us. Whether you're a beginner or
                an experienced athlete, we have everything you need to achieve
                your fitness goals.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget
                consectetur nisi. Phasellus consequat lacinia nulla, in pretium
                risus sollicitudin a.
              </p>
              <Link to="/track" className="btn btn-primary home-button">
                Get Started
              </Link>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-4">
              <div className="card bg-primary text-white">
                <div className="card-body">
                  <h5 className="card-title">Personalized Plans</h5>
                  <p className="card-text">
                    Get customized workout and diet plans tailored to your
                    fitness goals.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-success text-white">
                <div className="card-body">
                  <h5 className="card-title">Expert Guidance</h5>
                  <p className="card-text">
                    Benefit from the expertise of certified trainers and
                    nutritionists.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-info text-white">
                <div className="card-body">
                  <h5 className="card-title">Community Support</h5>
                  <p className="card-text">
                    Join a community of like-minded individuals for motivation
                    and encouragement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

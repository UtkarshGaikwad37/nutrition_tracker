import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { API_ENDPOINTS } from "../config/api";
import Food from "./Food";
import Navbar2 from "./Navbar2";
import "../css/Track.css";
import { Container, Row, Col, Form } from "react-bootstrap";

export default function Track() {
  const [food, setFood] = useState(null);
  const [foodItems, setFoodItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const loggedData = useContext(UserContext);

  useEffect(() => {
    const token = loggedData?.loggedUser?.token;
    if (!searchTerm.trim() || !token) {
      setFoodItems([]);
      setSearchError("");
      setIsSearching(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsSearching(true);
      fetch(API_ENDPOINTS.FOOD_SEARCH(searchTerm), {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((foods) => {
          if (Array.isArray(foods)) {
            setFoodItems(foods);
            setSearchError(
              foods.length === 0 ? "No matching foods found." : "",
            );
          } else {
            setFoodItems([]);
            setSearchError(
              foods.message ||
                foods.errors?.[0]?.msg ||
                "No matching foods found.",
            );
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setFoodItems([]);
          setSearchError("Unable to fetch food results.");
        })
        .finally(() => setIsSearching(false));
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, loggedData?.loggedUser?.token]);

  return (
    <>
      <Navbar2 />
      <div className="bg-image">
        <Container>
          <Row className="justify-content-center">
            <Col md={6}>
              <h2 className="text-white mb-4">Track Your Food</h2>
              <Form.Group>
                <Form.Control
                  type="search"
                  placeholder="Search Food Item"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-center mt-4">
            <Col md={6}>
              {isSearching && <p className="text-white">Searching...</p>}
              {searchError && <p className="text-warning">{searchError}</p>}
              {foodItems.map((item) => (
                <div
                  className="search-result"
                  key={item._id}
                  onClick={() => {
                    setFood(item);
                    setFoodItems([]);
                  }}
                >
                  <div className="text-dark">{item.name}</div>
                </div>
              ))}
            </Col>
          </Row>
          {food !== null && (
            <Row className="justify-content-center mt-4">
              <Col md={6}>
                <Food food={food} />
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </>
  );
}

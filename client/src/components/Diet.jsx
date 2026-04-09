// Diet.js
import React, { useContext, useEffect, useMemo, useState } from "react";
import { UserContext } from "../context/UserContext";
import { API_ENDPOINTS } from "../config/api";
import Navbar2 from "./Navbar2";
import "../css/Diet.css";

const DietItem = ({ item }) => (
  <div className="col-md-6">
    <div className="card bg-dark text-white diet-card">
      <div className="card-body">
        <h3 className="card-title">
          {item.foodId?.name} ({item.details.calories} Kcal for {item.quantity}
          g)
        </h3>
        <p className="card-text">
          Protein: {item.details.protein}g, Fiber: {item.details.fiber}g,
          Carbohydrates: {item.details.carbohydrates}g, Fat: {item.details.fat}g
        </p>
      </div>
    </div>
  </div>
);

export default function Diet() {
  const [items, setItems] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const loggedData = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      if (!loggedData?.loggedUser?.token) {
        setItems([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          API_ENDPOINTS.TRACK_BY_DATE(loggedData.loggedUser.id, date),
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${loggedData.loggedUser.token}`,
            },
          },
        );

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch diet data");
        }

        setItems(Array.isArray(data) ? data : []);
      } catch (fetchError) {
        console.error("Error fetching data:", fetchError);
        setItems([]);
        setError(fetchError.message || "Unable to load diet data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [date, loggedData?.loggedUser?.id, loggedData?.loggedUser?.token]);

  const totalNutrition = useMemo(() => {
    return items.reduce(
      (totals, item) => {
        totals.totalCalories += item.details.calories || 0;
        totals.totalFat += item.details.fat || 0;
        totals.totalProtein += item.details.protein || 0;
        totals.totalFiber += item.details.fiber || 0;
        totals.totalCarbohydrates += item.details.carbohydrates || 0;
        return totals;
      },
      {
        totalCalories: 0,
        totalFat: 0,
        totalProtein: 0,
        totalFiber: 0,
        totalCarbohydrates: 0,
      },
    );
  }, [items]);

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  return (
    <>
      <Navbar2 />
      <div className="container-fluid bg-black text-white">
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <h2 className="mb-4">Select Date:</h2>
              <input
                type="date"
                value={date}
                onChange={handleDateChange}
                className="form-control mb-4"
              />
            </div>
          </div>

          {loading ? (
            <div className="row justify-content-center mt-4">
              <div className="col-md-6">
                <p className="text-white">Loading diet data...</p>
              </div>
            </div>
          ) : error ? (
            <div className="row justify-content-center mt-4">
              <div className="col-md-6">
                <p className="alert alert-danger">{error}</p>
              </div>
            </div>
          ) : items.length > 0 ? (
            <>
              <div className="row justify-content-center mt-4">
                {items.map((item) => (
                  <DietItem key={item._id} item={item} />
                ))}
              </div>
              <div className="row justify-content-center mt-4">
                <div className="col-md-6">
                  <h2 className="mb-4">Total Nutrition</h2>
                  <ul className="list-group">
                    <li className="list-group-item bg-dark diet-list-item">
                      Total Calories: {totalNutrition.totalCalories}g
                    </li>
                    <li className="list-group-item bg-dark diet-list-item">
                      Total Fat: {totalNutrition.totalFat}g
                    </li>
                    <li className="list-group-item bg-dark diet-list-item">
                      Total Protein: {totalNutrition.totalProtein}g
                    </li>
                    <li className="list-group-item bg-dark diet-list-item">
                      Total Fiber: {totalNutrition.totalFiber}g
                    </li>
                    <li className="list-group-item bg-dark diet-list-item">
                      Total Carbohydrates: {totalNutrition.totalCarbohydrates}g
                    </li>
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <div className="row justify-content-center mt-4">
              <div className="col-md-6">
                <p className="alert alert-info">
                  No tracked food found for this date.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// Food.jsx
import React, { useContext, useMemo, useState } from "react";
import { UserContext } from "../context/UserContext";
import { API_ENDPOINTS } from "../config/api";
import "../css/Food.css";

const FALLBACK_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Crect fill='%23e5e7eb' width='220' height='220'/%3E%3Ctext x='50%25' y='50%25' font-size='14' fill='%23999' text-anchor='middle' dy='.3em'%3EImage not available%3C/text%3E%3C/svg%3E";

export default function Food({ food }) {
  if (!food) return null;

  const [quantity, setQuantity] = useState(100);
  const [status, setStatus] = useState({ type: "", message: "" });
  const loggedData = useContext(UserContext);

  const scaledNutrition = useMemo(() => {
    const scale = Number(quantity) > 0 ? Number(quantity) / 100 : 1;
    return {
      calories: Number((food.calories * scale).toFixed(1)),
      protein: Number((food.protein * scale).toFixed(1)),
      fat: Number((food.fat * scale).toFixed(1)),
      fiber: Number((food.fiber * scale).toFixed(1)),
      carbohydrates: Number((food.carbohydrates * scale).toFixed(1)),
    };
  }, [food, quantity]);

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const trackItem = async () => {
    setStatus({ type: "loading", message: "Tracking item..." });
    const payload = {
      foodId: food._id,
      details: scaledNutrition,
      quantity: Number(quantity),
    };

    try {
      const response = await fetch(API_ENDPOINTS.TRACK, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loggedData?.loggedUser?.token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data.message || data.errors?.[0]?.msg || "Unable to track food",
        );
      }

      setStatus({ type: "success", message: data.message });
      setQuantity(100);
    } catch (error) {
      console.error(error);
      setStatus({ type: "error", message: error.message });
    }
  };

  return (
    <div className="food-container">
      <div className="food-image-container">
        <img
          className="food-image"
          src={food.imageUrl || FALLBACK_IMAGE}
          alt={food.name}
          loading="lazy"
          onError={(e) => {
            e.target.src = FALLBACK_IMAGE;
          }}
        />
      </div>

      <div className="food-details-container">
        <p className="food-name">
          {food.name} ({scaledNutrition.calories} Kcal for {quantity}g)
        </p>
        <div className="nutrition-info">
          <div className="nutrition-group">
            <p className="nutrition-label">
              Protein: {scaledNutrition.protein}g
            </p>
            <p className="nutrition-label">Fiber: {scaledNutrition.fiber}g</p>
          </div>
          <div className="nutrition-group">
            <p className="nutrition-label">Fat: {scaledNutrition.fat}g</p>
            <p className="nutrition-label">
              Carbohydrates: {scaledNutrition.carbohydrates}g
            </p>
          </div>
        </div>
        <div className="quantity-input-container">
          <input
            type="number"
            placeholder="Enter Quantity"
            value={quantity}
            onChange={handleQuantityChange}
            className="quantity-input"
            min={1}
          />
          <button
            type="button"
            className="track-button"
            onClick={trackItem}
            disabled={status.type === "loading"}
          >
            {status.type === "loading" ? "Tracking..." : "Track"}
          </button>
        </div>
        {status.message && (
          <p
            className={
              status.type === "error"
                ? "text-danger"
                : status.type === "loading"
                  ? "text-info"
                  : "text-success"
            }
          >
            {status.message}
          </p>
        )}
      </div>
    </div>
  );
}

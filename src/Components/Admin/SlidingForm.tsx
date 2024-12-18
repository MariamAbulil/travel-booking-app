import React, { useState } from "react";

interface SlidingFormProps {
  item: any;
  onClose: () => void;
  onRefresh: () => void;
}

const SlidingForm: React.FC<SlidingFormProps> = ({ item, onClose, onRefresh }) => {
  const [formData, setFormData] = useState(item || { name: "", country: "" });

  const handleSubmit = async () => {
    try {
      const method = item ? "PUT" : "POST";
      const url = item
        ? `https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/cities/${item.id}`
        : "https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/cities";

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      onRefresh();
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="sliding-form">
      <h3>{item ? "Update City" : "Create City"}</h3>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Country"
        value={formData.country}
        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
      />
      <button onClick={handleSubmit}>{item ? "Update" : "Create"}</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default SlidingForm;

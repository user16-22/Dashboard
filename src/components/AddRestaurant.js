

import React, { useState } from "react";

export default function Addrestaurant() {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    seating: "",
    cuisineType: "",
    avgCost: "",
    amenities: [],
    image: "", // Base64 string will be stored here
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAmenitiesChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      if (checked) {
        return { ...prev, amenities: [...prev.amenities, value] };
      } else {
        return { ...prev, amenities: prev.amenities.filter((a) => a !== value) };
      }
    });
  };

const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Form Data before submit:", formData);

    try {
      const res = await fetch("http://localhost:5000/api/restaurants/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Restaurant added successfully!");
        console.log("Response:", data);
      } else {
        alert("Failed to add restaurant: " + data.error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        padding: "20px",
        border: "1px solid #cccccc",
        borderRadius: "10px",
        backgroundColor: "#5a59590f",
        boxShadow: "0px 4px 8px rgba(255, 255, 255, 0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#ffffffff", marginBottom: "20px" }}>
        Add Restaurant
      </h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
        {/* Restaurant Name */}
        <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Restaurant Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{
            padding: "8px",
            marginBottom: "15px",
            borderRadius: "5px",
            border: "1px solid #000000ff",
          }}
        />

        {/* City */}
        <label style={{ marginBottom: "5px", fontWeight: "bold" }}>City:</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
          style={{
            padding: "8px",
            marginBottom: "15px",
            borderRadius: "5px",
            border: "1px solid #000000ff",
          }}
        />

        {/* Seating */}
        <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Seating Capacity:</label>
        <input
          type="number"
          name="seating"
          value={formData.seating}
          onChange={handleChange}
          required
          style={{
            padding: "8px",
            marginBottom: "15px",
            borderRadius: "5px",
            border: "1px solid #000000ff",
          }}
        />

        {/* Cuisine Type */}
        <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Cuisine Type:</label>
        <input
          type="text"
          name="cuisineType"
          value={formData.cuisineType}
          onChange={handleChange}
          required
          style={{
            padding: "8px",
            marginBottom: "15px",
            borderRadius: "5px",
            border: "1px solid #000000ff",
          }}
        />

        {/* Average Cost */}
        <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Average Cost per Person:</label>
        <input
          type="number"
          name="avgCost"
          value={formData.avgCost}
          onChange={handleChange}
          required
          style={{
            padding: "8px",
            marginBottom: "15px",
            borderRadius: "5px",
            border: "1px solid #000000ff",
          }}
        />

        {/* Amenities */}
        <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Amenities:</label>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ marginRight: "10px" }}>
            <input type="checkbox" value="WiFi" onChange={handleAmenitiesChange} /> WiFi
          </label>
          <label style={{ marginRight: "10px" }}>
            <input type="checkbox" value="Parking" onChange={handleAmenitiesChange} /> Parking
          </label>
          <label>
            <input type="checkbox" value="Outdoor Seating" onChange={handleAmenitiesChange} /> Outdoor Seating
          </label>
        </div>

        {/* Upload Image */}
        <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Upload Image:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />

        {/* Submit */}
        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}




// import React, { useState } from "react";

// export default function Addrestaurant() {
//   const [formData, setFormData] = useState({
//     name: "",
//     city: "",
//     seating: "",
//     cuisineType: "",
//     avgCost: "",
//     amenities: [],
//     image: null,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAmenitiesChange = (e) => {
//     const { value, checked } = e.target;
//     setFormData((prev) => {
//       if (checked) {
//         return { ...prev, amenities: [...prev.amenities, value] };
//       } else {
//         return { ...prev, amenities: prev.amenities.filter((a) => a !== value) };
//       }
//     });
//   };

//   const handleImageChange = (e) => {
//     setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formDataToSend = new FormData();
//       formDataToSend.append("name", formData.name);
//       formDataToSend.append("city", formData.city);
//       formDataToSend.append("seating", formData.seating);
//       formDataToSend.append("cuisineType", formData.cuisineType);
//       formDataToSend.append("avgCost", formData.avgCost);

//       // Add amenities (multiple)
//       formData.amenities.forEach((amenity) =>
//         formDataToSend.append("amenities", amenity)
//       );

//       // Add image file
//       if (formData.image) {
//         formDataToSend.append("image", formData.image);
//       }

//       const res = await fetch("http://localhost:5000/api/restaurants/add", {  // ✅ Changed
//         method: "POST",
//         body: formDataToSend,
//       });

//       const data = await res.json();
//       if (res.ok) {
//         alert("Restaurant added successfully!");
//         console.log("Response:", data);
//       } else {
//         alert("Failed to add restaurant: " + data.error);
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       alert("Something went wrong!");
//     }
//   };

//   return (
//     <div
//       style={{
//         maxWidth: "500px",
//         margin: "40px auto",
//         padding: "20px",
//         border: "1px solid #cccccc",
//         borderRadius: "10px",
//         backgroundColor: "#5a59590f",
//         boxShadow: "0px 4px 8px rgba(255, 255, 255, 0.1)",
//       }}
//     >
//       <h2 style={{ textAlign: "center", color: "#ffffffff", marginBottom: "20px" }}>
//         Add Restaurant
//       </h2>
//       <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
//         {/* Restaurant Name */}
//         <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Restaurant Name:</label>
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//           style={{
//             padding: "8px",
//             marginBottom: "15px",
//             borderRadius: "5px",
//             border: "1px solid #000000ff",
//           }}
//         />

//         {/* City */}
//         <label style={{ marginBottom: "5px", fontWeight: "bold" }}>City:</label>
//         <input
//           type="text"
//           name="city"
//           value={formData.city}
//           onChange={handleChange}
//           required
//           style={{
//             padding: "8px",
//             marginBottom: "15px",
//             borderRadius: "5px",
//             border: "1px solid #000000ff",
//           }}
//         />

//         {/* Seating */}
//         <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Seating Capacity:</label>
//         <input
//           type="number"
//           name="seating"
//           value={formData.seating}
//           onChange={handleChange}
//           required
//           style={{
//             padding: "8px",
//             marginBottom: "15px",
//             borderRadius: "5px",
//             border: "1px solid #000000ff",
//           }}
//         />

//         {/* Cuisine Type */}
//         <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Cuisine Type:</label>
//         <input
//           type="text"
//           name="cuisineType"
//           value={formData.cuisineType}
//           onChange={handleChange}
//           required
//           style={{
//             padding: "8px",
//             marginBottom: "15px",
//             borderRadius: "5px",
//             border: "1px solid #000000ff",
//           }}
//         />

//         {/* Average Cost */}
//         <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Average Cost per Person:</label>
//         <input
//           type="number"
//           name="avgCost"
//           value={formData.avgCost}
//           onChange={handleChange}
//           required
//           style={{
//             padding: "8px",
//             marginBottom: "15px",
//             borderRadius: "5px",
//             border: "1px solid #000000ff",
//           }}
//         />

//         {/* Amenities */}
//         <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Amenities:</label>
//         <div style={{ marginBottom: "15px" }}>
//           <label style={{ marginRight: "10px" }}>
//             <input type="checkbox" value="WiFi" onChange={handleAmenitiesChange} /> WiFi
//           </label>
//           <label style={{ marginRight: "10px" }}>
//             <input type="checkbox" value="Parking" onChange={handleAmenitiesChange} /> Parking
//           </label>
//           <label>
//             <input type="checkbox" value="Outdoor Seating" onChange={handleAmenitiesChange} /> Outdoor Seating
//           </label>
//         </div>

//         {/* Upload Image */}
//         <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Upload Image:</label>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageChange}
//           style={{ marginBottom: "20px" }}
//         />

//         {/* Submit */}
//         <button
//           type="submit"
//           style={{
//             padding: "10px",
//             backgroundColor: "#4CAF50",
//             color: "#fff",
//             border: "none",
//             borderRadius: "5px",
//             cursor: "pointer",
//             fontSize: "16px",
//           }}
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }

import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_USERS, GET_ALL_LOCATIONS } from "../../graphql/queries";
import { CREATE_EVENT } from "../../graphql/mutations";

function Form() {
  const { data: usersData } = useQuery(GET_ALL_USERS);
  const { data: locationsData } = useQuery(GET_ALL_LOCATIONS);

  const [createEvent, { loading }] = useMutation(CREATE_EVENT);

  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    date: "",
    location_id: "",
    user_id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await createEvent({
        variables: {
          data: {
            title: formData.title,
            desc: formData.desc,
            date: formData.date,
            location_id: formData.location_id,
            user_id: formData.user_id,
          },
        },
      });

      console.log("Event created:", data.createEvent);

      setFormData({
        title: "",
        desc: "",
        location_id: "",
        date: "",
        user_id: "",
      });
    } catch (err) {
      console.error("Error while creating event:", err.message);
    }
  };

  return (
    <form className="events form" onSubmit={handleSubmit}>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <input
        className="input"
        type="text"
        name="title"
        placeholder="Title"
        disabled={loading}
        value={formData.title}
        onChange={handleChange}
      />
      <input
        className="input"
        type="text"
        name="desc"
        placeholder="Description"
        disabled={loading}
        value={formData.desc}
        onChange={handleChange}
      />
      <select
        className="input"
        name="location_id"
        disabled={loading}
        value={formData.location_id}
        onChange={handleChange}
      >
        <option value="">Select Location</option>
        {locationsData?.locations?.map((location) => (
          <option key={location.id} value={location.id}>
            {location.name}
          </option>
        ))}
      </select>
      <input
        className="input"
        type="datetime-local"
        name="date"
        disabled={loading}
        value={formData.date}
        onChange={handleChange}
      />

      <select
        className="input"
        name="user_id"
        disabled={loading}
        value={formData.user_id}
        onChange={handleChange}
      >
        <option value="">Select User</option>
        {usersData?.users?.map((user) => (
          <option key={user.id} value={user.id}>
            {user.username}
          </option>
        ))}
      </select>
      <button className="button" type="submit" disabled={loading}>
        {!loading ? "Add" : <span class="loader"></span>}
      </button>
      </div>
    </form>
  );
}

export default Form;

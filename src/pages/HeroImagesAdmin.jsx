import React, { useEffect, useState } from "react";
import { db } from "../firebase"; // Adjust if your firebase.js is in a different folder
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

const HeroImagesAdmin = () => {
  const [heroImages, setHeroImages] = useState([]);
  const [newHeroURL, setNewHeroURL] = useState("");
  const [editURL, setEditURL] = useState("");
  const [editDocId, setEditDocId] = useState(null);

  // Fetch all heroImages docs on initial load
  useEffect(() => {
    fetchHeroImages();
  }, []);

  const fetchHeroImages = async () => {
    try {
      const snapshot = await getDocs(collection(db, "heroImages"));
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHeroImages(items);
    } catch (error) {
      console.error("Error fetching hero images:", error);
    }
  };

  const handleAddHeroImage = async (e) => {
    e.preventDefault();
    if (!newHeroURL.trim()) return;

    try {
      // Add a new document with { url: "..." }
      await addDoc(collection(db, "heroImages"), { url: newHeroURL });
      setNewHeroURL("");
      await fetchHeroImages(); // Refresh list
    } catch (error) {
      console.error("Error adding hero image:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "heroImages", id));
      await fetchHeroImages();
    } catch (error) {
      console.error("Error deleting hero image:", error);
    }
  };

  const startEdit = (id, currentURL) => {
    setEditDocId(id);
    setEditURL(currentURL);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!editURL.trim()) return;

    try {
      await updateDoc(doc(db, "heroImages", editDocId), { url: editURL });
      setEditDocId(null);
      setEditURL("");
      await fetchHeroImages();
    } catch (error) {
      console.error("Error updating hero image:", error);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h3>Hero Images Admin</h3>

      {/* Add new hero image */}
      <form onSubmit={handleAddHeroImage} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Image URL"
          value={newHeroURL}
          onChange={(e) => setNewHeroURL(e.target.value)}
          style={{ marginRight: "0.5rem" }}
        />
        <button type="submit">Add</button>
      </form>

      {/* List existing */}
      {heroImages.map((item) => (
        <div key={item.id} style={{ marginBottom: "0.5rem" }}>
          {editDocId === item.id ? (
            <form onSubmit={handleEdit}>
              <input
                type="text"
                value={editURL}
                onChange={(e) => setEditURL(e.target.value)}
                style={{ marginRight: "0.5rem" }}
              />
              <button type="submit">Save</button>
              <button
                type="button"
                onClick={() => setEditDocId(null)}
                style={{ marginLeft: "0.5rem" }}
              >
                Cancel
              </button>
            </form>
          ) : (
            <>
              <img
                src={item.url}
                alt="hero"
                style={{ width: "60px", marginRight: "1rem" }}
              />
              {item.url}
              <button
                onClick={() => startEdit(item.id, item.url)}
                style={{ marginLeft: "1rem" }}
              >
                Edit
              </button>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default HeroImagesAdmin;

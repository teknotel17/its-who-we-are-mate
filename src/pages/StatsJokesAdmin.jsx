import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase"; // Adjust path if needed

function StatsJokesAdmin() {
  // This will store the jokes or stats from Firestore
  const [statsJokes, setStatsJokes] = useState([]);
  const [newJoke, setNewJoke] = useState("");
  const [editJoke, setEditJoke] = useState("");
  const [editDocId, setEditDocId] = useState(null);

  // Fetch statsJokes from Firestore on mount
  useEffect(() => {
    fetchStatsJokes();
  }, []);

  // READ
  const fetchStatsJokes = async () => {
    try {
      const snapshot = await getDocs(collection(db, "statsJokes"));
      // each doc has something like { text: "Tottenham conceded X times" }
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStatsJokes(items);
    } catch (error) {
      console.error("Error fetching statsJokes:", error);
    }
  };

  // CREATE
  const handleAddJoke = async (e) => {
    e.preventDefault();
    if (!newJoke.trim()) return;

    try {
      // Add a new doc with a field like { text: newJoke }
      await addDoc(collection(db, "statsJokes"), { text: newJoke });
      setNewJoke("");
      await fetchStatsJokes(); // refresh
    } catch (error) {
      console.error("Error adding joke:", error);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "statsJokes", id));
      await fetchStatsJokes(); // refresh
    } catch (error) {
      console.error("Error deleting joke:", error);
    }
  };

  // Start editing
  const startEdit = (id, currentText) => {
    setEditDocId(id);
    setEditJoke(currentText);
  };

  // UPDATE
  const handleEdit = async (e) => {
    e.preventDefault();
    if (!editJoke.trim()) return;

    try {
      await updateDoc(doc(db, "statsJokes", editDocId), { text: editJoke });
      setEditDocId(null);
      setEditJoke("");
      await fetchStatsJokes();
    } catch (error) {
      console.error("Error updating joke:", error);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h3>Stats & Jokes Admin</h3>

      {/* ADD NEW JOKE */}
      <form onSubmit={handleAddJoke} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Enter new joke or stat"
          value={newJoke}
          onChange={(e) => setNewJoke(e.target.value)}
          style={{ marginRight: "0.5rem" }}
        />
        <button type="submit">Add</button>
      </form>

      {/* DISPLAY EXISTING JOKES */}
      {statsJokes.map((item) => (
        <div key={item.id} style={{ marginBottom: "0.5rem" }}>
          {editDocId === item.id ? (
            // EDIT FORM
            <form onSubmit={handleEdit} style={{ display: "inline-flex" }}>
              <input
                type="text"
                value={editJoke}
                onChange={(e) => setEditJoke(e.target.value)}
                style={{ marginRight: "0.5rem" }}
              />
              <button type="submit" style={{ marginRight: "0.5rem" }}>
                Save
              </button>
              <button onClick={() => setEditDocId(null)}>Cancel</button>
            </form>
          ) : (
            // NORMAL VIEW
            <>
              {item.text}{" "}
              <button
                onClick={() => startEdit(item.id, item.text)}
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
}

export default StatsJokesAdmin;

import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

function EmbarrassingResultsAdmin() {
  const [results, setResults] = useState([]);
  const [newScore, setNewScore] = useState("");
  const [newDetails, setNewDetails] = useState("");
  const [newLink, setNewLink] = useState("");
  const [editDocId, setEditDocId] = useState(null);

  // For editing existing doc
  const [editScore, setEditScore] = useState("");
  const [editDetails, setEditDetails] = useState("");
  const [editLink, setEditLink] = useState("");

  useEffect(() => {
    fetchResults();
  }, []);

  // READ
  const fetchResults = async () => {
    try {
      const snapshot = await getDocs(collection(db, "embarrassingResults"));
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setResults(items);
    } catch (error) {
      console.error("Error fetching embarrassing results:", error);
    }
  };

  // CREATE
  const handleAddResult = async (e) => {
    e.preventDefault();
    if (!newScore.trim()) return;

    // If you want to ensure that the user provides details & link, you can also check newDetails.trim() and newLink.trim()
    try {
      await addDoc(collection(db, "embarrassingResults"), {
        score: newScore,
        details: newDetails,
        link: newLink,
      });
      // Clear the form
      setNewScore("");
      setNewDetails("");
      setNewLink("");
      // Refresh
      await fetchResults();
    } catch (error) {
      console.error("Error adding result:", error);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "embarrassingResults", id));
      await fetchResults();
    } catch (error) {
      console.error("Error deleting result:", error);
    }
  };

  // Start editing
  const startEdit = (item) => {
    setEditDocId(item.id);
    setEditScore(item.score);
    setEditDetails(item.details);
    setEditLink(item.link);
  };

  // UPDATE
  const handleEdit = async (e) => {
    e.preventDefault();
    if (!editScore.trim()) return;

    try {
      await updateDoc(doc(db, "embarrassingResults", editDocId), {
        score: editScore,
        details: editDetails,
        link: editLink,
      });
      setEditDocId(null);
      setEditScore("");
      setEditDetails("");
      setEditLink("");
      await fetchResults();
    } catch (error) {
      console.error("Error updating result:", error);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h3>Embarrassing Results Admin</h3>

      {/* ADD NEW RESULT */}
      <form onSubmit={handleAddResult} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Score (e.g. Arsenal 5 - 2 Spurs)"
          value={newScore}
          onChange={(e) => setNewScore(e.target.value)}
          style={{ marginRight: "0.5rem" }}
        />
        <input
          type="text"
          placeholder="Details (e.g. Last minute meltdown...)"
          value={newDetails}
          onChange={(e) => setNewDetails(e.target.value)}
          style={{ marginRight: "0.5rem" }}
        />
        <input
          type="text"
          placeholder="Link (optional)"
          value={newLink}
          onChange={(e) => setNewLink(e.target.value)}
          style={{ marginRight: "0.5rem" }}
        />
        <button type="submit">Add</button>
      </form>

      {/* DISPLAY EXISTING RESULTS */}
      {results.map((item) => (
        <div key={item.id} style={{ marginBottom: "0.5rem" }}>
          {editDocId === item.id ? (
            // EDIT FORM
            <form onSubmit={handleEdit} style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              <input
                type="text"
                value={editScore}
                onChange={(e) => setEditScore(e.target.value)}
              />
              <input
                type="text"
                value={editDetails}
                onChange={(e) => setEditDetails(e.target.value)}
              />
              <input
                type="text"
                value={editLink}
                onChange={(e) => setEditLink(e.target.value)}
              />
              <button type="submit">Save</button>
              <button onClick={() => setEditDocId(null)}>Cancel</button>
            </form>
          ) : (
            // NORMAL VIEW
            <>
              <strong>{item.score}</strong> - {item.details}
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginLeft: "0.5rem", color: "blue" }}
                >
                  Link
                </a>
              )}
              <button
                onClick={() => startEdit(item)}
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

export default EmbarrassingResultsAdmin;

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

function DVDClipsAdmin() {
  const [clips, setClips] = useState([]);
  const [newClipURL, setNewClipURL] = useState("");

  // For editing
  const [editDocId, setEditDocId] = useState(null);
  const [editURL, setEditURL] = useState("");

  useEffect(() => {
    fetchClips();
  }, []);

  // READ
  const fetchClips = async () => {
    try {
      const snapshot = await getDocs(collection(db, "dvdClips"));
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setClips(items);
    } catch (error) {
      console.error("Error fetching DVD clips:", error);
    }
  };

  // CREATE
  const handleAddClip = async (e) => {
    e.preventDefault();
    if (!newClipURL.trim()) return;

    try {
      await addDoc(collection(db, "dvdClips"), { url: newClipURL });
      setNewClipURL("");
      await fetchClips();
    } catch (error) {
      console.error("Error adding DVD clip:", error);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "dvdClips", id));
      fetchClips();
    } catch (error) {
      console.error("Error deleting DVD clip:", error);
    }
  };

  // Start editing
  const startEdit = (id, currentURL) => {
    setEditDocId(id);
    setEditURL(currentURL);
  };

  // UPDATE
  const handleEdit = async (e) => {
    e.preventDefault();
    if (!editURL.trim()) return;

    try {
      await updateDoc(doc(db, "dvdClips", editDocId), { url: editURL });
      setEditDocId(null);
      setEditURL("");
      await fetchClips();
    } catch (error) {
      console.error("Error updating DVD clip:", error);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h3>DVD Clips Admin</h3>

      {/* ADD NEW CLIP */}
      <form onSubmit={handleAddClip} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Enter new clip URL"
          value={newClipURL}
          onChange={(e) => setNewClipURL(e.target.value)}
          style={{ marginRight: "0.5rem" }}
        />
        <button type="submit">Add Clip</button>
      </form>

      {/* DISPLAY CLIPS */}
      {clips.map((item) => (
        <div key={item.id} style={{ marginBottom: "0.5rem" }}>
          {editDocId === item.id ? (
            // EDIT FORM
            <form onSubmit={handleEdit} style={{ display: "inline-flex" }}>
              <input
                type="text"
                value={editURL}
                onChange={(e) => setEditURL(e.target.value)}
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
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "blue", marginRight: "0.5rem" }}
              >
                {item.url}
              </a>
              <button onClick={() => startEdit(item.id, item.url)}>
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

export default DVDClipsAdmin;

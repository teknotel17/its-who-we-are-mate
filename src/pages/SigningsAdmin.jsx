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

function SigningsAdmin() {
  const [signings, setSignings] = useState([]);

  // CREATE - new signing fields
  const [newName, setNewName] = useState("");
  const [newWiki, setNewWiki] = useState("");
  const [newYear, setNewYear] = useState("");
  const [newFee, setNewFee] = useState("");
  const [newApps, setNewApps] = useState("");
  const [newGoals, setNewGoals] = useState("");
  const [newAssists, setNewAssists] = useState("");
  const [newImage, setNewImage] = useState("");
  const [newBio, setNewBio] = useState("");
  const [newPosition, setNewPosition] = useState("");
  const [newExclude, setNewExclude] = useState(false);

  // EDIT
  const [editDocId, setEditDocId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editWiki, setEditWiki] = useState("");
  const [editYear, setEditYear] = useState("");
  const [editFee, setEditFee] = useState("");
  const [editApps, setEditApps] = useState("");
  const [editGoals, setEditGoals] = useState("");
  const [editAssists, setEditAssists] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editBio, setEditBio] = useState("");
const [editPosition, setEditPosition] = useState("");
const [editExclude, setEditExclude] = useState(false);

  useEffect(() => {
    fetchSignings();
  }, []);

  // READ
  const fetchSignings = async () => {
    try {
      const snapshot = await getDocs(collection(db, "signings"));
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSignings(items);
    } catch (error) {
      console.error("Error fetching signings:", error);
    }
  };

  // CREATE
  const handleAddSigning = async (e) => {
    e.preventDefault();
    if (!newName.trim()) return; // minimal check for a name

    // Build the doc object
    const newSigningDoc = {
      name: newName,
      wiki: newWiki,
      year: newYear,
      fee: newFee,
      apps: Number(newApps) || 0,
      goals: Number(newGoals) || 0,
      assists: Number(newAssists) || 0,
      image: newImage,
      bio: newBio,
      position: newPosition,
      excludeFromSOTS: newExclude,

    };

    try {
      await addDoc(collection(db, "signings"), newSigningDoc);
      // Clear fields
      setNewName("");
      setNewWiki("");
      setNewYear("");
      setNewFee("");
      setNewApps("");
      setNewGoals("");
      setNewAssists("");
      setNewImage("");
      setNewBio("");
      // Refresh
      fetchSignings();
    } catch (error) {
      console.error("Error adding signing:", error);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "signings", id));
      fetchSignings();
    } catch (error) {
      console.error("Error deleting signing:", error);
    }
  };

  // Start editing
  const startEdit = (item) => {
    setEditDocId(item.id);
    setEditName(item.name || "");
    setEditWiki(item.wiki || "");
    setEditYear(item.year || "");
    setEditFee(item.fee || "");
    setEditApps(item.apps || "");
    setEditGoals(item.goals || "");
    setEditAssists(item.assists || "");
    setEditImage(item.image || "");
    setEditBio(item.bio || "");
    setEditPosition(item.position || "");
    setEditExclude(item.excludeFromSOTS || false);

  };

  // UPDATE
  const handleEdit = async (e) => {
    e.preventDefault();
    if (!editName.trim()) return;

    const updatedSigningDoc = {
      name: editName,
      wiki: editWiki,
      year: editYear,
      fee: editFee,
      apps: Number(editApps) || 0,
      goals: Number(editGoals) || 0,
      assists: Number(editAssists) || 0,
      image: editImage,
      bio: editBio,
      position: editPosition,
      excludeFromSOTS: editExclude,

    };

    try {
      await updateDoc(doc(db, "signings", editDocId), updatedSigningDoc);
      // Clear edit state
      setEditDocId(null);
      setEditName("");
      setEditWiki("");
      setEditYear("");
      setEditFee("");
      setEditApps("");
      setEditGoals("");
      setEditAssists("");
      setEditImage("");
      setEditBio("");
      // Refresh
      fetchSignings();
    } catch (error) {
      console.error("Error updating signing:", error);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h3>Signings Admin</h3>

      {/* CREATE - Add new signing */}
      <form onSubmit={handleAddSigning} style={{ marginBottom: "1rem", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
  <input
    type="text"
    placeholder="Name"
    value={newName}
    onChange={(e) => setNewName(e.target.value)}
  />
  <input
    type="text"
    placeholder="Wiki Link"
    value={newWiki}
    onChange={(e) => setNewWiki(e.target.value)}
  />
  <input
    type="text"
    placeholder="Year"
    value={newYear}
    onChange={(e) => setNewYear(e.target.value)}
  />
  <input
    type="text"
    placeholder="Fee"
    value={newFee}
    onChange={(e) => setNewFee(e.target.value)}
  />
  <input
    type="number"
    placeholder="Apps"
    value={newApps}
    onChange={(e) => setNewApps(e.target.value)}
    style={{ width: "70px" }}
  />
  <input
    type="number"
    placeholder="Goals"
    value={newGoals}
    onChange={(e) => setNewGoals(e.target.value)}
    style={{ width: "70px" }}
  />
  <input
    type="number"
    placeholder="Assists"
    value={newAssists}
    onChange={(e) => setNewAssists(e.target.value)}
    style={{ width: "70px" }}
  />
  <input
    type="text"
    placeholder="Image URL"
    value={newImage}
    onChange={(e) => setNewImage(e.target.value)}
  />
  <input
    type="text"
    placeholder="Bio"
    value={newBio}
    onChange={(e) => setNewBio(e.target.value)}
  />

  {/* ✅ Position Dropdown */}
  <select
    value={newPosition}
    onChange={(e) => setNewPosition(e.target.value)}
    required
  >
    <option value="">Select Position</option>
    <option value="GK">GK</option>
    <option value="DF">DF</option>
    <option value="MD">MD</option>
    <option value="AT">AT</option>
  </select>
  <label>
  <input
    type="checkbox"
    checked={newExclude}
    onChange={(e) => setNewExclude(e.target.checked)}
    style={{ marginRight: "0.3rem" }}
  />
  Exclude from Signing of the Season
</label>

  <button type="submit">Add Signing</button>
</form>


      {/* READ & UPDATE */}
      {signings.map((item) => (
        <div key={item.id} style={{ marginBottom: "0.5rem" }}>
          {editDocId === item.id ? (
            // EDIT FORM
            <form onSubmit={handleEdit} style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
              <input
                type="text"
                value={editWiki}
                onChange={(e) => setEditWiki(e.target.value)}
              />
              <input
                type="text"
                value={editYear}
                onChange={(e) => setEditYear(e.target.value)}
              />
              <input
                type="text"
                value={editFee}
                onChange={(e) => setEditFee(e.target.value)}
              />
              <input
                type="number"
                value={editApps}
                onChange={(e) => setEditApps(e.target.value)}
                style={{ width: "70px" }}
              />
              <input
                type="number"
                value={editGoals}
                onChange={(e) => setEditGoals(e.target.value)}
                style={{ width: "70px" }}
              />
              <input
                type="number"
                value={editAssists}
                onChange={(e) => setEditAssists(e.target.value)}
                style={{ width: "70px" }}
              />
              <input
                type="text"
                value={editImage}
                onChange={(e) => setEditImage(e.target.value)}
              />
              <input
                type="text"
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
              />
              <select
  value={editPosition}
  onChange={(e) => setEditPosition(e.target.value)}
  required
>
  <option value="">Select Position</option>
  <option value="GK">GK</option>
  <option value="DF">DF</option>
  <option value="MD">MD</option>
  <option value="AT">AT</option>
</select>
<label>
  <input
    type="checkbox"
    checked={editExclude}
    onChange={(e) => setEditExclude(e.target.checked)}
    style={{ marginRight: "0.3rem" }}
  />
  Exclude from Signing of the Season
</label>

              <button type="submit">Save</button>
              <button onClick={() => setEditDocId(null)}>Cancel</button>
            </form>
          ) : (
            // NORMAL VIEW
            <>
              <strong>{item.name}</strong> ({item.year}) - {item.fee}<br/>
              Apps: {item.apps} | Goals: {item.goals} | Assists: {item.assists}<br/>
              <em>{item.bio}</em><br/>
              {item.wiki && (
                <a
                  href={item.wiki}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "blue", marginRight: "0.5rem" }}
                >
                  Wiki
                </a>
              )}
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "60px",
                    height: "auto",
                    marginLeft: "0.5rem",
                    border: "1px solid #ccc",
                  }}
                />
              )}
              <button
                onClick={() => startEdit(item)}
                style={{ marginLeft: "0.5rem" }}
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

export default SigningsAdmin;

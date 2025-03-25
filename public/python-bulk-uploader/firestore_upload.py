import pandas as pd
import firebase_admin
from firebase_admin import credentials, firestore
import uuid
from datetime import datetime

# Authenticate with Firebase
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# Helper to generate createdAt timestamps
def now():
    return datetime.utcnow().isoformat()

# Upload hero images
def upload_hero_images():
    df = pd.read_csv("spurs_hero_images.csv")
    for _, row in df.iterrows():
        doc = {
            "headline": row["headline"],
            "url": row["image_url"],
            "createdAt": now()
        }
        db.collection("heroImages").add(doc)

# Upload banter content
def upload_banter():
    df = pd.read_csv("spurs_banter_content.csv")
    for _, row in df.iterrows():
        doc = {
            "id": row["id"] if "id" in row else str(uuid.uuid4()),
            "content": row["content"],
            "category": row.get("category", ""),
            "createdAt": now()
        }
        db.collection("statsJokes").document(doc["id"]).set(doc)

# Upload embarrassing results
def upload_results():
    df = pd.read_csv("spurs_embarrassing_results.csv")
    for _, row in df.iterrows():
        doc = {
            "score": row["score"],
            "details": row["headline"],
            "link": row["match_link"],
            "notes": row.get("notes", ""),
            "createdAt": now()
        }
        db.collection("embarrassingResults").add(doc)

# Upload worst signings
def upload_signings():
    df = pd.read_csv("spurs_worst_signings.csv")
    for _, row in df.iterrows():
        doc = {
            "name": row["name"],
            "year": str(row["year_signed"]),
            "fee": row["fee"],
            "apps": int(row["appearances"]),
            "goals": int(row["goals"]),
            "assists": int(row["assists"]),
            "bio": row["mini_bio"],
            "wiki": row["wiki_link"],
            "image": row["image_url"],
            "createdAt": now()
        }
        db.collection("signings").add(doc)

# Run all uploads
if __name__ == "__main__":
    upload_hero_images()
    upload_banter()
    upload_results()
    upload_signings()
    print("✅ All content uploaded to Firestore!")

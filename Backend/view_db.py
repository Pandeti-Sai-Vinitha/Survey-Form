import sqlite3
import json

DB_PATH = "survey.db"

def print_all_responses():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("SELECT id, user_id, answers, submitted_at FROM responses")
    rows = c.fetchall()
    conn.close()
    for row in rows:
        print(f"ID: {row[0]}")
        print(f"User ID: {row[1]}")
        print(f"Answers: {json.dumps(json.loads(row[2]), indent=2)}")
        print(f"Submitted At: {row[3]}")
        print("-" * 40)

if __name__ == "__main__":
    print_all_responses()

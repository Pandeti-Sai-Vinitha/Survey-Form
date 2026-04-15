import sqlite3

DB_PATH = "./survey.db"

# Database initialization
def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS responses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            project_name TEXT NOT NULL,
            q1 TEXT, q2 TEXT, q3 TEXT, q4 TEXT, q5 TEXT, q6 TEXT, q7 TEXT, q8 TEXT, q9 TEXT,
            q10 TEXT, q11 TEXT, q12 TEXT, q13 TEXT, q14 TEXT, q15 TEXT, q16 TEXT, q17 TEXT, q18 TEXT, q19 TEXT,
            submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

def insert_response(response):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute(
        """
        INSERT INTO responses (
            name, project_name, q1, q2, q3, q4, q5, q6, q7, q8, q9,
            q10, q11, q12, q13, q14, q15, q16, q17, q18, q19
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        [
            response.name,
            response.project_name,
            response.q1, response.q2, response.q3, response.q4, response.q5, response.q6, response.q7, response.q8, response.q9,
            response.q10, response.q11, response.q12, response.q13, response.q14, response.q15, response.q16, response.q17, response.q18, response.q19
        ]
    )
    conn.commit()
    conn.close()

def get_all_responses():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("SELECT * FROM responses")
    rows = c.fetchall()
    columns = [desc[0] for desc in c.description]
    conn.close()
    return [dict(zip(columns, row)) for row in rows]

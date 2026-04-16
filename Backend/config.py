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
            q1_answer TEXT, q1_score INTEGER,
            q2_answer TEXT, q2_score INTEGER,
            q3_answer TEXT, q3_score INTEGER,
            q4_answer TEXT, q4_score INTEGER,
            q5_answer TEXT, q5_score INTEGER,
            q6_answer TEXT, q6_score INTEGER,
            q7_answer TEXT, q7_score INTEGER,
            q8_answer TEXT, q8_score INTEGER,
            q9_answer TEXT, q9_score INTEGER,
            q10_answer TEXT, q10_score INTEGER,
            q11_answer TEXT, q11_score INTEGER,
            q12_answer TEXT, q12_score INTEGER,
            q13_answer TEXT, q13_score INTEGER,
            q14_answer TEXT, q14_score INTEGER,
            q15_answer TEXT, q15_score INTEGER,
            q16_answer TEXT, q16_score INTEGER,
            q17_answer TEXT, q17_score INTEGER,
            q18_answer TEXT, q18_score INTEGER,
            q19_answer TEXT, q19_score INTEGER,
            submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

def insert_response(response):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute(
        '''
        INSERT INTO responses (
            name, project_name,
            q1_answer, q1_score, q2_answer, q2_score, q3_answer, q3_score, q4_answer, q4_score, q5_answer, q5_score,
            q6_answer, q6_score, q7_answer, q7_score, q8_answer, q8_score, q9_answer, q9_score, q10_answer, q10_score,
            q11_answer, q11_score, q12_answer, q12_score, q13_answer, q13_score, q14_answer, q14_score, q15_answer, q15_score,
            q16_answer, q16_score, q17_answer, q17_score, q18_answer, q18_score, q19_answer, q19_score
        ) VALUES (
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
        )
        ''',
        [
            response.name,
            response.project_name,
            response.q1_answer, response.q1_score,
            response.q2_answer, response.q2_score,
            response.q3_answer, response.q3_score,
            response.q4_answer, response.q4_score,
            response.q5_answer, response.q5_score,
            response.q6_answer, response.q6_score,
            response.q7_answer, response.q7_score,
            response.q8_answer, response.q8_score,
            response.q9_answer, response.q9_score,
            response.q10_answer, response.q10_score,
            response.q11_answer, response.q11_score,
            response.q12_answer, response.q12_score,
            response.q13_answer, response.q13_score,
            response.q14_answer, response.q14_score,
            response.q15_answer, response.q15_score,
            response.q16_answer, response.q16_score,
            response.q17_answer, response.q17_score,
            response.q18_answer, response.q18_score,
            response.q19_answer, response.q19_score
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

// csvUtils.ts
export async function fetchQuestionsCSV(): Promise<any[]> {
  const response = await fetch('/questions.csv');
  const text = await response.text();
  const lines = text.trim().split(/\r?\n/);
  const headers = lines[0].split(',');
  return lines.slice(1).map(line => {
    const cols = line.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/);
    const obj: any = {};
    headers.forEach((h, i) => {
      obj[h] = cols[i]?.replace(/^"|"$/g, '');
    });
    return obj;
  });
}

export function groupQuestionsByDimension(rows: any[]) {
  const dimensions: Record<string, { id: number, name: string, questions: any[] }> = {};
  let dimId = 1;
  rows.forEach(row => {
    if (!dimensions[row.dimension]) {
      dimensions[row.dimension] = { id: dimId++, name: row.dimension, questions: [] };
    }
    dimensions[row.dimension].questions.push({
      id: row.id,
      text: row.question,
      choices: [
        { id: 'A', label: 'A', description: row.choice_a, score: Number(row.score_a) },
        { id: 'B', label: 'B', description: row.choice_b, score: Number(row.score_b) },
        { id: 'C', label: 'C', description: row.choice_c, score: Number(row.score_c) },
        { id: 'D', label: 'D', description: row.choice_d, score: Number(row.score_d) },
      ]
    });
  });
  return Object.values(dimensions);
}

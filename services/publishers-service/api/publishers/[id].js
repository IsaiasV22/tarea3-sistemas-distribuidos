import { createClient } from "@libsql/client";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function parsePublisher(row) {
  if (!row) return row;
  return { ...row, books: row.books ? JSON.parse(row.books) : [] };
}

async function findPublisher(id) {
  const result = await client.execute({
    sql: "SELECT * FROM publishers WHERE id = ?",
    args: [id],
  });
  return parsePublisher(result.rows[0]);
}

export default async function handler(req, res) {
  setCors(res);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { id } = req.query;

  try {
    if (req.method === "GET") {
      const publisher = await findPublisher(id);
      if (!publisher)
        return res.status(404).json({ error: "Publisher not found" });
      return res.status(200).json(publisher);
    }

    return res.status(404).json({ error: "Not found" });
  } catch (err) {
    return res.status(500).json({ error: "Server error: " + err.message });
  }
}

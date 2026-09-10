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

export default async function handler(req, res) {
  setCors(res);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    if (req.method === "GET") {
      const result = await client.execute("SELECT * FROM publishers");
      return res.status(200).json(result.rows.map(parsePublisher));
    }

    return res.status(404).json({ error: "Not found" });
  } catch (err) {
    return res.status(500).json({ error: "Server error: " + err.message });
  }
}

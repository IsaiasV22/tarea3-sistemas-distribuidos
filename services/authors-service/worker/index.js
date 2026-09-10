const BASE = "/api/authors";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function json(data, status = 200) {
  return new Response(data === undefined ? null : JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders() },
  });
}

function parseAuthor(row) {
  if (!row) return row;
  return { ...row, books: row.books ? JSON.parse(row.books) : [] };
}

async function findAuthor(db, id) {
  const row = await db
    .prepare("SELECT * FROM authors WHERE id = ?")
    .bind(id)
    .first();
  return parseAuthor(row);
}

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders() });
    }

    if (!pathname.startsWith(BASE)) {
      return new Response("Not found", { status: 404, headers: corsHeaders() });
    }

    const id = pathname.slice(BASE.length).replace(/^\/+/, "") || null;
    const db = env.DB;

    try {
      if (request.method === "GET" && !id) {
        const { results } = await db.prepare("SELECT * FROM authors").all();
        return json(results.map(parseAuthor));
      }

      if (request.method === "GET" && id) {
        const author = await findAuthor(db, id);
        if (!author)
          return new Response("Author not found", {
            status: 404,
            headers: corsHeaders(),
          });
        return json(author);
      }

      return new Response("Not found", { status: 404, headers: corsHeaders() });
    } catch (err) {
      return new Response("Server error: " + err.message, {
        status: 500,
        headers: corsHeaders(),
      });
    }
  },
};

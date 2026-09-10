const { neon } = require("@neondatabase/serverless");

const sql = neon(process.env.DATABASE_URL);

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function json(data, statusCode = 200) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json", ...corsHeaders() },
    body: data === undefined ? "" : JSON.stringify(data),
  };
}

function reviewId(event) {
  const parts = event.path.split("/").filter(Boolean);
  const idx = parts.indexOf("reviews");
  return parts[idx + 1] || null;
}

async function findReview(id) {
  const rows = await sql`SELECT * FROM reviews WHERE id = ${id}`;
  return rows[0];
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: corsHeaders(), body: "" };
  }

  const id = reviewId(event);

  try {
    if (event.httpMethod === "GET" && !id) {
      const rows = await sql`SELECT * FROM reviews ORDER BY id::integer`;
      return json(rows);
    }

    if (event.httpMethod === "GET" && id) {
      const review = await findReview(id);
      if (!review) return json({ error: "Review not found" }, 404);
      return json(review);
    }

    return json({ error: "Not found" }, 404);
  } catch (err) {
    return json({ error: "Server error: " + err.message }, 500);
  }
};

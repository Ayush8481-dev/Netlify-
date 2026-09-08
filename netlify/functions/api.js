export default async (req) => {
  try {
    const requestUrl = new URL(req.url);
    const targetUrl = requestUrl.searchParams.get("url");

    if (!targetUrl) {
      return new Response(
        JSON.stringify({ error: "Missing url parameter" }), 
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const response = await fetch(targetUrl);
    // Convert headers to a readable JSON format
    const headersObj = Object.fromEntries(response.headers);

    return new Response(
      JSON.stringify({ target_url: targetUrl, headers: headersObj }, null, 2), 
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }), 
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

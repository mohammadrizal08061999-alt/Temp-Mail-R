const UPSTREAM = "https://api.guerrillamail.com/ajax.php";
const ALLOWED = new Set(["get_email_address","set_email_user","check_email","get_email_list","fetch_email","extend","forget_me"]);
function json(data,status=200,headers={}) {
  return new Response(JSON.stringify(data),{status,headers:{"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store",...headers}});
}
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname !== "/api") return env.ASSETS.fetch(request);
    if (request.method !== "GET") return json({error:"Method not allowed"},405);
    const incoming = url.searchParams;
    const fn = incoming.get("f") || "";
    if (!ALLOWED.has(fn)) return json({error:"Unsupported API function"},400);
    const upstreamUrl = new URL(UPSTREAM);
    for (const [key,value] of incoming) {
      if (key !== "f" && ["email_user","email_id","seq","offset","lang","email_addr"].includes(key)) upstreamUrl.searchParams.set(key,value);
    }
    upstreamUrl.searchParams.set("f",fn);
    upstreamUrl.searchParams.set("ip",request.headers.get("CF-Connecting-IP") || "0.0.0.0");
    upstreamUrl.searchParams.set("agent",(request.headers.get("User-Agent") || "Temp-Mail-R").slice(0,160));
    const cookieParts=[];
    const browserCookie=request.headers.get("Cookie") || "";
    for (const name of ["PHPSESSID","SUBSCR"]) {
      const match=browserCookie.match(new RegExp("(?:^|;\\s*)"+name+"=([^;]+)"));
      if (match) cookieParts.push(name+"="+match[1]);
    }
    const headers={"Accept":"application/json","User-Agent":"Temp-Mail-R QA client"};
    if(cookieParts.length) headers.Cookie=cookieParts.join("; ");
    try {
      const upstream=await fetch(upstreamUrl.toString(),{headers,redirect:"follow"});
      const body=await upstream.text();
      let payload;
      try { payload=JSON.parse(body); } catch { return json({error:"Penyedia email mengembalikan respons yang tidak dikenali.",detail:body.slice(0,180)},502); }
      const setCookies=upstream.headers.get("Set-Cookie") || "";
      const forwarded=[];
      for(const name of ["PHPSESSID","SUBSCR"]) {
        const match=setCookies.match(new RegExp("(?:^|,\\s*)"+name+"=([^;,]+)"));
        if(match) forwarded.push(name+"="+match[1]+"; Path=/; Secure; HttpOnly; SameSite=Lax"+(name==="PHPSESSID"?"; Max-Age=3600":""));
      }
      const responseHeaders={};
      if(forwarded.length) responseHeaders["Set-Cookie"]=forwarded.join(", ");
      return json(payload,upstream.ok?200:upstream.status,responseHeaders);
    } catch(e) {
      return json({error:"Tidak dapat terhubung ke layanan Guerrilla Mail.",detail:String(e).slice(0,180)},502);
    }
  }
};
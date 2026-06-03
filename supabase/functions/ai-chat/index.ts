import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "messages array required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    // Fetch services from DB for context
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: services } = await supabase
      .from("services")
      .select("title, description, intro, duration, includes, extras, not_included")
      .order("sort_order");

    const servicesContext = (services || []).map((s: any) =>
      `**${s.title}**\nDescription: ${s.description}\nIntro: ${s.intro}\nDuration: ${s.duration}\nIncludes: ${(s.includes || []).join(", ")}\nExtras: ${(s.extras || []).join(", ")}\nNot Included: ${(s.not_included || []).join(", ")}`
    ).join("\n\n---\n\n");

    const systemPrompt = `You are a friendly, professional customer service assistant for WeHome Cleaning, a premium residential and vacation rental cleaning company serving North Carolina and Massachusetts. You answer questions ONLY in English.

About WeHome Cleaning:
- Premium cleaning company specializing in residential homes, Airbnb / vacation rentals, deep cleaning, move-in/move-out, and recurring maintenance.
- Coverage: 100+ ZIP codes across Charlotte Metro (Charlotte, Huntersville, Waxhaw), the Carolinas, and Massachusetts.
- Family-owned, fully insured, eco-friendly products that are safe for families and pets.
- Trusted by 400+ monthly clients with a 5.0 star rating.
- Tagline: "Your home is our priority."

Our services (live from the database):
${servicesContext || "No services found in database."}

Key information:
- Phone: (941) 355-0000
- Instagram: @allshine_up | Facebook: All-Shine-Up
- Satisfaction Guarantee: if anything does not meet expectations, notify us within 24 hours and our team returns at no additional cost.
- Referral Program: clients receive a $50 service credit when a referred client starts recurring cleaning with WeHome.
- Photos & Videos: we may take before/after photos for quality and marketing — never showing faces, documents, or personal details. Clients can opt out.

Guidelines:
- Be warm, helpful, and concise (2-4 sentences unless more detail is requested).
- Answer questions about WeHome services using the data above.
- For pricing, explain we provide custom quotes based on home size, frequency, and add-ons.
- ALWAYS guide users to request a free, no-obligation quote: suggest clicking "Get a Free Quote" or visiting /quote.
- If asked about service availability, mention our coverage areas and point users to /service-areas.
- If asked about anything unrelated to cleaning, politely redirect back to how WeHome can help with their home.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages.slice(-10), // last 10 messages for context
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Too many requests. Please try again in a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

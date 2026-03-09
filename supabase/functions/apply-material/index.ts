import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64, mediaType, productName, productCode, productColor, productFinish, surfaces } = await req.json();

    if (!imageBase64) {
      return new Response(JSON.stringify({ error: "Imagem não fornecida" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const surfaceDescriptions: Record<string, string> = {
      parede_frontal: "the main/front wall",
      parede_lateral: "the side wall(s)",
      teto: "the ceiling",
      piso: "the floor",
      area_externa: "the exterior surface",
    };

    const surfaceList = (surfaces || ["parede_frontal"])
      .map((s: string) => surfaceDescriptions[s] || s)
      .join(" and ");

    const finishDesc = productFinish?.toLowerCase().includes("ripado")
      ? "vertical grooved/fluted wood slat panels with deep parallel grooves"
      : productFinish?.toLowerCase().includes("liso")
      ? "smooth large-format panels with subtle wood grain texture"
      : productFinish?.toLowerCase().includes("deck")
      ? "horizontal deck-style textured wood composite boards"
      : "wood-style wall panels";

    const prompt = `You are an expert interior designer and photo editor. Edit this room photo to apply ${finishDesc} on ${surfaceList}. 

The material is "${productName}" (code ${productCode}) with color approximately ${productColor} and finish style "${productFinish || 'wood panel'}".

CRITICAL INSTRUCTIONS:
- Keep the EXACT same room, furniture, objects, lighting, and perspective from the original photo
- ONLY replace the surface material on ${surfaceList} with the described panels
- Make it look photorealistic, as if the panels were actually installed
- Maintain proper shadows, reflections, and lighting consistency
- The panels should follow the wall/surface geometry and perspective correctly
- Do NOT change anything else in the room - keep all furniture, decorations, and layout identical
- The result should look like a professional interior design render`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: prompt },
              {
                type: "image_url",
                image_url: {
                  url: `data:${mediaType || "image/jpeg"};base64,${imageBase64}`,
                },
              },
            ],
          },
        ],
        modalities: ["image", "text"],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Muitas requisições. Tente novamente em alguns segundos." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Créditos de IA esgotados." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const imageResult = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;

    if (!imageResult) {
      console.error("No image in response:", JSON.stringify(data).slice(0, 500));
      return new Response(
        JSON.stringify({ error: "A IA não conseguiu gerar a imagem editada. Tente novamente." }),
        { status: 422, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ editedImage: imageResult }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("apply-material error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Erro desconhecido" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

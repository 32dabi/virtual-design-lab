import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const PRODUCT_CODES = [
  "LTM 88696", "LTM 88676", "LTD 89015", "LTM88626", "512601", "LT00987",
  "KT 1073", "KT 1071", "LTM 8032", "X89-248", "LTJCW2016",
  "LTM88614", "LTM88631", "LTM88653", "LTM88634", "LTM 88676-forro",
  "WPC-CW", "WPC-TK",
];

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64, mediaType } = await req.json();

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

    const systemPrompt = `Você é um consultor de design de interiores da ELEVARE, empresa de painéis ripados WPC e revestimentos Bamboo Carbon em Teresina-PI. Analise a foto de um ambiente enviada pelo cliente.`;

    const userPrompt = `Analise esta foto de um ambiente e retorne APENAS um JSON válido (sem markdown, sem explicação, sem backticks) com a seguinte estrutura:
{
  "tipo_comodo": string (ex: "quarto", "sala de estar", "escritório", "recepção", "cozinha", "banheiro", "varanda", "restaurante", "loja"),
  "categoria": "residencial" | "comercial",
  "superficies_visiveis": array de strings (ex: ["parede_frontal", "parede_lateral", "teto", "piso"]),
  "iluminacao": "natural" | "artificial" | "mista",
  "estilo_atual": string (ex: "moderno", "clássico", "industrial", "minimalista", "rústico"),
  "sugestoes_produtos": array com 3-5 códigos dos melhores produtos para este ambiente, escolhendo entre: ${PRODUCT_CODES.join(", ")},
  "descricao_ambiente": string curta descrevendo o que vê na foto,
  "recomendacao": string com sugestão personalizada de como aplicar os painéis ELEVARE neste ambiente
}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: [
              {
                type: "image_url",
                image_url: {
                  url: `data:${mediaType || "image/jpeg"};base64,${imageBase64}`,
                },
              },
              { type: "text", text: userPrompt },
            ],
          },
        ],
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
    const rawContent = data.choices?.[0]?.message?.content || "";

    // Try to parse JSON from the response
    let analysis;
    try {
      // Remove any markdown code blocks if present
      const cleaned = rawContent.replace(/```json?\n?/g, "").replace(/```/g, "").trim();
      analysis = JSON.parse(cleaned);
    } catch {
      console.error("Failed to parse AI response:", rawContent);
      return new Response(
        JSON.stringify({
          error: "Não foi possível analisar o ambiente. Tente novamente.",
          raw: rawContent,
        }),
        { status: 422, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify(analysis), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("analyze-room error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Erro desconhecido" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

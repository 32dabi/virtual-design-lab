import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const ROOM_PROMPTS: Record<string, string> = {
  "escritorio-nogueira":
    "Professional interior photography of a modern executive office with a large wooden desk, leather executive chair, and bookshelves. The main accent wall behind the desk features elegant dark walnut vertical slatted wood panels (ripado) with warm brown tones. Warm ambient lighting, minimalist decor, plants. 4K, photorealistic, architectural digest style.",
  "recepcao-nero":
    "Professional interior photography of a sleek corporate reception lobby with a white reception counter, waiting area with modern armchairs. The tall wall behind the reception features dramatic dark marble-pattern vertical slatted panels (ripado) in deep black with white veining. Polished floor, recessed lighting. 4K, photorealistic.",
  "clinica-tiffany":
    "Professional interior photography of a clean, bright medical clinic waiting room with comfortable chairs and a coffee table. One accent wall features elegant light blue-green (tiffany) vertical slatted panels (ripado), creating a calming atmosphere. White floors, soft LED lighting, minimal decor. 4K, photorealistic.",
  "copa-carvalho":
    "Professional interior photography of a modern office break room / coffee area with a kitchenette counter, bar stools, coffee machine. The back wall features warm natural oak vertical slatted wood panels (ripado) in light honey color. Pendant lights, plants, cozy atmosphere. 4K, photorealistic.",
  "reunioes-preto":
    "Professional interior photography of a corporate meeting room with a long conference table, 8 office chairs, and a large TV screen on the wall. The main wall features sleek matte black vertical slatted panels (ripado). Modern, minimalist design, recessed ceiling lights. 4K, photorealistic.",
  "lounge-teca":
    "Professional interior photography of an office lounge / relaxation area with comfortable sofas, poufs, and a low coffee table. The feature wall has warm honey-toned teak bamboo vertical slatted panels (ripado). Soft lighting, plants, books, cozy and inviting. 4K, photorealistic.",
  "loja-preto-fosco":
    "Professional interior photography of a modern retail store interior with product display shelves and mannequins. The main display wall features matte black vertical slatted panels (ripado) as backdrop, with spot lighting highlighting products. Polished concrete floor, industrial chic. 4K, photorealistic.",
  "restaurante-cerejeira":
    "Professional interior photography of an upscale restaurant dining area with elegant tables set with white tablecloths, wine glasses. The accent wall features rich cherry wood vertical slatted panels (ripado) in warm reddish-brown tones. Dim ambient pendant lighting, romantic atmosphere. 4K, photorealistic.",
  "hotel-lobby":
    "Professional interior photography of a luxury hotel lobby with plush sofas, a grand reception area, and decorative lighting. The tall feature wall behind the concierge features dark imbuia wood vertical slatted panels (ripado) in deep brown. Marble floor, elegant chandelier. 4K, photorealistic.",
  "hotel-quarto":
    "Professional interior photography of a luxury hotel bedroom with a king-size bed, crisp white linens, and bedside tables. The headboard wall features light oak vertical slatted wood panels (ripado) in pale natural color, extending wall-to-wall. Warm bedside lamps, minimal decor. 4K, photorealistic.",
  "barbearia-preto":
    "Professional interior photography of a modern barbershop with vintage barber chairs, large mirrors, and exposed brick. One accent wall features matte black vertical slatted panels (ripado) with industrial-style pendant lights. Masculine, trendy atmosphere. 4K, photorealistic.",
  "fachada-cherry":
    "Professional architectural photography of a modern commercial building exterior facade. The facade is clad with cherry wood tone WPC (wood-plastic composite) horizontal slatted cladding panels in warm reddish-brown. Glass storefront entrance, landscaping, blue sky. 4K, photorealistic.",
  "fachada-teak":
    "Professional architectural photography of a modern commercial building exterior facade. The facade is clad with teak-colored WPC (wood-plastic composite) horizontal slatted cladding panels in warm golden-brown. Glass entrance, modern signage area, blue sky. 4K, photorealistic.",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { roomId } = await req.json();

    if (!roomId || !ROOM_PROMPTS[roomId]) {
      return new Response(
        JSON.stringify({ error: "Invalid roomId", available: Object.keys(ROOM_PROMPTS) }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    console.log(`Generating image for: ${roomId}`);

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
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
            content: ROOM_PROMPTS[roomId],
          },
        ],
        modalities: ["image", "text"],
      }),
    });

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      console.error("AI error:", aiResponse.status, errText);
      if (aiResponse.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited. Try again in a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI gateway error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const imageUrl = aiData.choices?.[0]?.message?.images?.[0]?.image_url?.url;

    if (!imageUrl) {
      console.error("No image in response:", JSON.stringify(aiData).slice(0, 500));
      throw new Error("No image generated");
    }

    // Extract base64 data
    const base64Data = imageUrl.replace(/^data:image\/\w+;base64,/, "");
    const binaryData = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));

    // Upload to storage
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const filePath = `${roomId}.png`;

    const { error: uploadError } = await supabase.storage
      .from("room-renders")
      .upload(filePath, binaryData, {
        contentType: "image/png",
        upsert: true,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      throw new Error(`Upload failed: ${uploadError.message}`);
    }

    const { data: publicUrlData } = supabase.storage
      .from("room-renders")
      .getPublicUrl(filePath);

    console.log(`Image generated and uploaded: ${publicUrlData.publicUrl}`);

    return new Response(
      JSON.stringify({ success: true, url: publicUrlData.publicUrl, roomId }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("generate-room-image error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const ROOM_PROMPTS: Record<string, string> = {
  // ESCRITÓRIO
  "escritorio-nogueira":
    "Professional interior photography of a modern executive office with a large wooden desk, leather executive chair, and bookshelves. The main accent wall behind the desk features elegant dark walnut vertical slatted wood panels (ripado) with warm brown tones. Warm ambient lighting, minimalist decor, plants. 4K, photorealistic, architectural digest style.",
  "escritorio-carvalho":
    "Professional interior photography of a modern executive office with a sleek white desk, ergonomic chair, and floating shelves. The accent wall features light oak vertical slatted wood panels (ripado) in pale natural honey tone. Large windows, natural light, Scandinavian minimalist style. 4K, photorealistic.",
  "escritorio-preto":
    "Professional interior photography of a contemporary executive office with a dark desk, modern chair, and a monitor setup. The accent wall features matte black vertical slatted panels (ripado) with subtle texture. Recessed LED lighting, dramatic contrast, ultra-modern design. 4K, photorealistic.",

  // RECEPÇÃO
  "recepcao-nero":
    "Professional interior photography of a sleek corporate reception lobby with a white reception counter, waiting area with modern armchairs. The tall wall behind the reception features dramatic dark marble-pattern vertical slatted panels (ripado) in deep black with white veining. Polished floor, recessed lighting. 4K, photorealistic.",
  "recepcao-carvalho":
    "Professional interior photography of a warm corporate reception lobby with a wooden reception counter and comfortable seating. The feature wall behind reception features natural oak vertical slatted wood panels (ripado) in warm honey tones. Pendant lights, indoor plants, welcoming atmosphere. 4K, photorealistic.",
  "recepcao-teca":
    "Professional interior photography of an elegant corporate reception area with a curved reception desk and designer armchairs. The tall wall features golden teak vertical slatted wood panels (ripado) in warm amber tones. Soft indirect lighting, marble floor accents. 4K, photorealistic.",

  // CLÍNICA
  "clinica-tiffany":
    "Professional interior photography of a clean, bright medical clinic waiting room with comfortable chairs and a coffee table. One accent wall features elegant light blue-green (tiffany) vertical slatted panels (ripado), creating a calming atmosphere. White floors, soft LED lighting, minimal decor. 4K, photorealistic.",
  "clinica-carvalho":
    "Professional interior photography of a modern medical clinic reception with white furniture and clean lines. The accent wall features light oak vertical slatted panels (ripado) in pale natural tone, creating a warm yet clinical atmosphere. Bright LED lighting, plants. 4K, photorealistic.",
  "clinica-amendoa":
    "Professional interior photography of a serene dental clinic waiting area with soft cushioned chairs. The feature wall has light almond-colored vertical slatted panels (ripado) in warm beige-cream tone. Soft diffused lighting, calming atmosphere, minimalist decor. 4K, photorealistic.",

  // COPA
  "copa-carvalho":
    "Professional interior photography of a modern office break room / coffee area with a kitchenette counter, bar stools, coffee machine. The back wall features warm natural oak vertical slatted wood panels (ripado) in light honey color. Pendant lights, plants, cozy atmosphere. 4K, photorealistic.",
  "copa-teca":
    "Professional interior photography of a stylish office pantry with a long counter, microwave nook, and high chairs. The accent wall features warm honey-toned teak bamboo vertical slatted panels (ripado) in golden amber. Edison bulb pendant lights, cheerful atmosphere. 4K, photorealistic.",
  "copa-cerejeira":
    "Professional interior photography of a cozy office coffee lounge with a small kitchen island and bar stools. The feature wall has rich cherry wood vertical slatted panels (ripado) in warm reddish-brown tones. Warm pendant lighting, coffee accessories on display. 4K, photorealistic.",

  // REUNIÕES
  "reunioes-preto":
    "Professional interior photography of a corporate meeting room with a long conference table, 8 office chairs, and a large TV screen on the wall. The main wall features sleek matte black vertical slatted panels (ripado). Modern, minimalist design, recessed ceiling lights. 4K, photorealistic.",
  "reunioes-nogueira":
    "Professional interior photography of a warm corporate meeting room with an oval conference table and leather chairs. The feature wall has dark walnut vertical slatted panels (ripado) in deep brown tones. Large screen, warm ambient lighting, professional atmosphere. 4K, photorealistic.",
  "reunioes-nero":
    "Professional interior photography of a premium boardroom with a polished conference table and executive chairs. The dramatic accent wall features dark marble-pattern vertical slatted panels (ripado) in deep black with subtle white veining. Statement chandelier, luxury corporate. 4K, photorealistic.",

  // LOUNGE
  "lounge-teca":
    "Professional interior photography of an office lounge / relaxation area with comfortable sofas, poufs, and a low coffee table. The feature wall has warm honey-toned teak bamboo vertical slatted panels (ripado). Soft lighting, plants, books, cozy and inviting. 4K, photorealistic.",
  "lounge-nogueira":
    "Professional interior photography of a corporate lounge with deep sofas, a reading nook, and soft rugs. The accent wall features medium walnut vertical slatted wood panels (ripado) in warm brown tones. Floor lamps, greenery, relaxed atmosphere. 4K, photorealistic.",
  "lounge-carvalho":
    "Professional interior photography of a bright office relaxation area with modular seating and a coffee station. The feature wall has light natural oak vertical slatted panels (ripado) in pale honey. Large windows, natural light, Scandinavian vibes. 4K, photorealistic.",

  // LOJA
  "loja-preto-fosco":
    "Professional interior photography of a modern retail store interior with product display shelves and mannequins. The main display wall features matte black vertical slatted panels (ripado) as backdrop, with spot lighting highlighting products. Polished concrete floor, industrial chic. 4K, photorealistic.",
  "loja-nero":
    "Professional interior photography of a luxury boutique store with glass display cases and elegant product shelving. The accent wall features dark marble-pattern vertical slatted panels (ripado) in black with white veining, creating a high-end backdrop. Spot lighting, gold accents. 4K, photorealistic.",
  "loja-cerejeira":
    "Professional interior photography of a warm artisan retail shop with wooden display tables and clothing racks. The feature wall has rich cherry wood vertical slatted panels (ripado) in warm reddish-brown, creating an inviting boutique atmosphere. Warm pendant lights. 4K, photorealistic.",

  // RESTAURANTE
  "restaurante-cerejeira":
    "Professional interior photography of an upscale restaurant dining area with elegant tables set with white tablecloths, wine glasses. The accent wall features rich cherry wood vertical slatted panels (ripado) in warm reddish-brown tones. Dim ambient pendant lighting, romantic atmosphere. 4K, photorealistic.",
  "restaurante-nogueira":
    "Professional interior photography of a sophisticated restaurant interior with dark wood tables and leather banquettes. The feature wall has dark walnut vertical slatted panels (ripado) in deep espresso brown. Candlelight ambiance, wine bottles on display. 4K, photorealistic.",
  "restaurante-imbuia":
    "Professional interior photography of an elegant fine dining restaurant with round tables and upholstered chairs. The dramatic wall features deep imbuia wood vertical slatted panels (ripado) in rich dark brown with pronounced grain. Crystal pendant lights, refined atmosphere. 4K, photorealistic.",

  // HOTEL LOBBY
  "hotel-lobby":
    "Professional interior photography of a luxury hotel lobby with plush sofas, a grand reception area, and decorative lighting. The tall feature wall behind the concierge features dark imbuia wood vertical slatted panels (ripado) in deep brown. Marble floor, elegant chandelier. 4K, photorealistic.",
  "hotel-lobby-nero":
    "Professional interior photography of a grand luxury hotel lobby with a sweeping reception desk and designer furniture. The towering feature wall has dark marble-pattern vertical slatted panels (ripado) in deep black with white veining. Dramatic chandeliers, polished marble floor. 4K, photorealistic.",
  "hotel-lobby-teca":
    "Professional interior photography of a contemporary boutique hotel lobby with mid-century modern furniture. The tall feature wall has golden teak vertical slatted wood panels (ripado) in warm amber tones. Soft ambient lighting, artistic sculptures, welcoming. 4K, photorealistic.",

  // HOTEL QUARTO
  "hotel-quarto":
    "Professional interior photography of a luxury hotel bedroom with a king-size bed, crisp white linens, and bedside tables. The headboard wall features light oak vertical slatted wood panels (ripado) in pale natural color, extending wall-to-wall. Warm bedside lamps, minimal decor. 4K, photorealistic.",
  "hotel-quarto-nogueira":
    "Professional interior photography of a luxury hotel suite bedroom with a king bed and plush pillows. The headboard wall features medium walnut vertical slatted wood panels (ripado) in warm brown. Soft reading lights, elegant curtains, cozy atmosphere. 4K, photorealistic.",
  "hotel-quarto-teca":
    "Professional interior photography of a boutique hotel room with a queen bed and linen bedding. The headboard accent wall features golden teak vertical slatted panels (ripado) in warm amber. Natural light from sheer curtains, minimalist design. 4K, photorealistic.",

  // BARBEARIA
  "barbearia-preto":
    "Professional interior photography of a modern barbershop with vintage barber chairs, large mirrors, and exposed brick. One accent wall features matte black vertical slatted panels (ripado) with industrial-style pendant lights. Masculine, trendy atmosphere. 4K, photorealistic.",
  "barbearia-nogueira":
    "Professional interior photography of a classic-modern barbershop with leather barber chairs and brass fixtures. The feature wall has dark walnut vertical slatted panels (ripado) in deep brown tones. Vintage mirrors, warm Edison bulbs, masculine elegance. 4K, photorealistic.",
  "barbearia-nero":
    "Professional interior photography of a luxury barbershop with premium barber stations and large backlit mirrors. The dramatic accent wall features dark marble-pattern vertical slatted panels (ripado) in black with white veining. Gold hardware accents, premium atmosphere. 4K, photorealistic.",

  // FACHADA
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
        return new Response(JSON.stringify({ error: "Rate limited. Tente novamente em instantes." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (aiResponse.status === 402) {
        return new Response(JSON.stringify({ error: "Créditos insuficientes." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
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

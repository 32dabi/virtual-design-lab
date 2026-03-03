import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle, Loader2, AlertCircle, ImageIcon, RefreshCw } from "lucide-react";

const COMMERCIAL_ROOMS = [
  { id: "escritorio-nogueira", name: "Escritório Executivo", product: "Nogueira Escuro" },
  { id: "recepcao-nero", name: "Recepção Corporativa", product: "Nero Marquina" },
  { id: "clinica-tiffany", name: "Clínica / Consultório", product: "Tiffany" },
  { id: "copa-carvalho", name: "Copa / Área de Café", product: "Carvalho Natural" },
  { id: "reunioes-preto", name: "Sala de Reuniões", product: "Preto Liso" },
  { id: "lounge-teca", name: "Lounge / Descanso", product: "Bamboo Teca Mel" },
  { id: "loja-preto-fosco", name: "Loja / Vitrine", product: "Preto Fosco" },
  { id: "restaurante-cerejeira", name: "Restaurante", product: "Cerejeira" },
  { id: "hotel-lobby", name: "Hotel Lobby", product: "Imbuia" },
  { id: "hotel-quarto", name: "Hotel Quarto", product: "Carvalho Claro" },
  { id: "barbearia-preto", name: "Barbearia / Salão", product: "Preto Fosco" },
  { id: "fachada-cherry", name: "Fachada Comercial (Cherry)", product: "WPC Cherry Wood" },
  { id: "fachada-teak", name: "Fachada Comercial (Teak)", product: "WPC Teak" },
];

type RoomStatus = "idle" | "generating" | "done" | "error";

interface RoomState {
  status: RoomStatus;
  url?: string;
  error?: string;
}

export default function GenerateImages() {
  const [rooms, setRooms] = useState<Record<string, RoomState>>({});
  const [generating, setGenerating] = useState(false);

  const updateRoom = (id: string, state: Partial<RoomState>) => {
    setRooms((prev) => ({ ...prev, [id]: { ...prev[id], ...state } as RoomState }));
  };

  const generateOne = async (roomId: string) => {
    updateRoom(roomId, { status: "generating", error: undefined });
    try {
      const { data, error } = await supabase.functions.invoke("generate-room-image", {
        body: { roomId },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      updateRoom(roomId, { status: "done", url: data.url });
    } catch (e: any) {
      updateRoom(roomId, { status: "error", error: e.message || "Erro" });
    }
  };

  const generateAll = async () => {
    setGenerating(true);
    for (const room of COMMERCIAL_ROOMS) {
      if (rooms[room.id]?.status === "done") continue;
      await generateOne(room.id);
      // Small delay to avoid rate limiting
      await new Promise((r) => setTimeout(r, 3000));
    }
    setGenerating(false);
  };

  const doneCount = COMMERCIAL_ROOMS.filter((r) => rooms[r.id]?.status === "done").length;
  const progress = (doneCount / COMMERCIAL_ROOMS.length) * 100;

  return (
    <div className="min-h-screen bg-[#0D1F15] text-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Gerador de Imagens — Ambientes Comerciais</h1>
        <p className="text-gray-400 mb-6">
          Gere renders únicos com IA para cada ambiente comercial. ({doneCount}/{COMMERCIAL_ROOMS.length})
        </p>

        <div className="flex items-center gap-4 mb-8">
          <Button
            onClick={generateAll}
            disabled={generating}
            className="bg-[#D4AF37] hover:bg-[#E8C547] text-black font-bold px-6"
          >
            {generating ? (
              <><Loader2 className="animate-spin mr-2 h-4 w-4" /> Gerando...</>
            ) : (
              "Gerar Todas"
            )}
          </Button>
          <div className="flex-1">
            <Progress value={progress} className="h-3" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {COMMERCIAL_ROOMS.map((room) => {
            const state = rooms[room.id] || { status: "idle" as RoomStatus };
            return (
              <Card key={room.id} className="bg-[#1a2f22] border-[#2a4a35]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-white flex items-center gap-2">
                    {state.status === "done" && <CheckCircle className="h-4 w-4 text-green-400" />}
                    {state.status === "generating" && <Loader2 className="h-4 w-4 animate-spin text-[#D4AF37]" />}
                    {state.status === "error" && <AlertCircle className="h-4 w-4 text-red-400" />}
                    {state.status === "idle" && <ImageIcon className="h-4 w-4 text-gray-500" />}
                    {room.name}
                  </CardTitle>
                  <p className="text-xs text-gray-400">{room.product}</p>
                </CardHeader>
                <CardContent>
                  {state.url ? (
                    <img
                      src={state.url}
                      alt={room.name}
                      className="w-full h-40 object-cover rounded-md mb-2"
                    />
                  ) : (
                    <div className="w-full h-40 bg-[#0D1F15] rounded-md flex items-center justify-center mb-2">
                      {state.status === "generating" ? (
                        <Loader2 className="h-8 w-8 animate-spin text-[#D4AF37]" />
                      ) : (
                        <ImageIcon className="h-8 w-8 text-gray-600" />
                      )}
                    </div>
                  )}
                  {state.error && (
                    <p className="text-xs text-red-400 mb-2">{state.error}</p>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full border-[#2a4a35] text-gray-300 hover:bg-[#2a4a35]"
                    onClick={() => generateOne(room.id)}
                    disabled={state.status === "generating" || generating}
                  >
                    <RefreshCw className="h-3 w-3 mr-1" />
                    {state.status === "done" ? "Regerar" : "Gerar"}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

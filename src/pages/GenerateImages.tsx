import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle, Loader2, AlertCircle, ImageIcon, RefreshCw } from "lucide-react";

const COMMERCIAL_ROOMS = [
  // ESCRITÓRIO
  { id: "escritorio-nogueira", name: "Escritório Executivo", product: "Nogueira Escuro", existing: true },
  { id: "escritorio-carvalho", name: "Escritório Executivo", product: "Carvalho Claro", existing: false },
  { id: "escritorio-preto", name: "Escritório Executivo", product: "Preto Liso", existing: false },
  // RECEPÇÃO
  { id: "recepcao-nero", name: "Recepção Corporativa", product: "Nero Marquina", existing: true },
  { id: "recepcao-carvalho", name: "Recepção Corporativa", product: "Carvalho Natural", existing: false },
  { id: "recepcao-teca", name: "Recepção Corporativa", product: "Teca Natural", existing: false },
  // CLÍNICA
  { id: "clinica-tiffany", name: "Clínica / Consultório", product: "Tiffany", existing: true },
  { id: "clinica-carvalho", name: "Clínica / Consultório", product: "Carvalho Claro", existing: false },
  { id: "clinica-amendoa", name: "Clínica / Consultório", product: "Amêndoa", existing: false },
  // COPA
  { id: "copa-carvalho", name: "Copa / Área de Café", product: "Carvalho Natural", existing: true },
  { id: "copa-teca", name: "Copa / Área de Café", product: "Bamboo Teca Mel", existing: false },
  { id: "copa-cerejeira", name: "Copa / Área de Café", product: "Cerejeira", existing: false },
  // REUNIÕES
  { id: "reunioes-preto", name: "Sala de Reuniões", product: "Preto Liso", existing: true },
  { id: "reunioes-nogueira", name: "Sala de Reuniões", product: "Nogueira Escuro", existing: false },
  { id: "reunioes-nero", name: "Sala de Reuniões", product: "Nero Marquina", existing: false },
  // LOUNGE
  { id: "lounge-teca", name: "Lounge / Descanso", product: "Bamboo Teca Mel", existing: true },
  { id: "lounge-nogueira", name: "Lounge / Descanso", product: "Nogueira", existing: false },
  { id: "lounge-carvalho", name: "Lounge / Descanso", product: "Carvalho Natural", existing: false },
  // LOJA
  { id: "loja-preto-fosco", name: "Loja / Vitrine", product: "Preto Fosco", existing: true },
  { id: "loja-nero", name: "Loja / Vitrine", product: "Nero Marquina", existing: false },
  { id: "loja-cerejeira", name: "Loja / Vitrine", product: "Cerejeira", existing: false },
  // RESTAURANTE
  { id: "restaurante-cerejeira", name: "Restaurante", product: "Cerejeira", existing: true },
  { id: "restaurante-nogueira", name: "Restaurante", product: "Nogueira Escuro", existing: false },
  { id: "restaurante-imbuia", name: "Restaurante", product: "Imbuia", existing: false },
  // HOTEL
  { id: "hotel-lobby", name: "Hotel Lobby", product: "Imbuia", existing: true },
  { id: "hotel-lobby-nero", name: "Hotel Lobby", product: "Nero Marquina", existing: false },
  { id: "hotel-lobby-teca", name: "Hotel Lobby", product: "Teca Natural", existing: false },
  { id: "hotel-quarto", name: "Hotel Quarto", product: "Carvalho Claro", existing: true },
  { id: "hotel-quarto-nogueira", name: "Hotel Quarto", product: "Nogueira", existing: false },
  { id: "hotel-quarto-teca", name: "Hotel Quarto", product: "Teca Natural", existing: false },
  // BARBEARIA
  { id: "barbearia-preto", name: "Barbearia / Salão", product: "Preto Fosco", existing: true },
  { id: "barbearia-nogueira", name: "Barbearia / Salão", product: "Nogueira Escuro", existing: false },
  { id: "barbearia-nero", name: "Barbearia / Salão", product: "Nero Marquina", existing: false },
  // FACHADA
  { id: "fachada-cherry", name: "Fachada Comercial", product: "WPC Cherry Wood", existing: true },
  { id: "fachada-teak", name: "Fachada Comercial", product: "WPC Teak", existing: true },
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
  const [filter, setFilter] = useState<"all" | "new" | "existing">("all");

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

  const filteredRooms = COMMERCIAL_ROOMS.filter((r) => {
    if (filter === "new") return !r.existing;
    if (filter === "existing") return r.existing;
    return true;
  });

  const generateAll = async () => {
    setGenerating(true);
    const toGenerate = filteredRooms.filter((r) => !r.existing && rooms[r.id]?.status !== "done");
    for (const room of toGenerate) {
      await generateOne(room.id);
      await new Promise((r) => setTimeout(r, 3000));
    }
    setGenerating(false);
  };

  const newRooms = COMMERCIAL_ROOMS.filter((r) => !r.existing);
  const doneCount = newRooms.filter((r) => rooms[r.id]?.status === "done").length;
  const progress = (doneCount / newRooms.length) * 100;

  return (
    <div className="min-h-screen bg-[#0D1F15] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Gerador de Imagens — Ambientes Comerciais</h1>
        <p className="text-gray-400 mb-6">
          {newRooms.length} novas imagens para gerar. ({doneCount}/{newRooms.length} concluídas)
        </p>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          {(["all", "new", "existing"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider transition-all ${
                filter === f
                  ? "border-2 border-[#D4AF37] bg-[#D4AF37]/15 text-[#D4AF37]"
                  : "border border-gray-600 text-gray-400 hover:text-[#D4AF37] hover:border-[#D4AF37]/50"
              }`}
            >
              {f === "all" ? "Todos" : f === "new" ? `Novos (${newRooms.length})` : "Existentes"}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 mb-8">
          <Button
            onClick={generateAll}
            disabled={generating}
            className="bg-[#D4AF37] hover:bg-[#E8C547] text-black font-bold px-6"
          >
            {generating ? (
              <><Loader2 className="animate-spin mr-2 h-4 w-4" /> Gerando...</>
            ) : (
              "Gerar Todas as Novas"
            )}
          </Button>
          <div className="flex-1">
            <Progress value={progress} className="h-3" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredRooms.map((room) => {
            const state = rooms[room.id] || { status: "idle" as RoomStatus };
            return (
              <Card key={room.id} className={`border ${room.existing ? 'bg-[#1a2f22]/50 border-[#2a4a35]/50' : 'bg-[#1a2f22] border-[#2a4a35]'}`}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-white flex items-center gap-2">
                    {room.existing && <CheckCircle className="h-4 w-4 text-blue-400" />}
                    {!room.existing && state.status === "done" && <CheckCircle className="h-4 w-4 text-green-400" />}
                    {state.status === "generating" && <Loader2 className="h-4 w-4 animate-spin text-[#D4AF37]" />}
                    {state.status === "error" && <AlertCircle className="h-4 w-4 text-red-400" />}
                    {!room.existing && state.status === "idle" && <ImageIcon className="h-4 w-4 text-gray-500" />}
                    {room.name}
                  </CardTitle>
                  <p className="text-xs text-gray-400">{room.product} {room.existing && <span className="text-blue-400">(já existe)</span>}</p>
                </CardHeader>
                <CardContent>
                  {room.existing ? (
                    <img
                      src={`/images/${room.id}.png`}
                      alt={room.name}
                      className="w-full h-32 object-cover rounded-md mb-2 opacity-70"
                    />
                  ) : state.url ? (
                    <img
                      src={state.url}
                      alt={room.name}
                      className="w-full h-32 object-cover rounded-md mb-2"
                    />
                  ) : (
                    <div className="w-full h-32 bg-[#0D1F15] rounded-md flex items-center justify-center mb-2">
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
                  {!room.existing && (
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
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

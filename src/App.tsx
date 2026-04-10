import { Routes, Route } from "react-router-dom";
import { Languages, Mic, MessageSquare, Brain } from "lucide-react";
import { ModelCard, type ModelCardProps } from "@/components/ModelCard";
import citadelLogo from "@/assets/citadel-logo.webp";

const models: ModelCardProps[] = [
  {
    title: "Traduction Mooré ↔ Français",
    description: "Modèle de traduction automatique neuronale entre le mooré et le français. Entraîné sur des corpus parallèles collectés et validés par nos linguistes.",
    icon: Languages,
    status: "available",
    language: "Mooré",
    category: "Traduction",
    href: "/",
  },
  {
    title: "Transcription Mooré",
    description: "Système de reconnaissance automatique de la parole (ASR) pour le mooré. Convertissez l'audio en texte avec une précision optimisée pour cette langue.",
    icon: Mic,
    status: "available",
    language: "Mooré",
    category: "Transcription",
    href: "/",
  },
  {
    title: "Synthèse vocale Mooré",
    description: "Modèle text-to-speech pour générer de la parole naturelle en mooré à partir de texte écrit. Voix masculine et féminine disponibles.",
    icon: MessageSquare,
    status: "coming-soon",
    language: "Mooré",
    category: "TTS",
    href: "/",
  },
  {
    title: "Analyse de sentiments",
    description: "Classification automatique des sentiments dans les textes en mooré. Détectez les opinions positives, négatives et neutres.",
    icon: Brain,
    status: "coming-soon",
    language: "Mooré",
    category: "NLP",
    href: "/",
  },
];

function App() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <img src={citadelLogo} alt="CITADEL" className="h-10 w-auto" />
          <span className="rounded-full bg-citadel-green/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-citadel-green uppercase">
            Playground
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-12">
        <div className="max-w-2xl">
          <div className="mb-4 flex items-center gap-2">
            <div className="h-1 w-8 rounded-full bg-citadel-green" />
            <span className="text-sm font-medium tracking-wide text-citadel-green uppercase">
              Modèles IA
            </span>
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Explorez nos{" "}
            <span className="bg-gradient-to-r from-citadel-green to-citadel-gold bg-clip-text text-transparent">
              modèles IA
            </span>
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Testez les modèles d'intelligence artificielle développés par CITADEL
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {models.map((model) => (
            <ModelCard key={model.title} {...model} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} CITADEL — Centre d'Excellence Interdisciplinaire en Intelligence Artificielle pour le Développement
        </p>
      </footer>
    </div>
  );
}

export default App;

import { useState, useRef, useEffect } from "react";

const SYSTEM_PROMPT = `Eres un analista senior de inteligencia de marca, reputación digital, competitive intelligence y escucha distribuida, con especialización en educación superior, edtech y ecosistemas institucionales en Latinoamérica. Tu fortaleza es rastrear huellas digitales profundas, incluso en superficies poco visibles, fragmentadas o difíciles de monitorear en la operación diaria.

Contexto: Formo parte del equipo corporativo de marketing de un grupo con múltiples marcas e instituciones. Necesito una radiografía profunda, amplia y ejecutiva de la huella digital de la marca.

Objetivo estratégico: No busco un simple inventario de menciones. Busco un mapa integral de presencia, percepción, riesgo, autoridad, reputación y conversación distribuida de la marca, con énfasis en hallazgos accionables para liderazgo ejecutivo.

Usa como marco de calidad las mejores prácticas de brand intelligence, reputational risk mapping, search intelligence, y digital footprint analysis.

Definición de huella digital profunda:
Incluye toda aparición, mención, discusión, registro, indexación, reseña, publicación, documento, perfil, comentario, referencia, dato estructurado o rastro técnico/documental asociado a la marca, tanto directa como indirectamente.

Incluye obligatoriamente las siguientes superficies:
1) Activos propios e institucionales
2) Reputación laboral y employer brand (ej: Glassdoor, Indeed, LinkedIn, foros)
3) Directorios empresariales y business intelligence (ej: Crunchbase, ZoomInfo)
4) Plataformas de contratación global, nómina y talento
5) Ecosistema regulatorio, institucional y gubernamental
6) Reputación académica y autoridad (ej: rankings, acreditaciones, repositorios)
7) Comunidades, foros y espacios difíciles de monitorear (ej: Reddit, Quora, blogs)
8) Marketplaces, comparadores y distribuidores
9) Medios, replicadores y archivo histórico
10) Huella técnica y documental (ej: PDFs, subdominios públicos, assets)

Instrucciones de trabajo:
- Explora todas las categorías definidas. No te quedes en plataformas obvias.
- Detecta narrativas recurrentes, no sólo menciones aisladas. Identifica tensiones, objeciones, elogios, controversias, claims repetidos y vacíos de información.
- Señala superficies que probablemente estén fuera del radar diario del equipo de marketing.
- Identifica también "ausencias significativas".
- Prioriza enlaces directos, activos y verificables. No inventes hallazgos.
- Piensa como un analista de inteligencia de marca que trabaja para liderazgo ejecutivo.

Disclaimers metodológicos y puntos ciegos obligatorios:
1) Limitaciones de cobertura de la web abierta (ej: grupos cerrados, WhatsApp, intrantes).
2) Limitaciones de contenido efímero o poco indexable (ej: stories, lives, podcasts sin transcripción).
3) Sesgo hacia contenido indexable.
4) Ambigüedad de atribución (si la atribución de una mención a la marca no es alta, indícalo).
5) Limitaciones para medir volumen e impacto real.
6) Diferencia entre huella vigente (reciente/activa) y huella residual (histórica/desactualizada).

Verificación obligatoria de URLs y control de vigencia (Regla de oro):
Nunca cites una URL sin haber comprobado que, en la fecha actual, el enlace sigue vivo, abre correctamente y contiene evidencia relevante y visible del hallazgo descrito. 
- Todo enlace citado debe haber sido validado como activo y con contenido al día del análisis.
- Si el contenido ya no está disponible, no lo presentes como evidencia confirmada.

Tu output es SIEMPRE un JSON válido. No incluyas texto antes ni después del JSON. No uses bloques de código markdown (sin \`\`\`json). Solo el objeto JSON puro.

El JSON debe seguir EXACTAMENTE esta estructura:
{
  "brand": "nombre de la marca detectada",
  "analysis_date": "AAAA-MM-DD",
  "executive_summary": "resumen ejecutivo de 10-15 líneas sobre el estado de la huella digital, las narrativas dominantes, riesgos principales, activos de autoridad útiles, y oportunidades clave para el equipo de marketing",
  "sentiment_overview": {
    "positive": número_porcentaje,
    "neutral": número_porcentaje,
    "negative": número_porcentaje
  },
  "categories": [
    {
      "category_name": "nombre de la categoría (ej: Activos propios, Reputación laboral, etc.)",
      "category_icon": "emoji representativo",
      "findings": [
        {
          "platform": "nombre plataforma",
          "url": "URL directa y verificable",
          "verification_status": "Activo y validado | Activo pero parcialmente verificable | No verificable | Excluido",
          "access_type": "Público | Parcialmente restringido | Requiere login | Inestable",
          "footprint_type": "propia | ganada | compartida | UGC | reputacional | regulatoria | académica | técnica",
          "title": "título breve del hallazgo",
          "description": "descripción de 2-3 líneas. Naturaleza de la mención y narrativa principal.",
          "sentiment": "positivo|negativo|neutro|mixto",
          "date": "AAAA-MM-DD o null",
          "relevance": "alta|media|baja"
        }
      ]
    }
  ],
  "blind_spots": [
    "limitaciones de acceso, ambigüedades, plataformas con contenido parcial o cerrado, etc.",
    "Conversación probablemente no visible: [tipos de conversaciones fuera de web abierta]"
  ],
  "qa_verification": {
    "total_links_found": 0,
    "total_links_validated": 0,
    "total_links_partially_verifiable": 0,
    "total_links_excluded": 0,
    "restricted_platforms_noted": ["plataforma 1", "plataforma 2"]
  },
  "strategic_recommendations": [
    "acciones concretas: qué monitorear, corregir, amplificar, responder, escalar, o auditar manualmente"
  ]
}`;

function buildUserPrompt(url, keywords, brandName) {
  const keywordList = keywords.filter(k => k.trim()).join(", ");
  return `Realiza una investigación exhaustiva, multifuente y profunda sobre la huella digital para la siguiente marca, priorizando especialmente superficies de alta señal y baja visibilidad.

VARIABLES DE BÚSQUEDA:
- [NOMBRE_DE_MARCA] = ${brandName || "Determinar desde la URL"}
- [URL_OFICIAL] = ${url}
- [VARIANTES_U_OTRAS_KEYWORDS] = ${keywordList || "ninguna especificada"}
- [IDIOMA_SALIDA] = español
- [AUDIENCIA_FINAL] = CMO / Brand Marketing / Corporate Affairs

INSTRUCCIONES ESPECÍFICAS:
1. Usa el nombre de la marca, la URL oficial, y las palabras clave adicionales o variantes para buscar en profundidad las 10 categorías requeridas por el marco estratégico.
2. Identifica menciones de Alta Confianza / Forensic Light en los últimos 24 meses preferentemente.
3. Extrae hallazgos y organizalos como se requiere.
4. Completa TODO el análisis y genera la radiografía ejecutiva.

Devuelve únicamente el JSON válido estructurado como se solicitó.`;
}

const SENTIMENT_COLORS = {
  positivo: "#22d3a0",
  negativo: "#f4516c",
  neutro: "#94a3b8",
  informativo: "#60a5fa",
};

const RELEVANCE_BADGE = {
  alta: { bg: "rgba(34,211,160,0.15)", color: "#22d3a0", label: "ALTA" },
  media: { bg: "rgba(251,191,36,0.15)", color: "#fbbf24", label: "MEDIA" },
  baja: { bg: "rgba(148,163,184,0.15)", color: "#94a3b8", label: "BAJA" },
};

function ScanLine() {
  return (
    <div style={{
      position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
      overflow: "hidden", pointerEvents: "none", borderRadius: "inherit"
    }}>
      <div style={{
        position: "absolute", left: 0, right: 0, height: "2px",
        background: "linear-gradient(90deg, transparent, #22d3a0, transparent)",
        animation: "scan 2.5s linear infinite", opacity: 0.6
      }} />
    </div>
  );
}

function KeywordTag({ keyword, onRemove }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "6px",
      background: "rgba(34,211,160,0.1)", border: "1px solid rgba(34,211,160,0.3)",
      borderRadius: "4px", padding: "4px 10px", fontSize: "13px",
      color: "#22d3a0", fontFamily: "'Courier New', monospace"
    }}>
      {keyword}
      <button onClick={onRemove} style={{
        background: "none", border: "none", cursor: "pointer",
        color: "#64748b", padding: 0, lineHeight: 1, fontSize: "14px"
      }}>×</button>
    </span>
  );
}

function SentimentBar({ positive, neutral, negative }) {
  return (
    <div style={{ marginTop: "12px" }}>
      <div style={{ display: "flex", borderRadius: "8px", overflow: "hidden", height: "10px", background: "rgba(226,232,240,0.5)", boxShadow: "inset 0 1px 3px rgba(0,0,0,0.05)" }}>
        <div style={{ width: `${positive}%`, background: "linear-gradient(90deg, #10b981, #34d399)", transition: "width 1s ease" }} />
        <div style={{ width: `${neutral}%`, background: "linear-gradient(90deg, #64748b, #94a3b8)", transition: "width 1s ease" }} />
        <div style={{ width: `${negative}%`, background: "linear-gradient(90deg, #f43f5e, #fb7185)", transition: "width 1s ease" }} />
      </div>
      <div style={{ display: "flex", gap: "16px", marginTop: "10px", justifyContent: "space-between" }}>
        {[
          { label: "Positivo", value: positive, color: "#059669" },
          { label: "Neutro", value: neutral, color: "#475569" },
          { label: "Negativo", value: negative, color: "#e11d48" },
        ].map(s => (
          <span key={s.label} style={{ fontSize: "12px", color: s.color, fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>
            {s.label} {s.value}%
          </span>
        ))}
      </div>
    </div>
  );
}

function FindingCard({ finding }) {
  const sentColor = SENTIMENT_COLORS[finding.sentiment?.toLowerCase()] || "#94a3b8";
  const relevBadge = RELEVANCE_BADGE[finding.relevance?.toLowerCase()] || RELEVANCE_BADGE.baja;
  
  const getVerificationIcon = (status) => {
    if (!status) return null;
    const lower = status.toLowerCase();
    if (lower.includes("validado")) return "✅";
    if (lower.includes("parcial")) return "⚠️";
    if (lower.includes("excluido") || lower.includes("no verificable")) return "❌";
    return "❓";
  };

  return (
    <div style={{
      background: "rgba(255, 255, 255, 0.6)", 
      border: "1px solid rgba(255, 255, 255, 0.8)",
      borderLeft: `4px solid ${sentColor}`, 
      borderRadius: "16px",
      padding: "20px", marginBottom: "16px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      transition: "transform 0.2s, box-shadow 0.2s"
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.06)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.03)"; }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "8px" }}>
            <span style={{ fontSize: "14px", fontWeight: 700, color: "#1e293b", fontFamily: "'Inter', sans-serif" }}>
              {finding.platform}
            </span>
            <span style={{
              fontSize: "11px", padding: "3px 8px", borderRadius: "100px",
              background: relevBadge.bg.replace("0.15", "0.2"), color: relevBadge.color,
              fontFamily: "'Inter', sans-serif", fontWeight: 700, letterSpacing: "0.02em"
            }}>
              {relevBadge.label}
            </span>
            <span style={{
              fontSize: "11px", padding: "3px 8px", borderRadius: "100px",
              background: `${sentColor}20`, color: sentColor,
              fontFamily: "'Inter', sans-serif", fontWeight: 700, textTransform: "uppercase"
            }}>
              {finding.sentiment}
            </span>
            
            {finding.verification_status && (
              <span style={{
                fontSize: "11px", padding: "3px 8px", borderRadius: "100px",
                background: "rgba(59,130,246,0.1)", color: "#3b82f6",
                fontWeight: 600, fontFamily: "'Inter', sans-serif"
              }} title={finding.verification_status}>
                {getVerificationIcon(finding.verification_status)} LINK
              </span>
            )}
            {finding.access_type && (
              <span style={{
                fontSize: "10px", padding: "3px 8px", borderRadius: "100px",
                border: "1px solid rgba(148,163,184,0.4)", color: "#64748b",
                fontWeight: 600, fontFamily: "'Inter', sans-serif"
              }}>
                🔒 {finding.access_type}
              </span>
            )}
            
          </div>
          <p style={{ margin: "0 0 8px", fontSize: "16px", color: "#334155", lineHeight: 1.4 }}>
            <strong style={{ color: "#0f172a", fontWeight: 700 }}>{finding.title}</strong>
          </p>
          <p style={{ margin: "0 0 12px", fontSize: "14px", color: "#475569", lineHeight: 1.6 }}>
            {finding.description}
          </p>
          <a href={finding.url} target="_blank" rel="noopener noreferrer" style={{
            fontSize: "13px", color: "#059669", textDecoration: "none",
            fontFamily: "'Inter', sans-serif", fontWeight: 600,
            display: "inline-flex", alignItems: "center", gap: "4px"
          }}
            onMouseEnter={e => e.target.style.textDecoration = "underline"}
            onMouseLeave={e => e.target.style.textDecoration = "none"}
          >
            Ver fuente ↗
          </a>
        </div>
        {finding.date && (
          <span style={{
            fontSize: "12px", color: "#94a3b8", whiteSpace: "nowrap",
            fontWeight: 500, fontFamily: "'Inter', sans-serif"
          }}>{finding.date}</span>
        )}
      </div>
    </div>
  );
}

function CategorySection({ category }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ marginBottom: "24px" }}>
      <button onClick={() => setOpen(o => !o)} style={{
        width: "100%", display: "flex", alignItems: "center", gap: "14px",
        background: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.9)",
        borderRadius: "16px", padding: "16px 20px", cursor: "pointer",
        color: "#1e293b", fontSize: "16px", fontFamily: "'Inter', sans-serif",
        textAlign: "left", transition: "all 0.2s", boxShadow: "0 4px 15px rgba(0,0,0,0.02)",
        backdropFilter: "blur(10px)"
      }}
        onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.9)"; e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.04)"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.7)"; e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.02)"; }}
      >
        <span style={{ fontSize: "24px", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}>{category.category_icon}</span>
        <span style={{ flex: 1, fontWeight: 700, letterSpacing: "-0.01em" }}>{category.category_name}</span>
        <span style={{
          fontSize: "12px", padding: "4px 12px", borderRadius: "100px",
          background: "linear-gradient(135deg, #10b981, #059669)", color: "white", fontWeight: 600,
          boxShadow: "0 2px 8px rgba(16,185,129,0.3)"
        }}>
          {category.findings?.length || 0} hallazgos
        </span>
        <span style={{ color: "#94a3b8", fontSize: "12px", marginLeft: "4px" }}>{open ? "▲" : "▼"}</span>
      </button>
      {open && category.findings?.length > 0 && (
        <div style={{ marginTop: "16px", paddingLeft: "8px", borderLeft: "2px dashed rgba(203,213,225,0.5)", marginLeft: "24px" }}>
          {category.findings.map((f, i) => <FindingCard key={i} finding={f} />)}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [url, setUrl] = useState("");
  const [brandName, setBrandName] = useState("");
  const [keywordInput, setKeywordInput] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [statusMsg, setStatusMsg] = useState("");
  const [loadingDots, setLoadingDots] = useState("");
  const resultsRef = useRef(null);

  useEffect(() => {
    if (!loading) return;
    const msgs = [
      "Iniciando rastreo de huella digital",
      "Explorando foros y comunidades",
      "Analizando sitios de reseñas y empleo",
      "Escaneando bases de datos y directorios",
      "Rastreando contenido generado por usuarios",
      "Procesando menciones en medios digitales",
      "Identificando presencia en redes sociales",
      "Buscando en repositorios y documentos",
      "Analizando rankings y certificaciones",
      "Calculando distribución de sentimiento",
      "Sintetizando hallazgos para el dashboard",
    ];
    let i = 0;
    const interval = setInterval(() => {
      setStatusMsg(msgs[i % msgs.length]);
      i++;
    }, 3500);
    const dotsInterval = setInterval(() => {
      setLoadingDots(d => d.length >= 3 ? "" : d + ".");
    }, 400);
    return () => { clearInterval(interval); clearInterval(dotsInterval); };
  }, [loading]);

  const addKeyword = () => {
    const kw = keywordInput.trim();
    if (kw && !keywords.includes(kw)) {
      setKeywords(prev => [...prev, kw]);
      setKeywordInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addKeyword();
    }
  };

  const runResearch = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    setStatusMsg("Iniciando rastreo de huella digital");

    try {
      // Usar nuestro endpoint seguro de Vercel en lugar de llamar directamente a la API
      const response = await fetch("/api/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "gemini-2.5-pro",
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }]
          },
          contents: [
            {
              role: "user",
              parts: [{ text: buildUserPrompt(url, keywords, brandName) }]
            }
          ]
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || `Error ${response.status}`);
      }

      const textBlocks = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

      if (!textBlocks) {
          throw new Error("La API no devolvió contenido de texto.");
      }

      const clean = textBlocks.replace(/```json\n?|```/g, "").trim();
      
      let parsed;
      try {
        parsed = JSON.parse(clean);
      } catch (e) {
        console.error("Failed to parse JSON:", clean);
        throw new Error("El modelo no devolvió un JSON válido. Revisa el system prompt.");
      }
      
      setResult(parsed);

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    } catch (err) {
      setError(err.message || "Error desconocido al procesar la investigación.");
    } finally {
      setLoading(false);
    }
  };

  const totalFindings = result?.categories?.reduce((sum, c) => sum + (c.findings?.length || 0), 0) || 0;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
      color: "#0f172a",
      fontFamily: "'Inter', sans-serif",
      position: "relative"
    }}>
      {/* Decorative blurred blobs for background */}
      <div style={{ position: "fixed", top: "-10%", left: "-5%", width: "40vw", height: "40vw", background: "radial-gradient(circle, rgba(16,185,129,0.15) 0%, rgba(255,255,255,0) 70%)", filter: "blur(60px)", zIndex: 0, pointerEvents: "none" }} />
      <div style={{ position: "fixed", bottom: "-10%", right: "-5%", width: "50vw", height: "50vw", background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(255,255,255,0) 70%)", filter: "blur(80px)", zIndex: 0, pointerEvents: "none" }} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Outfit:wght@500;700;900&display=swap');
        @keyframes scan { 0% { top: -2px; } 100% { top: 100%; } }
        @keyframes pulse-glow { 0%,100% { box-shadow: 0 0 15px rgba(16,185,129,0.3); transform: scale(1); } 50% { box-shadow: 0 0 25px rgba(16,185,129,0.5); transform: scale(1.05); } }
        @keyframes fadeInUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(148,163,184,0.5); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(100,116,139,0.8); }
        input::placeholder { color: #94a3b8; }
      `}</style>

      {/* Header */}
      <div style={{
        borderBottom: "1px solid rgba(255,255,255,0.8)",
        background: "rgba(255,255,255,0.7)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        padding: "0 40px",
        position: "sticky", top: 0, zIndex: 100,
        boxShadow: "0 4px 30px rgba(0,0,0,0.03)"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "16px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{
              width: "40px", height: "40px", borderRadius: "12px",
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              animation: "pulse-glow 3s ease-in-out infinite"
            }}>
              <span style={{ color: "white", fontSize: "20px", fontWeight: "900", fontFamily: "'Outfit', sans-serif" }}>R'</span>
            </div>
            <div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "20px", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.02em" }}>
                R'EVOLUTION<span style={{ color: "#10b981" }}>LAB</span>
              </div>
              <div style={{ fontSize: "11px", color: "#64748b", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                Digital Footprint Intelligence
              </div>
            </div>
          </div>
          <div style={{ fontWeight: 600, fontSize: "13px", color: "#94a3b8", background: "rgba(241,245,249,0.8)", padding: "6px 12px", borderRadius: "100px", border: "1px solid rgba(226,232,240,0.8)" }}>
            {new Date().toISOString().slice(0, 10)}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "64px 40px", position: "relative", zIndex: 1 }}>

        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <h1 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 900,
            color: "#0f172a", margin: "0 0 16px", lineHeight: 1.1,
            letterSpacing: "-0.03em"
          }}>
            Brand <span style={{ background: "linear-gradient(righ, #10b981, #3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Intelligence</span> Hub
          </h1>
          <p style={{ color: "#475569", fontSize: "18px", fontWeight: 500, maxWidth: "600px", margin: "0 auto", lineHeight: 1.6 }}>
            Motor de investigación profunda y análisis de sentimiento. <br/>Obtén una radiografía ejecutiva real para tu marca.
          </p>
        </div>

        {/* Input form */}
        <div style={{
          background: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.9)",
          borderRadius: "24px", padding: "40px", marginBottom: "48px",
          position: "relative", overflow: "hidden",
          boxShadow: "0 20px 40px rgba(0,0,0,0.04)",
          backdropFilter: "blur(20px)"
        }}>
          {loading && <ScanLine />}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", marginBottom: "24px" }}>
            {/* URL */}
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#475569", letterSpacing: "0.05em", marginBottom: "10px", textTransform: "uppercase" }}>
                URL OFICIAL DE LA MARCA *
              </label>
              <input
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder="https://www.siglo21.edu.ar"
                style={{
                  width: "100%", background: "rgba(255,255,255,0.9)",
                  border: "2px solid rgba(226,232,240,0.8)", borderRadius: "12px",
                  padding: "14px 18px", color: "#0f172a", fontSize: "16px",
                  fontWeight: 500, outline: "none", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.02)",
                  transition: "all 0.2s"
                }}
                onFocus={e => { e.target.style.borderColor = "#10b981"; e.target.style.boxShadow = "0 0 0 4px rgba(16,185,129,0.1)"; }}
                onBlur={e => { e.target.style.borderColor = "rgba(226,232,240,0.8)"; e.target.style.boxShadow = "inset 0 2px 4px rgba(0,0,0,0.02)"; }}
              />
            </div>
            {/* Brand name */}
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#475569", letterSpacing: "0.05em", marginBottom: "10px", textTransform: "uppercase" }}>
                NOMBRE DE MARCA / LEGAL
              </label>
              <input
                value={brandName}
                onChange={e => setBrandName(e.target.value)}
                placeholder="Ej: Universidad Siglo 21"
                style={{
                  width: "100%", background: "rgba(255,255,255,0.9)",
                  border: "2px solid rgba(226,232,240,0.8)", borderRadius: "12px",
                  padding: "14px 18px", color: "#0f172a", fontSize: "16px",
                  fontWeight: 500, outline: "none", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.02)",
                  transition: "all 0.2s"
                }}
                onFocus={e => { e.target.style.borderColor = "#10b981"; e.target.style.boxShadow = "0 0 0 4px rgba(16,185,129,0.1)"; }}
                onBlur={e => { e.target.style.borderColor = "rgba(226,232,240,0.8)"; e.target.style.boxShadow = "inset 0 2px 4px rgba(0,0,0,0.02)"; }}
              />
            </div>
          </div>

          {/* Keywords */}
          <div style={{ marginBottom: "32px" }}>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#475569", letterSpacing: "0.05em", marginBottom: "10px", textTransform: "uppercase" }}>
              VARIANTES O KEYWORDS CLAVE
              <span style={{ color: "#94a3b8", marginLeft: "8px", fontWeight: 400, textTransform: "none" }}>/ enter o coma para agregar</span>
            </label>
            <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
              <input
                value={keywordInput}
                onChange={e => setKeywordInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ej: Siglo21, UES21..."
                style={{
                  flex: 1, background: "rgba(255,255,255,0.9)",
                  border: "2px solid rgba(226,232,240,0.8)", borderRadius: "12px",
                  padding: "14px 18px", color: "#0f172a", fontSize: "16px",
                  fontWeight: 500, outline: "none", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.02)",
                  transition: "all 0.2s"
                }}
                onFocus={e => { e.target.style.borderColor = "#10b981"; e.target.style.boxShadow = "0 0 0 4px rgba(16,185,129,0.1)"; }}
                onBlur={e => { e.target.style.borderColor = "rgba(226,232,240,0.8)"; e.target.style.boxShadow = "inset 0 2px 4px rgba(0,0,0,0.02)"; }}
              />
              <button onClick={addKeyword} style={{
                background: "#f1f5f9", border: "2px solid #e2e8f0",
                borderRadius: "12px", padding: "0 24px", color: "#475569",
                fontWeight: 700, fontSize: "14px", cursor: "pointer",
                transition: "all 0.2s"
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "#e2e8f0"; e.currentTarget.style.color = "#0f172a"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#f1f5f9"; e.currentTarget.style.color = "#475569"; }}
              >
                Añadir
              </button>
            </div>
            {keywords.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {keywords.map((kw, i) => (
                  <KeywordTag key={i} keyword={kw} onRemove={() => setKeywords(prev => prev.filter((_, j) => j !== i))} />
                ))}
              </div>
            )}
          </div>

          {/* Run button */}
          <button
            onClick={runResearch}
            disabled={loading || !url}
            style={{
              width: "100%", padding: "18px", borderRadius: "16px",
              background: loading || !url ? "#e2e8f0" : "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              color: loading || !url ? "#94a3b8" : "white",
              fontSize: "16px", fontWeight: 800, fontFamily: "'Inter', sans-serif",
              border: "none", cursor: loading || !url ? "not-allowed" : "pointer",
              transition: "all 0.3s",
              boxShadow: loading || !url ? "none" : "0 10px 25px rgba(16,185,129,0.3)",
              letterSpacing: "0.05em", textTransform: "uppercase"
            }}
            onMouseEnter={e => { if (!loading && url) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 15px 35px rgba(16,185,129,0.4)"; } }}
            onMouseLeave={e => { if (!loading && url) { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 10px 25px rgba(16,185,129,0.3)"; } }}
          >
            {loading ? "PROCESANDO HUELLA DIGITAL..." : "EJECUTAR ANÁLISIS PROFUNDO"}
          </button>
        </div>

        {/* Error state */}
        {error && (
          <div style={{
            background: "rgba(254,226,226,0.8)", border: "1px solid #fca5a5", borderLeft: "4px solid #ef4444",
            color: "#b91c1c", padding: "20px", borderRadius: "12px", marginBottom: "40px",
            fontFamily: "'Inter', sans-serif", fontSize: "15px", fontWeight: 500,
            boxShadow: "0 4px 15px rgba(220,38,38,0.05)"
          }}>
            <strong style={{ display: "block", marginBottom: "8px", fontSize: "16px", fontWeight: 800 }}>Error de Sistema</strong>
            {error}
          </div>
        )}

        {/* Results dashboard */}
        {result && (
          <div ref={resultsRef} style={{ animation: "fadeInUp 0.6s ease-out" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px", borderBottom: "2px solid rgba(226,232,240,0.8)", paddingBottom: "16px" }}>
              <span style={{ fontSize: "24px" }}>📊</span>
              <h2 style={{ margin: 0, fontFamily: "'Outfit', sans-serif", fontSize: "28px", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.02em" }}>
                Digital Intelligence Report
              </h2>
            </div>

            {/* Executive summary strip */}
            <div style={{
              background: "rgba(255,255,255,0.8)", border: "1px solid rgba(226,232,240,0.9)",
              borderRadius: "20px", padding: "32px", marginBottom: "40px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.03)", backdropFilter: "blur(20px)"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "32px" }}>
                <div style={{ flex: 1, minWidth: "280px" }}>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 800, color: "#10b981", letterSpacing: "0.1em", marginBottom: "12px", textTransform: "uppercase" }}>
                    RESUMEN EJECUTIVO · {result.brand}
                  </div>
                  <p style={{ margin: 0, fontSize: "18px", color: "#334155", lineHeight: 1.6, fontWeight: 500 }}>
                    {result.executive_summary}
                  </p>
                </div>
                <div style={{ minWidth: "250px", background: "rgba(248,250,252,0.8)", padding: "20px", borderRadius: "16px", border: "1px solid rgba(226,232,240,0.8)" }}>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 800, color: "#475569", letterSpacing: "0.1em", marginBottom: "12px", textTransform: "uppercase" }}>
                    SENTIMIENTO GLOBAL
                  </div>
                  <SentimentBar
                    positive={result.sentiment_overview?.positive || 0}
                    neutral={result.sentiment_overview?.neutral || 0}
                    negative={result.sentiment_overview?.negative || 0}
                  />
                  <div style={{ marginTop: "16px", fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, color: "#64748b", textAlign: "center" }}>
                    {totalFindings} hallazgos · {result.categories?.length || 0} categorías
                  </div>
                </div>
              </div>
            </div>

            {/* QA Verification Strip */}
            {result.qa_verification && (
              <div style={{
                background: "rgba(255,255,255,0.8)", border: "1px solid rgba(226,232,240,0.9)", borderLeft: "6px solid #3b82f6",
                borderRadius: "20px", padding: "24px 32px", marginBottom: "40px",
                display: "flex", flexWrap: "wrap", gap: "32px", alignItems: "center", justifyContent: "space-between",
                boxShadow: "0 10px 25px rgba(0,0,0,0.02)"
              }}>
                <div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 800, color: "#3b82f6", letterSpacing: "0.1em", marginBottom: "12px", textTransform: "uppercase" }}>
                    QA & VERIFICACIÓN DE ENLACES
                  </div>
                  <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
                    <div style={{ display: "flex", flexDirection: "column", background: "rgba(241,245,249,0.8)", padding: "12px 20px", borderRadius: "12px" }}>
                      <span style={{ fontSize: "28px", fontWeight: 800, color: "#0f172a", fontFamily: "'Outfit', sans-serif" }}>{result.qa_verification.total_links_found}</span>
                      <span style={{ fontSize: "11px", fontWeight: 600, color: "#64748b" }}>HALLADOS</span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", background: "rgba(16,185,129,0.1)", padding: "12px 20px", borderRadius: "12px" }}>
                      <span style={{ fontSize: "28px", fontWeight: 800, color: "#059669", fontFamily: "'Outfit', sans-serif" }}>{result.qa_verification.total_links_validated}</span>
                      <span style={{ fontSize: "11px", fontWeight: 600, color: "#059669" }}>VALIDADOS</span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", background: "rgba(245,158,11,0.1)", padding: "12px 20px", borderRadius: "12px" }}>
                      <span style={{ fontSize: "28px", fontWeight: 800, color: "#d97706", fontFamily: "'Outfit', sans-serif" }}>{result.qa_verification.total_links_partially_verifiable}</span>
                      <span style={{ fontSize: "11px", fontWeight: 600, color: "#d97706" }}>PARCIALES</span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", background: "rgba(225,29,72,0.1)", padding: "12px 20px", borderRadius: "12px" }}>
                      <span style={{ fontSize: "28px", fontWeight: 800, color: "#e11d48", fontFamily: "'Outfit', sans-serif" }}>{result.qa_verification.total_links_excluded}</span>
                      <span style={{ fontSize: "11px", fontWeight: 600, color: "#e11d48" }}>EXCLUIDOS</span>
                    </div>
                  </div>
                </div>
                {result.qa_verification.restricted_platforms_noted?.length > 0 && (
                  <div style={{ maxWidth: "350px", background: "rgba(248,250,252,0.8)", padding: "16px 20px", borderRadius: "12px", border: "1px dashed rgba(203,213,225,0.8)" }}>
                    <div style={{ fontSize: "11px", fontWeight: 700, color: "#64748b", marginBottom: "8px" }}>PLATAFORMAS CON ACCESO RESTRINGIDO:</div>
                    <div style={{ fontSize: "13px", color: "#334155", fontWeight: 500 }}>
                      {result.qa_verification.restricted_platforms_noted.join(", ")}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Category findings */}
            <div style={{ marginBottom: "40px" }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 800, color: "#1e293b", letterSpacing: "0.05em", marginBottom: "20px", display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ width: "24px", height: "2px", background: "#cbd5e1" }}></span>
                DESGLOSE DE SUPERFICIES
                <span style={{ flex: 1, height: "2px", background: "linear-gradient(90deg, #cbd5e1, transparent)" }}></span>
              </div>
              {result.categories?.map((cat, i) => (
                <CategorySection key={i} category={cat} />
              ))}
            </div>

            {/* Strategic Insights */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
              {/* Recommendations */}
              <div style={{
                background: "rgba(255,255,255,0.8)", border: "1px solid rgba(226,232,240,0.9)",
                borderRadius: "20px", padding: "32px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.03)", backdropFilter: "blur(20px)"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                  <span style={{ fontSize: "20px" }}>💡</span>
                  <h3 style={{ margin: 0, fontFamily: "'Outfit', sans-serif", fontSize: "20px", fontWeight: 800, color: "#0f172a" }}>Oportunidades Estratégicas</h3>
                </div>
                <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                  {result.strategic_recommendations?.map((rec, i) => (
                    <li key={i} style={{
                      position: "relative", paddingLeft: "24px", marginBottom: "16px",
                      fontSize: "15px", color: "#334155", lineHeight: 1.5, fontWeight: 500
                    }}>
                      <span style={{ position: "absolute", left: 0, top: "2px", color: "#10b981", fontSize: "16px" }}>→</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Blind spots */}
              <div style={{
                background: "rgba(255,255,255,0.8)", border: "1px solid rgba(226,232,240,0.9)", borderTop: "4px solid #f59e0b",
                borderRadius: "20px", padding: "32px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.03)", backdropFilter: "blur(20px)"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                  <span style={{ fontSize: "20px" }}>⚠️</span>
                  <h3 style={{ margin: 0, fontFamily: "'Outfit', sans-serif", fontSize: "20px", fontWeight: 800, color: "#0f172a" }}>Puntos Ciegos & Riesgos</h3>
                </div>
                <ul style={{ margin: 0, paddingLeft: "20px", color: "#475569", fontSize: "14px", lineHeight: 1.6 }}>
                  {result.blind_spots?.map((bs, i) => (
                    <li key={i} style={{ marginBottom: "12px", fontWeight: 500 }}>{bs}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div style={{
              marginTop: "24px", padding: "12px", textAlign: "center",
              fontFamily: "'Space Mono', monospace", fontSize: "10px",
              color: "#1e293b", borderTop: "1px solid rgba(30,41,59,0.5)"
            }}>
              GENERADO POR R'EVOLUTION LAB · {result.analysis_date} · POWERED BY GEMINI AI
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer style={{
        textAlign: "center", padding: "40px", color: "#94a3b8", fontSize: "12px",
        fontFamily: "'Inter', sans-serif", fontWeight: 600, borderTop: "1px solid rgba(226,232,240,0.8)",
        background: "rgba(255,255,255,0.5)"
      }}>
        R'EVOLUTION<span style={{ color: "#10b981" }}>LAB</span> · BRAND INTELLIGENCE ENGINE<br/>
        <span style={{ opacity: 0.6 }}>POWERED BY GEMINI AI</span>
      </footer>

    </div>
  );
}

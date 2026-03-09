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
    "limitaciones de acceso, ambigüedades, plataformas con contenido parcial o cerrado, etc."
  ],
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
    <div style={{ marginTop: "8px" }}>
      <div style={{ display: "flex", borderRadius: "4px", overflow: "hidden", height: "8px" }}>
        <div style={{ width: `${positive}%`, background: "#22d3a0", transition: "width 1s ease" }} />
        <div style={{ width: `${neutral}%`, background: "#475569", transition: "width 1s ease" }} />
        <div style={{ width: `${negative}%`, background: "#f4516c", transition: "width 1s ease" }} />
      </div>
      <div style={{ display: "flex", gap: "16px", marginTop: "6px", justifyContent: "space-between" }}>
        {[
          { label: "Positivo", value: positive, color: "#22d3a0" },
          { label: "Neutro", value: neutral, color: "#94a3b8" },
          { label: "Negativo", value: negative, color: "#f4516c" },
        ].map(s => (
          <span key={s.label} style={{ fontSize: "11px", color: s.color, fontFamily: "'Courier New', monospace" }}>
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

  return (
    <div style={{
      background: "rgba(15,23,42,0.6)", border: "1px solid rgba(51,65,85,0.6)",
      borderLeft: `3px solid ${sentColor}`, borderRadius: "6px",
      padding: "14px 16px", marginBottom: "10px",
      transition: "border-color 0.2s, background 0.2s"
    }}
      onMouseEnter={e => e.currentTarget.style.background = "rgba(30,41,59,0.8)"}
      onMouseLeave={e => e.currentTarget.style.background = "rgba(15,23,42,0.6)"}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "4px" }}>
            <span style={{ fontSize: "13px", fontWeight: 700, color: "#e2e8f0", fontFamily: "'Courier New', monospace" }}>
              {finding.platform}
            </span>
            <span style={{
              fontSize: "10px", padding: "2px 7px", borderRadius: "3px",
              background: relevBadge.bg, color: relevBadge.color,
              fontFamily: "'Courier New', monospace", letterSpacing: "0.05em"
            }}>
              {relevBadge.label}
            </span>
            <span style={{
              fontSize: "10px", padding: "2px 7px", borderRadius: "3px",
              background: `${sentColor}20`, color: sentColor,
              fontFamily: "'Courier New', monospace", textTransform: "uppercase"
            }}>
              {finding.sentiment}
            </span>
          </div>
          <p style={{ margin: "0 0 6px", fontSize: "13px", color: "#cbd5e1", lineHeight: 1.5 }}>
            <strong style={{ color: "#f1f5f9" }}>{finding.title}</strong>
          </p>
          <p style={{ margin: "0 0 8px", fontSize: "12px", color: "#94a3b8", lineHeight: 1.6 }}>
            {finding.description}
          </p>
          <a href={finding.url} target="_blank" rel="noopener noreferrer" style={{
            fontSize: "11px", color: "#22d3a0", textDecoration: "none",
            fontFamily: "'Courier New', monospace", opacity: 0.8,
            display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"
          }}
            onMouseEnter={e => e.target.style.opacity = 1}
            onMouseLeave={e => e.target.style.opacity = 0.8}
          >
            ↗ {finding.url}
          </a>
        </div>
        {finding.date && (
          <span style={{
            fontSize: "10px", color: "#475569", whiteSpace: "nowrap",
            fontFamily: "'Courier New', monospace"
          }}>{finding.date}</span>
        )}
      </div>
    </div>
  );
}

function CategorySection({ category }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ marginBottom: "20px" }}>
      <button onClick={() => setOpen(o => !o)} style={{
        width: "100%", display: "flex", alignItems: "center", gap: "10px",
        background: "rgba(30,41,59,0.5)", border: "1px solid rgba(51,65,85,0.5)",
        borderRadius: "8px", padding: "12px 16px", cursor: "pointer",
        color: "#e2e8f0", fontSize: "14px", fontFamily: "'Courier New', monospace",
        textAlign: "left", transition: "background 0.2s"
      }}
        onMouseEnter={e => e.currentTarget.style.background = "rgba(51,65,85,0.5)"}
        onMouseLeave={e => e.currentTarget.style.background = "rgba(30,41,59,0.5)"}
      >
        <span style={{ fontSize: "18px" }}>{category.category_icon}</span>
        <span style={{ flex: 1, fontWeight: 600 }}>{category.category_name}</span>
        <span style={{
          fontSize: "11px", padding: "2px 8px", borderRadius: "10px",
          background: "rgba(34,211,160,0.1)", color: "#22d3a0"
        }}>
          {category.findings?.length || 0} hallazgos
        </span>
        <span style={{ color: "#475569", fontSize: "12px" }}>{open ? "▲" : "▼"}</span>
      </button>
      {open && category.findings?.length > 0 && (
        <div style={{ marginTop: "8px", paddingLeft: "4px" }}>
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
      background: "#080f1a",
      color: "#e2e8f0",
      fontFamily: "'Georgia', serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');
        @keyframes scan { 0% { top: -2px; } 100% { top: 100%; } }
        @keyframes pulse-glow { 0%,100% { box-shadow: 0 0 8px rgba(34,211,160,0.2); } 50% { box-shadow: 0 0 20px rgba(34,211,160,0.4); } }
        @keyframes fadeInUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0f172a; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 3px; }
        input::placeholder { color: #334155; }
      `}</style>

      {/* Header */}
      <div style={{
        borderBottom: "1px solid rgba(34,211,160,0.15)",
        background: "rgba(8,15,26,0.95)",
        backdropFilter: "blur(10px)",
        padding: "0 40px",
        position: "sticky", top: 0, zIndex: 100
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "16px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{
              width: "32px", height: "32px", borderRadius: "6px",
              background: "rgba(34,211,160,0.1)", border: "1px solid rgba(34,211,160,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              animation: "pulse-glow 3s ease-in-out infinite"
            }}>
              <span style={{ color: "#22d3a0", fontSize: "16px" }}>◎</span>
            </div>
            <div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "15px", fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.02em" }}>
                SIGNAL<span style={{ color: "#22d3a0" }}>TRACE</span>
              </div>
              <div style={{ fontSize: "10px", color: "#475569", fontFamily: "'Space Mono', monospace", letterSpacing: "0.1em" }}>
                DIGITAL FOOTPRINT INTELLIGENCE
              </div>
            </div>
          </div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", color: "#22d3a0", opacity: 0.5 }}>
            {new Date().toISOString().slice(0, 10)}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "48px 40px" }}>

        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: "52px" }}>
          <h1 style={{
            fontFamily: "'Libre Baskerville', serif", fontStyle: "italic",
            fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 400,
            color: "#f1f5f9", margin: "0 0 12px", lineHeight: 1.2,
            letterSpacing: "-0.02em"
          }}>
            Inteligencia de Huella Digital
          </h1>
          <p style={{ color: "#64748b", fontFamily: "'Space Mono', monospace", fontSize: "12px", letterSpacing: "0.08em" }}>
            INVESTIGACION PROFUNDA · ANALISIS DE SENTIMIENTO · DASHBOARD EJECUTIVO
          </p>
        </div>

        {/* Input form */}
        <div style={{
          background: "rgba(15,23,42,0.7)", border: "1px solid rgba(51,65,85,0.6)",
          borderRadius: "12px", padding: "32px", marginBottom: "40px",
          position: "relative", overflow: "hidden"
        }}>
          {loading && <ScanLine />}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginBottom: "20px" }}>
            {/* URL */}
            <div>
              <label style={{ display: "block", fontFamily: "'Space Mono', monospace", fontSize: "11px", color: "#22d3a0", letterSpacing: "0.1em", marginBottom: "8px" }}>
                URL OFICIAL DE LA MARCA *
              </label>
              <input
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder="https://www.ejemplo.com"
                style={{
                  width: "100%", background: "rgba(8,15,26,0.8)",
                  border: "1px solid rgba(51,65,85,0.8)", borderRadius: "6px",
                  padding: "10px 14px", color: "#e2e8f0", fontSize: "13px",
                  fontFamily: "'Space Mono', monospace", outline: "none",
                  transition: "border-color 0.2s"
                }}
                onFocus={e => e.target.style.borderColor = "rgba(34,211,160,0.5)"}
                onBlur={e => e.target.style.borderColor = "rgba(51,65,85,0.8)"}
              />
            </div>
            {/* Brand name */}
            <div>
              <label style={{ display: "block", fontFamily: "'Space Mono', monospace", fontSize: "11px", color: "#64748b", letterSpacing: "0.1em", marginBottom: "8px" }}>
                NOMBRE DE MARCA (OPCIONAL)
              </label>
              <input
                value={brandName}
                onChange={e => setBrandName(e.target.value)}
                placeholder="Ej: Acme Corp (si difiere de la URL)"
                style={{
                  width: "100%", background: "rgba(8,15,26,0.8)",
                  border: "1px solid rgba(51,65,85,0.8)", borderRadius: "6px",
                  padding: "10px 14px", color: "#e2e8f0", fontSize: "13px",
                  fontFamily: "'Space Mono', monospace", outline: "none",
                  transition: "border-color 0.2s"
                }}
                onFocus={e => e.target.style.borderColor = "rgba(34,211,160,0.5)"}
                onBlur={e => e.target.style.borderColor = "rgba(51,65,85,0.8)"}
              />
            </div>
          </div>

          {/* Keywords */}
          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", fontFamily: "'Space Mono', monospace", fontSize: "11px", color: "#64748b", letterSpacing: "0.1em", marginBottom: "8px" }}>
              KEYWORDS DE BUSQUEDA ADICIONALES
              <span style={{ color: "#334155", marginLeft: "8px" }}>/ presiona Enter o coma para agregar</span>
            </label>
            <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
              <input
                value={keywordInput}
                onChange={e => setKeywordInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ej: siglo21, universidad siglo veintiuno, US21..."
                style={{
                  flex: 1, background: "rgba(8,15,26,0.8)",
                  border: "1px solid rgba(51,65,85,0.8)", borderRadius: "6px",
                  padding: "10px 14px", color: "#e2e8f0", fontSize: "13px",
                  fontFamily: "'Space Mono', monospace", outline: "none",
                  transition: "border-color 0.2s"
                }}
                onFocus={e => e.target.style.borderColor = "rgba(34,211,160,0.5)"}
                onBlur={e => e.target.style.borderColor = "rgba(51,65,85,0.8)"}
              />
              <button onClick={addKeyword} style={{
                background: "rgba(34,211,160,0.1)", border: "1px solid rgba(34,211,160,0.3)",
                borderRadius: "6px", padding: "10px 18px", color: "#22d3a0",
                fontFamily: "'Space Mono', monospace", fontSize: "12px", cursor: "pointer",
                transition: "background 0.2s"
              }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(34,211,160,0.2)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(34,211,160,0.1)"}
              >
                + ADD
              </button>
            </div>
            {keywords.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {keywords.map((kw, i) => (
                  <KeywordTag key={i} keyword={kw} onRemove={() => setKeywords(prev => prev.filter((_, j) => j !== i))} />
                ))}
              </div>
            )}
          </div>

          {/* Run button */}
          <button
            onClick={runResearch}
            disabled={loading || !url.trim()}
            style={{
              width: "100%", padding: "14px", borderRadius: "8px",
              background: loading || !url.trim()
                ? "rgba(34,211,160,0.05)"
                : "rgba(34,211,160,0.12)",
              border: `1px solid ${loading || !url.trim() ? "rgba(34,211,160,0.15)" : "rgba(34,211,160,0.4)"}`,
              color: loading || !url.trim() ? "#334155" : "#22d3a0",
              fontFamily: "'Space Mono', monospace", fontSize: "13px",
              fontWeight: 700, letterSpacing: "0.1em", cursor: loading || !url.trim() ? "not-allowed" : "pointer",
              transition: "all 0.2s", position: "relative"
            }}
            onMouseEnter={e => { if (!loading && url.trim()) e.currentTarget.style.background = "rgba(34,211,160,0.2)"; }}
            onMouseLeave={e => { if (!loading && url.trim()) e.currentTarget.style.background = "rgba(34,211,160,0.12)"; }}
          >
            {loading ? (
              <span>{statusMsg}{loadingDots}</span>
            ) : (
              "◎ INICIAR RASTREO DE HUELLA DIGITAL"
            )}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: "rgba(244,81,108,0.08)", border: "1px solid rgba(244,81,108,0.3)",
            borderRadius: "8px", padding: "16px 20px", marginBottom: "32px",
            fontFamily: "'Space Mono', monospace", fontSize: "12px", color: "#f4516c"
          }}>
            ERROR: {error}
          </div>
        )}

        {/* Results */}
        {result && (
          <div ref={resultsRef} style={{ animation: "fadeInUp 0.5s ease" }}>
            {/* Executive summary strip */}
            <div style={{
              background: "rgba(34,211,160,0.05)", border: "1px solid rgba(34,211,160,0.2)",
              borderRadius: "10px", padding: "24px 28px", marginBottom: "28px"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" }}>
                <div style={{ flex: 1, minWidth: "280px" }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: "#22d3a0", letterSpacing: "0.12em", marginBottom: "8px" }}>
                    RESUMEN EJECUTIVO · {result.brand?.toUpperCase()}
                  </div>
                  <p style={{ margin: 0, fontSize: "14px", color: "#cbd5e1", lineHeight: 1.7, fontFamily: "'Libre Baskerville', serif" }}>
                    {result.executive_summary}
                  </p>
                </div>
                <div style={{ minWidth: "200px" }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: "#475569", letterSpacing: "0.1em", marginBottom: "8px" }}>
                    SENTIMIENTO GLOBAL
                  </div>
                  <SentimentBar
                    positive={result.sentiment_overview?.positive || 0}
                    neutral={result.sentiment_overview?.neutral || 0}
                    negative={result.sentiment_overview?.negative || 0}
                  />
                  <div style={{ marginTop: "12px", fontFamily: "'Space Mono', monospace", fontSize: "11px", color: "#475569" }}>
                    {totalFindings} hallazgos · {result.categories?.length || 0} categorías
                  </div>
                </div>
              </div>
            </div>

            {/* Category findings */}
            <div style={{ marginBottom: "28px" }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", color: "#475569", letterSpacing: "0.1em", marginBottom: "16px" }}>
                ── HALLAZGOS POR CATEGORIA
              </div>
              {result.categories?.map((cat, i) => (
                <CategorySection key={i} category={cat} />
              ))}
            </div>

            {/* Recommendations + Blind spots */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
              <div style={{
                background: "rgba(15,23,42,0.6)", border: "1px solid rgba(51,65,85,0.5)",
                borderRadius: "10px", padding: "20px 24px"
              }}>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: "#22d3a0", letterSpacing: "0.12em", marginBottom: "14px" }}>
                  RECOMENDACIONES ESTRATEGICAS
                </div>
                {result.strategic_recommendations?.map((r, i) => (
                  <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                    <span style={{ color: "#22d3a0", fontFamily: "'Space Mono', monospace", fontSize: "12px", marginTop: "1px", flexShrink: 0 }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p style={{ margin: 0, fontSize: "13px", color: "#94a3b8", lineHeight: 1.6 }}>{r}</p>
                  </div>
                ))}
              </div>

              <div style={{
                background: "rgba(15,23,42,0.6)", border: "1px solid rgba(51,65,85,0.5)",
                borderRadius: "10px", padding: "20px 24px"
              }}>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: "#fbbf24", letterSpacing: "0.12em", marginBottom: "14px" }}>
                  BLIND SPOTS & CAVEATS
                </div>
                {result.blind_spots?.map((b, i) => (
                  <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                    <span style={{ color: "#fbbf24", fontSize: "12px", marginTop: "1px", flexShrink: 0 }}>⚠</span>
                    <p style={{ margin: 0, fontSize: "13px", color: "#94a3b8", lineHeight: 1.6 }}>{b}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              marginTop: "24px", padding: "12px", textAlign: "center",
              fontFamily: "'Space Mono', monospace", fontSize: "10px",
              color: "#1e293b", borderTop: "1px solid rgba(30,41,59,0.5)"
            }}>
              GENERADO POR SIGNALTRACE · {result.analysis_date} · POWERED BY GEMINI AI
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

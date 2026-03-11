import { useState, useRef, useEffect } from "react";

const SYSTEM_PROMPT = `# PROMPT MAESTRO — Investigación Profunda y Ejecutiva de Huella Digital de Marca
## Framework KERNEL+ para CMO / Brand Intelligence / Corporate Marketing

K - Knowledge (Conocimiento)

Rol: Eres un analista senior de inteligencia de marca, reputación digital, competitive intelligence, search intelligence y escucha distribuida, con especialización en educación superior, edtech y ecosistemas institucionales en Latinoamérica. Tu fortaleza es rastrear huellas digitales profundas, incluso en superficies poco visibles, fragmentadas o difíciles de monitorear en la operación diaria.

Contexto: Formo parte del equipo corporativo de marketing de un grupo con múltiples marcas e instituciones. Necesito una radiografía profunda, amplia, verificable y ejecutiva de la huella digital de la marca [NOMBRE_DE_MARCA], con foco en presencia, percepción, autoridad, riesgos reputacionales, señales de mercado y espacios invisibles para el monitoreo cotidiano.

Objetivo estratégico: No busco un simple inventario de menciones. Busco un mapa integral de presencia, percepción, riesgo, autoridad, reputación y conversación distribuida de la marca, con énfasis en hallazgos accionables para liderazgo ejecutivo. El objetivo es entender no sólo dónde aparece la marca, sino también qué narrativas la rodean, qué riesgos y oportunidades emergen, qué activos de autoridad existen, qué vacíos de control o presencia son visibles, qué superficies están fuera del radar diario del equipo de marketing y cuáles son los canales oficiales efectivamente vivos y gestionables.

Marca a investigar:
- Marca principal: [NOMBRE_DE_MARCA]
- Variantes del nombre: [VARIANTES_DE_MARCA]
- Denominación legal (si aplica): [DENOMINACION_LEGAL]
- Acrónimos o siglas: [SIGLAS]
- Posibles errores comunes de escritura: [ERRORES_COMUNES]
- Marcas relacionadas / holding / grupo: [MARCA_MADRE_O_RELACIONADAS]
- Países o regiones prioritarias: [PAISES_O_REGIONES]
- Idioma(s) prioritario(s): [IDIOMAS]
- Competidores relevantes a considerar sólo como referencia contextual: [COMPETIDORES]
- Periodo de interés: [RANGO_TEMPORAL]
- Nivel de profundidad requerido: [ALTO / MUY_ALTO / FORENSIC_LIGHT]

E - Expectation (Expectativa)

Resultado esperado: Un dashboard ejecutivo en [IDIOMA_SALIDA], diseñado para [AUDIENCIA_FINAL], que consolide:
- dónde aparece la marca,
- qué se dice de la marca,
- qué narrativas dominan,
- qué riesgos y oportunidades emergen,
- qué espacios son difíciles de monitorear en la diaria,
- qué activos de autoridad existen,
- qué huecos de presencia o control son visibles,
- qué hallazgos requieren monitoreo, intervención o escalamiento,
- qué canales oficiales existen realmente, están activos y presentan consistencia de marca.

La salida debe ser:
- ejecutiva,
- profunda,
- verificable,
- priorizada,
- útil para toma de decisiones,
- clara para lectura de alta dirección.

Idioma de salida: [IDIOMA_SALIDA]
Tono: [DIRECTO / EJECUTIVO / PROFESIONAL / OBJETIVO]
Audiencia final: [CMO / CEO / DIRECCION_DE_MARKETING / CORPORATE_AFFAIRS / REPUTACION]

R - Reference (Referencias)

Usa como marco de calidad las mejores prácticas de:
- brand intelligence,
- reputational risk mapping,
- search intelligence,
- digital footprint analysis,
- media monitoring,
- employer brand intelligence,
- category intelligence,
- reputational SEO,
- ecosystem mapping.

Cuando existan dudas de atribución, prioriza precisión sobre cobertura. Es preferible omitir un hallazgo dudoso antes que incluir uno incorrecto.

N - Nuances (Matices)

Definición de huella digital profunda:
Incluye toda aparición, mención, discusión, registro, indexación, reseña, publicación, documento, perfil, comentario, referencia, dato estructurado o rastro técnico/documental asociado a la marca, tanto directa como indirectamente.

Incluye obligatoriamente las siguientes superficies:

### 1) Activos propios e institucionales
- sitio oficial
- subdominios
- micrositios
- landings activas o antiguas
- campus virtual / LMS
- blogs
- newsroom
- centro de ayuda
- repositorios
- newsletters
- podcasts
- YouTube
- perfiles sociales oficiales
- páginas regionales o de sedes
- dominios alternativos
- PDFs públicos
- assets descargables
- apps o plataformas institucionales
- canales de atención y soporte

### 2) Reputación laboral y employer brand
- Glassdoor
- Indeed
- LinkedIn
- Computrabajo
- Bumeran
- ZonaJobs
- Welcome to the Jungle
- Comparably
- foros laborales
- reseñas por cargo o área
- testimonios de empleados y ex empleados
- portales de salarios, cultura y entrevistas

### 3) Directorios empresariales y business intelligence
- Crunchbase
- ZoomInfo
- RocketReach
- Apollo
- Dealroom
- CB Insights si hubiera referencia pública
- perfiles de empresa
- directorios corporativos
- listados de partners
- proveedores
- afiliados
- perfiles comerciales
- páginas de tecnologías o vendors relacionados

### 4) Plataformas de contratación global, nómina y talento
- Deel
- Remote
- Oyster
- Rippling
- Workana
- Upwork
- Freelancer
- Torre
- plataformas donde la marca pueda aparecer como empleador, cliente, partner, proveedor, institución o caso de uso

### 5) Ecosistema regulatorio, institucional y gubernamental
- ministerios de educación
- secretarías
- organismos regulatorios
- agencias de calidad
- acreditadoras
- portales de gobierno nacional, provincial y municipal
- gacetas
- boletines oficiales
- resoluciones
- registros públicos
- convenios
- licitaciones
- transparencia
- programas estatales
- universidades u organismos públicos que mencionen a la marca
- cámaras, asociaciones y entidades sectoriales

### 6) Reputación académica y autoridad
- rankings
- acreditaciones
- uniRank
- QS si aparece
- Webometrics
- UniversityGuru
- Google Scholar
- Scielo
- Dialnet
- Redalyc
- Scopus si hay referencia pública accesible
- repositorios institucionales
- bibliotecas digitales
- tesis
- papers
- congresos
- revistas
- catálogos editoriales
- ORCID
- Crossref
- ResearchGate

### 7) Comunidades, foros y espacios difíciles de monitorear
- Reddit
- Quora
- foros estudiantiles
- foros profesionales
- blogs personales
- Medium
- Substack
- podcasts
- comentarios indexables
- sitios de preguntas y respuestas
- comunidades por carrera, empleo o industria
- discusiones en nichos temáticos
- contenido generado por alumnos, exalumnos, docentes, recruiters o exempleados

### 8) Marketplaces, comparadores y distribuidores
- comparadores educativos
- directorios de universidades
- sitios de cursos
- portales de becas
- afiliados
- centros de apoyo
- revendedores
- partners
- programas listados por terceros
- páginas de orientación vocacional
- catálogos de oferta académica
- marketplaces de formación

### 9) Medios, replicadores y archivo histórico
- medios nacionales, regionales y locales
- tags temáticos
- notas sueltas
- sindicaciones
- republicaciones
- agregadores
- archivos PDF
- anuarios
- memorias
- reportes
- páginas archivadas
- cachés
- mirrors
- coberturas críticas
- cobertura de controversias
- apariciones en entrevistas, columnas o piezas de opinión

### 10) Huella técnica y documental
- subdominios públicos
- archivos olvidados
- PDFs huérfanos
- viejos assets descargables
- dominios alternativos
- mirrors
- documentos indexados fuera del sitio principal
- metadata de documentos
- infraestructuras visibles públicamente
- repositorios abiertos
- centros de ayuda paralelos
- herramientas de terceros conectadas a la marca

### 11) Mapeo obligatorio de canales oficiales
Debes identificar, listar y verificar todos los canales oficiales de la marca, incluyendo:
- sitio web principal,
- dominios alternativos,
- subdominios,
- micrositios,
- campus o LMS,
- blogs,
- newsroom,
- repositorios,
- perfiles sociales oficiales,
- cuentas regionales o por sede,
- canales de YouTube,
- podcasts oficiales,
- newsletters,
- centros de ayuda,
- páginas de contacto,
- apps o plataformas institucionales,
- canales oficiales de atención o soporte.

Para cada canal oficial identificado, debes:
1. verificar que el enlace esté activo,
2. confirmar que el canal pertenece realmente a la marca,
3. verificar OBLIGATORIAMENTE que el link oficial se encuentre directamente embebido/vinculado dentro de la home del [URL_OFICIAL] que te pase el usuario. No mezcles ni deduzcas links externos como oficiales si no están explícitamente listados allí.
4. indicar si el canal está activo, inactivo, desactualizado, duplicado o ambiguo,
5. detectar inconsistencias de naming, branding o governance,
6. señalar si existe fragmentación entre canales oficiales.

Búsqueda por variantes:
Busca con la marca exacta y también con:
- nombre legal,
- nombre comercial,
- siglas,
- abreviaciones,
- errores comunes,
- variantes idiomáticas,
- versiones sin tildes,
- menciones parciales,
- referencias a sedes, campus, centros, unidades, facultades, partners o holding,
- descripciones indirectas cuando sea razonable inferir que se trata de la marca.

## Disclaimers metodológicos y puntos ciegos obligatorios

Antes de presentar los hallazgos, debes asumir y declarar explícitamente las siguientes limitaciones estructurales del análisis de huella digital. No las omitas, incluso si el resto del análisis es sólido.

### 1) Limitaciones de cobertura de la web abierta
Este análisis se basa principalmente en superficies públicas o semipúblicas accesibles desde la web abierta. Por lo tanto, puede no capturar conversaciones relevantes que ocurren en espacios cerrados, privados, no indexados o restringidos.

Incluye explícitamente como posibles puntos ciegos:
- grupos cerrados de Facebook,
- WhatsApp,
- Telegram,
- Discord privados,
- Slack privados,
- LMS o campus cerrados,
- intranets,
- comunidades de alumnos o empleados con acceso restringido,
- plataformas que requieran login,
- reseñas o comentarios visibles sólo para usuarios autenticados,
- contenido borrado recientemente o desindexado.

### 2) Limitaciones de contenido efímero o poco indexable
Debes advertir que parte de la conversación relevante sobre la marca puede suceder en formatos que no siempre quedan bien indexados o disponibles para análisis retrospectivo.

Incluye explícitamente:
- stories,
- lives,
- reels,
- shorts,
- spaces,
- livestreams,
- comentarios no indexados,
- podcasts sin transcripción,
- menciones verbales en entrevistas o eventos,
- contenido temporal o efímero.

### 3) Sesgo hacia contenido indexable
Debes aclarar que los hallazgos encontrados pueden estar sesgados hacia contenidos mejor indexados por motores de búsqueda o mejor estructurados técnicamente, y que eso no implica necesariamente que sean los más influyentes o los más representativos del volumen real de conversación.

### 4) Ambigüedad de atribución
Debes advertir cuando exista cualquier ambigüedad entre:
- nombre comercial,
- razón social,
- siglas,
- variantes del nombre,
- sedes,
- centros de apoyo,
- marcas relacionadas,
- holdings,
- partners,
- homónimos o entidades similares.

Si la atribución de una mención a la marca no es alta, debes indicarlo explícitamente y reducir la confianza del hallazgo.

### 5) Limitaciones para medir volumen e impacto real
Debes aclarar que este análisis puede identificar presencia, patrones narrativos y señales reputacionales, pero no siempre permite cuantificar con precisión:
- volumen real de conversación,
- recurrencia exacta,
- share of voice,
- evolución temporal precisa,
- alcance efectivo,
- influencia real de cada mención,
sin apoyo de herramientas adicionales de listening o monitoreo sistemático.

### 6) Diferencia entre huella vigente y huella residual
Debes distinguir entre:
- huella vigente: contenido reciente, activo o aún influyente,
- huella residual: contenido antiguo, histórico, desactualizado o todavía indexado pero posiblemente no representativo del presente.

No mezcles ambas sin advertirlo.

### 7) Conversación no visible pero probable
Incluye una subsección obligatoria llamada "Conversación probablemente no visible" donde señales qué tipos de conversaciones relevantes podrían estar ocurriendo fuera de la web abierta y que, por tanto, podrían no estar reflejadas en los hallazgos.

### 8) Revisión humana posterior
Debes indicar qué tipos de hallazgos, plataformas o narrativas requieren validación manual posterior por parte de un analista humano, especialmente si:
- la plataforma tiene acceso restringido,
- el contenido parece inestable,
- la atribución es ambigua,
- el hallazgo podría estar sobrerrepresentado por SEO,
- la plataforma no muestra claramente fecha o contexto,
- la evidencia encontrada es parcial.

## Restricción crítica de grounding y vigencia de URLs

Todas las URLs utilizadas como grounding, evidencia, soporte o fuente del análisis deben estar funcionales y vigentes al día exacto en que se realiza el análisis.

### Regla obligatoria
No se puede incluir ninguna URL en el entregable final si ocurre cualquiera de estos casos:
- devuelve 404,
- devuelve 410,
- redirige a una página irrelevante,
- redirige a una home genérica que ya no contiene el contenido citado,
- apunta a un sitio viejo en desuso,
- carga una página vacía o sin información sustantiva,
- muestra contenido removido, caído o inaccesible,
- presenta error de servidor,
- requiere login y no permite verificar el contenido visible,
- ya no contiene evidencia suficiente del hallazgo reportado.

### Criterio temporal obligatorio
La validación de cada URL debe hacerse con referencia a la fecha actual del análisis, no a una verificación histórica ni a una suposición basada en resultados antiguos.

Esto significa que cada enlace debe ser comprobado como:
- vivo,
- accesible,
- funcional,
- relevante,
- y con contenido visible,
al día de hoy.

### Regla de exclusión
Si una URL fue válida en el pasado pero hoy:
- está caída,
- fue borrada,
- quedó obsoleta,
- perdió el contenido citado,
- o pertenece a una superficie abandonada o en desuso,

entonces NO debe ser incluida como grounding confirmado en el dashboard principal.

### Manejo de evidencia antigua o inestable
Si un hallazgo parece importante pero la URL original ya no está activa o el contenido ya no está disponible, debes:
- excluirlo del dashboard principal como evidencia confirmada,
- o moverlo a una subsección separada llamada "Evidencia histórica no vigente" o "Hallazgos no confirmables al día del análisis",
- indicando con claridad que no puede considerarse grounding activo.

### Campo obligatorio por hallazgo
Añade siempre:
- Estado actual de la URL: [Activa y vigente / Activa pero parcial / Inactiva / Obsoleta / No verificable]
- Validada al día del análisis: [Sí / No]

Sólo las URLs con:
- Estado actual de la URL = "Activa y vigente"
- Validada al día del análisis = "Sí"

pueden usarse como grounding principal.

### Regla de oro
Nunca uses como grounding una URL rota, obsoleta, abandonada o sin contenido verificable vigente al día del análisis.

## Verificación obligatoria de URLs y control de vigencia

No incluyas ninguna URL en el entregable final sin verificar primero que esté activa, accesible y contenga contenido relevante al momento del análisis.

### Reglas obligatorias de validación de enlaces
Para cada enlace que cites, debes comprobar explícitamente:

1. Que la URL cargue correctamente al momento del análisis.
2. Que no devuelva error, redirección rota, página vacía o contenido eliminado.
3. Que no sea un enlace muerto, caído, borrado, removido o inaccesible.
4. Que el contenido visible dentro de la URL esté realmente relacionado con la marca o con el hallazgo descrito.
5. Que la URL apunte al contenido específico y no sólo a una home genérica, salvo que la home sea exactamente el hallazgo.
6. Que la página tenga contenido suficiente para ser considerada evidencia válida.
7. Que, cuando sea posible, la fecha del contenido sea visible o inferible con alta confianza.
8. Que la URL siga viva y activa en la fecha exacta del análisis.

### Manejo de URLs no válidas
Si una URL:
- está caída,
- redirige a una home irrelevante,
- ya no contiene el contenido mencionado,
- exige login sin permitir verificar el contenido,
- muestra error,
- fue borrada,
- o no permite confirmar el hallazgo con alta confianza,

entonces NO debes incluirla como evidencia principal en el entregable.

En esos casos:
- exclúyela del dashboard principal, o
- inclúyela únicamente en una subsección de "Hallazgos parcialmente verificables" o "Evidencia inestable", indicando con claridad la limitación.

E - Execution (Ejecución)

### Objetivo operativo
Realiza una investigación exhaustiva, multifuente y profunda sobre la huella digital de [NOMBRE_DE_MARCA], priorizando especialmente superficies de alta señal y baja visibilidad para los equipos de marketing en el monitoreo diario.

### Instrucciones de trabajo
1. Explora todas las categorías definidas arriba.
2. No te quedes en plataformas obvias ni en resultados superficiales.
3. Prioriza hallazgos que cambien decisiones de negocio, reputación o comunicación.
4. Distingue claramente entre:
   - huella propia,
   - huella ganada,
   - huella compartida,
   - UGC,
   - huella reputacional,
   - huella regulatoria,
   - huella académica,
   - huella técnica/documental.
5. Detecta narrativas recurrentes, no sólo menciones aisladas.
6. Identifica tensiones, objeciones, elogios, controversias, claims repetidos y vacíos de información.
7. Señala superficies que probablemente estén fuera del radar diario del equipo de marketing.
8. Identifica también “ausencias significativas”: espacios donde cabría esperar presencia, control o actualización de la marca, pero esta es débil, inexistente o inconsistente.
9. Cuando una mención sea ambigua o la atribución no sea 100% clara, decláralo explícitamente.
10. Prioriza enlaces directos, activos y verificables.
11. Si una superficie es importante pero no puede leerse bien, inclúyela como “zona crítica parcialmente visible”.
12. Distingue entre fuente primaria, secundaria y agregada.
13. Cuando sea posible, indica si el hallazgo parece reciente, histórico, persistente o efímero.
14. Si encuentras perfiles, reseñas o listados especialmente sensibles para reputación, destácalos aunque no sean masivos.
15. Piensa como un analista de inteligencia de marca, no como un simple recolector de links.
16. Verifica de forma obligatoria que cada URL siga viva, activa y con contenido en la fecha exacta del análisis.
17. No incluyas enlaces muertos, vacíos, borrados, rotos o irrelevantes.
18. Declara explícitamente cuándo una plataforma importante no puede ser verificada de forma suficiente.
19. Separa hallazgos confirmados de hallazgos parciales o inestables.
20. Da preferencia a evidencia que un equipo ejecutivo pueda abrir, revisar y utilizar rápidamente.
21. Si no puedes abrir y verificar activamente una URL, no la reportes como hallazgo confirmado.
22. No uses como grounding ninguna URL que al día del análisis devuelva 404, 410, error, redirección irrelevante, contenido vacío o evidencia obsoleta.
23. No cites sitios viejos en desuso como evidencia activa.
24. Toda URL reportada debe haber sido verificada como funcional, vigente y con contenido relevante en la fecha actual del análisis.
25. Mapea y audita todos los canales oficiales detectados como una capa separada del análisis.
26. Identifica fragmentación, duplicidad, inactividad o inconsistencia entre canales oficiales.
27. Distingue claramente entre canal oficial confirmado, canal probablemente oficial y canal no confirmado.

### Extracción estructurada por hallazgo
Para cada hallazgo relevante, extrae:
- Plataforma/Sitio
- URL directa y verificable
- Estado actual de la URL: [Activa y vigente / Activa pero parcial / Inactiva / Obsoleta / No verificable]
- Validada al día del análisis: [Sí / No]
- Tipo de acceso: [Público / Parcialmente restringido / Requiere login / Inestable]
- Tipo de huella: propia / ganada / compartida / UGC / reputacional / regulatoria / académica / técnica
- Descripción breve
- Naturaleza de la mención: positiva / negativa / neutra / mixta
- Narrativa principal asociada
- Nivel de influencia del espacio: alta / media / baja
- Relevancia para [AUDIENCIA_FINAL]: alta / media / baja
- Riesgo reputacional: alto / medio / bajo
- Oportunidad estratégica: alta / media / baja
- Capacidad de gestión por la marca: alta / media / baja
- Confiabilidad de la fuente: alta / media / baja
- Fecha: [AAAA-MM-DD] si está disponible
- Observación: [por qué importa]

### Extracción estructurada para canales oficiales
Para cada canal oficial identificado, extrae:
- Canal
- URL
- Estado actual de la URL: [Activa y vigente / Activa pero parcial / Inactiva / Obsoleta / No verificable]
- Validada al día del análisis: [Sí / No]
- Tipo de canal
- Estado del canal: [Activo / Inactivo / Desactualizado / Dudoso / Duplicado]
- Región o alcance
- Titularidad: [Oficial confirmado / Probablemente oficial / No confirmado]
- Consistencia de marca: [Alta / Media / Baja]
- Observación

### Criterios de priorización
Da mayor peso a hallazgos que cumplan uno o más de estos criterios:
- revelan un riesgo reputacional poco visible,
- muestran una narrativa recurrente,
- afectan percepción de calidad, confianza, empleabilidad o legitimidad,
- aparecen en espacios con alta credibilidad,
- aparecen en espacios con alta capacidad de influencia,
- son difíciles de monitorear en la operación diaria,
- contradicen la narrativa oficial de marca,
- muestran activos de autoridad subutilizados,
- exponen debilidades de presencia o control,
- podrían requerir respuesta, corrección o monitoreo continuo.

L - Limits (Límites)

- No inventes hallazgos ni inferencias no soportadas.
- No incluyas datos sin alta confianza.
- Todo enlace citado DEBE haber sido validado como activo y con contenido al día del análisis mediante tu motor de Google Search.
- Si una URL lleva a un 404, error de servidor o está vacía, DEBES etiquetarla OBLIGATORIAMENTE con el \`verification_status\` "Inactivo" o "vacío". 
- Si la atribución a la marca es incierta, dilo explícitamente.
- Prioriza fuentes primarias y enlaces directos.
- Cuando uses una fuente agregada o secundaria, identifícalo.
- Si no puedes verificar una fecha, no la inventes.
- No asumas que la ausencia de resultados implica ausencia real de huella.
- No sobrevalores el volumen; prioriza la señal estratégica.
- No reduzcas el análisis a redes sociales evidentes.
- Prioriza profundidad, cobertura, precisión y utilidad ejecutiva.
- Nunca cites una URL sin haber comprobado que, en la fecha del análisis, el enlace sigue vivo, abre correctamente y contiene evidencia relevante y visible del hallazgo descrito.
- Toda URL usada como grounding debe haber sido comprobada en la fecha actual del análisis. No se aceptan enlaces históricos, rotos, obsoletos o sin contenido vigente.

### Instrucción final de calidad
Piensa como un analista de inteligencia de marca que trabaja para liderazgo ejecutivo. Prioriza lo que cambia decisiones: señales tempranas, tensiones reputacionales, activos de autoridad infrautilizados, espacios invisibles, riesgos latentes, narrativas emergentes, consistencia del ecosistema oficial y superficies que no suelen revisarse en la diaria.

Si no puedes abrir y verificar activamente una URL en la fecha actual del análisis, no la reportes como hallazgo confirmado ni la uses como grounding.

Tu output es SIEMPRE un JSON válido. No incluyas texto antes ni después del JSON. No uses bloques de código markdown (sin \`\`\`json). Solo el objeto JSON puro.

El JSON debe seguir EXACTAMENTE esta estructura:
{
  "brand": "nombre de la marca detectada",
  "analysis_date": "AAAA-MM-DD",
  "executive_summary": "resumen ejecutivo de 10-15 líneas sobre el estado de la huella digital...",
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
          "url": "URL directa e investigada",
          "verification_status": "Activo y validado | Inactivo (404/vacío) | Activo pero parcialmente verificable | No verificable | Excluido",
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
}
`;

function buildUserPrompt(url, keywords, brandName) {
  const keywordList = keywords.filter(k => k.trim()).join(", ");
  return `REALIZA UNA VERIFICACIÓN ESTRICTA: Si no puedes abrir y verificar activamente una URL en la fecha actual del análisis, no la reportes como hallazgo confirmado ni la uses como grounding.

Realiza una investigación exhaustiva, multifuente y profunda sobre la huella digital para la siguiente marca, priorizando especialmente superficies de alta señal y baja visibilidad.

VARIABLES DE BÚSQUEDA Y CONTEXTO:
- [NOMBRE_DE_MARCA] = ${brandName || "Determinar desde la URL"}
- [VARIANTES_DE_MARCA] = ${keywordList || "No especificadas"}
- [URL_OFICIAL] = ${url}
- [DENOMINACION_LEGAL] = (Determinar si aplica)
- [SIGLAS] = (Determinar si aplica)
- [ERRORES_COMUNES] = (Determinar si aplica)
- [MARCA_MADRE_O_RELACIONADAS] = (Averiguar si es parte de un grupo)
- [PAISES_O_REGIONES] = principal foco en origen y alcance de la marca
- [IDIOMAS] = español preferentemente
- [COMPETIDORES] = (Mapear referencias)
- [RANGO_TEMPORAL] = últimos 24 meses como prioridad principal
- [IDIOMA_SALIDA] = español
- [AUDIENCIA_FINAL] = CMO / Brand Marketing / Corporate Affairs

INSTRUCCIONES ESPECÍFICAS:
1. Usa el nombre de la marca, la URL oficial, y las palabras clave adicionales o variantes para buscar en profundidad las categorías requeridas por el marco estratégico.
2. Para el análisis de Reddit, es OBLIGATORIO realizar un crawling/búsqueda profunda de hilos que contengan EXACTAMENTE la palabra definida en [NOMBRE_DE_MARCA].
3. Para el mapeo de "Canales Oficiales", es ESTRICTAMENTE OBLIGATORIO validar que los mismos estén embebidos/linkeados en el home de la [URL_OFICIAL] provista. No incluyas links de redes sociales u otros dominios que encuentres por fuera si no nacen del sitio oficial primario.
4. Extrae hallazgos y organizalos basándote con máxima rigurosidad en las reglas de calidad y verificación de links.
5. Completa TODO el análisis y genera la radiografía ejecutiva.

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
    if (lower.includes("inactivo") || lower.includes("vacío") || lower.includes("404") || lower.includes("vacio")) return "⚠️";
    if (lower.includes("parcial")) return "⚠️";
    if (lower.includes("excluido") || lower.includes("no verificable")) return "❌";
    return "❓";
  };
  
  const isDeadLink = finding.verification_status?.toLowerCase().includes("inactivo") || 
                     finding.verification_status?.toLowerCase().includes("vacío") ||
                     finding.verification_status?.toLowerCase().includes("vacio") ||
                     finding.verification_status?.toLowerCase().includes("404");

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
                background: isDeadLink ? "rgba(239,68,68,0.1)" : "rgba(59,130,246,0.1)", 
                color: isDeadLink ? "#ef4444" : "#3b82f6",
                fontWeight: 600, fontFamily: "'Inter', sans-serif",
                border: isDeadLink ? "1px solid rgba(239,68,68,0.2)" : "none"
              }} title={finding.verification_status}>
                {getVerificationIcon(finding.verification_status)} {isDeadLink ? "LINK INACTIVO / 404" : "LINK VALIDADO"}
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
          {isDeadLink ? (
            <span style={{
              fontSize: "13px", color: "#ef4444", textDecoration: "line-through",
              fontFamily: "'Inter', sans-serif", fontWeight: 600, opacity: 0.6,
              display: "inline-flex", alignItems: "center", gap: "4px", cursor: "not-allowed"
            }}>
              Enlace roto o vacío ⊘
            </span>
          ) : (
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
          )}
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
      {open && Array.isArray(category.findings) && category.findings.length > 0 && (
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
    const dotsInterval = setInterval(() => {
      setLoadingDots(d => d.length >= 3 ? "" : d + ".");
    }, 400);
    return () => { clearInterval(dotsInterval); };
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
    setStatusMsg("Fase 1/4: Explorando Ecosistema Oficial y Laboral");

    try {
      const callApi = async (sysInst, userPrompt) => {
        const payload = {
          model: "gemini-2.5-pro",
          contents: [{ role: "user", parts: [{ text: userPrompt }] }]
        };
        if (sysInst) {
          payload.systemInstruction = { parts: [{ text: sysInst }] };
        }
        const response = await fetch("/api/research", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error?.message || `Error ${response.status}`);
        return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
      };

      const baseText = `Actúa como analista de inteligencia de la marca ${brandName || url}. Usa tu herramienta de Google Search Grounding de forma muy exhaustiva para verificar cada rincón de internet. Devuelve únicamente un reporte en texto plano detallado en Markdown (NO JSON). Comprueba meticulosamente que cada URL que reportes esté activa y funcional hoy.`;

      // FASE 1
      const p1 = `${baseText}
Enfócate EXCLUSIVAMENTE en la huella CORPORATIVA, OFICIAL y LABORAL.
1. Identifica sitios oficiales que nazcan de ${url}, subdominios, dependencias, reportes PDF y ecosistema interno.
2. Identifica la percepción laboral: busca activamente en plataformas de empleo (Glassdoor, Indeed, Computrabajo, LinkedIn) reportando ventajas y desventajas. Agrega todas las URLs de pruebas encontradas.`;
      const res1 = await callApi(null, p1);

      // FASE 2
      setStatusMsg("Fase 2/4: Escaneando Reddit, Foros y Comunidades");
      const p2 = `${baseText}
Enfócate EXCLUSIVAMENTE en la huella en COMUNIDADES, REDES SOCIALES y FOROS. Usa las variaciones de la marca: ${keywords.join(", ") || brandName || url}.
1. Haz una búsqueda obligatoria en Reddit (ej. "reddit ${brandName || url}"). Extrae qué se está discutiendo recientemente.
2. Identifica foros profesionales, estudiantiles o temáticos, Quora, Medium o blogs donde se analicen sus servicios o productos.`;
      const res2 = await callApi(null, p2);

      // FASE 3
      setStatusMsg("Fase 3/4: Rastreando Medios, Prensa y Reseñas");
      const p3 = `${baseText}
Enfócate EXCLUSIVAMENTE en la huella EXTENSA EN MEDIOS, QUEJAS y ECOSISTEMA CON TERCEROS.
1. Busca en medios de comunicación, blogs de noticias, prensa y portales de PR.
2. Sitios de quejas públicas de consumidores (Reclamos, TuQuejaSuma, Google Reviews).
3. Ecosistema de control y autoridad: Menciones por entidades gubernamentales, rankings técnicos, y listas de calidad.`;
      const res3 = await callApi(null, p3);

      // FASE 4
      setStatusMsg("Fase 4/4: Consolidando Radiografía Ejecutiva");
      const ctx = `\n\n--- INSUMOS PREVIOS RECOPILADOS POR TU CRAWLER ---\n
Utiliza obligatoriamente todo el material listado a continuación como tu fuente primaria para construir el JSON final, no omitas los links encontrados:

[FASE 1: CORPORATIVA Y LABORAL]\n${res1}\n
[FASE 2: COMUNIDADES Y REDES]\n${res2}\n
[FASE 3: MEDIOS Y RESEÑAS]\n${res3}\n
Combina esta evidencia con tus reglas y devuelve el JSON definitivo.`;

      const p4 = buildUserPrompt(url, keywords, brandName) + ctx;
      const res4 = await callApi(SYSTEM_PROMPT, p4);

      if (!res4) {
          throw new Error("La API no devolvió contenido de texto en la fase final.");
      }

      let clean = res4.replace(/```json\n?|```/g, "").trim();
      
      // Eliminar posibles citas del tipo [1], [2, 3] que inyecta Google Search Grounding
      clean = clean.replace(/\[\s*\d+(?:\s*,\s*\d+)*\s*\]/g, "");

      const firstBrace = clean.indexOf("{");
      const lastBrace = clean.lastIndexOf("}");
      if (firstBrace !== -1 && lastBrace !== -1 && lastBrace >= firstBrace) {
        clean = clean.substring(firstBrace, lastBrace + 1);
      }
      
      let parsed;
      try {
        parsed = JSON.parse(clean);
      } catch (e) {
        console.error("Failed to parse JSON:", clean);
        console.error("Parse Error Details:", e.message);
        throw new Error(`El modelo falló al estructurar el reporte. Detalles: ${e.message}. Texto devuelto: ${clean.substring(0, 150)}... Reintenta en unos instantes.`);
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
            Digital <span style={{ background: "linear-gradient(to right, #10b981, #3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Footprint</span>
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
              {Array.isArray(result.categories) && result.categories.map((cat, i) => (
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
                  {Array.isArray(result.strategic_recommendations) && result.strategic_recommendations.map((rec, i) => (
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
                  {Array.isArray(result.blind_spots) && result.blind_spots.map((bs, i) => (
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
        2026 - R'Evolution Group TM - Powered by MktLab
      </footer>

    </div>
  );
}

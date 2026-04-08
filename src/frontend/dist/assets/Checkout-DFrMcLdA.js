import { h as useNavigate, c as useActor, d as useAuth, i as useCartStore, r as reactExports, v as useSearch, l as ue, j as jsxRuntimeExports, B as Button, D as Download, m as ShoppingCart, L as Link, I as Input, X, o as Separator, R as Receipt, f as createActor } from "./index-DwqYJl65.js";
import { B as Badge } from "./badge-B4QsRaw5.js";
import { L as Label } from "./label-ezFZS5E4.js";
import { u as useCustomerAuth, h as hashPin } from "./use-customer-auth-DWGK5YQU.js";
import { C as Crown } from "./crown-BCvqX8ig.js";
import { M as Music } from "./music-BtP5PwN1.js";
import { R as RefreshCw } from "./refresh-cw-BWJu9X5n.js";
import { L as Lock } from "./lock-DX426M7t.js";
import { A as ArrowLeft } from "./arrow-left-hGNOqMgr.js";
import { C as CreditCard } from "./credit-card-DlJ8PbTc.js";
import { U as UserPlus } from "./user-plus-CdaXQTXx.js";
import { C as CircleCheck } from "./circle-check-CaTHHNh3.js";
import { T as Trash2 } from "./trash-2-BPWfsWRk.js";
const COUNTRIES = [
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" },
  { code: "MX", name: "Mexico" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "JP", name: "Japan" },
  { code: "KR", name: "South Korea" },
  { code: "BR", name: "Brazil" },
  { code: "NG", name: "Nigeria" },
  { code: "GH", name: "Ghana" },
  { code: "ZA", name: "South Africa" },
  { code: "KE", name: "Kenya" },
  { code: "IN", name: "India" },
  { code: "CN", name: "China" },
  { code: "SG", name: "Singapore" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "EG", name: "Egypt" },
  { code: "IT", name: "Italy" },
  { code: "ES", name: "Spain" },
  { code: "NL", name: "Netherlands" },
  { code: "SE", name: "Sweden" },
  { code: "NO", name: "Norway" },
  { code: "DK", name: "Denmark" },
  { code: "FI", name: "Finland" },
  { code: "CH", name: "Switzerland" },
  { code: "AT", name: "Austria" },
  { code: "BE", name: "Belgium" },
  { code: "PT", name: "Portugal" },
  { code: "PL", name: "Poland" },
  { code: "CZ", name: "Czech Republic" },
  { code: "RO", name: "Romania" },
  { code: "HU", name: "Hungary" },
  { code: "GR", name: "Greece" },
  { code: "TR", name: "Turkey" },
  { code: "RU", name: "Russia" },
  { code: "UA", name: "Ukraine" },
  { code: "AR", name: "Argentina" },
  { code: "CL", name: "Chile" },
  { code: "CO", name: "Colombia" },
  { code: "PE", name: "Peru" },
  { code: "VE", name: "Venezuela" },
  { code: "EC", name: "Ecuador" },
  { code: "BO", name: "Bolivia" },
  { code: "PY", name: "Paraguay" },
  { code: "UY", name: "Uruguay" },
  { code: "NZ", name: "New Zealand" },
  { code: "ID", name: "Indonesia" },
  { code: "MY", name: "Malaysia" },
  { code: "TH", name: "Thailand" },
  { code: "VN", name: "Vietnam" },
  { code: "PH", name: "Philippines" },
  { code: "PK", name: "Pakistan" },
  { code: "BD", name: "Bangladesh" },
  { code: "LK", name: "Sri Lanka" },
  { code: "NP", name: "Nepal" },
  { code: "MM", name: "Myanmar" },
  { code: "KH", name: "Cambodia" },
  { code: "LA", name: "Laos" },
  { code: "TW", name: "Taiwan" },
  { code: "HK", name: "Hong Kong" },
  { code: "MA", name: "Morocco" },
  { code: "TN", name: "Tunisia" },
  { code: "DZ", name: "Algeria" },
  { code: "ET", name: "Ethiopia" },
  { code: "TZ", name: "Tanzania" },
  { code: "UG", name: "Uganda" },
  { code: "CM", name: "Cameroon" },
  { code: "CI", name: "Côte d'Ivoire" },
  { code: "SN", name: "Senegal" },
  { code: "IL", name: "Israel" },
  { code: "IQ", name: "Iraq" },
  { code: "IR", name: "Iran" },
  { code: "JO", name: "Jordan" },
  { code: "LB", name: "Lebanon" },
  { code: "KW", name: "Kuwait" },
  { code: "QA", name: "Qatar" },
  { code: "BH", name: "Bahrain" },
  { code: "OM", name: "Oman" },
  { code: "YE", name: "Yemen" },
  { code: "AF", name: "Afghanistan" },
  { code: "UZ", name: "Uzbekistan" },
  { code: "KZ", name: "Kazakhstan" },
  { code: "AZ", name: "Azerbaijan" },
  { code: "GE", name: "Georgia" },
  { code: "AM", name: "Armenia" },
  { code: "SK", name: "Slovakia" },
  { code: "BG", name: "Bulgaria" },
  { code: "HR", name: "Croatia" },
  { code: "RS", name: "Serbia" },
  { code: "SI", name: "Slovenia" },
  { code: "BA", name: "Bosnia and Herzegovina" },
  { code: "MK", name: "North Macedonia" },
  { code: "AL", name: "Albania" },
  { code: "ME", name: "Montenegro" },
  { code: "IE", name: "Ireland" },
  { code: "IS", name: "Iceland" },
  { code: "LU", name: "Luxembourg" },
  { code: "MT", name: "Malta" },
  { code: "CY", name: "Cyprus" },
  { code: "LV", name: "Latvia" },
  { code: "LT", name: "Lithuania" },
  { code: "EE", name: "Estonia" },
  { code: "JM", name: "Jamaica" },
  { code: "TT", name: "Trinidad and Tobago" },
  { code: "BB", name: "Barbados" },
  { code: "BS", name: "Bahamas" },
  { code: "HT", name: "Haiti" },
  { code: "DO", name: "Dominican Republic" },
  { code: "CU", name: "Cuba" },
  { code: "PR", name: "Puerto Rico" },
  { code: "PA", name: "Panama" },
  { code: "CR", name: "Costa Rica" },
  { code: "GT", name: "Guatemala" },
  { code: "HN", name: "Honduras" },
  { code: "SV", name: "El Salvador" },
  { code: "NI", name: "Nicaragua" },
  { code: "BZ", name: "Belize" },
  { code: "GY", name: "Guyana" },
  { code: "SR", name: "Suriname" },
  { code: "ZW", name: "Zimbabwe" },
  { code: "ZM", name: "Zambia" },
  { code: "RW", name: "Rwanda" },
  { code: "MW", name: "Malawi" },
  { code: "MZ", name: "Mozambique" },
  { code: "MG", name: "Madagascar" },
  { code: "AO", name: "Angola" },
  { code: "CD", name: "DR Congo" },
  { code: "CG", name: "Congo" },
  { code: "SD", name: "Sudan" },
  { code: "SS", name: "South Sudan" },
  { code: "SO", name: "Somalia" },
  { code: "LY", name: "Libya" },
  { code: "MR", name: "Mauritania" },
  { code: "ML", name: "Mali" },
  { code: "BF", name: "Burkina Faso" },
  { code: "NE", name: "Niger" },
  { code: "TD", name: "Chad" },
  { code: "GN", name: "Guinea" },
  { code: "SL", name: "Sierra Leone" },
  { code: "LR", name: "Liberia" },
  { code: "TG", name: "Togo" },
  { code: "BJ", name: "Benin" },
  { code: "GM", name: "Gambia" },
  { code: "GW", name: "Guinea-Bissau" },
  { code: "CV", name: "Cape Verde" },
  { code: "ST", name: "São Tomé and Príncipe" },
  { code: "GQ", name: "Equatorial Guinea" },
  { code: "GA", name: "Gabon" },
  { code: "BI", name: "Burundi" },
  { code: "KM", name: "Comoros" },
  { code: "DJ", name: "Djibouti" },
  { code: "ER", name: "Eritrea" },
  { code: "MU", name: "Mauritius" },
  { code: "SC", name: "Seychelles" },
  { code: "LS", name: "Lesotho" },
  { code: "SZ", name: "Eswatini" },
  { code: "BW", name: "Botswana" },
  { code: "NA", name: "Namibia" },
  { code: "PG", name: "Papua New Guinea" },
  { code: "FJ", name: "Fiji" },
  { code: "SB", name: "Solomon Islands" },
  { code: "VU", name: "Vanuatu" },
  { code: "WS", name: "Samoa" },
  { code: "TO", name: "Tonga" }
];
const STATES_BY_COUNTRY = {
  US: [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
    "District of Columbia"
  ],
  CA: [
    "Alberta",
    "British Columbia",
    "Manitoba",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Northwest Territories",
    "Nova Scotia",
    "Nunavut",
    "Ontario",
    "Prince Edward Island",
    "Quebec",
    "Saskatchewan",
    "Yukon"
  ],
  MX: [
    "Aguascalientes",
    "Baja California",
    "Baja California Sur",
    "Campeche",
    "Chiapas",
    "Chihuahua",
    "Ciudad de México",
    "Coahuila",
    "Colima",
    "Durango",
    "Guanajuato",
    "Guerrero",
    "Hidalgo",
    "Jalisco",
    "México",
    "Michoacán",
    "Morelos",
    "Nayarit",
    "Nuevo León",
    "Oaxaca",
    "Puebla",
    "Querétaro",
    "Quintana Roo",
    "San Luis Potosí",
    "Sinaloa",
    "Sonora",
    "Tabasco",
    "Tamaulipas",
    "Tlaxcala",
    "Veracruz",
    "Yucatán",
    "Zacatecas"
  ],
  GB: ["England", "Scotland", "Wales", "Northern Ireland"],
  AU: [
    "Australian Capital Territory",
    "New South Wales",
    "Northern Territory",
    "Queensland",
    "South Australia",
    "Tasmania",
    "Victoria",
    "Western Australia"
  ],
  BR: [
    "Acre",
    "Alagoas",
    "Amapá",
    "Amazonas",
    "Bahia",
    "Ceará",
    "Distrito Federal",
    "Espírito Santo",
    "Goiás",
    "Maranhão",
    "Mato Grosso",
    "Mato Grosso do Sul",
    "Minas Gerais",
    "Pará",
    "Paraíba",
    "Paraná",
    "Pernambuco",
    "Piauí",
    "Rio de Janeiro",
    "Rio Grande do Norte",
    "Rio Grande do Sul",
    "Rondônia",
    "Roraima",
    "Santa Catarina",
    "São Paulo",
    "Sergipe",
    "Tocantins"
  ],
  DE: [
    "Baden-Württemberg",
    "Bavaria",
    "Berlin",
    "Brandenburg",
    "Bremen",
    "Hamburg",
    "Hesse",
    "Lower Saxony",
    "Mecklenburg-Vorpommern",
    "North Rhine-Westphalia",
    "Rhineland-Palatinate",
    "Saarland",
    "Saxony",
    "Saxony-Anhalt",
    "Schleswig-Holstein",
    "Thuringia"
  ],
  IN: [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Delhi"
  ],
  AR: [
    "Buenos Aires",
    "Catamarca",
    "Chaco",
    "Chubut",
    "Córdoba",
    "Corrientes",
    "Entre Ríos",
    "Formosa",
    "Jujuy",
    "La Pampa",
    "La Rioja",
    "Mendoza",
    "Misiones",
    "Neuquén",
    "Río Negro",
    "Salta",
    "San Juan",
    "San Luis",
    "Santa Cruz",
    "Santa Fe",
    "Santiago del Estero",
    "Tierra del Fuego",
    "Tucumán"
  ],
  NG: [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "FCT",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara"
  ]
};
function getStates(countryCode) {
  return STATES_BY_COUNTRY[countryCode] ?? [];
}
function getPostalLabel(countryCode) {
  return countryCode === "US" ? "ZIP Code" : "Postal Code";
}
function detectCardBrand(number) {
  const digits = number.replace(/\s/g, "");
  if (/^4/.test(digits)) return "VISA";
  if (/^5[1-5]|^2[2-7]/.test(digits)) return "MC";
  if (/^3[47]/.test(digits)) return "AMEX";
  if (/^6/.test(digits)) return "DISC";
  return "";
}
function formatCardNumber(value) {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  const groups = digits.match(/.{1,4}/g) ?? [];
  return groups.join(" ");
}
function formatExpiry(value) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return digits;
}
function getGenreColor(genre) {
  const map = {
    "Hip-Hop": "from-amber-950 to-amber-900",
    "R&B": "from-purple-950 to-purple-900",
    Pop: "from-pink-950 to-pink-900",
    Electronic: "from-cyan-950 to-cyan-900",
    Rock: "from-red-950 to-red-900"
  };
  return map[genre] ?? "from-zinc-900 to-zinc-800";
}
function triggerDownload(url, filename) {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
function getFormatLabel(url) {
  const lower = url.toLowerCase();
  if (lower.includes(".wav") || lower.includes("wav")) return "WAV";
  if (lower.includes(".flac") || lower.includes("flac")) return "FLAC";
  return "MP3";
}
const PAYMENT_TABS = [
  { id: "card", label: "Card", icon: "💳" },
  { id: "apple-pay", label: "Apple Pay", icon: "🍎" },
  { id: "google-pay", label: "Google Pay", icon: "G" },
  { id: "paypal", label: "PayPal", icon: "P" },
  { id: "cashapp", label: "Cash App", icon: "$" },
  { id: "zelle", label: "Zelle", icon: "Z" }
];
function SuccessScreen({
  tracks,
  sessionId,
  onReturnToStore
}) {
  const handleDownloadReceipt = () => {
    const canvas = document.createElement("canvas");
    const W = 600;
    const lineH = 28;
    const padding = 40;
    const headerH = 180;
    const footerH = 80;
    const itemsH = Math.max(tracks.length * lineH + 60, 80);
    canvas.width = W;
    canvas.height = headerH + itemsH + footerH + padding * 2;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const H = canvas.height;
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = "#d4af37";
    ctx.lineWidth = 3;
    ctx.strokeRect(12, 12, W - 24, H - 24);
    ctx.font = "52px serif";
    ctx.textAlign = "center";
    ctx.fillText("👑", W / 2, 68);
    ctx.fillStyle = "#d4af37";
    ctx.font = "bold 22px Georgia, serif";
    ctx.fillText("CHOSEN ONE DISTRIBUTION", W / 2, 98);
    ctx.fillStyle = "#b8962e";
    ctx.font = "13px Georgia, serif";
    ctx.fillText("Official Purchase Receipt", W / 2, 120);
    ctx.strokeStyle = "#d4af37";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, 136);
    ctx.lineTo(W - padding, 136);
    ctx.stroke();
    ctx.textAlign = "left";
    ctx.fillStyle = "#888";
    ctx.font = "12px monospace";
    const receiptId = sessionId ? `#${sessionId.slice(-8).toUpperCase()}` : `#${Date.now().toString(36).toUpperCase()}`;
    ctx.fillText(`Receipt ${receiptId}`, padding, 158);
    ctx.textAlign = "right";
    ctx.fillText(
      `Date: ${(/* @__PURE__ */ new Date()).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`,
      W - padding,
      158
    );
    ctx.textAlign = "left";
    ctx.fillStyle = "#aaa";
    ctx.fillText("Sold to: Valued Customer", padding, 176);
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, 190);
    ctx.lineTo(W - padding, 190);
    ctx.stroke();
    let y = 220;
    for (const item of tracks) {
      ctx.textAlign = "left";
      ctx.fillStyle = "#e8e8e8";
      ctx.font = "bold 13px Georgia, serif";
      ctx.fillText(
        item.title.length > 38 ? `${item.title.slice(0, 36)}…` : item.title,
        padding,
        y + lineH - 8
      );
      ctx.fillStyle = "#888";
      ctx.font = "11px monospace";
      ctx.fillText(`by ${item.artistName}`, padding, y + lineH + 6);
      y += lineH + 16;
    }
    y += 6;
    ctx.strokeStyle = "#d4af37";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(W - padding, y);
    ctx.stroke();
    y += 24;
    ctx.textAlign = "center";
    ctx.fillStyle = "#d4af37";
    ctx.font = "13px Georgia, serif";
    ctx.fillText(
      "Thank you for supporting independent artists 👑",
      W / 2,
      y + 10
    );
    const dateStr = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `receipt-${dateStr}-${sessionId.slice(-6) || "purchase"}.png`;
    link.click();
    ue.success("Receipt downloaded!");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-screen flex items-center justify-center p-4",
      style: { background: "#0a0a0a" },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-20 h-20 rounded-full flex items-center justify-center animate-crown-glow-pulse",
              style: {
                background: "rgba(212,175,55,0.12)",
                border: "2px solid rgba(212,175,55,0.5)"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-10 h-10", style: { color: "#d4af37" } })
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "mt-4 text-xs uppercase tracking-widest font-semibold",
              style: { color: "#d4af37" },
              children: "Purchase Complete"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground mt-1", children: "Thank You! 👑" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Chosen One Distribution" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-xl overflow-hidden mb-6",
            style: {
              border: "1px solid rgba(212,175,55,0.25)",
              background: "rgba(212,175,55,0.04)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "px-4 py-3 border-b",
                  style: { borderColor: "rgba(212,175,55,0.15)" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground", children: [
                    tracks.length,
                    " track",
                    tracks.length !== 1 ? "s" : "",
                    " purchased"
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-3", children: tracks.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `w-10 h-10 rounded-md bg-gradient-to-br ${getGenreColor(t.genre ?? "")} flex items-center justify-center shrink-0`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Music, { className: "w-4 h-4 text-foreground/30" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: t.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: t.artistName })
                ] }),
                t.audioFileUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    onClick: () => {
                      if (t.audioFileUrl) {
                        const format = getFormatLabel(t.audioFileUrl);
                        triggerDownload(
                          t.audioFileUrl,
                          `${t.artistName} - ${t.title}.${format.toLowerCase()}`
                        );
                      }
                    },
                    className: "gap-1 text-xs shrink-0 min-h-[36px]",
                    style: { background: "#d4af37", color: "#000" },
                    "data-ocid": `success-download-${t.id}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Download" })
                    ]
                  }
                )
              ] }, String(t.id))) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: handleDownloadReceipt,
              variant: "outline",
              className: "w-full gap-2 min-h-[44px]",
              style: { borderColor: "rgba(212,175,55,0.4)", color: "#d4af37" },
              "data-ocid": "success-receipt-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { className: "w-4 h-4" }),
                "Download Receipt"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: onReturnToStore,
              className: "w-full gap-2 min-h-[44px]",
              "data-ocid": "success-return-store",
              children: "Return to Store"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground mt-6", children: [
          "Registered customers can re-download from",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/store", className: "text-primary hover:underline", children: "My Purchases" }),
          " ",
          "within 30 days."
        ] })
      ] })
    }
  );
}
function CheckoutPage() {
  var _a, _b, _c;
  const navigate = useNavigate();
  const { actor } = useActor(createActor);
  const { sessionToken } = useAuth();
  const { isCustomerLoggedIn, customerToken, customerEmail, customerSignup } = useCustomerAuth();
  const { items: cartItems, clearCart, removeItem } = useCartStore();
  const [selectedMethod, setSelectedMethod] = reactExports.useState("card");
  const [isProcessing, setIsProcessing] = reactExports.useState(false);
  const [hasRemovedItem, setHasRemovedItem] = reactExports.useState(false);
  const [cardName, setCardName] = reactExports.useState("");
  const [cardNumber, setCardNumber] = reactExports.useState("");
  const [cardExpiry, setCardExpiry] = reactExports.useState("");
  const [cardCvc, setCardCvc] = reactExports.useState("");
  const [billingName, setBillingName] = reactExports.useState("");
  const [addressLine1, setAddressLine1] = reactExports.useState("");
  const [addressLine2, setAddressLine2] = reactExports.useState("");
  const [country, setCountry] = reactExports.useState("US");
  const [stateRegion, setStateRegion] = reactExports.useState("");
  const [city, setCity] = reactExports.useState("");
  const [postalCode, setPostalCode] = reactExports.useState("");
  const [showRegisterPrompt, setShowRegisterPrompt] = reactExports.useState(false);
  const [regEmail, setRegEmail] = reactExports.useState("");
  const [regPin, setRegPin] = reactExports.useState("");
  const [regConfirmPin, setRegConfirmPin] = reactExports.useState("");
  const [isRegistering, setIsRegistering] = reactExports.useState(false);
  const [successTracks, setSuccessTracks] = reactExports.useState([]);
  const totalCents = cartItems.reduce(
    (sum, item) => sum + Number(item.track.priceInCents),
    0
  );
  const totalDollars = (totalCents / 100).toFixed(2);
  const cardBrand = detectCardBrand(cardNumber);
  const states = getStates(country);
  const postalLabel = getPostalLabel(country);
  const search = useSearch({ strict: false });
  const isSuccess = (search == null ? void 0 : search.success) === "true";
  const isCancelled = (search == null ? void 0 : search.cancel) === "true";
  reactExports.useEffect(() => {
    if (isCancelled) {
      ue.info("Payment was cancelled — your cart is still saved.");
      window.history.replaceState({}, "", "/checkout");
    }
  }, [isCancelled]);
  reactExports.useEffect(() => {
    if (hasRemovedItem && cartItems.length === 0 && !isSuccess) {
      ue.info("Your cart is empty. Returning to the store.");
      void navigate({ to: "/store" });
    }
  }, [hasRemovedItem, cartItems.length, navigate, isSuccess]);
  const prevCountryRef = reactExports.useRef(country);
  if (prevCountryRef.current !== country) {
    prevCountryRef.current = country;
    setStateRegion("");
  }
  const handleRemoveItem = (trackId) => {
    const item = cartItems.find((i) => i.track.id === trackId);
    removeItem(trackId);
    setHasRemovedItem(true);
    if (item) ue.success(`"${item.track.title}" removed from cart`);
  };
  const processPayment = async () => {
    if (!actor || cartItems.length === 0) return;
    setIsProcessing(true);
    try {
      const origin = window.location.origin;
      const activeToken = customerToken ?? sessionToken ?? "";
      const successUrl = `${origin}/checkout?success=true`;
      const cancelUrl = `${origin}/checkout?cancel=true`;
      let url = null;
      if (cartItems.length === 1) {
        const firstTrack = cartItems[0].track;
        const result = await actor.createTrackCheckoutSession(
          activeToken,
          firstTrack.id,
          successUrl,
          cancelUrl
        );
        if (result.__kind__ === "err") throw new Error(result.err);
        const parsed = JSON.parse(result.ok);
        url = parsed.url ?? null;
        if (!url) throw new Error(parsed.error ?? "No checkout URL returned");
      } else {
        const items = cartItems.map((item) => ({
          productName: item.track.title,
          currency: "usd",
          quantity: BigInt(1),
          priceInCents: item.track.priceInCents,
          productDescription: `${item.track.title} by ${item.track.artistName}`
        }));
        const sessionUrl = await actor.createCheckoutSession(
          items,
          successUrl,
          cancelUrl
        );
        const parsed = JSON.parse(sessionUrl);
        url = parsed.url ?? null;
        if (!url) throw new Error(parsed.error ?? "No checkout URL returned");
      }
      const tracksSnapshot = cartItems.map((i) => {
        var _a2, _b2;
        return {
          id: i.track.id,
          title: i.track.title,
          artistName: i.track.artistName,
          audioFileUrl: (_b2 = (_a2 = i.track.audioFile) == null ? void 0 : _a2.getDirectURL) == null ? void 0 : _b2.call(_a2),
          genre: i.track.genre
        };
      });
      clearCart();
      setSuccessTracks(tracksSnapshot);
      window.location.href = url;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Payment failed";
      ue.error(`Payment error: ${msg}`);
      setIsProcessing(false);
    }
  };
  const handleCardSubmit = async (e) => {
    e.preventDefault();
    if (!cardName.trim()) {
      ue.error("Please enter the cardholder name.");
      return;
    }
    if (cardNumber.replace(/\s/g, "").length < 13) {
      ue.error("Please enter a valid card number.");
      return;
    }
    if (cardExpiry.length < 5) {
      ue.error("Please enter a valid expiry date.");
      return;
    }
    if (cardCvc.length < 3) {
      ue.error("Please enter a valid CVC.");
      return;
    }
    if (!billingName.trim()) {
      ue.error("Please enter your billing name.");
      return;
    }
    if (!addressLine1.trim()) {
      ue.error("Please enter your address.");
      return;
    }
    if (!city.trim()) {
      ue.error("Please enter your city.");
      return;
    }
    await processPayment();
  };
  if (isSuccess && successTracks.length > 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      SuccessScreen,
      {
        tracks: successTracks,
        sessionId: "",
        onReturnToStore: () => {
          setSuccessTracks([]);
          void navigate({ to: "/store" });
        }
      }
    );
  }
  if (isSuccess) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "min-h-screen flex items-center justify-center",
        style: { background: "#0a0a0a" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-20 h-20 rounded-full flex items-center justify-center mx-auto animate-crown-glow-pulse",
              style: {
                background: "rgba(212,175,55,0.12)",
                border: "2px solid rgba(212,175,55,0.5)"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-10 h-10", style: { color: "#d4af37" } })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Payment Successful! 👑" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Your download is being prepared in the store." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: () => void navigate({ to: "/store" }),
              className: "gap-2 min-h-[44px]",
              style: { background: "#d4af37", color: "#000" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
                "Go to My Downloads"
              ]
            }
          )
        ] })
      }
    );
  }
  if (cartItems.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "min-h-screen flex items-center justify-center p-6",
        style: { background: "#0a0a0a" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-16 h-16 rounded-full flex items-center justify-center mx-auto",
              style: {
                background: "rgba(212,175,55,0.1)",
                border: "1px solid rgba(212,175,55,0.3)"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-8 h-8", style: { color: "#d4af37" } })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground", children: "Your cart is empty" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Add some tracks from the store before checking out." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/store", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "gap-2 min-h-[44px]",
              style: { background: "#d4af37", color: "#000" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Music, { className: "w-4 h-4" }),
                "Browse Store"
              ]
            }
          ) })
        ] })
      }
    );
  }
  if (isProcessing) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "min-h-screen flex items-center justify-center",
        style: { background: "#0a0a0a" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-20 h-20 rounded-full flex items-center justify-center mx-auto",
              style: {
                background: "rgba(212,175,55,0.1)",
                border: "2px solid rgba(212,175,55,0.4)"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                RefreshCw,
                {
                  className: "w-10 h-10 animate-spin",
                  style: { color: "#d4af37" }
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground", children: "Processing your secure payment…" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Please wait while we securely process your order." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3.5 h-3.5", style: { color: "#d4af37" } }),
            "Secured by Chosen One Distribution • Platform Pay"
          ] })
        ] })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen",
      style: { background: "#0a0a0a" },
      "data-ocid": "checkout-page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "sticky top-0 z-20 border-b",
            style: { background: "#111", borderColor: "rgba(212,175,55,0.2)" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => void navigate({ to: "/store" }),
                  className: "flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors text-sm min-h-[44px]",
                  "data-ocid": "checkout-back-btn",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Back to Store" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sm:hidden", children: "Back" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-5 h-5", style: { color: "#d4af37" } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-foreground text-sm sm:text-base", children: "Platform Pay" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4 text-muted-foreground ml-1" })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 sm:mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-2xl sm:text-3xl text-foreground flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-7 h-7 shrink-0", style: { color: "#d4af37" } }),
              "Platform Pay"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Complete your purchase securely below." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col-reverse lg:grid lg:grid-cols-5 gap-6 sm:gap-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-3 space-y-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "rounded-xl overflow-hidden",
                  style: {
                    border: "1px solid rgba(212,175,55,0.2)",
                    background: "#111"
                  },
                  "data-ocid": "payment-method-selector",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "flex overflow-x-auto border-b scrollbar-hide",
                        style: { borderColor: "rgba(212,175,55,0.15)" },
                        children: PAYMENT_TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "button",
                          {
                            type: "button",
                            onClick: () => setSelectedMethod(tab.id),
                            className: "flex items-center gap-1.5 px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium shrink-0 border-b-2 transition-colors whitespace-nowrap",
                            style: {
                              borderColor: selectedMethod === tab.id ? "#d4af37" : "transparent",
                              color: selectedMethod === tab.id ? "#d4af37" : "#888",
                              background: selectedMethod === tab.id ? "rgba(212,175,55,0.06)" : "transparent"
                            },
                            "data-ocid": `payment-tab-${tab.id}`,
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: tab.icon }),
                              tab.label
                            ]
                          },
                          tab.id
                        ))
                      }
                    ),
                    selectedMethod === "card" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "form",
                      {
                        onSubmit: handleCardSubmit,
                        className: "p-4 sm:p-6 space-y-4",
                        "data-ocid": "card-entry-form",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Label,
                              {
                                htmlFor: "card-name",
                                className: "text-sm text-foreground",
                                children: "Cardholder Name"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Input,
                              {
                                id: "card-name",
                                type: "text",
                                placeholder: "John Smith",
                                value: cardName,
                                onChange: (e) => setCardName(e.target.value),
                                autoComplete: "cc-name",
                                className: "h-11",
                                style: {
                                  background: "#0a0a0a",
                                  borderColor: "rgba(212,175,55,0.25)",
                                  color: "#fff"
                                },
                                "data-ocid": "card-name-input"
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Label,
                              {
                                htmlFor: "card-number",
                                className: "text-sm text-foreground",
                                children: "Card Number"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                Input,
                                {
                                  id: "card-number",
                                  type: "text",
                                  inputMode: "numeric",
                                  placeholder: "1234 5678 9012 3456",
                                  value: cardNumber,
                                  onChange: (e) => setCardNumber(formatCardNumber(e.target.value)),
                                  autoComplete: "cc-number",
                                  maxLength: 19,
                                  className: "h-11 pr-16 font-mono",
                                  style: {
                                    background: "#0a0a0a",
                                    borderColor: "rgba(212,175,55,0.25)",
                                    color: "#fff"
                                  },
                                  "data-ocid": "card-number-input"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5", children: cardBrand ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "span",
                                {
                                  className: "text-xs font-bold px-2 py-0.5 rounded font-mono",
                                  style: {
                                    background: "rgba(212,175,55,0.15)",
                                    color: "#d4af37"
                                  },
                                  children: cardBrand
                                }
                              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-4 h-4 text-muted-foreground" }) })
                            ] })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 sm:gap-4", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                Label,
                                {
                                  htmlFor: "card-expiry",
                                  className: "text-sm text-foreground",
                                  children: "Expiry (MM/YY)"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                Input,
                                {
                                  id: "card-expiry",
                                  type: "text",
                                  inputMode: "numeric",
                                  placeholder: "MM/YY",
                                  value: cardExpiry,
                                  onChange: (e) => setCardExpiry(formatExpiry(e.target.value)),
                                  autoComplete: "cc-exp",
                                  maxLength: 5,
                                  className: "h-11 font-mono",
                                  style: {
                                    background: "#0a0a0a",
                                    borderColor: "rgba(212,175,55,0.25)",
                                    color: "#fff"
                                  },
                                  "data-ocid": "card-expiry-input"
                                }
                              )
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                Label,
                                {
                                  htmlFor: "card-cvc",
                                  className: "text-sm text-foreground",
                                  children: "CVC / CVV"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                Input,
                                {
                                  id: "card-cvc",
                                  type: "text",
                                  inputMode: "numeric",
                                  placeholder: "•••",
                                  value: cardCvc,
                                  onChange: (e) => setCardCvc(
                                    e.target.value.replace(/\D/g, "").slice(0, 4)
                                  ),
                                  autoComplete: "cc-csc",
                                  maxLength: 4,
                                  className: "h-11 font-mono",
                                  style: {
                                    background: "#0a0a0a",
                                    borderColor: "rgba(212,175,55,0.25)",
                                    color: "#fff"
                                  },
                                  "data-ocid": "card-cvc-input"
                                }
                              )
                            ] })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 flex-wrap", children: ["VISA", "MC", "AMEX", "DISC"].map((brand) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: "text-xs font-bold px-2 py-0.5 rounded font-mono",
                              style: {
                                background: cardBrand === brand ? "rgba(212,175,55,0.2)" : "rgba(255,255,255,0.06)",
                                color: cardBrand === brand ? "#d4af37" : "#666",
                                border: `1px solid ${cardBrand === brand ? "rgba(212,175,55,0.4)" : "rgba(255,255,255,0.08)"}`
                              },
                              children: brand
                            },
                            brand
                          )) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "div",
                            {
                              className: "pt-4 border-t space-y-4",
                              style: { borderColor: "rgba(212,175,55,0.12)" },
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    Lock,
                                    {
                                      className: "w-4 h-4 shrink-0",
                                      style: { color: "#d4af37" }
                                    }
                                  ),
                                  "Billing Address"
                                ] }),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    Label,
                                    {
                                      htmlFor: "billing-name",
                                      className: "text-sm text-foreground",
                                      children: "Full Name"
                                    }
                                  ),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    Input,
                                    {
                                      id: "billing-name",
                                      type: "text",
                                      placeholder: "John Smith",
                                      value: billingName,
                                      onChange: (e) => setBillingName(e.target.value),
                                      autoComplete: "billing name",
                                      className: "h-11",
                                      style: {
                                        background: "#0a0a0a",
                                        borderColor: "rgba(212,175,55,0.25)",
                                        color: "#fff"
                                      },
                                      "data-ocid": "billing-name-input"
                                    }
                                  )
                                ] }),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    Label,
                                    {
                                      htmlFor: "addr1",
                                      className: "text-sm text-foreground",
                                      children: "Address Line 1"
                                    }
                                  ),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    Input,
                                    {
                                      id: "addr1",
                                      type: "text",
                                      placeholder: "123 Main St",
                                      value: addressLine1,
                                      onChange: (e) => setAddressLine1(e.target.value),
                                      autoComplete: "billing address-line1",
                                      className: "h-11",
                                      style: {
                                        background: "#0a0a0a",
                                        borderColor: "rgba(212,175,55,0.25)",
                                        color: "#fff"
                                      },
                                      "data-ocid": "addr1-input"
                                    }
                                  )
                                ] }),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                    Label,
                                    {
                                      htmlFor: "addr2",
                                      className: "text-sm text-foreground",
                                      children: [
                                        "Address Line 2",
                                        " ",
                                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "(optional)" })
                                      ]
                                    }
                                  ),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    Input,
                                    {
                                      id: "addr2",
                                      type: "text",
                                      placeholder: "Apt 4B",
                                      value: addressLine2,
                                      onChange: (e) => setAddressLine2(e.target.value),
                                      autoComplete: "billing address-line2",
                                      className: "h-11",
                                      style: {
                                        background: "#0a0a0a",
                                        borderColor: "rgba(212,175,55,0.25)",
                                        color: "#fff"
                                      },
                                      "data-ocid": "addr2-input"
                                    }
                                  )
                                ] }),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    Label,
                                    {
                                      htmlFor: "country",
                                      className: "text-sm text-foreground",
                                      children: "Country"
                                    }
                                  ),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "select",
                                    {
                                      id: "country",
                                      value: country,
                                      onChange: (e) => setCountry(e.target.value),
                                      className: "w-full h-11 rounded-md px-3 text-sm",
                                      style: {
                                        background: "#0a0a0a",
                                        borderColor: "rgba(212,175,55,0.25)",
                                        border: "1px solid rgba(212,175,55,0.25)",
                                        color: "#fff"
                                      },
                                      "data-ocid": "country-select",
                                      children: COUNTRIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                                        "option",
                                        {
                                          value: c.code,
                                          style: { background: "#111" },
                                          children: c.name
                                        },
                                        c.code
                                      ))
                                    }
                                  )
                                ] }),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    Label,
                                    {
                                      htmlFor: "state",
                                      className: "text-sm text-foreground",
                                      children: country === "US" ? "State" : country === "CA" ? "Province / Territory" : "State / Region"
                                    }
                                  ),
                                  states.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                    "select",
                                    {
                                      id: "state",
                                      value: stateRegion,
                                      onChange: (e) => setStateRegion(e.target.value),
                                      className: "w-full h-11 rounded-md px-3 text-sm",
                                      style: {
                                        background: "#0a0a0a",
                                        border: "1px solid rgba(212,175,55,0.25)",
                                        color: stateRegion ? "#fff" : "#666"
                                      },
                                      "data-ocid": "state-select",
                                      children: [
                                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                                          "option",
                                          {
                                            value: "",
                                            style: { background: "#111", color: "#888" },
                                            children: "Select…"
                                          }
                                        ),
                                        states.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                                          "option",
                                          {
                                            value: s,
                                            style: { background: "#111" },
                                            children: s
                                          },
                                          s
                                        ))
                                      ]
                                    }
                                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    Input,
                                    {
                                      id: "state",
                                      type: "text",
                                      placeholder: "State / Region",
                                      value: stateRegion,
                                      onChange: (e) => setStateRegion(e.target.value),
                                      className: "h-11",
                                      style: {
                                        background: "#0a0a0a",
                                        borderColor: "rgba(212,175,55,0.25)",
                                        color: "#fff"
                                      },
                                      "data-ocid": "state-input"
                                    }
                                  )
                                ] }),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 sm:gap-4", children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      Label,
                                      {
                                        htmlFor: "city",
                                        className: "text-sm text-foreground",
                                        children: "City"
                                      }
                                    ),
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      Input,
                                      {
                                        id: "city",
                                        type: "text",
                                        placeholder: "City",
                                        value: city,
                                        onChange: (e) => setCity(e.target.value),
                                        autoComplete: "billing address-level2",
                                        className: "h-11",
                                        style: {
                                          background: "#0a0a0a",
                                          borderColor: "rgba(212,175,55,0.25)",
                                          color: "#fff"
                                        },
                                        "data-ocid": "city-input"
                                      }
                                    )
                                  ] }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      Label,
                                      {
                                        htmlFor: "postal",
                                        className: "text-sm text-foreground",
                                        children: postalLabel
                                      }
                                    ),
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      Input,
                                      {
                                        id: "postal",
                                        type: "text",
                                        placeholder: country === "US" ? "10001" : "Postal Code",
                                        value: postalCode,
                                        onChange: (e) => setPostalCode(e.target.value),
                                        autoComplete: "billing postal-code",
                                        className: "h-11 font-mono",
                                        style: {
                                          background: "#0a0a0a",
                                          borderColor: "rgba(212,175,55,0.25)",
                                          color: "#fff"
                                        },
                                        "data-ocid": "postal-input"
                                      }
                                    )
                                  ] })
                                ] })
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            Button,
                            {
                              type: "submit",
                              disabled: isProcessing,
                              className: "w-full gap-2 h-13 text-base font-bold mt-2",
                              style: {
                                background: "linear-gradient(135deg, #d4af37, #f5c842)",
                                color: "#000",
                                minHeight: "52px"
                              },
                              "data-ocid": "card-pay-btn",
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4" }),
                                "Complete Purchase — $",
                                totalDollars
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-1.5 pt-1 text-xs text-muted-foreground", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Lock,
                              {
                                className: "w-3.5 h-3.5",
                                style: { color: "#d4af37" }
                              }
                            ),
                            "Secured by Chosen One Distribution • Platform Pay"
                          ] })
                        ]
                      }
                    ),
                    selectedMethod !== "card" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 sm:p-6 space-y-5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "rounded-lg p-4 text-center",
                          style: {
                            background: "rgba(212,175,55,0.05)",
                            border: "1px solid rgba(212,175,55,0.15)"
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl mb-2", children: (_a = PAYMENT_TABS.find((t) => t.id === selectedMethod)) == null ? void 0 : _a.icon }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-1", children: (_b = PAYMENT_TABS.find((t) => t.id === selectedMethod)) == null ? void 0 : _b.label }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Click the button below to be securely redirected to complete your payment." })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          type: "button",
                          onClick: () => void processPayment(),
                          disabled: isProcessing,
                          className: "w-full gap-2 font-bold",
                          style: {
                            background: "linear-gradient(135deg, #d4af37, #f5c842)",
                            color: "#000",
                            minHeight: "52px"
                          },
                          "data-ocid": `alt-pay-btn-${selectedMethod}`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4" }),
                            "Pay $",
                            totalDollars,
                            " with",
                            " ",
                            (_c = PAYMENT_TABS.find((t) => t.id === selectedMethod)) == null ? void 0 : _c.label
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-1.5 text-xs text-muted-foreground", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Lock,
                          {
                            className: "w-3.5 h-3.5",
                            style: { color: "#d4af37" }
                          }
                        ),
                        "Secured by Chosen One Distribution • Platform Pay"
                      ] })
                    ] })
                  ]
                }
              ),
              !isCustomerLoggedIn && !showRegisterPrompt && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "rounded-xl p-4 sm:p-5 space-y-3",
                  style: {
                    background: "rgba(212,175,55,0.04)",
                    border: "1px solid rgba(212,175,55,0.18)"
                  },
                  "data-ocid": "checkout-register-prompt",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        UserPlus,
                        {
                          className: "w-4 h-4 shrink-0",
                          style: { color: "#d4af37" }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Save for re-downloads" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                      "Register with email + PIN to re-download within",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", style: { color: "#d4af37" }, children: "30 days" }),
                      "."
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col xs:flex-row gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          type: "button",
                          size: "sm",
                          onClick: () => setShowRegisterPrompt(true),
                          className: "flex-1 gap-1.5 text-xs min-h-[44px]",
                          style: { background: "#d4af37", color: "#000" },
                          "data-ocid": "checkout-register-open-btn",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-3.5 h-3.5" }),
                            "Register to save purchases"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/customer-login", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          type: "button",
                          size: "sm",
                          variant: "outline",
                          className: "w-full xs:w-auto text-xs border-primary/30 text-primary hover:bg-primary/10 min-h-[44px]",
                          "data-ocid": "checkout-customer-login-link",
                          children: "Already registered"
                        }
                      ) })
                    ] })
                  ]
                }
              ),
              showRegisterPrompt && !isCustomerLoggedIn && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "rounded-xl p-4 sm:p-5 space-y-4",
                  style: {
                    background: "rgba(212,175,55,0.04)",
                    border: "1px solid rgba(212,175,55,0.18)"
                  },
                  "data-ocid": "checkout-register-form",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          UserPlus,
                          {
                            className: "w-4 h-4",
                            style: { color: "#d4af37" }
                          }
                        ),
                        "Save Purchases 👑"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => setShowRegisterPrompt(false),
                          className: "p-1.5 rounded hover:bg-muted/50 transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center",
                          "aria-label": "Close",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 text-muted-foreground" })
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "reg-email", className: "text-xs", children: "Email Address" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Input,
                          {
                            id: "reg-email",
                            type: "email",
                            placeholder: "you@example.com",
                            value: regEmail,
                            onChange: (e) => setRegEmail(e.target.value),
                            className: "h-11 text-sm",
                            "data-ocid": "reg-email-input"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "reg-pin", className: "text-xs", children: "PIN (4–6 digits)" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Input,
                            {
                              id: "reg-pin",
                              type: "password",
                              inputMode: "numeric",
                              placeholder: "••••",
                              value: regPin,
                              onChange: (e) => setRegPin(
                                e.target.value.replace(/\D/g, "").slice(0, 6)
                              ),
                              maxLength: 6,
                              className: "h-11 text-sm font-mono",
                              "data-ocid": "reg-pin-input"
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "reg-confirm", className: "text-xs", children: "Confirm PIN" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Input,
                            {
                              id: "reg-confirm",
                              type: "password",
                              inputMode: "numeric",
                              placeholder: "••••",
                              value: regConfirmPin,
                              onChange: (e) => setRegConfirmPin(
                                e.target.value.replace(/\D/g, "").slice(0, 6)
                              ),
                              maxLength: 6,
                              className: `h-11 text-sm font-mono ${regConfirmPin.length > 0 && regPin !== regConfirmPin ? "border-destructive" : ""}`,
                              "data-ocid": "reg-confirm-input"
                            }
                          )
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          type: "button",
                          size: "sm",
                          disabled: isRegistering || !regEmail.includes("@") || regPin.length < 4 || regPin !== regConfirmPin,
                          onClick: async () => {
                            setIsRegistering(true);
                            try {
                              const pinHash = await hashPin(regPin);
                              await customerSignup(regEmail.trim(), pinHash);
                              ue.success(
                                "Account created! Your purchases are saved. 👑"
                              );
                              setShowRegisterPrompt(false);
                            } catch (err) {
                              ue.error(
                                err.message || "Registration failed."
                              );
                            } finally {
                              setIsRegistering(false);
                            }
                          },
                          className: "w-full gap-1.5 text-xs min-h-[44px]",
                          style: { background: "#d4af37", color: "#000" },
                          "data-ocid": "reg-submit-btn",
                          children: [
                            isRegistering ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3.5 h-3.5 border border-black/30 border-t-black rounded-full animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-3.5 h-3.5" }),
                            isRegistering ? "Saving…" : "Save My Purchases"
                          ]
                        }
                      )
                    ] })
                  ]
                }
              ),
              isCustomerLoggedIn && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-3 px-4 py-3 rounded-lg",
                  style: {
                    background: "rgba(52,211,153,0.05)",
                    border: "1px solid rgba(52,211,153,0.2)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-emerald-400 shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                      "Signed in as",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: customerEmail }),
                      ". Purchases will be saved."
                    ] })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-xl overflow-hidden lg:sticky lg:top-20",
                style: {
                  border: "1px solid rgba(212,175,55,0.25)",
                  background: "#111"
                },
                "data-ocid": "order-summary",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "px-4 sm:px-5 py-3 sm:py-4 border-b flex items-center gap-2",
                      style: { borderColor: "rgba(212,175,55,0.15)" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          ShoppingCart,
                          {
                            className: "w-4 h-4",
                            style: { color: "#d4af37" }
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-foreground text-sm uppercase tracking-wide", children: "Order Summary" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          Badge,
                          {
                            variant: "secondary",
                            className: "ml-auto text-xs",
                            style: {
                              background: "rgba(212,175,55,0.1)",
                              color: "#d4af37",
                              border: "1px solid rgba(212,175,55,0.3)"
                            },
                            children: [
                              cartItems.length,
                              " track",
                              cartItems.length !== 1 ? "s" : ""
                            ]
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 sm:p-5 space-y-3", children: cartItems.map((item) => {
                    var _a2, _b2;
                    const coverUrl = (_b2 = (_a2 = item.track.coverArt) == null ? void 0 : _a2.getDirectURL) == null ? void 0 : _b2.call(_a2);
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex items-center gap-3 group/orderitem",
                        "data-ocid": `order-item-${item.track.id}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: `w-10 h-10 rounded-md bg-gradient-to-br ${getGenreColor(item.track.genre)} flex items-center justify-center shrink-0 overflow-hidden`,
                              children: coverUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "img",
                                {
                                  src: coverUrl,
                                  alt: item.track.title,
                                  className: "w-full h-full object-cover"
                                }
                              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Music, { className: "w-4 h-4 text-foreground/30" })
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: item.track.title }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: item.track.artistName })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "span",
                            {
                              className: "font-bold text-sm shrink-0",
                              style: { color: "#d4af37" },
                              children: [
                                "$",
                                (Number(item.track.priceInCents) / 100).toFixed(2)
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              type: "button",
                              onClick: () => handleRemoveItem(item.track.id),
                              className: "flex items-center justify-center w-8 h-8 rounded-md border transition-colors shrink-0 opacity-60 group-hover/orderitem:opacity-100 min-h-[32px] min-w-[32px]",
                              style: {
                                borderColor: "rgba(212,175,55,0.25)",
                                color: "#d4af37"
                              },
                              "aria-label": `Remove "${item.track.title}"`,
                              "data-ocid": `order-remove-${item.track.id}`,
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                            }
                          )
                        ]
                      },
                      String(item.track.id)
                    );
                  }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { style: { background: "rgba(212,175,55,0.12)" } }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 sm:px-5 py-4 space-y-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground", children: [
                        "$",
                        totalDollars
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Processing fee" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "Included" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { style: { background: "rgba(212,175,55,0.12)" } }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground text-sm", children: "Total" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "span",
                        {
                          className: "text-xl sm:text-2xl font-bold font-display",
                          style: { color: "#d4af37" },
                          children: [
                            "$",
                            totalDollars
                          ]
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 sm:px-5 pb-4 sm:pb-5 space-y-2", children: [
                    "Instant download after payment",
                    "Original MP3 or WAV format",
                    "Re-download within 30 days",
                    "85% goes directly to the artist"
                  ].map((benefit) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-center gap-2 text-xs text-muted-foreground",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 text-emerald-400 shrink-0" }),
                        benefit
                      ]
                    },
                    benefit
                  )) })
                ]
              }
            ) })
          ] })
        ] })
      ]
    }
  );
}
export {
  CheckoutPage as default
};

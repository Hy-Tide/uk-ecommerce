import React from "react";

// Design canvas matches the source layout's proportions (1858 x 945)
// so every coordinate below lines up exactly with the reference image.
const GREEN = "#7CA83C";
const DARK = "#2B3A3A";
const GRAY = "#6B7280";

const STEPS = [
  {
    number: "01",
    title: ["Browse UK", "Groceries"],
    description: ["Explore our wide range", "of quality products."],
    numX: 48,
    numY: 585,
    titleX: 48,
    titleY: [665, 700],
    nodeX: 77,
    nodeY: 766,
    descX: 48,
    descY: [858, 890],
    icon: null,
  },
  {
    number: "02",
    title: ["Add Items", "To Cart"],
    description: ["Select your favourite", "ingredients & essentials."],
    numX: 528,
    numY: 430,
    titleX: 528,
    titleY: [508, 543],
    nodeX: 552,
    nodeY: 631,
    descX: 528,
    descY: [723, 755],
    icon: { type: "sprout", x: 545, y: 565 },
  },
  {
    number: "03",
    title: ["Secure", "Checkout"],
    description: ["Fast and safe payment", "with multiple options."],
    numX: 986,
    numY: 300,
    titleX: 986,
    titleY: [377, 412],
    nodeX: 993,
    nodeY: 496,
    descX: 986,
    descY: [558, 590],
    icon: { type: "leaf", x: 978, y: 430 },
  },
  {
    number: "04",
    title: ["Fast UK", "Delivery"],
    description: ["Get your groceries", "delivered to your door."],
    numX: 1462,
    numY: 120,
    titleX: 1462,
    titleY: [198, 233],
    nodeX: 1435,
    nodeY: 322,
    descX: 1462,
    descY: [423, 455],
    icon: { type: "flower", x: 1418, y: 250 },
  },
];

// second decorative flower sits at the very end of the connector line
const END_POINT = { x: 1798, y: 322, iconX: 1785, iconY: 235 };

function Sprout({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M9 34V20" stroke={GREEN} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M9 20c0-8 6-13 6-13s-2 10-6 13z" fill={GREEN} />
      <path d="M9 24c0-6-5-9-5-9s0 7 5 9z" fill="#9BC466" />
    </g>
  );
}

function LeafSprout({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M12 42V18" stroke={GREEN} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M12 18c0-9 7-14 7-14s-2 11-7 14z" fill={GREEN} />
      <path d="M12 24c0-7-6-10-6-10s0 8 6 10z" fill="#9BC466" />
    </g>
  );
}

function Flower({ x, y, scale = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M14 46V26" stroke={GREEN} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M14 30c0-7-6-10-6-10s1 8 6 10z" fill="#9BC466" />
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <ellipse
          key={deg}
          cx="14"
          cy="8"
          rx="5.5"
          ry="8"
          fill="#F2B84B"
          transform={`rotate(${deg} 14 14)`}
        />
      ))}
      <circle cx="14" cy="14" r="4.5" fill="#D9822B" />
    </g>
  );
}

function StepIcon({ icon }) {
  if (!icon) return null;
  if (icon.type === "sprout") return <Sprout x={icon.x} y={icon.y} />;
  if (icon.type === "leaf") return <LeafSprout x={icon.x} y={icon.y} />;
  if (icon.type === "flower") return <Flower x={icon.x} y={icon.y} />;
  return null;
}

function Node({ cx, cy }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="19" fill="white" stroke={GREEN} strokeWidth="2.5" />
      <circle cx={cx} cy={cy} r="8" fill={GREEN} />
    </g>
  );
}

// Elbow connector: horizontal run, then a smooth curve up to the next
// step's height, matching the ascending staircase in the reference.
function connectorPath(points) {
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const cur = points[i];
    const riseStartX = cur.x - 90;
    d += ` L ${riseStartX} ${prev.y}`;
    d += ` C ${riseStartX + 45} ${prev.y}, ${cur.x - 45} ${cur.y}, ${cur.x} ${cur.y}`;
  }
  return d;
}

export default function FarmingTechniques() {
  const nodes = STEPS.map((s) => ({ x: s.nodeX, y: s.nodeY }));
  nodes.push(END_POINT);
  const path = connectorPath(nodes);

  return (
    <div className="w-full overflow-x-auto bg-white">
      <svg
        viewBox="0 0 1858 945"
        className="min-w-[900px] w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        <text
          x="48"
          y="120"
          fontSize="56"
          fontWeight="800"
          fill={DARK}
          fontFamily="sans-serif"
        >
          Our Farming
        </text>
        <text
          x="48"
          y="200"
          fontSize="56"
          fontWeight="800"
          fill={DARK}
          fontFamily="sans-serif"
        >
          Techniques
        </text>

        <path d={path} fill="none" stroke={GREEN} strokeWidth="2.5" />

        {STEPS.map((step) => (
          <g key={step.number}>
            <text
              x={step.numX}
              y={step.numY}
              fontSize="64"
              fontWeight="800"
              fill={GREEN}
              fontFamily="sans-serif"
            >
              {step.number}
            </text>

            {step.title.map((line, i) => (
              <text
                key={i}
                x={step.titleX}
                y={step.titleY[i]}
                fontSize="30"
                fontWeight="700"
                fill={DARK}
                fontFamily="sans-serif"
              >
                {line}
              </text>
            ))}

            <StepIcon icon={step.icon} />
            <Node cx={step.nodeX} cy={step.nodeY} />

            {step.description.map((line, i) => (
              <text
                key={i}
                x={step.descX}
                y={step.descY[i]}
                fontSize="22"
                fill={GRAY}
                fontFamily="sans-serif"
              >
                {line}
              </text>
            ))}
          </g>
        ))}

        {/* decorative end of the line, past step 4 */}
        <Flower x={END_POINT.iconX} y={END_POINT.iconY} />
        <Node cx={END_POINT.x} cy={END_POINT.y} />
      </svg>
    </div>
  );
}
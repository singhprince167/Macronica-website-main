"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ---- Strict types for your dataset ----
type ChartData = {
  name: string;
  uv: number;
  pv: number;
};

type SeriesKey = Exclude<keyof ChartData, "name">; // "uv" | "pv"

// Recharts tooltip payload item (strict to your series keys)
type TooltipItem = {
  name: SeriesKey;          // series label (same as dataKey)
  dataKey: SeriesKey;       // key of dataset ("uv" | "pv")
  value: number;            // y-value
  color?: string;           // stroke color of line
  payload?: ChartData;      // full data row
};

// Minimal tooltip props (self-defined)
type RechartsTooltipProps = {
  active?: boolean;
  label?: string | number;
  payload?: TooltipItem[];
};

// Custom tooltip props
type ChartTooltipContentProps = RechartsTooltipProps & {
  className?: string;
  indicator?: "dot" | "line";
  hideLabel?: boolean;
};

function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
}: ChartTooltipContentProps) {
  if (active && payload && payload.length) {
    const xLabel = payload[0].payload?.name ?? "";

    return (
      <div className={`p-2 bg-white border rounded shadow ${className ?? ""}`}>
        {!hideLabel && <p className="text-sm font-medium">{xLabel}</p>}
        {payload.map((entry, idx) => (
          <p key={idx} className="text-sm" style={{ color: entry.color }}>
            {indicator === "dot" && "•"} {entry.dataKey}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
}

const data: ChartData[] = [
  { name: "Jan", uv: 400, pv: 240 },
  { name: "Feb", uv: 300, pv: 456 },
  { name: "Mar", uv: 200, pv: 139 },
  { name: "Apr", uv: 278, pv: 390 },
  { name: "May", uv: 189, pv: 480 },
];

export default function Chart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<ChartTooltipContent />} />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}

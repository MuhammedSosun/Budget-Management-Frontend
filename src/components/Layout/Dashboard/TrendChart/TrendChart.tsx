import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import "./TrendChart.scss";
import { useEffect, useState } from "react";
import { useLoading } from "../../../../hooks/useLoading";
import { transactionService } from "../../../../services/transaction.service";
import Select from "../../../ui/Select/Select";
import { useTranslation } from "react-i18next";

interface CustomTooltipProps {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}
const formatYAxis = (value: number) => {
  if (value === 0) return "0 t";
  return `${value / 1000}K t`;
};

const CustomDot = (props: {
  cx?: number;
  cy?: number;
  stroke?: string;
  value?: number;
}) => {
  const { cx = 0, cy = 0, stroke, value = 0 } = props;

  if (value > 0) {
    return (
      <svg x={cx - 8} y={cy - 8} width={16} height={16} viewBox="0 0 16 16">
        <circle
          cx="8"
          cy="8"
          r="7"
          stroke={stroke}
          strokeWidth="2"
          fill="none"
          opacity={0.3}
        />
        <circle cx="8" cy="8" r="4" fill={stroke} />
      </svg>
    );
  }

  return null;
};

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="trend-chart__tooltip">
        <p className="trend-chart__tooltip-date">{label}</p>
        <p className="trend-chart__tooltip-amount">
          {payload[0].value.toLocaleString("tr-TR")} TL
        </p>
      </div>
    );
  }

  return null;
};

export const TrendChart = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<{ name: string; value: number }[]>([]);
  const [period, setPeriod] = useState<"weekly" | "monthly">("weekly");
  const { showLoading, hideLoading } = useLoading();
  const periodOptions = [
    { label: t("weekly"), value: "weekly" },
    { label: t("monthly"), value: "monthly" },
  ];
  const fetchTrendStats = async () => {
    try {
      showLoading("Trend Data is loading...");
      const response = await transactionService.getTrendStats(period);
      if (response.success) {
        setData(response.data);
      }
    } catch (error) {
      console.error("Trend hatası:", error);
    } finally {
      hideLoading();
    }
  };
  useEffect(() => {
    fetchTrendStats();
  }, [period]);
  return (
    <div className="trend-chart__container">
      <div className="trend-chart__header">
        <h3 className="dashboard__title">{t("dashboard_title")}</h3>
        <Select
          label=""
          options={periodOptions}
          value={period}
          onChange={(val) => setPeriod(val as "weekly" | "monthly")}
        />
      </div>

      <div className="trend-chart__wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#D1FAE5" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--border)"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "var(--text-muted)" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={formatYAxis}
              tick={{ fontSize: 12, fill: "var(--text-muted)" }}
              domain={[0, "dataMax + 1000"]}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "var(--border)", strokeDasharray: "5 5" }}
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke="none"
              fill="url(#colorTrend)"
              fillOpacity={1}
            />

            <Line
              type="monotone"
              dataKey="value"
              stroke="#10B981"
              strokeWidth={3}
              dot={<CustomDot />}
              activeDot={{
                r: 8,
                fill: "#059669",
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

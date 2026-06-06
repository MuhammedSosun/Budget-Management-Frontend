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
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLoading } from "../../../../hooks/useLoading";
import { transactionService } from "../../../../services/transaction.service";
import Select from "../../../ui/Select/Select";
import { useTranslation } from "react-i18next";

type Currency = "TRY" | "USD" | "EUR";
type Period = "weekly" | "monthly";

interface CustomTooltipProps {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}

interface TrendChartProps {
  workspaceId: string;
  currency: Currency;
  refreshKey?: number;
}

const getCurrencySymbol = (currency: Currency) => {
  if (currency === "TRY") return "₺";
  if (currency === "USD") return "$";
  return "€";
};

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia(query);

    const handleChange = () => {
      setMatches(mediaQuery.matches);
    };

    handleChange();

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
}

const CustomDot = (props: {
  cx?: number;
  cy?: number;
  stroke?: string;
  value?: number;
  size?: number;
}) => {
  const { cx = 0, cy = 0, stroke, value = 0, size = 8 } = props;

  if (value <= 0) return null;

  const outerRadius = size - 1;
  const innerRadius = Math.max(size / 2, 3);
  const boxSize = size * 2;

  return (
    <svg
      x={cx - size}
      y={cy - size}
      width={boxSize}
      height={boxSize}
      viewBox={`0 0 ${boxSize} ${boxSize}`}
    >
      <circle
        cx={size}
        cy={size}
        r={outerRadius}
        stroke={stroke}
        strokeWidth="2"
        fill="none"
        opacity={0.3}
      />
      <circle cx={size} cy={size} r={innerRadius} fill={stroke} />
    </svg>
  );
};

const CustomTooltip = ({
  active,
  payload,
  label,
  currencySymbol,
  t,
}: CustomTooltipProps & { currencySymbol: string; t: any }) => {
  if (!active || !payload?.length) return null;

  const formattedDate = label ? t(`chart.${label.toLowerCase()}`) : "";

  return (
    <div className="trend-chart__tooltip">
      <p className="trend-chart__tooltip-date">{formattedDate}</p>

      <p className="trend-chart__tooltip-amount">
        {currencySymbol} {payload[0].value.toLocaleString("tr-TR")}
      </p>
    </div>
  );
};

export const TrendChart = ({
  workspaceId,
  currency,
  refreshKey = 0,
}: TrendChartProps) => {
  const { t } = useTranslation();
  const [data, setData] = useState<{ name: string; value: number }[]>([]);
  const [period, setPeriod] = useState<Period>("weekly");
  const { showLoading, hideLoading } = useLoading();

  const isMobile = useMediaQuery("(max-width: 900px)");
  const isSmallMobile = useMediaQuery("(max-width: 420px)");

  const currencySymbol = getCurrencySymbol(currency);

  const chartConfig = useMemo(
    () => ({
      margin: isSmallMobile
        ? { top: 8, right: 4, left: -18, bottom: 0 }
        : isMobile
          ? { top: 8, right: 6, left: -14, bottom: 0 }
          : { top: 10, right: 30, left: 0, bottom: 0 },

      tickFontSize: isSmallMobile ? 8 : isMobile ? 9 : 12,
      yAxisWidth: isSmallMobile ? 44 : isMobile ? 50 : 60,
      strokeWidth: isMobile ? 2.4 : 3,
      dotSize: isMobile ? 6 : 8,
      activeDotSize: isMobile ? 6 : 8,
    }),
    [isMobile, isSmallMobile],
  );

  const periodOptions = [
    { label: t("weekly"), value: "weekly" },
    { label: t("monthly"), value: "monthly" },
  ];

  const fetchTrendStats = useCallback(async () => {
    if (!workspaceId) return;

    try {
      showLoading(t("loading_trend"));

      const response = await transactionService.getTrendStats(
        workspaceId,
        period,
        currency,
      );

      setData(response.data || []);
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("Trend hatası:", error);
      }
    } finally {
      hideLoading();
    }
  }, [workspaceId, period, currency, showLoading, hideLoading, t]);

  useEffect(() => {
    fetchTrendStats();
  }, [fetchTrendStats, refreshKey]);

  const formatYAxis = (value: number) => {
    if (value === 0) return `0 ${currencySymbol}`;

    return `${
      value >= 1000 ? `${(value / 1000).toFixed(1)}K` : value
    } ${currencySymbol}`;
  };

  return (
    <div className="trend-chart__container">
      <div className="trend-chart__header">
        <h3 className="dashboard__title">{t("dashboard_title")}</h3>

        <div className="trend-chart__select">
          <Select
            label=""
            options={periodOptions}
            value={period}
            onChange={(val) => setPeriod(val as Period)}
          />
        </div>
      </div>

      <div className="trend-chart__wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={chartConfig.margin}>
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
              interval={0}
              minTickGap={0}
              tick={{
                fontSize: chartConfig.tickFontSize,
                fill: "var(--text-muted)",
              }}
              tickFormatter={(tick) => t(`chart.${tick.toLowerCase()}`)}
            />

            <YAxis
              width={chartConfig.yAxisWidth}
              axisLine={false}
              tickLine={false}
              tickFormatter={formatYAxis}
              tick={{
                fontSize: chartConfig.tickFontSize,
                fill: "var(--text-muted)",
              }}
              domain={[0, "dataMax + 1000"]}
            />

            <Tooltip
              content={<CustomTooltip currencySymbol={currencySymbol} t={t} />}
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
              strokeWidth={chartConfig.strokeWidth}
              dot={<CustomDot size={chartConfig.dotSize} />}
              activeDot={{
                r: chartConfig.activeDotSize,
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

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import "./SpendingChart.scss";
import { transactionService } from "../../../../services/transaction.service";
import { useEffect, useState } from "react";
import { useLoading } from "../../../../hooks/useLoading";
import { useTranslation } from "react-i18next";

interface StatData {
  name: string;
  value: number;
}
interface SpendingChartProps {
  currency: "TRY" | "USD" | "EUR";
}
const COLORS = [
  "#059669",
  "#10B981",
  "#34D399",
  "#6EE7B7",
  "#A7F3D0",
  "#14B8A6",
];
export const SpendingChart = ({ currency }: SpendingChartProps) => {
  const { t } = useTranslation();
  const [data, setData] = useState<StatData[]>([]);
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        showLoading();
        const response = await transactionService.getCategoryStats(currency);
        const rawData: StatData[] = response.data;

        rawData.sort((a, b) => b.value - a.value);

        if (rawData.length > 5) {
          const topFive = rawData.slice(0, 5);
          const othersTotal = rawData
            .slice(5)
            .reduce((acc, curr) => acc + curr.value, 0);

          setData([...topFive, { name: t("all"), value: othersTotal }]);
        } else {
          setData(rawData);
        }
      } catch (error) {
        console.error("Grafik verisi çekilemedi:", error);
      } finally {
        hideLoading();
      }
    };

    fetchStats();
  }, [currency, t, showLoading, hideLoading]);
  const currencySymbol =
    currency === "TRY" ? "₺" : currency === "USD" ? "$" : "€";
  let total = 0;
  for (let i = 0; i < data.length; i++) {
    total = data[i].value + total;
  }
  return (
    <div className="spending-chart__container">
      <h3
        className="dashboard__title"
        style={{ alignSelf: "flex-start", marginBottom: "1rem" }}
      >
        {t("spending_breakdown")}
      </h3>

      <div className="spending-chart__wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={75}
              outerRadius={95}
              paddingAngle={5}
              dataKey="value"
              cornerRadius={8}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke="none"
                />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="spending-chart__tooltip">
                      <p className="spending-chart__tooltip-label">
                        {payload[0].name}
                      </p>
                      <p
                        className="spending-chart__tooltip-data"
                        style={{ color: payload[0].payload.fill }}
                      >
                        {currencySymbol} {payload[0].value}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="spending-chart__legend">
        {data.map((entry, index) => (
          <li key={entry.name} className="spending-chart__legend-item">
            <div className="spending-chart__legend-info">
              <span
                className="spending-chart__legend-dot"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span>{entry.name}</span>
            </div>
            <span className="spending-chart__legend-value">
              %{total > 0 ? ((entry.value / total) * 100).toFixed(0) : 0}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

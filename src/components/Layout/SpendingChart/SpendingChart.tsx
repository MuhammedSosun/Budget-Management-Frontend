import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import "./SpendingChart.scss";

const data = [
  { name: "Alışveriş", value: 1000 },
  { name: "Market", value: 500 },
  { name: "Fatura", value: 200 },
  { name: "Ulaşım", value: 100 },
  { name: "Diğer", value: 50 },
];

const COLORS = ["#059669", "#10B981", "#34D399", "#6EE7B7", "#A7F3D0"];

export const SpendingChart = () => {
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
        Harcama Dağılımı
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
                        {payload[0].value} TL
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
              %{((entry.value / total) * 100).toFixed(0)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

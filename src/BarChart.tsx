import * as React from "react";

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { Machine } from "./DashBoard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export interface IBarChartProps {
  warranty: Machine[];
  noWarranty: Machine[];
}
export const options = {
  maintainAspectRatio: false,
  indexAxis: "y" as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right" as const,
    },
    title: {
      display: true,
      text: "Chart.js Horizontal Bar Chart",
    },
  },
};

export default function BarChart({ warranty, noWarranty }: IBarChartProps) {
  return (
    <div>
      <Bar
        options={options}
        width="30px"
        data={{
          labels: ["warranty", "no warranty"],
          datasets: [
            {
              label: "Dataset 1",
              data: [warranty.length, noWarranty.length],
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            // {
            //   label: "Dataset 2",
            //   data: [1, 2],
            //   borderColor: "rgb(53, 162, 235)",
            //   backgroundColor: "rgba(53, 162, 235, 0.5)",
            // },
          ],
        }}
        // {...props}
      />
    </div>
  );
}

import { useEffect, useMemo } from "react";
import { useDashboardStore } from "../store/useDashboardStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  count: {
    label: "Jumlah Karyawan",
    color: "#6b7280",
  },
};

function Dashboard() {
  const listEmployee = useDashboardStore((state) => state.listEmployee);
  const isLoading = useDashboardStore((state) => state.isLoading);
  const hasError = useDashboardStore((state) => state.hasError);

  const onGetDashboardData = useDashboardStore(
    (state) => state.onGetDashboardData,
  );

  useEffect(() => {
    onGetDashboardData();
  }, [onGetDashboardData]);

  const totalEmployee = listEmployee.length;
  const totalDepartment = useMemo(() => {
    const listDepartment = listEmployee
      .map((employee) => employee.company?.department)
      .filter(Boolean);

    return new Set(listDepartment).size;
  }, [listEmployee]);

  const averageAge = useMemo(() => {
    if (listEmployee.length === 0) return 0;

    const totalAge = listEmployee.reduce(
      (sum, employee) => sum + employee.age,
      0,
    );

    return (totalAge / listEmployee.length).toFixed(1);
  }, [listEmployee]);

  const listDepartmentCount = useMemo(() => {
    return listEmployee.reduce((acc, employee) => {
      const department = employee.company?.department;

      if (department) {
        acc[department] = (acc[department] || 0) + 1;
      }

      return acc;
    }, {});
  }, [listEmployee]);

  const chartData = Object.entries(listDepartmentCount).map(
    ([department, count]) => ({
      department,
      count,
    }),
  );

  console.log("Dashboard Chart Data:", chartData);

  if (isLoading) {
    return <p>Memuat dashboard...</p>;
  }

  if (hasError) {
    return <p>Gagal memuat dashboard.</p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard HRLite</h1>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Karyawan</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">{totalEmployee}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Departemen</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">{totalDepartment}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rata-rata Usia</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">{averageAge} tahun</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Jumlah Karyawan per Departemen</CardTitle>
        </CardHeader>

        <CardContent>
          <ChartContainer config={chartConfig} className="h-112.5 w-full">
            <BarChart
              accessibilityLayer
              data={chartData}
              layout="vertical"
              margin={{ left: 20, right: 20 }}
            >
              <CartesianGrid horizontal={false} />

              <YAxis
                dataKey="department"
                type="category"
                width={170}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11 }}
              />

              <XAxis type="number" allowDecimals={false} />

              <ChartTooltip
                cursor={false}
                wrapperStyle={{ zIndex: 1000 }}
                content={
                  <ChartTooltipContent className="border border-gray-200 bg-white text-gray-900 shadow-lg" />
                }
              />

              <Bar dataKey="count" fill="#6b7280" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}

export default Dashboard;

import type React from "react";
import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { FileText, Layers, Users, Shield, TrendingUp } from "lucide-react";
import { categoryService } from "@/services/categories";
import { postService } from "@/services/posts";
import { userService } from "@/services/users";
import { roleService } from "@/services/roles";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface StatCard {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    posts: 0,
    categories: 0,
    users: 0,
    roles: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [postsRes, categoriesRes, usersRes, rolesRes] = await Promise.all([
        postService.getAll(),
        categoryService.getAll(),
        userService.getAll(),
        roleService.getAll(),
      ]);

      setStats({
        posts: postsRes.data?.data?.length || 0,
        categories: categoriesRes.data?.data?.length || 0,
        users: usersRes.data?.data?.length || 0,
        roles: rolesRes.data?.data?.length || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards: StatCard[] = [
    {
      title: "Posts",
      value: stats.posts,
      icon: <FileText size={24} />,
      color: "text-accent",
    },
    {
      title: "Categories",
      value: stats.categories,
      icon: <Layers size={24} />,
      color: "text-success",
    },
    {
      title: "Users",
      value: stats.users,
      icon: <Users size={24} />,
      color: "text-warning",
    },
    {
      title: "Roles",
      value: stats.roles,
      icon: <Shield size={24} />,
      color: "text-danger",
    },
  ];

  // Chart data
  const barChartData = [
    { name: "Posts", value: stats.posts, fill: "#3b82f6" },
    { name: "Categories", value: stats.categories, fill: "#10b981" },
    { name: "Users", value: stats.users, fill: "#f59e0b" },
    { name: "Roles", value: stats.roles, fill: "#ef4444" },
  ];

  const pieChartData = [
    { name: "Posts", value: stats.posts, color: "#3b82f6" },
    { name: "Categories", value: stats.categories, color: "#10b981" },
    { name: "Users", value: stats.users, color: "#f59e0b" },
    { name: "Roles", value: stats.roles, color: "#ef4444" },
  ];

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: "#1f2937",
            border: "1px solid #374151",
            borderRadius: "8px",
            padding: "8px 12px",
            color: "#f9fafb",
          }}
        >
          <p>{`${payload[0].payload.name}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">
            Welcome to Dashboard
          </h1>
          <p className="text-text-secondary mt-1">
            Track your blog statistics and content
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-text-secondary">Loading statistics...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((card, idx) => (
              <div
                key={idx}
                className="bg-bg-secondary border border-bg-tertiary rounded-lg p-6 hover:border-accent transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-text-secondary text-sm mb-2">
                      {card.title}
                    </p>
                    <p className="text-4xl font-bold text-text-primary">
                      {card.value}
                    </p>
                  </div>
                  <div className={`${card.color}`}>{card.icon}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Charts Section */}
        {!loading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Bar Chart */}
            <div className="bg-bg-secondary border border-bg-tertiary rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="text-accent" size={20} />
                <h2 className="text-xl font-semibold text-text-primary">
                  Content Statistics
                </h2>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis
                    dataKey="name"
                    stroke="#9ca3af"
                    style={{ fontSize: "12px" }}
                  />
                  <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
                  <Tooltip content={<CustomTooltip />} cursor={false} />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className="bg-bg-secondary border border-bg-tertiary rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Layers className="text-success" size={20} />
                <h2 className="text-xl font-semibold text-text-primary">
                  Distribution Overview
                </h2>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        <div className="bg-bg-secondary border border-bg-tertiary rounded-lg p-6">
          <h2 className="text-xl font-semibold text-text-primary mb-4">
            Recent Activity
          </h2>
          <p className="text-text-secondary">No recent activity to display</p>
        </div>
      </div>
    </Layout>
  );
};

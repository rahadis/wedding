import { FaArrowUp, FaArrowDown } from "react-icons/fa";

export default function StatCard({ icon: Icon, title, count, trend = 12, isPositive = true }) {
  const formattedCount = typeof count === "number" ? count.toLocaleString("id-ID") : count;

  return (
    <div className="stat-card">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-gray-500 text-sm font-medium uppercase tracking-wide mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-education-primary">{formattedCount}</h3>
        </div>
        <div className="bg-gradient-to-br from-education-primary to-education-secondary text-white p-3 rounded-lg">
          {Icon && <Icon className="w-6 h-6" />}
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <span className={`inline-flex items-center gap-1 font-semibold ${isPositive ? "text-green-600" : "text-red-600"}`}>
          {isPositive ? <FaArrowUp className="w-3 h-3" /> : <FaArrowDown className="w-3 h-3" />}
          {trend}%
        </span>
        <span className="text-gray-500">dari minggu lalu</span>
      </div>
    </div>
  );
}

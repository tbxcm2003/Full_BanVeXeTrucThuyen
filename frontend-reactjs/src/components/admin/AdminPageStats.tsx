import React, { type ReactNode } from 'react';

export type AdminStatItem = {
  label: string;
  value: number | string;
  icon: ReactNode;
  color: string;
  bg: string;
  border: string;
};

type Props = {
  title: string;
  loading?: boolean;
  items: AdminStatItem[];
  /** Tailwind grid classes, e.g. grid-cols-2 md:grid-cols-3 xl:grid-cols-4 */
  gridClassName?: string;
  className?: string;
};

const defaultGrid = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6';

const AdminPageStats: React.FC<Props> = ({ title, loading, items, gridClassName = defaultGrid, className = '' }) => (
  <div className={className}>
    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">{title}</h3>
    <div className={gridClassName}>
      {items.map((s, i) => (
        <div key={i} className={`bg-white rounded-xl shadow-sm border ${s.border} p-4 flex items-center justify-between`}>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{s.label}</p>
            <p className="text-2xl font-extrabold text-gray-800">{loading ? '…' : s.value}</p>
          </div>
          <div className={`p-2.5 rounded-xl ${s.bg} ${s.color}`}>{s.icon}</div>
        </div>
      ))}
    </div>
  </div>
);

export default AdminPageStats;

import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
} from 'recharts';
import { Calendar, Download, RefreshCw } from 'lucide-react';
import Card from './Card';
import Select from './Select';

export type ChartType = 'line' | 'bar' | 'area' | 'pie' | 'stacked-bar' | 'multi-line';

interface DateRange {
  label: string;
  value: string;
}

export interface ChartData {
  [key: string]: string | number;
}

interface ChartContainerProps {
  title: string;
  type: ChartType;
  data: ChartData[];
  dataKeys: string[];
  colors?: string[];
  xAxisKey?: string;
  dateRanges?: DateRange[];
  height?: number;
  showLegend?: boolean;
  showGrid?: boolean;
  showTooltip?: boolean;
  showDownload?: boolean;
  showRefresh?: boolean;
  className?: string;
  emptyStateMessage?: string;
  onRefresh?: () => void;
  onDateRangeChange?: (value: string) => void;
}

const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  type,
  data,
  dataKeys,
  colors = ['#14b8a6', '#0ea5e9', '#8b5cf6', '#f59e0b', '#ef4444', '#10b981'],
  xAxisKey = 'name',
  dateRanges,
  height = 300,
  showLegend = true,
  showGrid = true,
  showTooltip = true,
  showDownload = true,
  showRefresh = true,
  className = '',
  emptyStateMessage = 'No data available',
  onRefresh,
  onDateRangeChange
}) => {
  const [selectedDateRange, setSelectedDateRange] = useState(dateRanges?.[0]?.value || '');

  const handleDateRangeChange = (value: string) => {
    setSelectedDateRange(value);
    onDateRangeChange?.(value);
  };

  const handleDownload = () => {
    try {
      // Create a CSV file from the data
      const headers = Object.keys(data[0]).join(',');
      const rows = data.map(row => Object.values(row).join(',')).join('\n');
      const csvContent = `${headers}\n${rows}`;
      
      // Create a blob and download link
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `${title.toLowerCase().replace(/\s+/g, '-')}-data.csv`);
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading chart data:', error);
    }
  };

  const renderChart = () => {
    if (!data || data.length === 0) {
      return (
        <div className="h-full flex items-center justify-center">
          <p className="text-gray-500">{emptyStateMessage}</p>
        </div>
      );
    }

    const tooltipStyle = {
      backgroundColor: 'white',
      border: '1px solid #e2e8f0',
      borderRadius: '0.375rem',
      padding: '0.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
    };
    
    switch (type) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <LineChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />}
              <XAxis 
                dataKey={xAxisKey} 
                tick={{ fontSize: 12, fill: '#64748b' }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={{ stroke: '#e2e8f0' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#64748b' }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={{ stroke: '#e2e8f0' }}
              />
              {showTooltip && <Tooltip contentStyle={tooltipStyle} />}
              {showLegend && <Legend wrapperStyle={{ fontSize: 12, paddingTop: 20 }} />}
              {dataKeys.map((key, index) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={colors[index % colors.length]}
                  strokeWidth={2}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        );
        
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <BarChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />}
              <XAxis 
                dataKey={xAxisKey} 
                tick={{ fontSize: 12, fill: '#64748b' }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={{ stroke: '#e2e8f0' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#64748b' }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={{ stroke: '#e2e8f0' }}
              />
              {showTooltip && <Tooltip contentStyle={tooltipStyle} />}
              {showLegend && <Legend wrapperStyle={{ fontSize: 12, paddingTop: 20 }} />}
              {dataKeys.map((key, index) => (
                <Bar
                  key={key}
                  dataKey={key}
                  fill={colors[index % colors.length]}
                  radius={[4, 4, 0, 0]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );
        
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />}
              <XAxis 
                dataKey={xAxisKey} 
                tick={{ fontSize: 12, fill: '#64748b' }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={{ stroke: '#e2e8f0' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#64748b' }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={{ stroke: '#e2e8f0' }}
              />
              {showTooltip && <Tooltip contentStyle={tooltipStyle} />}
              {showLegend && <Legend wrapperStyle={{ fontSize: 12, paddingTop: 20 }} />}
              {dataKeys.map((key, index) => (
                <Area
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={colors[index % colors.length]}
                  fill={`${colors[index % colors.length]}20`}
                  strokeWidth={2}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        );
        
      case 'pie': {
        // For pie charts, we need to transform the data
        const pieData = dataKeys.map((key) => ({
          name: key,
          value: data.reduce((sum, item) => sum + (Number(item[key]) || 0), 0)
        }));
        
        return (
          <ResponsiveContainer width="100%" height={height}>
            <PieChart>
              <Pie
                data={pieData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                label={({
                  cx,
                  cy,
                  midAngle,
                  innerRadius,
                  outerRadius,
                  percent,
                  name
                }) => {
                  const radius = innerRadius + (outerRadius - innerRadius) * 1.4;
                  const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                  const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                  return (
                    <text
                      x={x}
                      y={y}
                      fill="#64748b"
                      textAnchor={x > cx ? 'start' : 'end'}
                      dominantBaseline="central"
                      fontSize={12}
                    >
                      {name} ({(percent * 100).toFixed(0)}%)
                    </text>
                  );
                }}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              {showTooltip && <Tooltip contentStyle={tooltipStyle} />}
              {showLegend && <Legend wrapperStyle={{ fontSize: 12, paddingTop: 20 }} />}
            </PieChart>
          </ResponsiveContainer>
        );
      }
        
      case 'stacked-bar':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <BarChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />}
              <XAxis 
                dataKey={xAxisKey} 
                tick={{ fontSize: 12, fill: '#64748b' }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={{ stroke: '#e2e8f0' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#64748b' }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={{ stroke: '#e2e8f0' }}
              />
              {showTooltip && <Tooltip contentStyle={tooltipStyle} />}
              {showLegend && <Legend wrapperStyle={{ fontSize: 12, paddingTop: 20 }} />}
              {dataKeys.map((key, index) => (
                <Bar
                  key={key}
                  dataKey={key}
                  stackId="a"
                  fill={colors[index % colors.length]}
                  radius={index === dataKeys.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );
        
      case 'multi-line':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <LineChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />}
              <XAxis 
                dataKey={xAxisKey} 
                tick={{ fontSize: 12, fill: '#64748b' }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={{ stroke: '#e2e8f0' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#64748b' }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={{ stroke: '#e2e8f0' }}
              />
              {showTooltip && <Tooltip contentStyle={tooltipStyle} />}
              {showLegend && <Legend wrapperStyle={{ fontSize: 12, paddingTop: 20 }} />}
              {dataKeys.map((key, index) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={colors[index % colors.length]}
                  strokeWidth={2}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        );
        
      default:
        return <div>Unsupported chart type</div>;
    }
  };

  return (
    <Card
      title={title}
      className={className}
      headerAction={
        <div className="flex items-center space-x-2">
          {dateRanges && dateRanges.length > 0 && (
            <Select
              options={dateRanges}
              value={selectedDateRange}
              onChange={handleDateRangeChange}
              variant="minimal"
              size="sm"
              fullWidth={false}
              icon={<Calendar size={14} />}
            />
          )}
          
          {showRefresh && onRefresh && (
            <button
              onClick={onRefresh}
              className="p-1 text-gray-600 hover:text-teal-600 transition-colors"
              aria-label="Refresh data"
            >
              <RefreshCw size={16} />
            </button>
          )}
          
          {showDownload && (
            <button
              onClick={handleDownload}
              className="p-1 text-gray-600 hover:text-teal-600 transition-colors"
              aria-label="Download data"
            >
              <Download size={16} />
            </button>
          )}
        </div>
      }
    >
      <div className="h-full">
        {renderChart()}
      </div>
    </Card>
  );
};

export default ChartContainer;
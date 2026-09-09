import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';
// multiple charts with different colours
const colors = ['#8884d8', '#82ca9d', '#ff7300', '#ff0000', '#00c49f', '#0088fe'];

const formatTimestamp = (value) => new Date(value).toLocaleString([], {
  month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
});

const Chart = ({ data, selectedStreams, unitHints = {} }) => (
  <ResponsiveContainer width="100%" height={400} minWidth={280}>
  <LineChart data={data} margin={{ top: 10, right: 18, left: 0, bottom: 48 }}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="created_at" tickFormatter={formatTimestamp} angle={-25} textAnchor="end" height={70} minTickGap={24} />
    <YAxis />
    <Tooltip labelFormatter={formatTimestamp} formatter={(value, name) => [`${value}${unitHints[name] ? ` ${unitHints[name]}` : ''}`, name]} />
    <Legend />
    {selectedStreams.map((stream, i) => (
      <Line
        key={stream}
        type="monotone"
        dataKey={stream}
        stroke={colors[i % colors.length]}
        dot={false}
      />
    ))}
  </LineChart>
  </ResponsiveContainer>
);

export default Chart;

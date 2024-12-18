import React from 'react';

interface TableProps {
  data: { name: string; country: string }[];
  onEdit: (item: { name: string; country: string }) => void;
}

const Table: React.FC<TableProps> = ({ data, onEdit }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Country</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.country}</td>
            <td>
              <button onClick={() => onEdit(item)}>Update</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

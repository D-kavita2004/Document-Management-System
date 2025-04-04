import React, { useState } from 'react';
import { mockData } from '@/Constants/Data';
import { columns } from '@/Constants/Columns';
import { useReactTable } from '@tanstack/react-table';

const MyDocuments = () => {

  const [data,setData] = useState(mockData);
  const table = useReactTable({data,columns});

console.log(table.getHeaderGroups());
  return (
    <div>MyDocuments</div>
  )
}

export default MyDocuments
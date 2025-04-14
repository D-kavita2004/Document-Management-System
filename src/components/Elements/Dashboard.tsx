import React from 'react';
import { ChartComponent } from './ChartComponent';

const Dashboard = () => {
  return (
    <div className='flex justify-center h-full p-4 flex-col items-center'>
        <h1 className='text-4xl font-bold italic text-center my-auto mb-4'>Document Managment System</h1>
        <ChartComponent/>
    </div>
  )
}

export default Dashboard
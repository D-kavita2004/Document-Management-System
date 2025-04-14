import React from 'react';
import { ChartComponent } from './ChartComponent';

const Dashboard = () => {
  return (
    <div className='flex p-4 flex-col items-center overflow-auto max-h-[85vh] scrollbar-hide'>
        <h1 className='text-4xl font-bold italic text-center mb-4 '>Document Managment System</h1>
        <ChartComponent/>
        {/* <h1>Hii i am kavita</h1> */}
    </div>
  )
}

export default Dashboard
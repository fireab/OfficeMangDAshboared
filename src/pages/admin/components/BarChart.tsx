import { BarChart } from '@mui/x-charts/BarChart';

import { axisClasses } from "@mui/x-charts";
const chartSetting = {
    yAxis: [
        {
          label: 'Total Students',
        },
      ],
    sx: {
        
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translate(-20px, 0)',
      },
    },
  };

export let BarChartDisplay:React.FC=()=>{
    return (
        <div style={{ display:"flex", flexDirection:"column", textAlign:"center",alignItems:"center",justifyContent:"center" }}>
            <h3>OverAll Service Rate In terms of Year</h3>  
            <BarChart
            xAxis={
                [{ scaleType: 'band', data: ["A","B","C","D","E","F","G","H","I","J","K"] }]
            }
            series={[
                { data: [110, 90, 50,67,29,70,200,49,81,45,23,42],label:"Male",color:"blue" }, 
                { data: [14, 66, 160,93,20,39,53,66,32,75,52,39],label:"Women",color:"pink" }
            ]}
            width={450}
            height={300}
            
            {...chartSetting}
            /> 
        </div>
        
    )
}
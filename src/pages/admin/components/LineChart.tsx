import { LineChart } from '@mui/x-charts/LineChart';
import { useTranslation } from 'react-i18next';

export default function LineChartDisplay(data:{
    years:number[],
    values:number[]
}) {
    const {t}=useTranslation();
    data.years.push(data.years[data.years.length-1]+1)
    return (
        <LineChart
            xAxis={[{ data: data.years,label:"Year" }]}
            series={[
                {
                data: data.values,
                area: true,
              
                label:t("average_customer_satisfaction") 
                },
            ]}
            height={300}
            margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
            grid={{ vertical: true, horizontal: true }}
        />
    );
}


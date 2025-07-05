import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PieChart } from '@mui/x-charts/PieChart';
import { useTranslation } from 'react-i18next';

const pieParams = { height: 200, margin: { right: 5 } };
const palette = ['#76C7C0', '#A0D9B5',"#80C4E9", '#F9E79F','#F1948A'];

interface Rates{
  Excellent:number|undefined,
  VeryGood:number|undefined,
  Intermediate:number|undefined,
  Good:number|undefined,
  Bad:number|undefined
}
interface RateMakers{
  CustomerService:Rates,
  StandardService:Rates,
  FairService:Rates,
  ResponseForCompliment:Rates,
  ServiceRate:Rates
}
export default function PieColor(rate:any) {
  const {t}=useTranslation();
  return (
    <Stack direction="row"   width="100%" textAlign="center" sx={{marginTop:"30px"}} spacing={2}>
      <Box flexGrow={1} sx={{width:"18%"}}>
        <PieChart
            colors={palette}
            series={[{ data: [

              { value: rate.CustomerService.Excellent?rate.CustomerService.Excellent:0 }, 
              { value: rate.CustomerService.VeryGood?rate.CustomerService.VeryGood:0 }, 
              { value: rate.CustomerService.Intermediate?rate.CustomerService.Intermediate:0 }, 
              { value: rate.CustomerService.Good?rate.CustomerService.Good:0 }, 
              { value: rate.CustomerService.Bad?rate.CustomerService.Bad:0 }, 

            ] }]}
            {...pieParams}
          />
        <Typography>{t("CustomerService")}</Typography>
      </Box>
      <Box flexGrow={1} sx={{width:"18%"}}>
        <PieChart
          colors={palette}
          series={[
            { data: [

              { value: rate.StandardService.Excellent?rate.StandardService.Excellent:0 }, 
              { value: rate.StandardService.VeryGood?rate.StandardService.VeryGood:0 },
              { value: rate.StandardService.Intermediate?rate.StandardService.Intermediate:0 }, 
              { value: rate.StandardService.Good?rate.StandardService.Good:0 }, 
              { value: rate.StandardService.Bad?rate.StandardService.Bad:0 }, 
            ] },
          ]}
          {...pieParams}
        />
        <Typography>{t("StandardService")}</Typography>
      </Box>
      <Box flexGrow={1} sx={{width:"18%"}}>
        <PieChart
          colors={palette}
          series={[
            { data: [
              { value: rate.FairService.Excellent?rate.FairService.Excellent:0 }, 
              { value: rate.FairService.VeryGood?rate.FairService.VeryGood:0 }, 
              { value: rate.FairService.Intermediate?rate.FairService.Intermediate:0 },
              { value: rate.FairService.Good?rate.FairService.Good:0 }, 
              { value: rate.FairService.Bad?rate.FairService.Bad:0 }, 

            ] },
          ]}
          {...pieParams}
        />
        <Typography>{t("FairService")}</Typography>
      </Box>
      <Box flexGrow={1} sx={{width:"18%"}}>
        <PieChart
          colors={palette}
          series={[
            { data: [
              { value: rate.ResponseForCompliment.Excellent?rate.ResponseForCompliment.Excellent:0 }, 
              { value: rate.ResponseForCompliment.VeryGood?rate.ResponseForCompliment.VeryGood:0 },
              { value: rate.ResponseForCompliment.Intermediate?rate.ResponseForCompliment.Intermediate:0 }, 
              { value: rate.ResponseForCompliment.Good?rate.ResponseForCompliment.Good:0 }, 
              { value: rate.ResponseForCompliment.Bad?rate.ResponseForCompliment.Bad:0 },             
            ] },
          ]}
          {...pieParams}
        />
        <Typography>{t("ResponseForCompliment")}</Typography>        
      </Box> 
      <Box flexGrow={1} sx={{width:"18%"}}>
        <PieChart
          colors={palette}
          series={[
            { data: [
              { value: rate.ServiceRate.Excellent?rate.ServiceRate.Excellent:0 }, 
              { value: rate.ServiceRate.VeryGood?rate.ServiceRate.VeryGood:0 }, 
              { value: rate.ServiceRate.Intermediate?rate.ServiceRate.Intermediate:0 },
              { value: rate.ServiceRate.Good?rate.ServiceRate.Good:0 }, 
              { value: rate.ServiceRate.Bad?rate.ServiceRate.Bad:0 },      
            ] },
          ]}
          {...pieParams}
        />
        <Typography>{t("ServiceRate")}</Typography>        
      </Box>
      
    </Stack>
  );
}

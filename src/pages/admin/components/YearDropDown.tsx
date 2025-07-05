import { FormControl,InputLabel,Select,MenuItem, SelectChangeEvent } from "@mui/material"
export const YearDropDown=(year:number,setYear:Function)=>{
  const current_year:number=new Date().getFullYear();
    let years:number[]=[current_year-3,current_year-2,current_year-1,current_year,current_year+1,current_year+2,current_year+4];
    const handleChange=(event:SelectChangeEvent)=>{
        setYear(Number.parseInt(event.target.value))
        console.log("Year Change done",year)
    }
    return (
        <div>
      <FormControl variant="standard" sx={{ ml: "30px", minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Year</InputLabel>
        <Select
          id="demo-simple-select-standard"
          onChange={handleChange}
          label="Year"
          sx={{
            width:"180px"
          }}
        >
          {
            years.map((year:number)=>{
              return <MenuItem value={year}>{year}</MenuItem>
            })
          }
        </Select>
      </FormControl>
    </div>
    )
}
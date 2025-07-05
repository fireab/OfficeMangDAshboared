import { useEffect, useState } from "react";
import { ComplainInterface } from "../../interfaces/complain.interface";
import { makeGetRequest } from "../../config";
import { useParams } from "react-router-dom";
import { Stack } from "@mui/material";

export function ComplimentDetailPage(){
    const [complain,setComplain]=useState<ComplainInterface>();
    const { id } = useParams();
    console.log("Param" ,id)
    useEffect(
        ()=>{
            makeGetRequest(`/compliment/${id}`)
                .then((result)=>{
                    console.log("result",result)
                    setComplain(result.data)
                })
                .catch((error)=>{
                    console.log("Error",error)
                })
        },
    []);

    return (
        <div className='main-page'>
            <div className='main-directory'>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" fill="currentColor" className="bi bi-house-door" viewBox="0 0 16 16">
                    <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z"/>
                </svg>
                <div> - Compliment Detail Page</div>
            </div>
            <div className='main-detail-page'>
                {complimentForm("am",complain)}
            </div>
        </div>
    )
}

function complimentForm(locale:string, complain:ComplainInterface|undefined ){
    return  amharicCompliment(complain);
}
function amharicCompliment(complain:ComplainInterface|undefined){
        if ( complain) {
            return (
            <div style={{
                display:"flex",flexDirection:"column",
                justifyContent:"start" ,backgroundColor:"white",
                marginTop:"20px",
                padding:"25px",border:"1px black solid"

                }}>
                
                <h4 style={{alignSelf:"center"}}> የባለጉዳዮች የቅሬታ ማቅረቢያ ቅጽ -001 </h4> 
                <Stack direction={"row"} gap={3} flexWrap={"wrap"}>
                    <b>የቅሬታ አቅራቢው ሙሉ ስም</b> - <u> {complain.fullName}</u>
                </Stack>
                <Stack direction={"row"} gap={3} flexWrap={"wrap"}>
                    <b>አድራሻ፣ከተማ -</b> <u> {complain.city}</u> 
                    <b>ክ/ከተማ  - </b> <u> {complain.subCity}</u>
                    <b>ወረዳ - </b> <u> {complain.woreda} </u>
                    <b>የቤ.ቁ - </b> <u> {complain.homeNo}</u>  ስልክ.ቁ <u> {complain.phoneNumber}</u>
                </Stack>
                <Stack direction={"row"} gap={3} flexWrap={"wrap"}>
                    <b>ቅሬታ የቀረበበት ዋና ጉዳይ በአጭሩ ይገለጽ  -</b> <u> {complain.reason}</u> 
                  
                </Stack>
                <Stack direction={"row"} gap={3} flexWrap={"wrap"}>
                <b>መንስኤ የሆነው ድርጊት የተፈጸመበት ቀን - </b> <u>{complain.complimentDate}</u>
                </Stack>
                <Stack direction={"row"} gap={3}  flexWrap={"wrap"}>
                <b> ቦታ/መ/ቤት - </b> <u> {complain.placeSubCity}</u> <b>ክ/ከተማ  - </b> <u> {complain.placeSubCity}</u> ወረዳ <u> {complain.placeWoreda}</u>
                </Stack>
                <Stack direction={"row"} gap={3} flexWrap={"wrap"}>
                <b> ጉዳዩ የሚመለከተውን የስራ ሂደት/ንዑስ የስራ ሂደት ኬዝቲም - </b> <u> {"To Be done"}</u> <b>ክ/ከተማ  - </b> <u> {complain.placeSubCity}</u> <b>ወረዳ</b> <u> {complain.placeWoreda}</u>
                </Stack>

                <Stack direction={"row"} gap={3} flexWrap={"wrap"}>
                <b>  ጉዳዩ የሚመለከተው የአገልግሎት ሰጪ ሰራተኛ ስም - </b> <u> {complain.employerName}</u>
                </Stack>
                <Stack direction={"row"} gap={3} flexWrap={"wrap"}>
                <b>  ባለጉዳዩ እንዲደረግለት ወይም እንዲፈጸምለት የሚፈልገው /በአጭሩ ይግለጹ - </b> <u> {complain.expectedResponse}</u>
                </Stack>
                    <br />
                    <br />
                    <b>ማሳሰቢያ</b>
                    <br />
                    የቅሬታ ጉዳዩ በሚመለከተው የስራ ሂደት/ንዑስ የስራ ሂደት መሪ/አስተባባሪ የሚወሰን ነው።
                    ቅሬታ አቅራቢው ይህን ቅጽ ከመሙላት በፊት ጉዳዩን በቅድሚያ ለሚመለከተው አገልግሎቱን ለሰጠው ሰራተኛ ማስረዳቱንና መልስ ማግኘቱን ማረጋገጥ አለበት። በተሰጠው መልስ ካልረካ ይህን ቅጽ ሞልቶ የቅሬታ ጉዳዩ ለሚመለከተው የስራ ሂደት /ንዑስ የስራ መሪ/አስተባባሪ ማቅረብ አለበት።
                    የቅሬታ ጉዳዬ የሚመለከተው የስራ ሂደት/ንዑስ የስራ መሪ/አስተባባሪ ጉዳዩን መርምሮ ለዚሁ በተዘጋጀ ቅጽ ላይ ውሳኔውን በማስፈር ለቅሬታ አቅራቢው ቅሬታውን በቀረበ በ3 ተከታታይ የስራ ቀናት ውስጥ በጽሁፍ ማስታወቅ አለበት።
                    ቅሬታ አቅራቢው በውሳኔው ካልረካ አቤቱታ ለሚያስተናግደው መ/ቤቱ የቅሬታ እና አቤቱታ ሰሚ አካል /ኮሚቴ/ ቀጥሎ ማመልከት ይቻላል።

                </div>
            )
        }
        else{
            <h3>Complain Not FOund</h3>
        }
}
function oromicCompliment(complain:ComplainInterface|undefined) {
    if ( complain) {
        return(
        <div style={{
            display:"flex",flexDirection:"column",
                justifyContent:"start" ,backgroundColor:"white",
                marginTop:"20px",
                padding:"25px",border:"1px black solid"
        }}>
                
                <h4 style={{alignSelf:"center"}}>Unka komii dhiyeessuun miidhamtootaa -001 </h4> 
                <Stack direction={"row"} gap={3}>
                    <b>Maqaa Guutuu Himataa</b> - <u> {complain.fullName}</u>
                </Stack>
                <Stack direction={"row"} flexWrap={"wrap"} gap={3}>
                    <b>Teessoo -</b> <u> {complain.city}</u> 
                    <b>Magaalaa/Kutaa Magaalaa  - </b> <u> {complain.subCity}</u>
                    <b>Waradaa - </b> <u> {complain.woreda} </u>
                    <b>Lakk. Manaa- </b> <u> {complain.homeNo}</u> Lakk. Bilibilaa <u> {complain.phoneNumber}</u>
                </Stack>
                <Stack direction={"row"}  flexWrap={"wrap"}gap={3}>
                    <b> Dhimma ijoo himannichaa gabaabinaan ibsi
                    -</b> <u> {complain.reason}</u> 
                  
                </Stack>
                <Stack direction={"row"} gap={3} flexWrap={"wrap"}>
                <b>Guyyaa gochi sababa ta’e itti raawwatam - </b> <u>{complain.complimentDate}</u>
                </Stack>

                <Stack direction={"row"} gap={3} flexWrap={"wrap"}>
                <b> Bakka/Waajjira  - </b> <u> {complain.placeSubCity}</u> <b>Magaalaa - </b> <u> {complain.placeSubCity}</u> Aanaa <u> {complain.placeWoreda}</u>
                </Stack>
                <Stack direction={"row"} gap={3} flexWrap={"wrap"}>
                <b> Garee Dhimma adeemsa hojii/adeemsa hojii xiqqaa dhimmi ilaallatu - </b> <u> {"To Be done"}</u> 
                </Stack>

                <Stack direction={"row"} gap={3} flexWrap={"wrap"}>
                <b>  Maqaa Hojjataa Dhimmichi ilaallatu - </b> <u> {complain.employerName}</u>
                </Stack>
                <Stack direction={"row"} gap={3} flexWrap={"wrap"}>
                <b>  Abbaan Haajaa wanta isa goadhamuuf barbaadu- </b> <u> {complain.expectedResponse}</u>
                </Stack>
                    <br />
                    <br />
                    <b>Yaadachiisaa</b>
                    <br />
                    Dhimmi komii kanaa adeemsa/hogganaa adeemsa xiqqaa/qindeessaa dhimmi ilaallatuun kan murtaa’u ta’a.
 Himatamaan unka kana guutuu isaa dura hojjettoota tajaajila kennan dhimmicha ibsee deebii argachuu isaa mirkaneeffachuu qaba. Deebii kennameen kan hin quufne yoo ta’e unka kana guutee komii adeemsa hojii dhimmi ilaallatuuf / hoogganaa hojii xiqqaa/qindeessaaf dhiyeessu qaba.
 Adeemsa hojii/hogganaan hojii xixiqqaa/qindeessaan komii dhimmicha ilaallatu dhimmicha qoratee unka dhimma kanaaf qophaa’e irratti murtii kennuudhaan, himanni erga dhiyaatee guyyoota hojii 3 walitti aansuun keessatti himatamaa barreeffamaan beeksisuu qaba.
 Himatamaan murtii kennametti kan hin quufne yoo ta’e, sana booda koree komii fi komii dhiyaachuu ni danda’a.

                </div>)}
                else{
                    return(
                        <div> No Compliment Found</div>
                    )
                }
}
export default function svgTree() {
    return(
    <svg style = {{ width: "inherit", height:"inherit"}} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
    <line stroke='silver' x1="12" y1="24" x2="12" y2="16"/>
    <circle stroke='yellow' cx="12" cy="16" r="1"/>   



    <line stroke='brown' x1="12" y1="16" x2="18" y2="10"/>
    <circle stroke='green' cx="18" cy="10" r="1"/>


    <circle stroke='red' cx="18.5" cy="10" r="0.75"/>
    <circle stroke='yellow' cx="19" cy="10" r="0.5"/>



    <circle stroke='black' cx="17.5" cy="10" r="0.25"/>
    <line stroke='brown' x1="12" y1="16" x2="6" y2="10"/>
    <circle stroke='red' cx="6" cy="10" r="1"/>
    <line stroke='brown' x1="6" y1="10" x2="2" y2="8"/>        
    <circle stroke='green' cx="2" cy="8" r="1"/>     
    <line stroke='brown' x1="6" y1="10" x2="8" y2="8"/>
    <circle stroke='green' cx="8" cy="8" r="1"/>
    </svg>
    )
}
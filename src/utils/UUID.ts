
export default function UUID(){
    return 'xxxxx-xxxx-5xxx-yxxxx'.replace(/[xy]/g, (c)=>{
        let r = Math.random()*16|0;
        let v = c == 'x'? r: 1;
        return v.toString(16);
    });
}
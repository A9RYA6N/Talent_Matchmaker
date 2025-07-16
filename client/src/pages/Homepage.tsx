import {useState} from "react"
import axios, { AxiosError } from 'axios'

interface Person {
    name: string;
    score: number;
    reason: {
        c: number;
        s: number;
        t: number;
        b: number;
    };
}

const Homepage = () => {
    const [location, setLocation]=useState('');
    const [budget, setBudget]=useState('');
    const [skills, setSkills]=useState<string[]>([]);
    const [styles, setStyles]=useState<string[]>([]);
    const [remote, setRemote]=useState(false);
    const [error, setError]=useState('');
    const [loading, setLoading]=useState(false);
    const [data, setData]=useState<Person[]>([]);

    const handleSkillsChange=(e: React.ChangeEvent<HTMLSelectElement>)=>{
        const selectedOptions=Array.from(e.target.selectedOptions).map(option=>(option as HTMLOptionElement).value)
        setSkills(selectedOptions)
    }

    const handleStyleChange=(e: React.ChangeEvent<HTMLSelectElement>)=>{
        const selectedOptions=Array.from(e.target.selectedOptions).map(option=>(option as HTMLOptionElement).value)
        setStyles(selectedOptions)
    }

    const formatReason=(reason: {c: number; s: number; t: number; b: number;})=>{
        const parts=[]
        if (reason.c>0){
            parts.push('Location match (+3)');
        } 
        if (reason.s>0){
            parts.push(`${reason.s} skill${reason.s>1 ? 's' : ''} matched (+${reason.s*2})`);
        } 
        if (reason.b>0){
            parts.push('Budget match (+2)');
        } 
        if (reason.t>0){
            parts.push(`${reason.t} style keyword${reason.t>1? 's' : ''} (+${reason.t})`);
        } 
        return parts.join(', ')
    }

    const onClick=async()=>{
        setError("")
        console.log(location, parseInt(budget), skills, styles)
        if(location=="" || budget=="" || skills[0]=="" || styles[0]==""){
            setError('Please fill every form')
            return
        }
        setLoading(true)
        try {
            const apiObj={
                location,
                budget:parseInt(budget),
                skills,
                style:styles,
                remote
            }
            const res = await axios({
                method:"POST",
                url:`${import.meta.env.VITE_CLIENT_API}/match`,
                data:apiObj
            })
            if(res.status==200)
            {
                setData(res.data.data)
            }
        } catch (err) {
            const error=err as AxiosError;
            setError("Oops! Something went wrong "+error.message)
        }
        finally{
            setLoading(false)
        }
    }
    return (
        <div>
            <div id="error">{error ? error : ""}</div>
            <div id="input">
                <select name="location" id="location" onChange={(e)=>{setLocation(e.target.value)}} required>
                    <option value="" disabled selected>Pick Location</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Goa">Goa</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Pune">Pune</option>
                    <option value="Kolkata">Kolkata</option>
                </select>
                <select name="skills" id="skills" multiple onChange={handleSkillsChange} required>
                    <option value="" disabled selected>Pick Skills</option>
                    <option value="Fashion Shoots">Fashion Shoots</option>
                    <option value="Corporate Shoots">Corporate Shoots</option>
                    <option value="Weddings">Weddings</option>
                    <option value="Documentaries">Documentaries</option>
                    <option value="Branding">Branding</option>
                    <option value="Social Media">Social Media</option>
                </select>
                <select name="styles" id="styles" multiple onChange={handleStyleChange} required>
                    <option value="" disabled selected>Pick Style</option>
                    <option value="documentary">Documentary</option>
                    <option value="vibrant">Vibrant</option>
                    <option value="cinematic">Cinematic</option>
                    <option value="classic">Classic</option>
                    <option value="minimal">Minimal</option>
                    <option value="editorial">Editorial</option>
                    <option value="bold">Bold</option>
                </select>
                <label htmlFor="remote">Remote creators allowed</label>
                <input type="checkbox" id="remote" onChange={(e)=>setRemote(e.target.checked)}/>
                <input type="text" placeholder="Enter budget" onChange={(e)=>{setBudget(e.target.value)}} required/>
                <button onClick={onClick} disabled={loading}>Submit</button>
            </div>
            <div id="result">
                {data ? data.map((d, index)=>{
                return(
                    <div key={index}>
                        <p>{d.name}</p>
                        <p>{'Score-'+d.score}</p>
                        <p>{formatReason(d.reason)}</p>
                    </div>
                );
                }) : ""}
            </div>
        </div>
    )
}

export default Homepage

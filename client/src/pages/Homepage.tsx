import {useState} from "react"

const Homepage = () => {
    const [location, setLocation]=useState('');
    const [budget, setBudget]=useState('');
    const [skills, setSkills]=useState('');
    const [style, setStyle]=useState('')

    const onClick=async()=>{
        console.log(location, parseInt(budget), skills, style)
    }
    return (
        <div>
            <select name="location" id="location" onChange={(e)=>{setLocation(e.target.value)}} required>
                <option value="">Pick Location</option>
                <option value="Delhi">Delhi</option>
                <option value="Chennai">Chennai</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Goa">Goa</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Pune">Pune</option>
                <option value="Kolkata">Kolkata</option>
            </select>
            <select name="skills" id="skills" onChange={(e)=>{setSkills(e.target.value)}} required>
                <option value="">Pick Skills</option>
                <option value="Fashion Shoots">Fashion Shoots</option>
                <option value="Corporate Shoots">Corporate Shoots</option>
                <option value="Weddings">Weddings</option>
                <option value="Documentaries">Documentaries</option>
                <option value="Branding">Branding</option>
                <option value="Social Media">Social Media</option>
            </select>
            <select name="styles" id="styles" onChange={(e)=>{setStyle(e.target.value)}} required>
                <option value="">Pick Style</option>
                <option value="documentary">Documentary</option>
                <option value="vibrant">Vibrant</option>
                <option value="cinematic">Cinematic</option>
                <option value="classic">Classic</option>
                <option value="minimal">Minimal</option>
                <option value="editorial">Editorial</option>
                <option value="bold">Bold</option>
            </select>
            <input type="text" placeholder="Enter budget" onChange={(e)=>{setBudget(e.target.value)}} required/>
            <button onClick={onClick}>Submit</button>
        </div>
    )
}

export default Homepage

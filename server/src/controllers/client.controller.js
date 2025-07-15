import { readFile } from "fs/promises"
import path, { parse } from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const match=async(req, res)=>{
    const {location, budget, skills, style}=req.body
    try {
        const map={}
        const filePath = path.resolve(__dirname, '../data/TalentProfiles.json');
        const data = await readFile(filePath, 'utf-8');
        const parsedData=JSON.parse(data)
        for(let i=0; i<parsedData.length; i++)
        {
            map[i]=0;
        }
        for(let i=0; i<parsedData.length; i++)
        {
            if(parsedData[i]['city']==location)
            {
                map[i]+=3;
            }
            skills.forEach(skill=>{
                if(parsedData[i]['skills'].includes(skill))
                {
                    map[i]+=2;
                }
            })
            style.forEach(s=>{
                if(parsedData[i]['style_tags'].includes(s))
                {
                    map[i]+=1;
                }
                parsedData[i].portfolio.forEach(project=>{
                    if(project.tags.includes(s)) 
                    {
                        map[i]+=1;
                    }
                })
            })
            const creatorBudget=parsedData[i]['budget_range']
            const [lowerLimit, upperLimit]=creatorBudget.split("\u2013")
            const ll=lowerLimit.replace('\u20b9','')
            const ul=upperLimit.replace('\u20b9','')
            if(budget>=parseInt(ll) && budget<=parseInt(ul))
            {
                map[i]+=2
            }
        }
        const mapArr=Object.keys(map).map((key)=>[key, map[key]])
        mapArr.sort((a,b)=>b[1]-a[1])
        const resArr=[]
        for(let i=0; i<3; i++)
        {
            const talentInfo={
                name:parsedData[mapArr[i][0]].name,
                score:mapArr[i][1]
            }
            resArr.push(talentInfo)
        }
        res.status(200).json({success: true, data:resArr, message: "Talents got"})
    } catch (error) {
        res.status(500).json({success:false, message:'Internal server error '+error});   
    }
}

export {match}
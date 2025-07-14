const match=async(req, res)=>{
    console.log("Hello")
    res.status(200).json({success: true, message: "Api is working"})
}

export {match}
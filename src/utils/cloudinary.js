import {v2 as cloudinary} from "cloudinary"
import fs from "fs" 



    // Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
})

const uploadOnCloudinary = async(FilePath) => {
    try {
        if(!FilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(FilePath, {
            resource_type:"auto"
        })
        //file has been uploaded
        console.log("File is uploaded on Cloudinary",
            response.url
        )
        fs.unlinkSync(FilePath)
        return response
    } 
    catch( error ) {
        fs.unlinkSync(FilePath) // remove the locally saved temp file as the upload process was failed
        return null
    }
}

export {uploadOnCloudinary}
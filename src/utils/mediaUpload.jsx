const url = "https://hjqyqtqncfxkiadwrbno.supabase.co"
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqcXlxdHFuY2Z4a2lhZHdyYm5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2OTc0NTQsImV4cCI6MjA2OTI3MzQ1NH0.7C9RoFXygweuGh3TpA_PtIKSfZhOi8LcRSYzti4aNe0"

import { createClient } from "@supabase/supabase-js"

const supabase = createClient(url,key)

export default function uploadFile(file){
    const promise = new Promise(

        (resoleve , reject)=>{
            if(file == null){
                reject("please select a file to upload")
            }

            const timeStamp = new Date().getTime();
            const fileName = timeStamp+"-"+file.name

            supabase.storage.from("images").upload(fileName , file , {
                cacheControl : '3600' ,
                upsert : false
            }).then(
                ()=>{
                    const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
                    resoleve(publicUrl)
                }
            ).catch(
                (error)=>{
                    reject("failed to upload file")
                }
            )
        }
    )

    return promise;
}
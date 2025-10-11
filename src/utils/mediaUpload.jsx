const url = "https://uydbqgdtmomodjtgfwmx.supabase.co"
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5ZGJxZ2R0bW9tb2RqdGdmd214Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwNTI2NDcsImV4cCI6MjA3MjYyODY0N30.t9IMk2DqNaj63kDmtD5mJFL-2TMJCmQODuFTVcKmlv0"

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
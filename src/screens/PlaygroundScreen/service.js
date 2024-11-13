import 'dotenv/config';


const languageCodeMap = {
    cpp: 54,
    python: 71,
    javascript: 102,
    java: 62
};

async function getSubmission(tokenId,callback){
    try {
        const url = `https://judge0-ce.p.rapidapi.com/submissions/${tokenId}?base64_encoded=true&fields=*`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': process.env.API_KEY,
                'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
            }
        };
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        callback({apiStatus:'error', message:JSON.stringify({error})});
        // callback({apiStatus:'error', message:JSON.stringify({error})});
    }
}


export async function makeSubmission({code, language,callback,stdin})
{
   //language ni aa rha h 

    try {
        const url = 'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&fields=*';

    const options = {
        method: 'POST', //beacuse it submit the request
        headers: {
            'x-rapidapi-key': '079a4c8bd6msh5041ef0ab5ae67cp1f55c0jsnf17d2c1dafd5',
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',  //domain name
            'Content-Type': 'application/json' //we are giving code in json format
        },
    
        
        //network only understand stringify format not object
        body: JSON.stringify({
            
            language_id: languageCodeMap['cpp'],
            source_code: btoa(code), 
            //it is a code which is in base 64 encoded data and each character in base 64 string is 6 bits
            //in documentation they have mentioned that you have to pass in base_64 string not binary string
            // convert binary string int o base 64--> let base64=btoa(s) and vice verse let b=atob(base64)
            stdin: btoa(stdin)
        })
    };
        callback({apiStatus:'loading'});
        const response = await fetch(url, options);
        const result = await response.json();
        const tokenId=result.token;
        
        let statusCode=1;
        let apiSubmissionResult;
        while(statusCode===1 || statusCode===2)
        {
            try{
                apiSubmissionResult=await getSubmission(tokenId);
                statusCode=apiSubmissionResult.status.id;
            }
            catch(error)
            {
                callback({apiStatus:'error', message:JSON.stringify(error)});
                return;
            }
            
        }

        if(apiSubmissionResult){
            callback({apiStatus:'success',data:apiSubmissionResult});
        }
        
    } catch (error) {
        callback({
            apiStatus:'error',
            message: JSON.stringify(error)
        });
       
    }
    

}

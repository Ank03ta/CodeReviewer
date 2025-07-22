import 'dotenv/config';
import app from './src/app.js';
import expressError from './utils/expressError.js';
import mongoDB from 'mongoose';

const ATLAS_DB_URL = process.env.ATLAS_DB_URL

main().then(()=>{

      console.log("conected to db succesfully")
})

async function main(){

    await mongoDB.connect(ATLAS_DB_URL)
}


app.use((req, res, next) =>{
  next(new expressError("page not found",404))
})



app.listen(8080, () => {
  console.log('Server is running on port 8080');
});

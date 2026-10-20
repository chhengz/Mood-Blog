import dotenv from "dotenv";
import { DBConnection, sequelize } from "./database.config.js";
// import { connectDB } from "./mongodb.config.js";

dotenv.config();
const { PORT, BASE_URL, NODE_ENV } = process.env;

// Start server
export const startServer = async (app, {angkorLog = false}) => {
  try {
    const dbMessage = await DBConnection(); // wait for message
    // const dbMongoMessage = await connectDB(); // wait for message

    app.listen(PORT || 3000, () => {
    angkorLog ? 
      console.log(`
                                   *              
                                  *_*             
                                 *___*                   
                     *          *_____*          *        
                    *_*        *_______*        *_*       
                   *___* _____* _______ *_____ *___*      
                   *| |* _____ *__| |__* _____ *| |*     
           _______ *|_|* _____ *__|_|__* _____ *|_|* _______
          |=========|_|===========|_|===========|_|=========|
        |===========|_|===========|_|===========|_|===========|
      |=============|_|===========|_|===========|_|=============|
    |=============================================================|
    |---------------------🔥 Server Running 🔥 -------------------|
        🚀 ${NODE_ENV === 'production' ? 'Production' : 'http://localhost:' + PORT}/${BASE_URL}
        📅 ${new Date().toLocaleString()}
        🌐 ${dbMessage}
        ${/* dbMongoMessage ? '🌐 ' + dbMongoMessage : '' */'' }
        `) : console.log(`🚀 Server running on http://localhost:${PORT}/${BASE_URL} | ${dbMessage}`);

      });
    } catch (err) {
      console.error(err.message);
    }
  };


  // 📦 Node.js ${process.version} | Sequelize ${sequelize.constructor.name} | ${sequelize.getDialect()}
import sqlite3 from 'sqlite3'
import path from 'path'
const db = (mode,sql, params) => {
  return new Promise((resolve, reject) => {
    let db = new sqlite3.Database(path.resolve(__dirname,'./education.db'),function(){
      console.log(db)
      db[mode](sql, params,function(error,data){
        if(error) reject(error)
        else resolve(data)
        db.close();
      })
    });
  })
};

export { db}

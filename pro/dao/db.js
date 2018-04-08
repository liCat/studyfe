import SQLite3 from 'sqlite3'
export class HandleDB {

  constructor(options) {
    this.databaseFile = options && options.databaseFile || `./education.db`;    // 数据库文件(文件路径+文件名)
    this.db = new SQLite3.Database(this.databaseFile);    // 打开的数据库对象
  }

  // 连接数据库(不存在就创建,存在则打开)
  connectDataBase() {
    let _self = this;
    return new Promise((resolve, reject) => {
      _self.db = new SQLite3.Database(_self.databaseFile, function(err) {
        if (err) reject(new Error(err));
        resolve('数据库连接成功');
      });
    });
  }

  /**
   * 创建表
   * @param sentence    CREATE TABLE 语句
   * @used
   let sentence = `
   create table if not exists ${this.tableName}(
   begin_time varchar(255),
   create_time varchar(255),
   end_time varchar(255),
   play_id varchar(255),
   postion_id int(50),
   status int(50),
   task_id int(50)
   );`;
   this.createTable(sentence);
   */
  createTable(sentence) {
    let _self = this;
    return new Promise((resolve, reject) => {
      _self.db.exec(sentence, function(err) {
        if (err) reject(new Error(err));
        resolve(`表创建成功 / 已存在,不需要重新创建该表`);
      });
    });
  }

  sql(sql, param, mode) {
    let _self = this;
    mode = mode == 'all' ? 'all' : mode == 'get' ? 'get' : 'run';
    return new Promise((resolve, reject) => {
      _self.db[mode](sql, param,
        function (err, data) {    // data: Array, Object
          if (err) {
            reject(new Error(err));
          } else {
            if (data) {
              resolve(data);    // 返回数据查询成功的结果
            } else {
              resolve('success');    // 提示 增 删 改 操作成功
            };
          };
        }
      );
    });
  }
};

// module.exports = HandleDB;


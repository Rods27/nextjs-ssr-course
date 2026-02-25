declare module 'better-sqlite3' {
  export default class Database {
    constructor(filename: string);
    prepare(sql: string): PreparedStatement;
  }
}

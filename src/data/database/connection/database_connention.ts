// import { Database } from "../database";

// class DatabaseConnection {

//     public static connect(callback: () => Promise<any>) {
//         console.log('Connecteding..');
//         Database.getInstance().getSequelizeInstance().sync().then((res) => {
//             console.log('Connecteded');
//             callback();
//         });
//     }
// }

// export { DatabaseConnection }
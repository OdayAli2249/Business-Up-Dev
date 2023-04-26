// import {
//     Association, DataTypes, HasManyAddAssociationMixin, HasManyCountAssociationsMixin,
//     HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin,
//     HasManySetAssociationsMixin, HasManyAddAssociationsMixin, HasManyHasAssociationsMixin,
//     HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, Model, ModelDefined, Optional,
//     Sequelize, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, ForeignKey,
//   } from 'sequelize';
//   import { Branch } from './data/database/models/branch';
//   import { Database } from './data/database/database';
// const sequelize = new Sequelize("test3", "postgres", "uzumymw123A@", { dialect: "postgres", host: "localhost" });
// class User extends Model<InferAttributes<User, { omit: 'projects' }>, InferCreationAttributes<User, { omit: 'projects' }>> {
//   declare id: CreationOptional<number>;
//   declare name: string;
//   declare preferredName: string | null;

//   declare createdAt: CreationOptional<Date>;
//   declare updatedAt: CreationOptional<Date>;

//   declare getProjects: HasManyGetAssociationsMixin<Project>;
//   declare addProject: HasManyAddAssociationMixin<Project, number>;
//   declare addProjects: HasManyAddAssociationsMixin<Project, number>;
//   declare setProjects: HasManySetAssociationsMixin<Project, number>;
//   declare removeProject: HasManyRemoveAssociationMixin<Project, number>;
//   declare removeProjects: HasManyRemoveAssociationsMixin<Project, number>;
//   declare hasProject: HasManyHasAssociationMixin<Project, number>;
//   declare hasProjects: HasManyHasAssociationsMixin<Project, number>;
//   declare countProjects: HasManyCountAssociationsMixin;
//   declare createProject: HasManyCreateAssociationMixin<Project, 'ownerId'>;

//   declare projects?: NonAttribute<Project[]>;

//   get fullName(): NonAttribute<string> {
//     return this.name;
//   }

//   declare static associations: {
//     projects: Association<User, Project>;
//   };
// }

// class Project extends Model<
//   InferAttributes<Project>,
//   InferCreationAttributes<Project>
// > {
//   declare id: CreationOptional<number>;
//   declare ownerId: ForeignKey<User['id']>;
//   declare name: string;
//   declare owner?: NonAttribute<User>;
//   declare createdAt: CreationOptional<Date>;
//   declare updatedAt: CreationOptional<Date>;
// }

// class Address extends Model<
//   InferAttributes<Address>,
//   InferCreationAttributes<Address>
// > {
//   declare userId: ForeignKey<User['id']>;
//   declare address: string;
//   declare createdAt: CreationOptional<Date>;
//   declare updatedAt: CreationOptional<Date>;
// }

// Project.init(
//   {
//     id: {
//       type: DataTypes.INTEGER.UNSIGNED,
//       autoIncrement: true,
//       primaryKey: true
//     },
//     name: {
//       type: new DataTypes.STRING(128),
//       allowNull: false
//     },
//     createdAt: DataTypes.DATE,
//     updatedAt: DataTypes.DATE,
//   },
//   {
//     sequelize,
//     tableName: 'projects'
//   }
// );

// User.init(
//   {
//     id: {
//       type: DataTypes.INTEGER.UNSIGNED,
//       autoIncrement: true,
//       primaryKey: true
//     },
//     name: {
//       type: new DataTypes.STRING(128),
//       allowNull: false
//     },
//     preferredName: {
//       type: new DataTypes.STRING(128),
//       allowNull: true
//     },
//     createdAt: DataTypes.DATE,
//     updatedAt: DataTypes.DATE,
//   },
//   {
//     tableName: 'users',
//     sequelize
//   }
// );

// Address.init(
//   {
//     address: {
//       type: new DataTypes.STRING(128),
//       allowNull: false
//     },
//     createdAt: DataTypes.DATE,
//     updatedAt: DataTypes.DATE,
//   },
//   {
//     tableName: 'address',
//     sequelize
//   }
// );

// interface NoteAttributes {
//   id: number;
//   title: string;
//   content: string;
// }

// type NoteCreationAttributes = Optional<NoteAttributes, 'id' | 'title'>;
// const Note: ModelDefined<
//   NoteAttributes,
//   NoteCreationAttributes
// > = sequelize.define(
//   'Note',
//   {
//     id: {
//       type: DataTypes.INTEGER.UNSIGNED,
//       autoIncrement: true,
//       primaryKey: true
//     },
//     title: {
//       type: new DataTypes.STRING(64),
//       defaultValue: 'Unnamed Note'
//     },
//     content: {
//       type: new DataTypes.STRING(4096),
//       allowNull: false
//     }
//   },
//   {
//     tableName: 'notes'
//   }
// );

// User.hasMany(Project, {
//   sourceKey: 'id',
//   foreignKey: 'ownerId',
//   as: 'projects' // this determines the name in `associations`!
// });

// Address.belongsTo(User, { targetKey: 'id' });
// User.hasOne(Address, { sourceKey: 'id' });

// async function doStuffWithUser() {
//   const newUser = await User.create({
//     name: 'Johnny',
//     preferredName: 'John',
//   });
//   console.log(newUser.id, newUser.name, newUser.preferredName);

//   const project = await newUser.createProject({
//     name: 'first!'
//   });

//   const ourUser = await User.findByPk(1, {
//     include: [User.associations.projects],
//     rejectOnEmpty: true
//   });
//   console.log(ourUser.projects![0].name);
// }

// class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
//   declare id: CreationOptional<number>;
//   declare name: string;
//   declare createdAt: CreationOptional<Date>;
//   declare updatedAt: CreationOptional<Date>;
// }

// User.init(
//   {
//     id: {
//       type: DataTypes.INTEGER.UNSIGNED,
//       autoIncrement: true,
//       primaryKey: true
//     },
//     name: {
//       type: new DataTypes.STRING(128),
//       allowNull: false
//     },
//     createdAt: DataTypes.DATE,
//     updatedAt: DataTypes.DATE,
//   },
//   {
//     tableName: 'users',
//     sequelize
//   }
// );

// class Service extends Model<InferAttributes<Service>, InferCreationAttributes<Service>> {
//   declare id: CreationOptional<number>;
//   declare name: string;
//   declare createdAt: CreationOptional<Date>;
//   declare updatedAt: CreationOptional<Date>;
// }

// Service.init(
//   {
//     id: {
//       type: DataTypes.INTEGER.UNSIGNED,
//       autoIncrement: true,
//       primaryKey: true
//     },
//     name: {
//       type: new DataTypes.STRING(128),
//       allowNull: false
//     },
//     createdAt: DataTypes.DATE,
//     updatedAt: DataTypes.DATE,
//   },
//   {
//     tableName: 'services',
//     sequelize
//   }
// );


// class Subscribtion extends Model<InferAttributes<Subscribtion>, InferCreationAttributes<Subscribtion>> {
//   declare id: CreationOptional<number>;
//   declare name: string;
//   declare createdAt: CreationOptional<Date>;
//   declare updatedAt: CreationOptional<Date>;
// }

// Subscribtion.init(
//   {
//     id: {
//       type: DataTypes.INTEGER.UNSIGNED,
//       autoIncrement: true,
//       primaryKey: true
//     },
//     name: {
//       type: new DataTypes.STRING(128),
//       allowNull: false
//     },
//     createdAt: DataTypes.DATE,
//     updatedAt: DataTypes.DATE,
//   },
//   {
//     tableName: 'subscribtions',
//     sequelize
//   }
// );
// User.hasMany(Subscribtion, {
//   sourceKey: 'id',
//   foreignKey: 'userId',
// });

// Subscribtion.belongsTo(User, { targetKey: 'id', foreignKey: 'userId' });

// Service.hasMany(Subscribtion, {
//   sourceKey: 'id',
//   foreignKey: 'serviceId',
// });

// Subscribtion.belongsTo(Service, { targetKey: 'id', foreignKey: 'serviceId' });


// (async () => {
//   await sequelize.sync({ force: true });
//   // await doStuffWithUser();
//   // User.create({ name: 'oday', preferredName: 'blabla' });
// })();
// console.log('worked?');
// import { db } from 'src/data/database/models/index';
// console.log(db.models);

// abstract class A {
//   public abstract calculateArea(): string
//   public static doStatic(): string {
//     return 'Static done'
//   }
// }

// class B {
//   logName() {
//     return 'B'
//   }
// }

// class C extends B implements A {
//   public calculateArea() {
//     return 'c:bla bla';
//   }
//   public static doStatic(): string {
//     return 'c:Static done'
//   }
//   static do() {

//   }
// }

// class D extends B implements A {
//   public calculateArea() {
//     return 'd:bla bla';
//   }
//   public static doStatic(): string {
//     return 'd:Static done'
//   }
//   static do() {

//   }
// }

// const l:A[] = [new D(), new C()]

// l.forEach((a)=>A.doStatic);

// const map: Map<string, A> = new Map()
// map['C'] = C
// map['D'] = D

// const c: C = map['C'] as C
// console.log(map['C'].doStatic())

// const cd: D = map['C'] as D
// console.log(D.doStatic())

// const c: C = new C();
// c.calculateArea()

// const a: A = new C();
// A.doStatic()
// console.log(a.calculateArea());

// const sequelize = new Sequelize("test3", "postgres", "uzumymw123A@", { dialect: "postgres", host: "localhost" });
// Branch.initialize(sequelize);


//DatabaseConnection.connect(() => {
// addServiceProvider({ user: 1, serviceProviderParams: 'smart-soft', branchesParams: ['smart-soft-b1', 'smart-soft-b2'] })
// addServiceProvider({ user: 2, serviceProviderParams: 'hm-elec-sol', branchesParams: ['hm-elec-sol-b1', 'hm-elec-sol-b2', 'hm-elec-sol-b3'] })
// // bootstrap()
// getBranchUsers({ branch: 3, callBack: () => { } })
// getServiceProviders({ callBack: () => { } })
// getBranches({ serviceProvider: 2, callBack: () => { } })
// addServiceProvider({ user: 4, serviceProviderParams: 'hm-elec-sol', branchesParams: ['hm-elec-sol-b1', 'hm-elec-sol-b2', 'hm-elec-sol-b3'] })
// addUsersToAllBranches({ users: [3, 4], serviceProvider: 1 })
// removeUsersFromAllBranches({users:[3, 5]})
// removeUsersFromSomeBranches({ users: [5], branches: [4] })
// addUsersToSomeBranches({ users: [5], branches: [3, 4] })
// createUser({ userName: 'oday' })
// subscribe({user: 7, serviceProvider:1, callBack: ()=>{}})
// updateSubscribtion({ user: 8, serviceProvider: 1, subscribtionParam: 'all', callBack: () => { } })
// unsubscribe({ user: 7, serviceProvider: 1, callBack: () => { } })
// getUserSubscribtions({ user: 8, callBack: () => { } })
// getUserServiceProviders({ user: 2, callBack: () => { } })
// addService({ user: 1, branch: 1, serviceParams: 'smart-b1-serv-1', callBack: () => { } })
// updateService({ user: 4, service: 2, serviceParams: 'smart-b1-serv-2-update', callBack: () => { } })
// deleteService({ service: 1, callBack: () => { } })
// getServices({ branch: 2, callBack: () => { } })
// addProduct({ user: 1, branch: 1, productParams: 'smart-b1-prod-1', callBack: () => { } })
// addComment({ commentParams: 'hi', user: 1, service: 3, callBack: () => { }, post: null, serviceProvider: 1 })
// updateComment({ comment: 2, commentParams: 'hi, pro', callBack: () => { }, })
// addReplay({ replyParams: 'hi', user: 2, serviceProvider: 2, comment: 2, callBack: () => { } })
// getReplies({ comment: 2, callBack: () => { } })
// addOrder({ user: 8, orderParams: 'my order', services: [4, 5, 6], products: null, callBack: () => { } }
// getOrders({ user: 8, callBack: () => { } })
// getItems({ order: 1, callBack: () => { } })
// updateOrder({ order: 1, orderParams: 'my order update 2', services: null, products: null, callBack: () => { } })
//})
import { Op } from 'sequelize';
import { AppModule } from './app.module';
// import { DatabaseConnection } from './data/database/connection/database_connention';
// import { Database } from './data/database/database';
import { ModelsName } from './data/database/helpers/constants';
import { Branch } from './data/database/models/branch';
import { Comment } from './data/database/models/comment';
import { Order } from './data/database/models/order';
import { OrderItem } from './data/database/models/order_item';
import { Post } from './data/database/models/post';
import { Product } from './data/database/models/products';
import { Reaction } from './data/database/models/reaction';
import { Reply } from './data/database/models/reply';
import { Service } from './data/database/models/service';
import { ServiceProvider } from './data/database/models/service_provider';
import { Subscribtion } from './data/database/models/subscribtion';
import { User } from './data/database/models/user';
import { UserBranch } from './data/database/models/user_branch';
import { throwable, getTypedError } from 'ts-throwable';

abstract class QueryData {
  constructor(coreInfo: string) {
    this.coreInfo = coreInfo;
  }
  coreInfo: string;
}

class PostQueryData extends QueryData {
  constructor(postName: string, reactionsNumber: number, coreInfo: string) {
    super(coreInfo)
    this.postName = postName;
    this.reactionsNumber = reactionsNumber;
  }
  postName: string;
  reactionsNumber: number;
}

class ProductQueryData extends QueryData {
  constructor(productName: string, productPrice: number, coreInfo: string) {
    super(coreInfo)
    this.productName = productName;
    this.productPrice = productPrice;
  }
  productName: string;
  productPrice: number;
}

class QueryParam<Data extends QueryData> {

  constructor(queryData: Data, prevInfo: string, user: string) {
    this.queryData = queryData;
    this.prevInfo = prevInfo;
    this.user = user
  }

  queryData: Data;
  prevInfo: string;
  user: string;
}

abstract class ResponseData {
  constructor(coreInfo: string) {
    this.coreInfo = coreInfo;
  }
  coreInfo: string;
}

class PostResponseData extends ResponseData {
  constructor(postBody: string, reactionsNumber: number, coreInfo: string) {
    super(coreInfo);
    this.postBody = postBody;
    this.reactionsNumber = reactionsNumber;
  }
  postBody: string;
  reactionsNumber: number;
}

class ProductResponseData extends ResponseData {
  constructor(productBody: string, productPrice: number, coreInfo: string) {
    super(coreInfo);
    this.productBody = productBody;
    this.productPrice = productPrice;
  }
  productBody: string;
  productPrice: number;
}

class ResponseParam<Data extends ResponseData> {
  constructor(bodyData: Data) {
    this.bodyData = bodyData;
  }
  bodyData: Data;
}

class Error1 extends Error {

}

class Error2 extends Error {

}

class Error3 extends Error {

}

abstract class Validator {
  abstract validatePosts(options: { params: QueryParam<PostQueryData>, excute: (options: { params: QueryParam<PostQueryData> }) => Promise<ResponseParam<PostResponseData>> }): Promise<ResponseParam<PostResponseData>> & throwable<Error1>
  abstract validateProducts<Q extends QueryData, R extends ResponseData>(options: { params: QueryParam<Q>, excute: (options: { params: QueryParam<Q> }) => Promise<ResponseParam<R>> }): Promise<ResponseParam<R>> & throwable<Error2 | Error3>
}

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

class MyValidator implements Validator {
  validatePosts(options: {
    params: QueryParam<
      PostQueryData>; excute: (options: { params: QueryParam<PostQueryData>; }) => Promise<ResponseParam<PostResponseData>>;
  }): Promise<ResponseParam<PostResponseData>> & throwable<Error1> {
    return new Promise(async (resolve, reject) => {
      await sleep(1000)
      if (options.params.queryData.reactionsNumber == 4) {
        // return await this.validateProducts<PostQueryData, PostResponseData>({ params: options.params, excute: options.excute });
        return await options.excute({ params: options.params });
      }
      else throw new Error1('you are not good to go since reaction numbers not 4');
    });
  }
  validateProducts<Q extends QueryData, R extends ResponseData>(options: { params: QueryParam<Q>; excute: (options: { params: QueryParam<Q>; }) => Promise<ResponseParam<R>>; }): Promise<ResponseParam<R>> & throwable<Error2 | Error3> {
    return new Promise(async (resolve, reject) => {
      try {
        // if (options.params.queryData instanceof PostQueryData) {
        //   let ex: PostQueryData = options.params.queryData as PostQueryData;
        // }
        if (options.params.queryData instanceof PostQueryData && options.params.queryData.postName == "oday's post") {

          await sleep(3000);
          // return await this.validatePosts({ params: options.params, excute: options.excute });
          return await options.excute({ params: options.params });
        }
        if (options.params.queryData instanceof ProductQueryData && options.params.queryData.productName == "andomi") {
          return await options.excute({ params: options.params });
        }
        else reject('not valid products');
      } catch (err) {
        reject(err);
      }
    });
  }
}

// let leafFunction1: (options: { params: QueryParam<PostQueryData>; }) => Promise<ResponseParam<PostResponseData>> = (options: { params: QueryParam<PostQueryData> }) => {
//   return new Promise(async (resolve, reject) => {
//     let user: User = await Database.getInstance().models[ModelsName.USERS].create({ name: options.params.user, firstName: null, lastName: '_' });
//     return new ResponseParam<PostResponseData>(new PostResponseData(user.name, 5, 'core response'));
//   });
// };

// let leafFunction2: (options: { params: QueryParam<ProductQueryData>; }) => Promise<ResponseParam<ProductResponseData>> = (options: { params: QueryParam<ProductQueryData> }) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let user: User = await Database.getInstance().models[ModelsName.USERS].create({ name: options.params.user, firstName: null, lastName: '_' });
//       return new ResponseParam<ProductResponseData>(new ProductResponseData(user.name, 5, 'core response'));
//     } catch (err) {
//       reject(err);
//     }
//   });
// };

// (async () => {
//   let validator: MyValidator = new MyValidator();
//   let params1: QueryParam<PostQueryData> = new QueryParam<PostQueryData>(new PostQueryData("oday's post", 4, 'core'), '0110', 'nono');
//   let params2: QueryParam<ProductQueryData> = new QueryParam<ProductQueryData>(new ProductQueryData('andomi', 10, 'core'), '0110', 'dodo2');
//   // let res: ResponseParam<PostResponseData> = await validator.validateProducts<PostQueryData, PostResponseData>({ params: params1, excute: leafFunction1 });
//   try {
//     let res: ResponseParam<ProductResponseData> = await validator.validateProducts<ProductQueryData, ProductResponseData>({ params: params2, excute: leafFunction2 });
//     console.log(res);
//   } catch (err) {
//     console.log('_____________________error');
//   } finally {
//     console.log('____________________');
//   }
// })()

// const createUser = async ({ userName }) => {
//   try {
//     await Database.getInstance().models[ModelsName.USERS].create({ name: userName, firstName: null, lastName: '_' });
//     // User.create({ name: userName, firstName: '_', lastName: '_' });
//     // await sleep(2000);
//   } catch (err) {
//     console.log('_________________-' + err)
//   }
// }

// createUser({ userName: 'lolo' })


// import { throwable, getTypedError } from 'ts-throwable';
// class CustomError extends Error { /*...*/ }

// function brokenMethod(): number & throwable<CustomError> {
//     if (Math.random() < 0.5) { return 42 };
//     throw new CustomError("Boom!");
// }
// try {
//     const answer: number = brokenMethod()
// }
// catch(error){
//     // `typedError` is now an alias of `error` and typed as `CustomError`
//     const typedError = getTypedError(error, brokenMethod);
// }




// abstract class QueryData {
//   constructor(coreInfo: string) {
//     this.coreInfo = coreInfo;
//   }
//   coreInfo: string;
// }

// class PostQueryData extends QueryData {
//   constructor(postName: string, reactionsNumber: number, coreInfo: string) {
//     super(coreInfo)
//     this.postName = postName;
//     this.reactionsNumber = reactionsNumber;
//   }
//   postName: string;
//   reactionsNumber: number;
// }

// class ProductQueryData extends QueryData {
//   constructor(productName: string, productPrice: number, coreInfo: string) {
//     super(coreInfo)
//     this.productName = productName;
//     this.productPrice = productPrice;
//   }
//   productName: string;
//   productPrice: number;
// }

// class QueryParam<Data extends QueryData> {

//   constructor(queryData: Data, prevInfo: string, user: string) {
//     this.queryData = queryData;
//     this.prevInfo = prevInfo;
//     this.user = user
//   }

//   queryData: Data;
//   prevInfo: string;
//   user: string;
// }

// abstract class ResponseData {
//   constructor(coreInfo: string) {
//     this.coreInfo = coreInfo;
//   }
//   coreInfo: string;
// }

// class PostResponseData extends ResponseData {
//   constructor(postBody: string, reactionsNumber: number, coreInfo: string) {
//     super(coreInfo);
//     this.postBody = postBody;
//     this.reactionsNumber = reactionsNumber;
//   }
//   postBody: string;
//   reactionsNumber: number;
// }

// class ProductResponseData extends ResponseData {
//   constructor(productBody: string, productPrice: number, coreInfo: string) {
//     super(coreInfo);
//     this.productBody = productBody;
//     this.productPrice = productPrice;
//   }
//   productBody: string;
//   productPrice: number;
// }

// class ResponseParam<Data extends ResponseData> {
//   constructor(bodyData: Data) {
//     this.bodyData = bodyData;
//   }
//   bodyData: Data;
// }

// class Error1 extends Error {

// }

// class Error2 extends Error {

// }

// class Error3 extends Error {

// }


// abstract class Validations {
//   abstract validatePosts<Q extends QueryData>(options: { params: QueryParam<Q> }): Promise<void> & throwable<Error>
//   abstract validateProducts<Q extends QueryData>(options: { params: QueryParam<Q> }): Promise<void> & throwable<Error2 | Error3>
// }

// const sleep = (ms) => new Promise(r => setTimeout(r, ms));

// class MyValidations implements Validations {
//   validatePosts<Q extends QueryData>(options: { params: QueryParam<Q> }): Promise<void> & throwable<Error1> {
//     return new Promise(async (resolve, reject) => {
//       try {
//         await sleep(1000)
//         if (options.params.queryData instanceof PostQueryData) {
//           if (options.params.queryData.postName == 'hani') {
//             reject('posts from hani is not valid.')
//           }
//           else if (options.params.queryData.postName == ' mohammed') {
//             reject('posts from mohammed is not valid.')
//           } else resolve()
//         }
//         else reject('params type shoud be post for this validator.');
//       } catch (err) {
//         reject(err);
//       }
//     })
//   }
//   validateProducts<Q extends QueryData>(options: { params: QueryParam<Q> }): Promise<void> & throwable<Error1> {
//     return new Promise<void>(async (resolve, reject) => {
//       try {
//         await sleep(1000)
//         //temp
//         if (options.params.queryData instanceof ProductQueryData) {

//           if (options.params.queryData.productName == 'hani') {
//             reject('products from hani is not valid.')
//           }
//           else if (options.params.queryData.productName == ' mohammed') {
//             reject('products from mohammed is not valid.')
//           } else resolve()
//         }
//         else reject('params type shoud be products for this validator.');
//       } catch (err) {
//         reject(err);
//       }
//     });
//   }
// }

// abstract class ValivationsName {
//   public static readonly POST_VALIDATION: string = 'POST_VALIDATION';
//   public static readonly PRODUCT_VALIDATION: string = 'PRODUCT_VALIDATION';

//   public static readonly VALIDATIONS_LIST: string[] = [
//     ValivationsName.POST_VALIDATION,
//     ValivationsName.PRODUCT_VALIDATION,
//   ]
// }

// class Validator {

//   private myValidationMap: Map<string, <Q extends QueryData>(options: { params: QueryParam<Q> }) => Promise<void> & throwable<Error1 | Error2 | Error3>>/* union of validators errors*/;
//   validations: Validations;

//   constructor(validations: MyValidations) {
//     this.validations = validations;
//     this.myValidationMap = new Map<string, <Q extends QueryData>(options: { params: QueryParam<Q> }) => Promise<void> & throwable<Error1 | Error2 | Error3>>;
//     this.myValidationMap[ValivationsName.POST_VALIDATION] = validations.validatePosts;
//     this.myValidationMap[ValivationsName.PRODUCT_VALIDATION] = validations.validateProducts;
//   }

//   validate<Q extends QueryData, R extends ResponseData>(options: { params: QueryParam<Q>, validations: string[], excute: () => Promise<ResponseParam<R>> & throwable<Error> /* excutor errors*/ }): Promise<ResponseParam<R>> & throwable<Error> /* union of excutor and validators errors*/ {
//     return new Promise(async (_, reject) => {
//       try {
//         // await this.validations.validatePosts({ params: options.params });
//         for (let validation of options.validations)
//           await (this.myValidationMap[validation])({ params: options.params })
//         // await (this.myValidationMap[ValivationsName.POST_VALIDATION])({ params: options.params })
//         return await options.excute();
//       } catch (err) {
//         reject(err);
//       }
//     });
//   }

// }

// const createUser = async ({ userName }) => {
//   try {
//     await Database.getInstance().models[ModelsName.USERS].create({ name: userName, firstName: '_', lastName: '_' });
//     // User.create({ name: userName, firstName: '_', lastName: '_' });
//     // await sleep(2000);
//   } catch (err) {
//     console.log('_________________-' + err)
//   }
// }

// let leafFunction1: (options: { params: QueryParam<PostQueryData>; }) => Promise<ResponseParam<PostResponseData>> = (options: { params: QueryParam<PostQueryData> }) => {
//   return new Promise(async (_, reject) => {
//     try {
//       let user: User = await Database.getInstance().models[ModelsName.USERS].create({ name: options.params.user, firstName: null, lastName: '_' });
//       return new ResponseParam<PostResponseData>(new PostResponseData(user.name, 5, 'core response'));
//     } catch (err) {
//       reject(err);
//     }
//   });
// };

// let leafFunction2: (options: { params: QueryParam<ProductQueryData>; }) => Promise<ResponseParam<ProductResponseData>> = (options: { params: QueryParam<ProductQueryData> }) => {
//   return new Promise(async (_, reject) => {
//     try {
//       let user: User = await Database.getInstance().models[ModelsName.USERS].create({ name: options.params.user, firstName: null, lastName: '_' });
//       return new ResponseParam<ProductResponseData>(new ProductResponseData(user.name, 5, 'core response'));
//     } catch (err) {
//       reject(err);
//     }
//   });
// }
// (async () => {
//   try {
//     let params1: QueryParam<PostQueryData> = new QueryParam<PostQueryData>(new PostQueryData("hno", 4, 'core'), '0110', 'meme');
//     let params2: QueryParam<ProductQueryData> = new QueryParam<ProductQueryData>(new ProductQueryData('andomi', 10, 'core'), '0110', 'meme');
//     let validator: Validator = new Validator(new MyValidations() /* shuold be injected */)
//     await validator.validate({
//       params: params1, validations: [ValivationsName.POST_VALIDATION, ValivationsName.PRODUCT_VALIDATION], excute: () => {
//         return new Promise<ResponseParam<PostResponseData>>(async (_, reject) => {
//           try {
//             let user: User = await Database.getInstance().models[ModelsName.USERS].create({ name: params1.user, firstName: '_', lastName: '_' });
//             return new ResponseParam<PostResponseData>(new PostResponseData(user.name, 5, 'core response'));
//           } catch (err) {
//             reject(err);
//           }
//         })
//       }
//     })
//   } catch (err) {
//     console.log('_____________________error');
//   } finally {
//     console.log('____________________');
//   }
// })()





// _____________________________________________________________________________________________________________________








// const addServiceProvider = ({ user, serviceProviderParams, branchesParams }) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const serviceProvider = await ServiceProvider.create({ name: serviceProviderParams });
//       var newBranchesParams = [];
//       for (var i = 0; i < branchesParams.length; i++) {
//         newBranchesParams.push({
//           serviceProviderId: serviceProvider.id,
//           name: branchesParams[i]
//         });
//       }
//       await UserServiceProviderRole.create({ userId: user, serviceProviderId: serviceProvider.id, role: 'master' })
//       const branches = await Branch.bulkCreate(newBranchesParams)
//       var userBranches = [];
//       for (var i = 0; i < branches.length; i++) {
//         userBranches.push({
//           name: 'arbit',
//           userId: user,
//           branchId: branches[i].id
//         })
//       }
//       await UserBranch.bulkCreate(userBranches)
//       resolve(true)
//     } catch (err) {
//       reject(err)
//     }
//   })
// }

// const addUsersToSomeBranches = async ({ users, branches }) => {
//   var userBranches = [];
//   // data prepare
//   for (var i = 0; i < users.length; i++) {
//     for (var j = 0; j < branches.length; j++) {
//       userBranches.push({
//         name: 'arbit',
//         userId: users[i],
//         branchId: branches[j]
//       })
//     }
//   }
//   UserBranch.bulkCreate(userBranches).then(function (item) {
//     // to do
//   }).catch(function (err) {
//     console.log(err);
//   });
// }

// const getServiceProviders = () => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let res = await ServiceProvider.findAll()
//       console.log('_____________________' + res.map((serviceProvider) => serviceProvider.name))
//       resolve(true)
//     } catch (err) {
//       reject(err)
//     }
//   })
// }


// // sender should not be pending , and no duplications with same state
// const addHiringRequest = ({ user, serviceProvider }) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let res = await HiringRequest.create({ userId: user, serviceProviderId: serviceProvider, name: 'pending' })
//       console.log('_____________________' + res)
//       resolve(true)
//     } catch (err) {
//       reject(err)
//     }
//   })
// }


// // validator: shuold not be accepted
// const rejectHiringRequest = ({ hiringRequest }) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let res = await HiringRequest.update({ name: 'rejected' }, { where: { id: hiringRequest } })
//       console.log('_____________________' + res)
//       resolve(true)
//     } catch (err) {
//       reject(err)
//     }
//   })
// }

// // user how send it can do that
// const cancelHiringRequest = ({ hiringRequest }) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let res = await HiringRequest.destroy({ where: { id: hiringRequest } })
//       console.log('_____________________' + res)
//       resolve(true)
//     } catch (err) {
//       reject(err)
//     }
//   })
// }

// // validator: shuold not be already accepted
// const acceptHiringRequest = ({ hiringRequest }) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let res = await HiringRequest.update({ name: 'accepted' }, { where: { id: hiringRequest } })
//       console.log('_____________________' + res)
//       resolve(true)
//     } catch (err) {
//       reject(err)
//     }
//   })
// }

// const getUserHiringRequests = ({ user }) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let res = await HiringRequest.findAll({ where: { userId: user } })
//       console.log('_____________________' + res.map((res) => res.serviceProviderId))
//       resolve(true)
//     } catch (err) {
//       reject(err)
//     }
//   })
// }

// const getPendingServiceProvidertHiringRequest = ({ serviceProvider }) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let res = await HiringRequest.findAll({ where: { serviceProviderId: serviceProvider, name: 'pending' } })
//       console.log('_____________________' + res.map((res) => res.id + '- user : ' + res.userId))
//       resolve(true)
//     } catch (err) {
//       reject(err)
//     }
//   })
// }

// // should be master or sub master / should the users bing added in pending hiring requests 
// const addNewUsersToBranch = ({ users, branch, serviceProviderId }) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let userBranches = []
//       let userServiceProviderRoles = []
//       for (var i = 0; i < users.length; i++) {
//         userBranches.push({
//           branchId: branch,
//           userId: users[i],
//           name: 'arbit'
//         });
//         userServiceProviderRoles.push({
//           serviceProviderId: serviceProviderId,
//           userId: users[i],
//           name: 'blank'
//         });
//       }
//       await HiringRequest.update({ name: 'accepted' }, { where: { userId: users, serviceProviderId: serviceProviderId } })
//       await UserServiceProviderRole.bulkCreate(userServiceProviderRoles)
//       await UserBranch.bulkCreate(userBranches)
//       resolve(true)
//     } catch (err) {
//       reject(err)
//     }
//   })
// }


// // no data source for this since it is getBranches with its user entities
// // edit: still, should have a data source
// const getUserBranches = ({ serviceProvider }) => {
//   return new Promise<Object[]>(async (resolve, reject) => {
//     try {
//       let branches = await Branch.findAll({ where: { serviceProviderId: serviceProvider } })
//       console.log('_____________________' + branches);
//       let branchesWithItsUsers = []
//       for (var i = 0; i < branches.length; i++) {
//         let userBranches = await UserBranch.findAll({ where: { branchId: branches[i].id } })
//         let users = []
//         for (var j = 0; j < userBranches.length; j++) {
//           users.push(userBranches[j].userId)
//         }
//         branchesWithItsUsers.push({ users: users, branch: branches[i].id })
//       }
//       console.log('____________' + branchesWithItsUsers.map((r) => 'branch: ' + r.branch + ', users: ' + r.users))
//       resolve(branchesWithItsUsers)
//     } catch (err) {
//       reject(err)
//     }
//   })
// }

// // we need user (as always), and service provider for validating if user is master and master on the service provider
// // of this branches 
// const addExistedUsersToBranch = ({ usersWithBranches }) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let userBranches = []
//       for (var i = 0; i < usersWithBranches.sourceBranches.length; i++) {
//         for (var j = 0; j < usersWithBranches.sourceBranches[i].users.length; j++) {
//           userBranches.push({
//             branchId: usersWithBranches.targetBranch,
//             userId: usersWithBranches.sourceBranches[i].users[j],
//             name: 'arbit'
//           });
//         }
//       }
//       let res = await UserBranch.bulkCreate(userBranches)
//       console.log('_____________________' + res);
//       resolve(true)
//     } catch (err) {
//       reject(err)
//     }
//   })
// }

// const removeExistedUsersFromBranch = ({ usersWithBranches }) => {
//   return new Promise(async (resolve, reject) => {
//     try {

//       for (var i = 0; i < usersWithBranches.sourceBranches.length; i++) {
//         // let users = []
//         // for (var j = 0; j < usersWithBranches.sourceBranches[i].users.length; j++) {
//         //   users.push(
//         //     usersWithBranches.sourceBranches[i].users[j]
//         //   );
//         // }
//         await UserBranch.destroy({ where: { userId: usersWithBranches.sourceBranches[i].users, branchId: usersWithBranches.sourceBranches[i].branch } })
//         let permissionGroups = await PermissionGroup.findAll({ where: { branchId: usersWithBranches.sourceBranches[i].branch } })
//         await Permission.destroy({ where: { userId: usersWithBranches.sourceBranches[i].users, permissionGroupId: permissionGroups.map((permissionGroup) => permissionGroup.id) } })
//         // we also need to observe weither user is no longer belong to any branch so we can also remove him from roles, which make him out of whole service provider 
//       }

//       resolve(true)
//     } catch (err) {
//       reject(err)
//     }
//   })
// }

// const transferExistedUsersToBranch = ({ usersWithBranches }) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       await removeExistedUsersFromBranch({ usersWithBranches: usersWithBranches })
//       await addExistedUsersToBranch({ usersWithBranches: usersWithBranches })
//       resolve(true)
//     } catch (err) {
//       reject(err)
//     }
//   })
// }

// const removeUsersFromServiceProvider = ({ users, serviceProvider }) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let branches = await Branch.findAll({ where: { serviceProviderId: serviceProvider } })
//       await UserBranch.destroy({ where: { userId: users, branchId: branches.map((branch) => branch.id) } })
//       await UserServiceProviderRole.destroy({ where: { userId: users, serviceProviderId: serviceProvider } })
//       let permissionGroups = await PermissionGroup.findAll({ where: { branchId: branches.map((branch) => branch.id) } })
//       await Permission.destroy({ where: { userId: users, permissionGroupId: permissionGroups.map((PermissionGroup) => PermissionGroup.id) } })
//       // remove his accepted hiring request,so that he can send new one
//       resolve(true)
//     } catch (err) {
//       reject(err)
//     }
//   })

// }

// const addSubMasterUser = ({ user, serviceProvider }) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       await UserServiceProviderRole.update({ role: 'sub-master' }, { where: { userId: user, serviceProviderId: serviceProvider } })
//       resolve(true)
//     } catch (err) {
//       reject(err)
//     }
//   })
// }

// const removeSubMasterUser = ({ user, serviceProvider }) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       await UserServiceProviderRole.update({ role: 'blank' }, { where: { userId: user, serviceProviderId: serviceProvider } })
//       resolve(true)
//     } catch (err) {
//       reject(err)
//     }
//   })
// }

// const addService = async ({ user, branch, serviceParams }) => {
//   Service.create({
//     name: serviceParams,
//     branchId: branch,
//     userId: user
//   }).then(function (res) {
//     console.log('_____________________---' + res);
//   }).catch(function (err) {
//     console.log(err);
//   });
// }


// const updateService = async ({ user, service, serviceParams, callBack }) => {
//   Service.update({
//     name: serviceParams,
//     userId: user,      // because we keep track of identity of last user who update post
//   }, {
//     where: {
//       id: service
//     }
//   }).then(function (res) {
//     console.log('_____________________---' + res);
//     callBack(res);
//   }).catch(function (err) {
//     console.log(err);
//   });
// }

// const deleteService = async ({ service, callBack }) => {
//   Service.destroy({
//     where: {
//       id: service
//     }
//   }).then(function (res) {
//     console.log('_____________________---' + res);
//     callBack(res);
//   }).catch(function (err) {
//     console.log(err);
//   });
// }

// const getServices = async ({ branch, callBack }) => {
//   Service.findAll({
//     where: {
//       branchId: branch
//     }
//   }).then(function (res) {
//     console.log('_____________________---' + res.map((data) => data.name));
//     callBack(res);
//   }).catch(function (err) {
//     console.log(err);
//   });
// }

// const getServicesWithPermissions = async ({ branch, user }) => {
//   let services = await Service.findAll({
//     where: {
//       branchId: branch
//     }
//   });
//   let branchGroups = await PermissionGroup.findAll({ where: { branchId: branch } })
//   let servicePermissions = await Permission.findAll({ where: { serviceId: { [Op.not]: null }, userId: user, permissionGroupId: branchGroups.map((permissionGroup) => permissionGroup.id) } })
//   let branchServicesWithPermissions = []
//   for (var i = 0; i < services.length; i++) {
//     let actionList = [];
//     for (var j = 0; j < servicePermissions.length; j++) {
//       if (servicePermissions[j].serviceId == services[i].id) {
//         actionList.push(servicePermissions[j].actions)
//       }
//     }
//     branchServicesWithPermissions.push({
//       name: services[i].name,
//       branchId: services[i].branchId,
//       actionList: actionList
//     })
//   }
// }

// const addProduct = async ({ user, branch, productParams }) => {
//   Product.create({
//     name: productParams,
//     branchId: branch,
//     userId: user
//   }).then(function (res) {
//     console.log('_____________________---' + res);
//   }).catch(function (err) {
//     console.log(err);
//   });
// }

// const updateProduct = async ({ user, product, productParams, callBack }) => {
//   Product.update({
//     name: productParams,
//     userId: user,      // because we keep track of identity of last user who update post
//   }, {
//     where: {
//       id: product
//     }
//   }).then(function (res) {
//     console.log('_____________________---' + res);
//     callBack(res);
//   }).catch(function (err) {
//     console.log(err);
//   });
// }

// const deleteProduct = async ({ product, callBack }) => {
//   Product.destroy({
//     where: {
//       id: product
//     }
//   }).then(function (res) {
//     console.log('_____________________---' + res);
//     callBack(res);
//   }).catch(function (err) {
//     console.log(err);
//   });
// }

// const getProducts = async ({ branch, callBack }) => {
//   Product.findAll({
//     where: {
//       branchId: branch
//     }
//   }).then(function (res) {
//     console.log('_____________________---' + res.map((data) => data.name));
//     callBack(res);
//   }).catch(function (err) {
//     console.log(err);
//   });
// }

// const getProductsWithPermissions = async ({ branch, user }) => {
//   let products = await Product.findAll({
//     where: {
//       branchId: branch
//     }
//   });
//   let branchGroups = await PermissionGroup.findAll({ where: { branchId: branch } })
//   let productPermissions = await Permission.findAll({ where: { productId: { [Op.not]: null }, userId: user, permissionGroupId: branchGroups.map((permissionGroup) => permissionGroup.id) } })
//   let branchProductsWithPermissions = []
//   for (var i = 0; i < products.length; i++) {
//     let actionList = [];
//     for (var j = 0; j < productPermissions.length; j++) {
//       if (productPermissions[j].productId == products[i].id) {
//         actionList.push(productPermissions[j].actions)
//       }
//     }
//     branchProductsWithPermissions.push({
//       name: products[i].name,
//       branchId: products[i].branchId,
//       actionList: actionList
//     })
//   }
// }

// const addPost = async ({ user, branch, postParams }) => {
//   Post.create({
//     name: postParams,
//     branchId: branch,
//     userId: user
//   }).then(function (res) {
//     console.log('_____________________---' + res);
//   }).catch(function (err) {
//     console.log(err);
//   });
// }

// const updatePost = async ({ user, post, postParams, callBack }) => {
//   Post.update({
//     name: postParams,
//     userId: user,      // because we keep track of identity of last user who update post
//   }, {
//     where: {
//       id: post
//     }
//   }).then(function (res) {
//     console.log('_____________________---' + res);
//     callBack(res);
//   }).catch(function (err) {
//     console.log(err);
//   });
// }

// const deletePost = async ({ post, callBack }) => {
//   Post.destroy({
//     where: {
//       id: post
//     }
//   }).then(function (res) {
//     console.log('_____________________---' + res);
//     callBack(res);
//   }).catch(function (err) {
//     console.log(err);
//   });
// }

// const getPosts = async ({ branch, callBack }) => {
//   Post.findAll({ where: { branchId: branch } }).then(function (res) {
//     console.log('_____________________---' + res.map((data) => data.name));
//     callBack(res);
//   }).catch(function (err) {
//     console.log(err);
//   });
// }

// const getPostsWithPermissions = async ({ branch, user }) => {
//   let posts = await Post.findAll({
//     where: {
//       branchId: branch
//     }
//   });
//   let branchGroups = await PermissionGroup.findAll({ where: { branchId: branch } })
//   let postPermissions = await Permission.findAll({ where: { postId: { [Op.not]: null }, userId: user, permissionGroupId: branchGroups.map((permissionGroup) => permissionGroup.id) } })
//   let branchPostsWithPermissions = []
//   for (var i = 0; i < posts.length; i++) {
//     let actionList = [];
//     for (var j = 0; j < postPermissions.length; j++) {
//       if (postPermissions[j].postId == posts[i].id) {
//         actionList.push(postPermissions[j].actions)
//       }
//     }
//     branchPostsWithPermissions.push({
//       name: posts[i].name,
//       branchId: posts[i].branchId,
//       actionList: actionList
//     })
//   }
// }

// const createPermissionGroup = ({ users, posts, services, products, actions, permissionGroupParams, branch }) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let permissionGroup = await PermissionGroup.create({ name: permissionGroupParams, branchId: branch })
//       let permissions = []
//       if (posts)
//         for (var i = 0; i < posts.length; i++) {
//           for (var j = 0; j < users.length; j++) {
//             permissions.push({
//               name: 'arbit',
//               postId: posts[i],
//               userId: users[j],
//               permissionGroupId: permissionGroup.id,
//               actions: actions
//             })
//           }
//         }
//       if (services)
//         for (var i = 0; i < services.length; i++) {
//           for (var j = 0; j < users.length; j++) {
//             permissions.push({
//               name: 'arbit',
//               serviceId: services[i],
//               userId: users[j],
//               permissionGroupId: permissionGroup.id,
//               actions: actions
//             })
//           }
//         }
//       if (products)
//         for (var i = 0; i < products.length; i++) {
//           for (var j = 0; j < users.length; j++) {
//             permissions.push({
//               name: 'arbit',
//               productId: products[i],
//               userId: users[j],
//               permissionGroupId: permissionGroup.id,
//               actions: actions
//             })
//           }
//         }

//       await Permission.bulkCreate(permissions)
//       resolve(true)
//     } catch (err) {
//       reject(err)
//     }
//   })
// }

// const updatePermissionGroup = ({ users, posts, services, products, actions, permissionGroupParams, permissionGroup }) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       if (permissionGroupParams)
//         await PermissionGroup.update({ name: permissionGroupParams }, { where: { id: permissionGroup } })
//       if (users && (posts || services || products)) {
//         await Permission.destroy({ where: { permissionGroupId: permissionGroup } })

//         let permissions = []
//         if (posts)
//           for (var i = 0; i < posts.length; i++) {
//             for (var j = 0; j < users.length; j++) {
//               permissions.push({
//                 name: 'arbit',
//                 postId: posts[i],
//                 userId: users[j],
//                 permissionGroupId: permissionGroup,
//                 actions: actions
//               })
//             }
//           }
//         if (services)
//           for (var i = 0; i < services.length; i++) {
//             for (var j = 0; j < users.length; j++) {
//               permissions.push({
//                 name: 'arbit',
//                 serviceId: services[i],
//                 userId: users[j],
//                 permissionGroupId: permissionGroup,
//                 actions: actions
//               })
//             }
//           }
//         if (products)
//           for (var i = 0; i < products.length; i++) {
//             for (var j = 0; j < users.length; j++) {
//               permissions.push({
//                 name: 'arbit',
//                 productId: products[i],
//                 userId: users[j],
//                 permissionGroupId: permissionGroup,
//                 actions: actions
//               })
//             }
//           }
//         await Permission.bulkCreate(permissions)
//       }
//       resolve(true)
//     } catch (err) {
//       reject(err)
//     }
//   })
// }

// const deletePermissionGroup = ({ permissionGroup }) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       await PermissionGroup.destroy({ where: { id: permissionGroup } })
//       await Permission.destroy({ where: { permissionGroupId: permissionGroup } })
//       resolve(true)
//     } catch (err) {
//       reject(err)
//     }
//   })
// }

// // validators:

// class Validators {

//   isMasterOrSubmaster({ userId, serviceProviderId }): Promise<boolean> {
//     return new Promise(async (resolve, reject) => {
//       let role = await UserServiceProviderRole.findOne({ where: { userId: userId, serviceProviderId: serviceProviderId, role: ['master', 'sub-master'] } })
//       resolve(role ? true : false)
//     });
//   }
//   // there is need to differentiat between master and sub-master, ex: when sub-master trying to remove master
//   isMaster({ userId, serviceProviderId }): Promise<boolean> {
//     return new Promise(async (resolve, reject) => {
//       let role = await UserServiceProviderRole.findOne({ where: { userId: userId, serviceProviderId: serviceProviderId, role: ['master'] } })
//       resolve(role ? true : false)
//     });
//   }

//   isTargetUserBranchesIsSeparatedFromSourceUserBranches({ usersWithBranches }): Promise<number[]> {
//     return new Promise(async (resolve, reject) => {
//       let users = []
//       for (var i = 0; i < usersWithBranches.sourceBranch.length; i++) {
//         for (var j = 0; j < usersWithBranches.sourceBranches[i].users.length; j++) {
//           users.push(
//             usersWithBranches.sourceBranch[i].users[j]
//           );
//         }
//       }
//       let targetUsers = await UserBranch.findAll({ where: { branchId: usersWithBranches.targetBranch } })
//       let commonUsers = targetUsers.map((user) => user.id).filter((element, index, array) => users.includes(element))
//       resolve(commonUsers)
//     });
//   }

//   isSourceUserBranchesCorrect({ usersWithBranches }): Promise<number[]> {
//     return new Promise(async (resolve, reject) => {
//       let sneakingUsers = []
//       for (var i = 0; i < usersWithBranches.sourceBranch.length; i++) {
//         for (var j = 0; j < usersWithBranches.sourceBranches[i].users.length; j++) {
//           let res = await UserBranch.findOne({
//             where: {
//               userId: usersWithBranches.sourceBranches[i].users[j],
//               branchId: usersWithBranches.sourceBranches[i].branch
//             }
//           })
//           if (!res)
//             sneakingUsers.push(usersWithBranches.sourceBranches[i].users[j])
//         }
//       }
//       resolve(sneakingUsers)
//     });
//   }

//   doesUserWorkInServiceProvider({ user, serviceProvider }): Promise<number[]> {
//     return new Promise(async (resolve, reject) => {
//       let branches = await Branch.findAll({ where: { serviceProviderId: serviceProvider } })
//       let res = await UserBranch.findAll({ where: { userId: user, branchId: branches.map((branch) => branch.id) } })
//       resolve(res.map((userBranch) => userBranch.id))
//     });
//   }


//   // when creating / updating PG
//   isUsersAndResourcesCorrect({ users, resources, branchId }): Promise<any> {
//     return new Promise(async (resolve, reject) => {
//       let sneakingData = { users: [], posts: [], products: [], services: [] }
//       for (var i = 0; i < users.length; i++) {
//         let res = await UserBranch.findOne({ where: { userId: users[i], branchId: branchId } })
//         if (!res)
//           sneakingData.users.push(users[i])
//       }
//       for (var i = 0; i < resources.posts.length; i++) {
//         let res = await Post.findOne({ where: { id: resources.posts[i], branchId: branchId } })
//         if (!res)
//           sneakingData.posts.push(users[i])
//       }
//       for (var i = 0; i < resources.servcies.length; i++) {
//         let res = await Service.findOne({ where: { id: resources.servcies[i], branchId: branchId } })
//         if (!res)
//           sneakingData.services.push(users[i])
//       }
//       for (var i = 0; i < resources.products.length; i++) {
//         let res = await Product.findOne({ where: { id: resources.products[i], branchId: branchId } })
//         if (!res)
//           sneakingData.products.push(users[i])
//       }
//       resolve(sneakingData)
//     });
//   }

//   isTheOnlyMasterInServiceProvider({ user, serviceProvider }): Promise<number> {
//     return new Promise(async (resolve, reject) => {
//       let res = await UserServiceProviderRole.findAll({ where: { role: ['master', 'sub-master'], serviceProviderId: serviceProvider } })
//       resolve(res.length)
//     });
//   }

//   isHiringRequestAccepted({ hiringRequest }): Promise<boolean> {
//     return new Promise(async (resolve, reject) => {
//       let res = await HiringRequest.findOne({ where: { id: hiringRequest } })
//       resolve(res.name == 'accepted' ? true : false)                                        // check here if we should use === instead
//     });
//   }

//   doesUsersHavePendingHiringRequest({ users, serviceProvider }): Promise<number[]> {
//     return new Promise(async (resolve, reject) => {
//       let notPendingUsers = []
//       for (var i = 0; i < users.length; i++) {
//         let res = await HiringRequest.findOne({ where: { userId: users[i], serviceProviderId: serviceProvider, name: 'pending' } })
//         if (res)
//           notPendingUsers.push(users[i])
//       }
//       resolve(notPendingUsers)
//     });
//   }

//   // to be able to add a new resource to branch, user should have <ADD> permission on AT LEAST ONE group of that branch groups.
//   canUserDoAction({ user, actions, service, branch }): Promise<boolean> {
//     return new Promise(async (resolve, reject) => {
//       if (actions.charAt(0) == '1') {
//         let permissionGroups = await PermissionGroup.findAll({ where: { branchId: branch } })
//         let permissions = await Permission.findAll({ where: { userId: user, permissionGroupId: permissionGroups.map((permissionGroup) => permissionGroup.id) } })
//         if (permissions.length == 0)
//           resolve(false)
//         else {
//           console.log('_________' + permissions[0].actions + '________' + permissions.length)
//           let filteredPermissions = permissions.filter((element, index, array) => element.actions.charAt(0) == '1')
//           resolve(filteredPermissions.length == 0 ? false : true)
//         }
//       } else if (actions.charAt(1) == '1') {
//         let permissionGroups = await PermissionGroup.findAll({ where: { branchId: branch } })
//         let permissions = await Permission.findAll({ where: { userId: user, permissionGroupId: permissionGroups.map((permissionGroup) => permissionGroup.id), serviceId: service } })
//         if (permissions.length == 0)
//           resolve(false)
//         else {
//           console.log('_________' + permissions[0].actions + '________' + permissions.length)
//           let filteredPermissions = permissions.filter((element, index, array) => element.actions.charAt(1) == '1')
//           resolve(filteredPermissions.length == 0 ? false : true)
//         }
//       } else {
//         let permissionGroups = await PermissionGroup.findAll({ where: { branchId: branch } })
//         let permissions = await Permission.findAll({ where: { userId: user, permissionGroupId: permissionGroups.map((permissionGroup) => permissionGroup.id), serviceId: service } })
//         if (permissions.length == 0)
//           resolve(false)
//         else {
//           console.log('_________' + permissions[0].actions + '________' + permissions.length)
//           let filteredPermissions = permissions.filter((element, index, array) => element.actions.charAt(2) == '1')
//           resolve(filteredPermissions.length == 0 ? false : true)
//         }
//       }
//     });
//   }
// }


// import { ModelsName } from './data/database/helpers/constants';
// import { Branch } from './data/database/models/branch';
// import { Post } from './data/database/models/post';
// import { HiringRequest } from './data/database/models/hiring_request';
// import { Permission } from './data/database/models/permission';
// import { PermissionGroup } from './data/database/models/permission_group';
// import { Product } from './data/database/models/products';
// import { Service } from './data/database/models/service';
// import { ServiceProvider } from './data/database/models/service_provider';
// import { User } from './data/database/models/user';
// import { UserBranch } from './data/database/models/user_branch';
// import { UserServiceProviderRole } from './data/database/models/user_service_provider_role';
// import { Op } from 'sequelize';

// const createUser = async ({ userName, role }) => {
//   Database.getInstance().models[ModelsName.USERS].create({ name: userName, firstName: '_', lastName: '_', role: role });
//   // User.create({ name: userName, firstName: '_', lastName: '_' });
// }


// const createUser = async ({ userName }) => {
//     Database.getInstance().models[ModelsName.USERS].create({ name: userName, firstName: '_', lastName: '_' });
//     // User.create({ name: userName, firstName: '_', lastName: '_' });
//   }


// user: the id of user
// serviceProviderParams: service provider name
// branchesParams: branch names
// const addServiceProvider = async ({ user, serviceProviderParams, branchesParams }) => {
//   const serviceProvider = await ServiceProvider.create({ name: serviceProviderParams });
//   var newBranchesParams = [];
//   for (var i = 0; i < branchesParams.length; i++) {
//     newBranchesParams.push({
//       serviceProviderId: serviceProvider.id,
//       name: branchesParams[i]
//     });
//   }
//   const branches = await Branch.bulkCreate(newBranchesParams);
//   var userBranches = [];
//   for (var i = 0; i < branches.length; i++) {
//     userBranches.push({
//       name: 'arbit',
//       userId: user,
//       branchId: branches[i].id
//     });
//   }
//   UserBranch.bulkCreate(userBranches);
// }

//   const addUsersToAllBranches = async ({ users, serviceProvider }) => {
//     var userBranches = [];
//     var branches = await Branch.findAll({
//       where: {
//         serviceProviderId: serviceProvider
//       }
//     });
//     // data prepare
//     var branchIds = branches.map(branch => branch.id);
//     for (var i = 0; i < users.length; i++) {
//       for (var j = 0; j < branchIds.length; j++) {
//         userBranches.push({
//           name: 'arbit',
//           userId: users[i],
//           branchId: branchIds[j]
//         })
//       }
//     }
//     console.log('_____________________---' + userBranches);
//     UserBranch.bulkCreate(userBranches).then(function (item) {
//       // to do
//     }).catch(function (err) {
//       console.log('________________' + err);
//     });
//   }
//   const removeUsersFromAllBranches = async ({ users }) => {
//     UserBranch.destroy({
//       where: {
//         userId: users
//       }
//     });
//   }

//   const addUsersToSomeBranches = async ({ users, branches }) => {
//     var userBranches = [];
//     // data prepare
//     for (var i = 0; i < users.length; i++) {
//       for (var j = 0; j < branches.length; j++) {
//         userBranches.push({
//           name: 'arbit',
//           userId: users[i],
//           branchId: branches[j]
//         })
//       }
//     }
//     UserBranch.bulkCreate(userBranches).then(function (item) {
//       // to do
//     }).catch(function (err) {
//       console.log(err);
//     });
//   }

//   // user: the id of user
//   // branches: branches you want to remove user from
//   const removeUsersFromSomeBranches = async ({ users, branches }) => {
//     UserBranch.destroy({
//       where: {
//         [Op.and]: [
//           { userId: users },
//           { branchId: branches }
//         ]
//       }
//     });
//   }

// const getServiceProviders = async ({ callBack }) => {
//   ServiceProvider.findAll().then(function (res) {
//     console.log('_____________________---' + res.map((serviceProvider) => serviceProvider.name));
//     callBack(res);
//   }).catch(function (err) {
//     console.log(err);
//   });
// }

// const getBranches = async ({ serviceProvider, callBack }) => {
//   Branch.findAll({
//     where: {
//       serviceProviderId: serviceProvider
//     }
//   }).then(function (res) {
//     console.log('_____________________---' + res.map((branch) => branch.name));
//     callBack(res);
//   }).catch(function (err) {
//     console.log(err);
//   });
// }

//   const getBranchUsers = async ({ branch, callBack }) => {
//     Branch.findOne({
//       where: {
//         id: branch
//       }
//     }).then(function (branch) {
//       return UserBranch.findAll({
//         where: {
//           branchId: branch.id
//         }
//       })
//     }).then(function (res) {
//       console.log('_____________________---' + res.map((userBranch) => userBranch.userId));
//       callBack(res);
//     }).catch(function (err) {
//       console.log(err);
//     });
//   }

//   const subscribe = async ({ user, serviceProvider, callBack }) => {
//     Subscribtion.create({
//       name: 'arrbit',
//       userId: user,
//       serviceProviderId: serviceProvider
//     }).then(function (res) {
//       console.log('_____________________---' + res);
//       callBack(res);
//     }).catch(function (err) {
//       console.log(err);
//     });
//   }

// const updateSubscribtion = async ({ subscribtion, subscribtionParam, callBack }) => {
//   Subscribtion.update({ name: subscribtionParam }, {
//     where: {
//       id: subscribtion,
//     }
//   }).then(function (res) {
//     console.log('_____________________---' + res);
//     callBack(res);
//   }).catch(function (err) {
//     console.log(err);
//   });
// }

// const unsubscribe = async ({ user, serviceProvider, callBack }) => {
//   Subscribtion.destroy({
//     where: {
//       userId: user,
//       serviceProviderId: serviceProvider
//     }
//   }).then(function (res) {
//     console.log('_____________________---' + res);
//     callBack(res);
//   }).catch(function (err) {
//     console.log(err);
//   });
// }

//   const getUserSubscribtions = async ({ user, callBack }) => {
//     return Subscribtion.findAll({
//       where: {
//         userId: user,
//       }
//     }).then(function (subscribtion) {
//       return ServiceProvider.findAll({
//         where: {
//           id: subscribtion.map((subscribe) => subscribe.serviceProviderId)
//         }
//       });
//     }).then(function (res) {
//       console.log('_____________________---' + res.map((data) => data.name));
//       callBack(res);
//     }).catch(function (err) {
//       console.log(err);
//     });
//   }

// const getUserServiceProviders = async ({ user, callBack }) => {
//   User.findOne({
//     where: {
//       id: user,
//     }
//   }).then(function (user) {
//     return UserBranch.findAll({
//       where: {
//         userId: user.id
//       }
//     });
//   }).then(function (userBranches) {
//     return Branch.findAll({
//       where: {
//         id: userBranches.map((userBranch) => userBranch.branchId)
//       }
//     });
//   }).then(function (res) {
//     console.log('_____________________---' + res.map((branch) => branch.serviceProviderId));
//     callBack(res);
//   }).catch(function (err) {
//     console.log(err);
//   });
// }

// const addService = async ({ user, branch, serviceParams, callBack }) => {
//   Service.create({
//     name: serviceParams,
//     branchId: branch,
//     userId: user
//   }).then(function (res) {
//     console.log('_____________________---' + res);
//     callBack(res);
//   }).catch(function (err) {
//     console.log(err);
//   });
// }


//   const updateService = async ({ user, service, serviceParams, callBack }) => {
//     Service.update({
//       name: serviceParams,
//       userId: user,      // because we keep track of identity of last user who update post
//     }, {
//       where: {
//         id: service
//       }
//     }).then(function (res) {
//       console.log('_____________________---' + res);
//       callBack(res);
//     }).catch(function (err) {
//       console.log(err);
//     });
//   }

//   const deleteService = async ({ service, callBack }) => {
//     Service.destroy({
//       where: {
//         id: service
//       }
//     }).then(function (res) {
//       console.log('_____________________---' + res);
//       callBack(res);
//     }).catch(function (err) {
//       console.log(err);
//     });
//   }

//   const getServices = async ({ branch, callBack }) => {
//     Service.findAll({
//       where: {
//         branchId: branch
//       }
//     }).then(function (res) {
//       console.log('_____________________---' + res.map((data) => data.name));
//       callBack(res);
//     }).catch(function (err) {
//       console.log(err);
//     });
//   }

//   const addProduct = async ({ user, branch, productParams, callBack }) => {
//     Product.create({
//       name: productParams,
//       branchId: branch,
//       userId: user
//     }).then(function (res) {
//       console.log('_____________________---' + res);
//       callBack(res);
//     }).catch(function (err) {
//       console.log(err);
//     });
//   }

//   const updateProduct = async ({ user, product, productParams, callBack }) => {
//     Product.update({
//       name: productParams,
//       userId: user,      // because we keep track of identity of last user who update post
//     }, {
//       where: {
//         id: product
//       }
//     }).then(function (res) {
//       console.log('_____________________---' + res);
//       callBack(res);
//     }).catch(function (err) {
//       console.log(err);
//     });
//   }

//   const deleteProduct = async ({ product, callBack }) => {
//     Product.destroy({
//       where: {
//         id: product
//       }
//     }).then(function (res) {
//       console.log('_____________________---' + res);
//       callBack(res);
//     }).catch(function (err) {
//       console.log(err);
//     });
//   }

//   const getProducts = async ({ branch, callBack }) => {
//     Product.findAll({
//       where: {
//         branchId: branch
//       }
//     }).then(function (res) {
//       console.log('_____________________---' + res.map((data) => data.name));
//       callBack(res);
//     }).catch(function (err) {
//       console.log(err);
//     });
//   }

//   const addPost = async ({ user, branch, postParams, callBack }) => {
//     Post.create({
//       name: postParams,
//       branchId: branch,
//       userId: user
//     }).then(function (res) {
//       console.log('_____________________---' + res);
//       callBack(res);
//     }).catch(function (err) {
//       console.log(err);
//     });
//   }

//   const updatePost = async ({ user, post, postParams, callBack }) => {
//     Post.update({
//       name: postParams,
//       userId: user,      // because we keep track of identity of last user who update post
//     }, {
//       where: {
//         id: post
//       }
//     }).then(function (res) {
//       console.log('_____________________---' + res);
//       callBack(res);
//     }).catch(function (err) {
//       console.log(err);
//     });
//   }

//   const deletePost = async ({ post, callBack }) => {
//     Post.destroy({
//       where: {
//         id: post
//       }
//     }).then(function (res) {
//       console.log('_____________________---' + res);
//       callBack(res);
//     }).catch(function (err) {
//       console.log(err);
//     });
//   }

//   const getPosts = async ({ branch, callBack }) => {
//     Post.findAll({ where: { branchId: branch } }).then(function (res) {
//       console.log('_____________________---' + res.map((data) => data.name));
//       callBack(res);
//     }).catch(function (err) {
//       console.log(err);
//     });
//   }

//   const addComment = async ({ commentParams, user, serviceProvider, post, service, callBack }) => {
//     Comment.create({
//       name: commentParams,
//       userId: user,
//       serviceProviderId: serviceProvider,
//       postId: post,
//       serviceId: service
//     }).then(function (res) {
//       console.log('_____________________---' + res);
//       callBack(res);
//     }).catch(function (err) {
//       console.log(err);
//     });
//   }

//   const updateComment = async ({ commentParams, comment, callBack }) => {
//     Comment.update({
//       name: commentParams,
//     }, {
//       where: {
//         id: comment
//       }
//     }).then(function (res) {
//       console.log('_____________________---' + res);
//       callBack(res);
//     }).catch(function (err) {
//       console.log(err);
//     });
//   }

//   const deleteComment = async ({ comment, callBack }) => {
//     Comment.destroy({
//       where: {
//         id: comment
//       }
//     }).then(function (res) {
//       console.log('_____________________---' + res);
//       callBack(res);
//     }).catch(function (err) {
//       console.log(err);
//     });
//   }

//   const getComments = async ({ post, service, callBack }) => {
//     const condition = post ? { postId: post } : { serviceId: service };
//     Comment.findAll({ where: condition }).then(function (res) {
//       console.log('_____________________---' + res.map((data) => data.name));
//       callBack(res);
//     }).catch(function (err) {
//       console.log(err);
//     });
//   }


//   const addReplay = async ({ replyParams, user, serviceProvider, comment, callBack }) => {
//     Reply.create({
//       name: replyParams,
//       userId: user,
//       serviceProviderId: serviceProvider,
//       commentId: comment,
//     }).then(function (res) {
//       console.log('_____________________---' + res);
//       callBack(res);
//     }).catch(function (err) {
//       console.log(err);
//     });
//   }

//   const updateReplay = async ({ replyParams, reply, callBack }) => {
//     Reply.update({
//       name: replyParams,
//     }, {
//       where: {
//         id: reply
//       }
//     }).then(function (res) {
//       console.log('_____________________---' + res);
//       callBack(res);
//     }).catch(function (err) {
//       console.log(err);
//     });
//   }

//   const deleteReplay = async ({ reply, callBack }) => {
//     Reply.destroy({
//       where: {
//         id: reply
//       }
//     }).then(function (res) {
//       console.log('_____________________---' + res);
//       callBack(res);
//     }).catch(function (err) {
//       console.log(err);
//     });
//   }

//   const getReplies = async ({ comment, callBack }) => {
//     Reply.findAll({ where: { commentId: comment } }).then(function (res) {
//       console.log('_____________________---' + res.map((data) => data.name));
//       callBack(res);
//     }).catch(function (err) {
//       console.log(err);
//     });
//   }


//   const addReaction = async ({ reactionParams, user, serviceProvider, post, service, callBack }) => {
//     Reaction.create({
//       name: reactionParams,
//       userId: user,
//       serviceProviderId: serviceProvider,
//       postId: post,
//       serviceId: service
//     }).then(function (res) {
//       console.log('_____________________---' + res);
//       callBack(res);
//     }).catch(function (err) {
//       console.log(err);
//     });
//   }

//   const updateReaction = async ({ reactionParams, reaction, callBack }) => {
//     Reaction.update({
//       name: reactionParams,
//     }, {
//       where: {
//         id: reaction
//       }
//     }).then(function (res) {
//       console.log('_____________________---' + res);
//       callBack(res);
//     }).catch(function (err) {
//       console.log(err);
//     });
//   }

//   const deleteReaction = async ({ reaction, callBack }) => {
//     Reaction.destroy({
//       where: {
//         id: reaction
//       }
//     }).then(function (res) {
//       console.log('_____________________---' + res);
//       callBack(res);
//     }).catch(function (err) {
//       console.log(err);
//     });
//   }

//   const getReactions = async ({ post, service, callBack }) => {
//     const condition = post ? { postId: post } : { serviceId: service };
//     Reaction.findAll({ where: condition }).then(function (res) {
//       console.log('_____________________---' + res.map((data) => data.name));
//       callBack(res);
//     }).catch(function (err) {
//       console.log(err);
//     });
//   }

// const updateOrderParams = ({ order, orderParams }) => {
//   return new Promise(async (resolve, reject) => {
//     if (orderParams)
//       await Order.update({ name: orderParams }, {
//         where: {
//           id: order
//         }
//       }).then((res) => {
//         resolve(res);
//       }).catch((err) => { reject(err) })
//     else resolve('');
//   });
// }

// const updateOrder = async ({ order, orderParams, services, products, callBack }) => {

//   updateOrderParams({ order: order, orderParams: orderParams }).then(function (_) {
//     return Order.findOne({ where: { id: order } });
//   }).then(async function (order) {
//     var orderItems = await OrderItem.findAll({
//       where: {
//         orderId: order.id
//       }
//     });
//     return { order: order, orderItems: orderItems }
//   }).then(async function (info) {
//     var data = [];

//     if (services && info.orderItems[0].serviceId) {
//       await OrderItem.destroy({ where: { orderId: order } });
//       for (var i = 0; i < services.length; i++) {
//         data.push({
//           name: 'arrbit',
//           orderId: order,
//           serviceId: services[i]
//         });
//       }
//     } else if (products && info.orderItems[0].productId) {
//       await OrderItem.destroy({ where: { orderId: order } });
//       for (var i = 0; i < products.length; i++) {
//         data.push({
//           name: 'arrbit',
//           orderId: order,
//           productId: products[i]
//         });
//       }
//     }
//     return data.length == 0 ? null : OrderItem.bulkCreate(data);
//   }).catch(function (err) {
//     console.log(err);
//   });
// }


//   const addOrder = async ({ user, orderParams, services, products, callBack }) => {
//     Order.create({
//       name: orderParams,
//       userId: user,
//     }).then(function (order) {
//       var data = [];
//       if (services) {
//         for (var i = 0; i < services.length; i++) {
//           data.push({
//             name: 'arrbit',
//             orderId: order.id,
//             serviceId: services[i]
//           });
//         }
//       } else if (products) {
//         for (var i = 0; i < products.length; i++) {
//           data.push({
//             name: 'arrbit',
//             orderId: order.id,
//             productId: products[i]
//           });
//         }
//       } else throw new Error('no services nor products are associated with order.');
//       return OrderItem.bulkCreate(data);
//     }).then(function (res) {
//       console.log('_____________________---' + res);
//       callBack(res);
//     }).catch(function (err) {
//       console.log(err);
//     });
//   }

// const deleteOrder = ({ order, callBack }) => {
//   Order.destroy({
//     where: {
//       id: order
//     }
//   }).then(function (res) {
//     console.log('_____________________---' + res);
//     callBack(res);
//   }).catch(function (err) {
//     console.log(err);
//   });
// }

//   const getOrders = async ({ user, callBack }) => {
//     Order.findAll({ where: { userId: user } }).then(function (res) {
//       console.log('_____________________---' + res.map((data) => data.name));
//       callBack(res);
//     }).catch(function (err) {
//       console.log(err);
//     });
//   }

//   const getItems = async ({ order, callBack }) => {
//     OrderItem.findAll({ where: { orderId: order } }).then(function (res) {
//       console.log('_____________________---' + res.map((data) => data.name));
//       callBack(res);
//     }).catch(function (err) {
//       console.log(err);
//     });
//   }





// bootstrap for database testing
async function bootstrap() {

  // DatabaseConnection.connect(() => {
  //   return new Promise(async (res, rej) => {
  // const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('api');
  // await app.listen(5001);
  // await createUser({ userName: 'u1', role: '_' });
  // await addServiceProvider({ user: 1, serviceProviderParams: 'sp1', branchesParams: ['b1', 'b2', 'b3'] })
  // await addHiringRequest({ user: 3, serviceProvider: 1 })
  // getUserHiringRequests({ user: 7 })
  // getPendingServiceProvidertHiringRequest({ serviceProvider: 2 })
  // await addNewUsersToBranch({ users: [7, 8], branch: 3, serviceProviderId: 1 })
  // addUsersToSomeBranches({ users: [9, 10], branches: [5] })
  // await getUserBranches({ serviceProvider: 2 })
  // await addExistedUsersToBranch({
  //   usersWithBranches: {
  //     sourceBranches:
  //       [
  //         {
  //           branch: 2,
  //           users: [5, 7]
  //         },
  //       ]
  //     , targetBranch: 3
  //   }
  // })
  // await transferExistedUsersToBranch({
  //   usersWithBranches: {
  //     sourceBranches:
  //       [
  //         {
  //           branch: 3,
  //           users: [7, 5]
  //         },
  //       ],
  //     targetBranch: 2
  //   }
  // })
  // await transferExistedUsersToBranch({
  //   usersWithBranches: {
  //     sourceBranches:
  //       [
  //         {
  //           branch: 2,
  //           users: [7]
  //         },
  //       ],
  //     targetBranch: 1
  //   }
  // })
  // removeExistedUsersFromBranch({
  //   usersWithBranches: {
  //     sourceBranches:
  //       [
  //         {
  //           branch: 1,
  //           users: [3, 4]
  //         },
  //         {
  //           branch: 2,
  //           users: [5]
  //         }
  //       ],
  //     targetBranch: 3
  //   }
  // })
  // await addService({ user: null, branch: 1, serviceParams: 'serv1' })
  // await createPermissionGroup({
  //   users: [5, 7], resources: {
  //     services: [5, 6]
  //   }, actions: '111', permissionGroupParams: 'g5', branch: 3
  // })
  // await createPermissionGroup({
  //   users: [5], resources: {
  //     services: [3]
  //   }, actions: '010', permissionGroupParams: 'g6', branch: 2
  // })
  // await createPermissionGroup({
  //   users: [6], resources: {
  //     services: [4]
  //   }, actions: '000', permissionGroupParams: 'g4', branch: 2
  // })
  // let r = await new Validators().canUserDoAction({ user: 7, actions: '001', service: 4, branch: 2 })
  // console.log('__________' + r + '__________')
  // await updatePermissionGroup({
  //   users: [5,7,6], resources: {
  //     services: [4]
  //   }, actions: '011', permissionGroupParams: null, permissionGroup: 4
  // })
  // await deletePermissionGroup({ permissionGroup: 8 })

  //  });
  // })
}

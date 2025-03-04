import { MongoClient } from 'mongodb';

import { faker } from '@faker-js/faker';

import dotenv from 'dotenv';

///import { random } from 'lodash';
import pkg from 'lodash';
const { random } = pkg;


dotenv.config();

const setup = async () => {

  console.log('Setting up database...');

  console.log('process.env.MONGODB_URI)', process.env.MONGODB_URI);


  let client;

  try {

    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();

    console.log('Connected to database');

    const hasData = await client
      .db('vista')
      .collection('orders')
      .countDocuments();

    if (hasData) {
      console.log('Database already exists with data');
      client.close();
      return;
    }

    const records = [...Array(2354)].map((x, index) => {


      /*
  
  id: string;
  createdAt: Date;
  amount: string;
  status: string;


  product {
    id: string;
    name: string;
    companyName: string;
    price: number;
  }

  order {
    id: string;
    name: string;
    userName: string;
  }

  delivery {
    id: string;
    name: string;
    userName: string;
    address: string;
    fee: number;
    
  }

  payment {
    id: string;
    name: string;
    userName: string;
    amount: number;
    status: string;
  }

  */


  
      /////const id = random(10000, 99999).toString(); // 아이디
      const id =  ( index + 100000 ).toString();


      const  createdAt = faker.date.past(); // 등록일
      const amount = random(1, 99).toString(); // 수량
      const status = ( random(1, 2) === 1 ) ? 'inactive' : 'active'; // 상태

      const product = {
        id: random(100000, 100010).toString(),
        name: '상품' + id,
        companyId: random(10000, 10010).toString(),
        companyName: ( random(1, 2) === 1 ) ? '좋은세상' : '다나와',
        price: random(10000, 99999),
      };

      const order = {
        id: random(100000, 100010).toString(),
        name: '김철수',
        userName: faker.name.firstName().toLowerCase(),
      };

      const delivery = {
        id: random(10000, 10010).toString(),
        name: '오만석',
        userName: faker.name.firstName(),
        address: '서울시 강남구 강남대로62길31 1층',
        fee: random(1000, 9999),
      };

      const payment = {
        id: random(100000, 100010).toString(),
        name: '결제' + id,
        userName: faker.name.firstName(),
        amount: random(10000, 99999),
        status: ( random(1, 2) === 1 ) ? 'Pending' : 'Active',
      };






      return {

        id,
        createdAt,
        amount,
        status,
        product,
        order,
        delivery,
        payment,

      };
    });


    const insert = await client
      .db('vista')
      .collection('orders')
      .insertMany(records);

    if (insert.acknowledged) {
      console.log('Successfully inserted records');
    }
  } catch (error) {

    console.error(error);

    return 'Database is not ready yet';
  } finally {
    if (client) {
      await client.close();
    }
  }
};



try {

  setup();
} catch {
  console.warn('Database is not ready yet. Skipping seeding...');
}

export { setup };

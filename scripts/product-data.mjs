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
      .collection('products')
      .countDocuments();

    if (hasData) {
      console.log('Database already exists with data');
      client.close();
      return;
    }

    const records = [...Array(823)].map((x, index) => {


      /*
  {
    id: '0o02051402',
    createdAt: '2020-12-01T00:00:00.000Z',
    name: 'Tasty Metal Shirt',
    companyName: '좋은세상', 
    category: 'Books',
    image:
      'https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/7.webp',
    sku: '52442',
    listPrice: 410.00,
    price: 410.00,
    status: 'Pending',
    rating: [4, 5, 3, 2],

    point: 100,
    stock: 100,
    sales: 30,
    inquiry, 10,
  },
    */

      ////////const id = random(10000, 99999).toString(); // 아이디

      const id =  ( index + 100000 ).toString();

      const createdAt = faker.date.past(); // 등록일

      const name = '상품' + id; // 상품명
      
      const companyName = ( random(1, 2) === 1 ) ? '좋은세상' : '다나와'; // 회사명
      const shopId = random(10001, 10008).toString(); // 샵아이디
      
  

      const category = faker.commerce.department(); // 카테고리
      const avatar = "https://lefimall.vercel.app/images/products/product" + random(1, 11) + ".png"; // 이미지

      const images = [...Array(5)].map((x, index) => {
        return "https://lefimall.vercel.app/images/products/product" + random(1, 11) + ".png";
      });

      /* 상품설명 */
      const description = faker.lorem.paragraphs(1);

      /* 상품 옵션 */
      const options = [...Array(3)].map((x, index) => {
        return {
          id: index,
          name: faker.commerce.productName(),
          price: random(10000, 99999),
          stock: random(0, 1000),
        };
      } );

      /* 추가 상품 */
      const addProducts = [...Array(3)].map((x, index) => {
        return {
          id: index,
          name: faker.commerce.productName(),
          price: random(10000, 99999),
          stock: random(0, 1000),
        };
      } );



      const sku = random(10000, 99999).toString();

      const listPrice = random(10000, 99999); // 정가
      const price = listPrice * 0.9;
      const status = ( random(1, 2) === 1 ) ? 'Pending' : 'Active';
      const rating = [random(1, 5), random(1, 5), random(1, 5), random(1, 5)];

      const point = random(0, 1000); // 적립금
      const stock = random(0, 1000); // 재고
      const sales = stock - random(0, stock); // 판매
      const inquiry = random(0, 1000); // 문의



      return {
        id,
        createdAt,
        name,
        companyName,
        shopId,
        category,
        avatar,
        images,
        description,
        options,
        addProducts,
        
        sku,
        listPrice,
        price,
        status,
        rating,
        point,
        stock,
        sales,
        inquiry,



      };
    });


    const insert = await client
      .db('vista')
      .collection('products')
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

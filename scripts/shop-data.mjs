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


  /*
  id: '0652',
  name: '레피샵(본사)',
  createdAt: '2021-06-01T08:00:00.000Z',
  loginid: 'lefimall',

  // 샵이름
  businessName: '레피샵',
  // 대표자명
  representativeName: '김대표',
  // 업태
  businessType: '소매',
  // 종목
  businessCategory: '패션잡화',
  // 사업등록번호
  businessRegistrationNumber: '123-45-67890',
  // 사업장주소
  businessRegistrationAddress: '서울시 강남구 테헤란로 427',
  // 통신 판매업 신고번호
  mailOrderRegistrationNumber: '2021-서울강남-00000',
  // 사업장 전화번호
  businessPhone: '02-1234-5678',
  // 사업장 FAX번호
  businessFax: '02-1234-5678',


  // 정산계좌은행
  settlementBank: '신한은행',
  // 정산계좌번호
  settlementAccount: '123-45-67890',
  // 예금주
  settlementAccountHolder: '김대표',

  // 정산 수수료
  settlementFeeRate: 0.1,


  fee: 0, // 수수료 %
  tex: '법인', // 법인, 개인
  status: 'active', // active, inactive
  productCount:35, // 등록상품수
  */



  try {

    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();

    console.log('Connected to database');

    const hasData = await client
      .db('vista')
      .collection('shops')
      .countDocuments();

    if (hasData) {
      console.log('Database already exists with data');
      client.close();
      return;
    }


    var records = [...Array(9)].map((x, index) => {

      ///const id =  random(10000, 99999).toString();

      const id =  ( index + 10001 ).toString();

      const name = faker.company.name();



      const createdAt = faker.date.past();

      const avatar = faker.image.avatar();

      /* 담당자이름 */
      const contactName = faker.name.firstName();
      /* 연락처 */
      //const contactPhone = faker.phone.phoneNumber();
      const contactPhone = "010" + random(10000000, 99999999);

      /* 이메일 */
      const contactEmail = faker.internet.email();
      /* introduction */
      const introduction = faker.lorem.paragraphs(1);


      ///const loginid = faker.internet.userName();
      const loginid = faker.person.firstName().toLowerCase() + faker.datatype.number(1000).toString();

      ////const fee = random(0, 10);
      const tex = ( random(1, 2) === 1 ) ? '법인' : '개인';
      const status = ( random(1, 2) === 1 ) ? 'active' : 'inactive';
      const productCount = random(0, 100);

      const businessName = faker.company.name();
      const representativeName = faker.name.firstName();
      const businessType = faker.name.jobType();
      const businessCategory = faker.commerce.department();
      const businessRegistrationNumber = faker.datatype.number(100000000).toString();
      const businessRegistrationAddress = faker.address.streetAddress();
      // 사업자등록증 이미지
      const businessRegistrationImage = "https://lefimall.vercel.app/images/businessRegistrationImage.png"
      

      const mailOrderRegistrationNumber = faker.datatype.number(100000000).toString();
      // 통신판매업 신고증 이미지
      const mailOrderRegistrationImage = "https://lefimall.vercel.app/images/mailOrderRegistrationImage.png"

      const businessPhone = "02" + random(10000000, 99999999);
      const businessFax = "02" + random(10000000, 99999999);

      const settlementBank = faker.finance.currencyName();
      const settlementAccount = faker.finance.account();
      const settlementAccountHolder = faker.name.firstName();

      // 통장사본
      const settlementAccountImage = "https://lefimall.vercel.app/images/settlementAccountImage.png"


      const settlementFeeRate = random(0, 10);

  



      return {
        id,
        name,
        createdAt,
        avatar,
        contactName,
        contactPhone,
        contactEmail,
        introduction,
        loginid,

        businessName,
        representativeName,
        businessType,
        businessCategory,
        businessRegistrationNumber,
        businessRegistrationAddress,
        businessRegistrationImage,

        mailOrderRegistrationNumber,
        mailOrderRegistrationImage,

        businessPhone,
        businessFax,
        settlementBank,
        settlementAccount,
        settlementAccountHolder,
        settlementFeeRate,
        
        tex,
        status,
        productCount,
      };
    });


    records.push({
      
      id: '10000',
      name: '레피샵(본사)',
      createdAt: '2021-06-01T08:00:00.000Z',
      avatar: 'https://lefimall.vercel.app/images/lefishop.png',
      contactName: '김대표',
      contactPhone: '010-1234-5678',
      contactEmail: 'lefishop@gmail.com',

      introduction: '레피샵은 레피샵입니다.',
      loginid: 'lefishop',

      businessName: '레피샵',
      representativeName: '김대표',
      businessType: '소매',
      businessCategory: '패션잡화',
      businessRegistrationNumber: '123-45-67890',
      businessRegistrationAddress: '서울시 강남구 테헤란로 427',
      businessRegistrationImage: "https://lefimall.vercel.app/images/businessRegistrationImage.png",

      mailOrderRegistrationNumber: '2021-서울강남-00000',
      mailOrderRegistrationImage: "https://lefimall.vercel.app/images/mailOrderRegistrationImage.png",
      
      businessPhone: '02-1234-5678',
      businessFax: '02-1234-5678',
      settlementBank: '신한은행',
      settlementAccount: '123-45-67890',
      settlementAccountHolder: '김대표',

      /* 통장사본 */
      settlementAccountImage: "https://lefimall.vercel.app/images/settlementAccountImage.png",

      settlementFeeRate: 0,



      tex: '법인', // 법인, 개인
      status: 'active', // active, inactive
      productCount:35, // 등록상품수
    });


    
    const insert = await client
      .db('vista')
      .collection('shops')
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

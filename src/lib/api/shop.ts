import clientPromise from '@/lib/mongodb';
import { remark } from 'remark';
import remarkMdx from 'remark-mdx';
import { serialize } from 'next-mdx-remote/serialize';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { Port_Lligat_Sans } from 'next/font/google';
import { D } from '@uploadthing/react/types-f6db134c';


  /*
  id: '0652',
  name: '레피샵(본사)',
  createdAt: '2021-06-01T08:00:00.000Z',
  loginid: 'lefishop',

      businessName: '레피샵',
      representativeName: '김대표',
      businessType: '소매',
      businessCategory: '패션잡화',
      businessRegistrationNumber: '123-45-67890',
      businessRegistrationAddress: '서울시 강남구 테헤란로 427',
      mailOrderRegistrationNumber: '2021-서울강남-00000',
      businessPhone: '02-1234-5678',
      businessFax: '02-1234-5678',
      settlementBank: '신한은행',
      settlementAccount: '123-45-67890',
      settlementAccountHolder: '김대표',
      settlementFeeRate: 0,


  tex: '법인', // 법인, 개인
  status: 'active', // active, inactive
  productCount:35, // 등록상품수



  */


export interface ShopProps {

  id: string,
  name: string,
  createdAt: Date,
  loginid: string,
  
  avatar: string,
  contactName: string,
  contactPhone: string,
  contactEmail: string,
  introduction: string,

  businessName: string,
  representativeName: string,
  businessType: string,
  businessCategory: string,
  businessRegistrationNumber: string,
  businessRegistrationAddress: string,
  businessRegistrationImage: string,

  mailOrderRegistrationNumber: string,
  mailOrderRegistrationImage: string,

  businessPhone: string,
  businessFax: string,
  settlementBank: string,
  settlementAccount: string,
  settlementAccountHolder: string,
  settlementFeeRate: number,




  tex: string,
  status: string,
  productCount: number,

}

export interface ResultProps {
  _id: string;
  shops: ShopProps[];
}

export async function getMdxSource(postContents: string) {
  // Use remark plugins to convert markdown into HTML string
  const processedContent = await remark()
    // Native remark plugin that parses markdown into MDX
    .use(remarkMdx)
    .process(postContents);

  // Convert converted html to string format
  const contentHtml = String(processedContent);

  // Serialize the content string into MDX
  const mdxSource = await serialize(contentHtml);

  return mdxSource;
}

export const placeholderBio = `
Tincidunt quam neque in cursus viverra orci, dapibus nec tristique. Nullam ut sit dolor consectetur urna, dui cras nec sed. Cursus risus congue arcu aenean posuere aliquam.

Et vivamus lorem pulvinar nascetur non. Pulvinar a sed platea rhoncus ac mauris amet. Urna, sem pretium sit pretium urna, senectus vitae. Scelerisque fermentum, cursus felis dui suspendisse velit pharetra. Augue et duis cursus maecenas eget quam lectus. Accumsan vitae nascetur pharetra rhoncus praesent dictum risus suspendisse.`;




/* register a new shop */
export async function registerOne(data: ShopProps): Promise<ShopProps> {

  const client = await clientPromise;
  const collection = client.db('vista').collection('shops');
  const result = await collection.insertOne(data);


  console.log('registerOne result: ' + result);

  return data;

}




export async function getAll(

  limit: number,
  page: number,
  sort: string,
  order: string,
  q: string,

): Promise<ShopProps[]> {

  const client = await clientPromise;
  const collection = client.db('vista').collection('shops');

  

  const query = q === null ? '' : q;



  return await collection
      .aggregate<ShopProps>([
  
        {
          // sort by sort param
          $sort: {
            [
              sort === null ? 'createdAt' : sort
            ]:parseInt(
              order === null ? '-1' : order
            )
          }
        },

        /* match if status is exist and is active */
        {
          $match:  {
            status: { $exists: true, $eq: 'active' } 
          }
        },

        {
          $match: {
            $or: [
              { name: { $regex: query, $options: 'i' } },
              { loginid: { $regex: query, $options: 'i' } },
              { contactName: { $regex: query, $options: 'i' } },
              { contactPhone: { $regex: query, $options: 'i' } },
              { contactEmail: { $regex: query, $options: 'i' } },
              { introduction: { $regex: query, $options: 'i' } },
              { businessName: { $regex: query, $options: 'i' } },
              { representativeName: { $regex: query, $options: 'i' } },
              { businessType: { $regex: query, $options: 'i' } },
              { businessCategory: { $regex: query, $options: 'i' } },
              { businessRegistrationNumber: { $regex: query, $options: 'i' } },
              { businessRegistrationAddress: { $regex: query, $options: 'i' } },
              { mailOrderRegistrationNumber: { $regex: query, $options: 'i' } },
              { businessPhone: { $regex: query, $options: 'i' } },
              { businessFax: { $regex: query, $options: 'i' } },
              { settlementBank: { $regex: query, $options: 'i' } },
              { settlementAccount: { $regex: query, $options: 'i' } },
              { settlementAccountHolder: { $regex: query, $options: 'i' } },
              { settlementFeeRate: { $regex: query, $options: 'i' } },
              { tex: { $regex: query, $options: 'i' } },
              { status: { $regex: query, $options: 'i' } },
            ],
          },
        },
        
        {
          $limit: limit,
          //////$skip: (page - 1) * limit, // skip the first n documents

        },

        // aggregate with an array of 10 elements of products
        {
          $lookup: {
            from: 'products',
            localField: 'id',
            foreignField: 'shopId',
            as: 'products',
          },
        },

        // push the products array to the products field

        {
          $addFields: {
            productCount: { $size: '$products' },

            products: {
              $slice: ['$products', 0, 10],
            },
          },
        },
        

        
      ])
      .toArray();
    


  
}





export async function getAllWaiting(

  limit: number,
  page: number,
  sort: string,
  order: string,
  q: string,

): Promise<ShopProps[]> {

  const client = await clientPromise;
  const collection = client.db('vista').collection('shops');

  

  const query = q === null ? '' : q;



  return await collection
      .aggregate<ShopProps>([
  
        {
          // sort by sort param
          $sort: {
            [
              sort === null ? 'createdAt' : sort
            ]:parseInt(
              order === null ? '-1' : order
            )
          }
        },
        // match if status is not exist or if exist and is not active

        {
          $match:  {
            status: { $exists: false } 
          }
        },

        {
          $match: {
            $or: [
              { name: { $regex: query, $options: 'i' } },
              { loginid: { $regex: query, $options: 'i' } },
              { contactName: { $regex: query, $options: 'i' } },
              { contactPhone: { $regex: query, $options: 'i' } },
              { contactEmail: { $regex: query, $options: 'i' } },
              { introduction: { $regex: query, $options: 'i' } },
              { businessName: { $regex: query, $options: 'i' } },
              { representativeName: { $regex: query, $options: 'i' } },
              { businessType: { $regex: query, $options: 'i' } },
              { businessCategory: { $regex: query, $options: 'i' } },
              { businessRegistrationNumber: { $regex: query, $options: 'i' } },
              { businessRegistrationAddress: { $regex: query, $options: 'i' } },
              { mailOrderRegistrationNumber: { $regex: query, $options: 'i' } },
              { businessPhone: { $regex: query, $options: 'i' } },
              { businessFax: { $regex: query, $options: 'i' } },
              { settlementBank: { $regex: query, $options: 'i' } },
              { settlementAccount: { $regex: query, $options: 'i' } },
              { settlementAccountHolder: { $regex: query, $options: 'i' } },
              { settlementFeeRate: { $regex: query, $options: 'i' } },
              { tex: { $regex: query, $options: 'i' } },
              { status: { $regex: query, $options: 'i' } },
            ],
          },
        },
        
        {
          $limit: limit,
          //////$skip: (page - 1) * limit, // skip the first n documents

        },

        // aggregate with an array of 10 elements of products
        {
          $lookup: {
            from: 'products',
            localField: 'id',
            foreignField: 'shopId',
            as: 'products',
          },
        },

        // push the products array to the products field

        {
          $addFields: {
            productCount: { $size: '$products' },

            products: {
              $slice: ['$products', 0, 10],
            },
          },
        },
        

        
      ])
      .toArray();
    


  
}




export async function getOne(id: string): Promise<ShopProps | null> {
  console.log('getUser id: ' + id);

  const client = await clientPromise;
  const collection = client.db('vista').collection('shops');
  const results = await collection.findOne<ShopProps>(
    { id },
    { projection: { _id: 0, emailVerified: 0 } }
  );
  if (results) {
    return {
      ...results,
      ///bioMdx: await getMdxSource(results.bio || placeholderBio)
    };
  } else {
    return null;
  }
}


export async function getCount(): Promise<number> {
  const client = await clientPromise;
  const collection = client.db('vista').collection('shops');
  return await collection.countDocuments();
}



export async function update(username: string, bio: string) {
  const client = await clientPromise;
  const collection = client.db('vista').collection('shops');
  return await collection.updateOne({ username }, { $set: { bio } });
}




export async function updateName(id: string, value: string) {
  const client = await clientPromise;
  const collection = client.db('vista').collection('shops');
  return await collection.updateOne({ id }, { $set: { name: value } });
}

export async function updateContactName(id: string, value: string) {
  const client = await clientPromise;
  const collection = client.db('vista').collection('shops');
  return await collection.updateOne({ id }, { $set: { contactName: value } });
}

export async function updateContactPhone(id: string, value: string) {
  const client = await clientPromise;
  const collection = client.db('vista').collection('shops');
  return await collection.updateOne({ id }, { $set: { contactPhone: value } });
}

export async function updateContactEmail(id: string, value: string) {
  const client = await clientPromise;
  const collection = client.db('vista').collection('shops');
  return await collection.updateOne({ id }, { $set: { contactEmail: value } });
}

export async function updateIntroduction(id: string, value: string) {
  const client = await clientPromise;
  const collection = client.db('vista').collection('shops');
  return await collection.updateOne({ id }, { $set: { introduction: value } });
}




export async function updateBasic(id: string, avatar: string, shopName: string, contactName: string, contactPhone: string, contactEmail: string, introduction: string) {
  const client = await clientPromise;
  const collection = client.db('vista').collection('shops');

  return await collection.updateOne(
    {
      id
    },
    {
      $set:
      {
        avatar: avatar,
        name: shopName,
        contactName: contactName,
        contactPhone: contactPhone,
        contactEmail: contactEmail,
        introduction: introduction,

      }
    }

  );
 
}




export async function updateBusiness(
  id: string,
  businessName: string,
  representativeName: string,
  businessType: string,
  businessCategory: string,
  businessRegistrationNumber: string,
  businessRegistrationImage: string,
  
  businessRegistrationAddress: string,

  mailOrderRegistrationNumber: string,
  mailOrderRegistrationImage: string,
  //businessPhone: string,
  //businessFax: string,
  //memo: string,
  ) {
  const client = await clientPromise;
  const collection = client.db('vista').collection('shops');

  return await collection.updateOne(
    {
      id
    },
    {
      $set:
      {
        businessName: businessName,
        representativeName: representativeName,
        businessType: businessType,
        businessCategory: businessCategory,
        businessRegistrationNumber: businessRegistrationNumber,
        businessRegistrationImage: businessRegistrationImage,
        
        businessRegistrationAddress: businessRegistrationAddress,

        mailOrderRegistrationNumber: mailOrderRegistrationNumber,
        mailOrderRegistrationImage: mailOrderRegistrationImage,
        //businessPhone: businessPhone,
        //businessFax: businessFax,
        //memo: memo,

      }
    }

  );

}



export async function updateDelivery(
  id: string,
  businessName: string,
  representativeName: string,
  businessType: string,
  businessCategory: string,
  businessRegistrationNumber: string,
  businessRegistrationImage: string,
  
  businessRegistrationAddress: string,

  mailOrderRegistrationNumber: string,
  mailOrderRegistrationImage: string,
  //businessPhone: string,
  //businessFax: string,
  //memo: string,
  ) {
  const client = await clientPromise;
  const collection = client.db('vista').collection('shops');

  return await collection.updateOne(
    {
      id
    },
    {
      $set:
      {
        businessName: businessName,
        representativeName: representativeName,
        businessType: businessType,
        businessCategory: businessCategory,
        businessRegistrationNumber: businessRegistrationNumber,
        businessRegistrationImage: businessRegistrationImage,
        
        businessRegistrationAddress: businessRegistrationAddress,

        mailOrderRegistrationNumber: mailOrderRegistrationNumber,
        mailOrderRegistrationImage: mailOrderRegistrationImage,
        //businessPhone: businessPhone,
        //businessFax: businessFax,
        //memo: memo,

      }
    }

  );

}


export async function updateSettlement(
  id: string,
  settlementBank: string,
  settlementAccount: string,
  settlementAccountHolder: string,
  settlementAccountImage: string,
  settlementFeeRate: number,
  ) {


    console.log('updateSettlement id: ' + id);
    console.log('updateSettlement settlementBank: ' + settlementBank);
    


    const client = await clientPromise;
    const collection = client.db('vista').collection('shops');
  
    return await collection.updateOne(
      {
        id
      },
      {
        $set:
        {
          settlementBank: settlementBank,
          settlementAccount: settlementAccount,
          settlementAccountHolder: settlementAccountHolder,
          settlementAccountImage: settlementAccountImage,
          settlementFeeRate: settlementFeeRate,
  
        }
      }
  
  )}



  export async function checkOne(id: string, password: string): Promise<ShopProps | null> {

    const client = await clientPromise;
    const collection = client.db('vista').collection('shops');
    const results = await collection.findOne<ShopProps>(
      {
        loginid: id,
        password: password,
      },
      { projection: { _id: 0, emailVerified: 0 } }
    );

    ///console.log('checkOne results: ' + results);

    if (results) {
      return {
        ...results,
        ///bioMdx: await getMdxSource(results.bio || placeholderBio)
      };
    } else {
      return null;
    }
  }
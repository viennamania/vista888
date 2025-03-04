import clientPromise from '@/lib/mongodb';
import { remark } from 'remark';
import remarkMdx from 'remark-mdx';
import { serialize } from 'next-mdx-remote/serialize';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

export interface BannerProps {
  id: string;
  createdAt: Date;

  userId: string;
  userName: string;
  userNickname: string;
  userAvatar: string;
  userEmail: string;

  title: string;
  contentType: string;
  productId: string;
  status: string;
}

export interface ResultProps {
  _id: string;
  orders: BannerProps[];
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



/* insertOne */
export async function insertOne(
  banner: BannerProps,
): Promise<string> {
  
  const client = await clientPromise;
  const collection = client.db('vista').collection('banners');

  // random id
  banner.id = Math.floor(100000 + Math.random() * 900000).toString();
  banner.createdAt = new Date();


  const result = await collection.insertOne(banner);

  //return result.insertedId;

  return banner.id;
}



export async function getAll(
  limit: number,
  page: number,
): Promise<BannerProps[]> {

  const client = await clientPromise;
  const collection = client.db('vista').collection('banners');

  

  console.log('limit: ' + limit);
  console.log('page: ' + page);

  

  // lookup products

  return await collection
    .aggregate<BannerProps>(
      [

        {
          $lookup: {
            from: 'products',
            localField: 'productId',
            foreignField: 'id',
            as: 'product',
          },
        },
        {
          $unwind: {
            path: '$product',
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: 'id',
            as: 'user',
          },
        },
        {
          $unwind: {
            path: '$user',
            preserveNullAndEmptyArrays: true,
          },
        },

        /*
        {
          $addFields: {
            product: '$product',

          },
        },
        */

        {
          $sort: {
            createdAt: -1
          }
        },
        
        
        {
          $limit: limit
        },

        {
          $skip: (page - 1) * limit
        },


        {
          $sort: {
            createdAt: -1
          }
        },

        
        
        {
          $limit: limit
        },

        {
          $skip: (page - 1) * limit
        },
        

      ]
    )
    .toArray();
  
}




export async function getAllForUser(
  limit: number,
  page: number,
): Promise<BannerProps[]> {

  const client = await clientPromise;
  const collection = client.db('vista').collection('banners');

  

  console.log('limit: ' + limit);
  console.log('page: ' + page);

  

  // lookup products

  return await collection
    .aggregate<BannerProps>(
      [
        {
          $match: {
            status: '1',
          }
        },

        {
          $lookup: {
            from: 'products',
            localField: 'productId',
            foreignField: 'id',
            as: 'product',
          },
        },
        {
          $unwind: {
            path: '$product',
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: 'id',
            as: 'user',
          },
        },
        {
          $unwind: {
            path: '$user',
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $project: {
            id: '$id',
            createdAt: '$createdAt',
            contentType: '$contentType',
            product: '$product',
          },
        },

        {
          $sort: {
            createdAt: -1
          }
        },
        
        
        {
          $limit: limit
        },

        {
          $skip: (page - 1) * limit
        },


        {
          $sort: {
            createdAt: -1
          }
        },

        
        
        {
          $limit: limit
        },

        {
          $skip: (page - 1) * limit
        },
        

      ]
    )
    .toArray();
  
}








export async function getAllByUserId(
  limit: number,
  page: number,
  userId: string,
): Promise<BannerProps[]> {

  const client = await clientPromise;
  const collection = client.db('vista').collection('orders');

  return await collection
    .aggregate<BannerProps>(
      [


        {
          $sort: {
            createdAt: -1
          }
        },
        
        {
          $limit: limit
        },

        {
          $skip: (page - 1) * limit
        },
        

      ]
    )
    .toArray();

}












export async function getCount(): Promise<number> {
  const client = await clientPromise;
  const collection = client.db('vista').collection('orders');
  return await collection.countDocuments();
}



export async function update(username: string, bio: string) {
  const client = await clientPromise;
  const collection = client.db('vista').collection('products');
  return await collection.updateOne({ username }, { $set: { bio } });
}

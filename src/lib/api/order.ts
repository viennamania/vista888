import clientPromise from '@/lib/mongodb';
import { remark } from 'remark';
import remarkMdx from 'remark-mdx';
import { serialize } from 'next-mdx-remote/serialize';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { de } from '@faker-js/faker';
import { MdNordicWalking } from 'react-icons/md';

import { ObjectId } from 'mongodb';

export interface OrderProps {


  id: string;
  createdAt: Date;
  amount: string;
  status: string;

  product: {
    id: string;
    name: string;
    companyId: string;
    companyName: string;
    price: number;
  };

  order: {
    id: string;
    name: string;
    userName: string;
  };

  delivery: {
    id: string;
    name: string;
    userName: string;
    address: string;
    fee: number;
  };

  payment: {
    id: string;
    name: string;
    userName: string;
    amount: number;
    status: string;
  };


}

export interface ResultProps {
  _id: string;
  orders: OrderProps[];
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







export async function getOne(
  id: string,
): Promise<OrderProps> {

  console.log('getOne id: ' + id);

  const client = await clientPromise;
  const collection = client.db('vista').collection('orders');

  const results = await collection
    .aggregate<OrderProps>(
      [
        {
          $match: {
            "id": id,
          }
        },
        {
          $lookup:
          {
            from: "products",
            localField: "product.id",
            foreignField: "id",
            as: "product"
          }
        },
        {
          $lookup:
          {
            from: "users",
            localField: "order.id",
            foreignField: "id",
            as: "order"
          }
        },

        {
          $unwind: "$product"
        },
        {
          $unwind: "$order"
        },

        {
          $project: {
            _id: 0,
            id: 1,
            createdAt: 1,
            amount: 1,
            status: 1,
            product: {
              id: "$product.id",
              name: "$product.name",
              avatar: "$product.avatar",
              description: "$product.description",
              companyId: "$product.companyId",
              companyName: "$product.companyName",
              price: "$product.price",
            },
            order: {
              id: "$order.id",
              email: "$order.email",
              name: "$order.name",
              nickname: "$order.nickname",
              avatar: "$order.avatar",

            },
            delivery: 1,
            payment: 1,
          }
        },
        {
          $sort: {
            createdAt: -1
          }
        },

        

      ]
      
    )
    .toArray();



  return results[0];

}




export async function getAll(
  limit: number,
  page: number,
): Promise<OrderProps[]> {



  const client = await clientPromise;
  const collection = client.db('vista').collection('orders');

  console.log('getAll limit: ' + limit);
  console.log('getAll page: ' + page);

   
  return await collection
    .aggregate<OrderProps>(
      [

        {
          $lookup:
          {
            from: "products",
            localField: "product.id",
            foreignField: "id",
            as: "product"
          }
        },
        {
          $lookup:
          {
            from: "users",
            localField: "order.id",
            foreignField: "id",
            as: "order"
          }
        },

        {
          $unwind: "$product"
        },
        {
          $unwind: "$order"
        },

        {
          $project: {
            _id: 0,
            id: 1,
            createdAt: 1,
            amount: 1,
            status: 1,
            product: {
              id: "$product.id",
              name: "$product.name",
              avatar: "$product.avatar",
              description: "$product.description",
              companyId: "$product.companyId",
              companyName: "$product.companyName",
              price: "$product.price",
            },
            order: {
              id: "$order.id",
              name: "$order.name",
              userName: "$order.userName",
            },
            delivery: 1,
            payment: 1,
          }
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
): Promise<OrderProps[]> {

  const client = await clientPromise;
  const collection = client.db('vista').collection('orders');

  return await collection
    .aggregate<OrderProps>(
      [
        {
          $match: {
            "order.id": userId,
          }
        },
        {
          $lookup:
          {
            from: "products",
            localField: "product.id",
            foreignField: "id",
            as: "product"
          }
        },
        {
          $lookup:
          {
            from: "users",
            localField: "order.id",
            foreignField: "id",
            as: "order"
          }
        },

        {
          $unwind: "$product"
        },
        {
          $unwind: "$order"
        },

        {
          $project: {
            _id: 0,
            id: 1,
            createdAt: 1,
            amount: 1,
            status: 1,
            product: {
              id: "$product.id",
              name: "$product.name",
              avatar: "$product.avatar",
              description: "$product.description",
              companyId: "$product.companyId",
              companyName: "$product.companyName",
              price: "$product.price",
            },
            order: {
              id: "$order.id",
              name: "$order.name",
              userName: "$order.userName",
            },
            delivery: 1,
            payment: 1,
          }
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



export async function getAllBySessionId(
  limit: number,
  page: number,
  sessionId: string,
): Promise<OrderProps[]> {


  // check if session exists in db and if not return null
  // if exists then return orders
  // object id of  user_login_sessions is the session id


  const client = await clientPromise;


  const collection = client.db('vista').collection('user_login_sessions');

  const results = await collection
    .find(
      {
        //_id: sessionId,
        _id: new ObjectId(sessionId),

      }
    )
    .toArray();

  console.log('results: ' + JSON.stringify(results));


  if (results.length === 0) {
    return  [];
  }

  const userId = results[0].id;


  
  const collectionOrders = client.db('vista').collection('orders');

  return await collectionOrders
    .aggregate<OrderProps>(
      [
        {
          $match: {
            "order.id": userId,
          }
        },
        {
          $lookup:
          {
            from: "products",
            localField: "product.id",
            foreignField: "id",
            as: "product"
          }
        },
        {
          $lookup:
          {
            from: "users",
            localField: "order.id",
            foreignField: "id",
            as: "order"
          }
        },

        {
          $unwind: "$product"
        },
        {
          $unwind: "$order"
        },

        {
          $project: {
            _id: 0,
            id: 1,
            createdAt: 1,
            amount: 1,
            status: 1,
            product: {
              id: "$product.id",
              name: "$product.name",
              avatar: "$product.avatar",
              description: "$product.description",
              companyId: "$product.companyId",
              companyName: "$product.companyName",
              price: "$product.price",
            },
            order: {
              id: "$order.id",
              name: "$order.name",
              userName: "$order.userName",
            },
            delivery: 1,
            payment: 1,
          }
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







export async function getAllByShopId(
  limit: number,
  page: number,
  shopId: string,
): Promise<OrderProps[]> {

  console.log('shopId: ' + shopId);



  const client = await clientPromise;
  const collection = client.db('vista').collection('orders');

  return await collection
    .aggregate<OrderProps>(
      [
        {
          $match: {
            "product.companyId": shopId,
          }
        },
        {
          $lookup:
          {
            from: "products",
            localField: "product.id",
            foreignField: "id",
            as: "product"
          }
        },
        {
          $lookup:
          {
            from: "users",
            localField: "order.id",
            foreignField: "id",
            as: "order"
          }
        },

        {
          $unwind: "$product"
        },
        {
          $unwind: "$order"
        },

        {
          $project: {
            _id: 0,
            id: 1,
            createdAt: 1,
            amount: 1,
            status: 1,
            product: {
              id: "$product.id",
              name: "$product.name",
              avatar: "$product.avatar",
              description: "$product.description",
              companyId: "$product.companyId",
              companyName: "$product.companyName",
              price: "$product.price",
            },
            order: {
              id: "$order.id",
              name: "$order.name",
              userName: "$order.userName",
            },
            delivery: 1,
            payment: 1,
          }
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

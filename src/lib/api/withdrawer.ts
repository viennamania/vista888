import clientPromise from '@/lib/mongodb';
import { remark } from 'remark';
import remarkMdx from 'remark-mdx';
import { serialize } from 'next-mdx-remote/serialize';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { el } from '@faker-js/faker';

export interface UserProps {
  /*
  name: string;
  username: string;
  email: string;
  image: string;
  bio: string;
  bioMdx: MDXRemoteSerializeResult<Record<string, unknown>>;
  followers: number;
  verified: boolean;
  */

  id: string,
  name: string,
  nickname: string,
  userid: string,
  email: string,
  avatar: string,
  regType: string,
  mobile: string,
  gender: string,
  weight: number,
  height: number,
  birthDate: string,
  purpose: string,
  marketingAgree: string,
  createdAt: string,
  updatedAt: string,
  deletedAt: string,
  loginedAt: string,
  followers : number,
  emailVerified: boolean,
  bio: string,
  bioMdx: MDXRemoteSerializeResult<Record<string, unknown>>;

  password: string,
}

export interface ResultProps {
  totalCount: number;
  users: UserProps[];
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





// create user
/*
{
    "email": "creath.park@gmail.com",
    "password": "Abcd1234",
    "isAgreed": true
}
*/

export async function insertOne(data: any) {

  console.log('insertOne data: ' + data);


  const client = await clientPromise;
  const collection = client.db('vista').collection('withdrawers');

  // check same email, then return error

  const checkUser = await collection.findOne<UserProps>(
    { userid: data.userid },
    { projection: { _id: 0, emailVerified: 0 } }
  );

  console.log('checkUser: ' + checkUser);


  if (checkUser) {
    return null;
  }


  // generate id 1000000 ~ 9999999

  const id = Math.floor(Math.random() * 9000000) + 1000000;


  return await collection.insertOne(

    {
      id: id,
      userid: data.userid,
      password: data.password,
      name: data.name,
      nickname: data.nickname,
      avatar: data.avatar,
      regType: data.regType,
      mobile: data.mobile,

      walletAddress: data.walletAddress,
      walletPrivateKey: data.walletPrivateKey,

      createdAt: new Date().toISOString(),

      settlementAmountOfFee: "0",
    }
  );

  

}






export async function getUser(
  id: string,
): Promise<UserProps | null> {

  console.log('getUser id: ' + id);

  const client = await clientPromise;
  const collection = client.db('vista').collection('users');


  // id is number

  const results = await collection.findOne<UserProps>(
    { id: parseInt(id) },
    { projection: { _id: 0, emailVerified: 0 } }
  );


  console.log('getUser results: ' + results);

  return results;

}

export async function getUserWalletPrivateKeyByWalletAddress(
  walletAddress: string,
): Promise<string | null> {

  const client = await clientPromise;
  const collection = client.db('vista').collection('withdrawers');

  const results = await collection.findOne<UserProps>(
    { walletAddress },
    { projection: { _id: 0, emailVerified: 0 } }
  ) as any;

  console.log('getUserWalletPrivateKeyByWalletAddress results: ' + results);

  if (results) {
    return results.walletPrivateKey;
  } else {
    return null;
  }

}


export async function getWithdrawerByUserid(
  userid: string,
): Promise<UserProps | null> {

  console.log('getWithdrawerByUserid userid: ' + userid);

  const client = await clientPromise;
  const collection = client.db('vista').collection('withdrawers');

  const results = await collection.findOne<UserProps>(
    { userid: userid },
    { projection: { _id: 0, emailVerified: 0 } }
  );

  console.log('getWithdrawerByUserid results: ' + results);

  return results;

}



export async function checkUserByEmail(
  email: string,
  password: string,
): Promise<UserProps | null> {

  console.log('getUser email: ' + email);

  const client = await clientPromise;
  const collection = client.db('vista').collection('users');


  const results = await collection.findOne<UserProps>(
    {
      email,
      password,
    },
    { projection: { _id: 0, emailVerified: 0 } }
  );

  ///console.log('getUser results: ' + results);

  if (results) {
    return {
      ...results,
      ///bioMdx: await getMdxSource(results.bio || placeholderBio)
    };
  } else {
    return null;
  }

}


export async function loginUserByEmail(
  email: string,
  password: string,
): Promise<UserProps | null> {

  console.log('getUser email: ' + email);

  const client = await clientPromise;
  const collection = client.db('vista').collection('users');


  const results = await collection.findOne<UserProps>(
    {
      email,
      password,
    },
    { projection: { _id: 0, emailVerified: 0 } }
  );

  if (results) {
    
    // user_login_sesson
    const sessionCollection = client.db('vista').collection('user_login_sessions');
    const sessionResults = await sessionCollection.insertOne({
      id: results.id,
      email: results.email,
      loginedAt: new Date().toISOString(),
    });

    console.log('sessionResults: ' + sessionResults);

    return {
      ...results,
      ...sessionResults,
      ///bioMdx: await getMdxSource(results.bio || placeholderBio)
    }

  } else {
    return null;
  }


}



export async function getFirstUser(): Promise<UserProps | null> {
  const client = await clientPromise;
  const collection = client.db('vista').collection('users');
  const results = await collection.findOne<UserProps>(
    {},
    {
      projection: { _id: 0, emailVerified: 0 }
    }
  );
  if (results) {
    return {
      ...results,
      bioMdx: await getMdxSource(results.bio || placeholderBio)
    };
  } else {
    return null;
  }
}



export async function getAllUsers(
  limit: number,
  page: number,
): Promise<ResultProps> {


  const client = await clientPromise;
  const collection = client.db('vista').collection('users');


  console.log('limit: ' + limit);
  console.log('page: ' + page);

  // walletAddress is not empty and not null

  const users = await collection
    .find<UserProps>(
      {


        walletAddress: { $exists: true, $ne: null },
        walletPrivateKey: { $exists: true, $ne: null },
        

      },
      {
        limit: limit,
        skip: (page - 1) * limit,
      },
      
    )
    .sort({ _id: -1 })
    .toArray();


  const totalCount = await collection.countDocuments(
    {
      walletAddress: { $exists: true, $ne: null },
      walletPrivateKey: { $exists: true, $ne: null },
    }
  );

  return {
    totalCount,
    users,
  };




   
  /*
  return await collection
    .aggregate<ResultProps>([

      {
        $match: {
          status : 'active',
        }
      },
      {
        //sort by follower count
        $sort: {
          followers: -1
        }
      },
      
      {
        $limit: limit,
        /////$skip: (page - 1) * limit, // skip the first n documents
      },
 

      {
        $group: {

          _id: {
            $toLower: { $substrCP: ['$name', 0, 1] }
          },

          users: {
            $push: {

              id: '$id',
              name: '$name',
              nickname: '$nickname',
              email: '$email',
              avatar: '$avatar',
              regType: '$regType',
              mobile: '$mobile',
              gender: '$gender',
              weight: '$weight',
              height: '$height',
              birthDate: '$birthDate',
              purpose: '$purpose',
              marketingAgree: '$marketingAgree',
              createdAt: '$createdAt',
              updatedAt: '$updatedAt',
              deletedAt: '$deletedAt',
              loginedAt: '$loginedAt',
              followers : '$followers',
              emailVerified: '$emailVerified',

            }
          },
          count: { $sum: 1 }
        }
      },
      
      {
        //sort alphabetically
        $sort: {
          _id: 1
        }
      }
      
    ])
    .toArray();
    */

  
}





export async function searchUser(query: string): Promise<UserProps[]> {
  const client = await clientPromise;
  const collection = client.db('vista').collection('users');

  
  return await collection
    .aggregate<UserProps>([
      {
        $search: {
          index: 'name-index',
          /* 
          name-index is a search index as follows:

          {
            "mappings": {
              "fields": {
                "followers": {
                  "type": "number"
                },
                "name": {
                  "analyzer": "lucene.whitespace",
                  "searchAnalyzer": "lucene.whitespace",
                  "type": "string"
                },
                "username": {
                  "type": "string"
                }
              }
            }
          }

          */
          text: {
            query: query,
            path: {
              wildcard: '*' // match on both name and username
            },
            fuzzy: {},
            score: {
              // search ranking algorithm: multiply relevance score by the log1p of follower count
              function: {
                multiply: [
                  {
                    score: 'relevance'
                  },
                  {
                    log1p: {
                      path: {
                        value: 'followers'
                      }
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        // filter out users that are not verified
        $match: {
          verified: true
        }
      },
      // limit to 10 results
      {
        $limit: 10
      },
      {
        $project: {
          _id: 0,
          emailVerified: 0,
          score: {
            $meta: 'searchScore'
          }
        }
      }
    ])
    .toArray();
}

export async function getUserCount(): Promise<number> {
  const client = await clientPromise;
  const collection = client.db('vista').collection('users');
  return await collection.countDocuments();
}



export async function updateUser(username: string, bio: string) {
  const client = await clientPromise;
  const collection = client.db('vista').collection('users');
  return await collection.updateOne({ username }, { $set: { bio } });
}




export async function checkUser(id: string, password: string): Promise<UserProps | null> {
  

  const client = await clientPromise;
  const collection = client.db('vista').collection('users');
  const results = await collection.findOne<UserProps>(
    {
      id,
      password,
    },
    { projection: { _id: 0, emailVerified: 0 } }
  );
  if (results) {
    return {
      ...results,
      //bioMdx: await getMdxSource(results.bio || placeholderBio)
    };
  } else {
    return null;
  }
}









export async function getAllUsersForSettlementOfStore(
  limit: number,
  page: number,
): Promise<ResultProps> {


  const client = await clientPromise;
  const collection = client.db('vista').collection('users');


  console.log('limit: ' + limit);
  console.log('page: ' + page);

  // walletAddress is not empty and not null

  const users = await collection
    .find<UserProps>(
      {


        walletAddress: { $exists: true, $ne: null },
        walletPrivateKey: { $exists: true, $ne: null },

        // when settlementAmountOfFee is exist, check settlementAmountOfFee is 0

        settlementAmountOfFee: {
          $exists: true,
          $eq: "0"
        }, 

      },
      {
        limit: limit,
        skip: (page - 1) * limit,
      },
      
    )
    .sort({ _id: -1 })
    .toArray();


  const totalCount = await collection.countDocuments(
    {
      walletAddress: { $exists: true, $ne: null },
      walletPrivateKey: { $exists: true, $ne: null },
    }
  );

  return {
    totalCount,
    users,
  };

}




// update settlementAmountOfFee for User collection
export async function updateSettlementAmountOfFee(
  walletAddress: string,
  settlementAmountOfFee: string,
) {

  console.log('updateSettlementAmountOfFee walletAddress: ' + walletAddress + ' settlementAmountOfFee: ' + settlementAmountOfFee);
  
  const client = await clientPromise;
  const collection = client.db('vista').collection('users');

  return await collection.updateOne(
    { walletAddress },
    {
      $set: {
        settlementAmountOfFee,
      }
    }
  );
  
  }

// getAllUsersForSettlementOfFee

export async function getAllUsersForSettlementOfFee(
  limit: number,
  page: number,
): Promise<ResultProps> {


  const client = await clientPromise;
  const collection = client.db('vista').collection('users');


  console.log('limit: ' + limit);
  console.log('page: ' + page);

  // walletAddress is not empty and not null

  const users = await collection
    .find<UserProps>(
      {


        walletAddress: { $exists: true, $ne: null },
        walletPrivateKey: { $exists: true, $ne: null },

        // when settlementAmountOfFee is exist, check convert settlementAmountOfFee to float number and check settlementAmountOfFee is greater than 0

        settlementAmountOfFee: {
          $exists: true,
          $ne: "0"
        }, 

      },
      {
        limit: limit,
        skip: (page - 1) * limit,
      },
      
    )
    .sort({ _id: -1 })
    .toArray();


  const totalCount = await collection.countDocuments(
    {
      walletAddress: { $exists: true, $ne: null },
      walletPrivateKey: { $exists: true, $ne: null },
    }
  );

  return {
    totalCount,
    users,
  };

}
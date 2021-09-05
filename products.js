const { GraphQLClient, gql } = require('graphql-request')
const MongoClient = require('mongodb').MongoClient;
const db = require("./config/db.js")

async function main() {
  const endpoint = 'https://securecod4.myshopify.com/admin/api/2020-07/graphql.json'

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
        'Content-Type': 'application/json',
        authorization: 'Basic ZTM1MTljZThkMmI3Mjc1MDIxMDgwMGYzYmE3MTE1ZjI6YTg3NTIyY2MyZTI1NTFlNDM1NDlhY2ViNTJlNWQxNDE=',
    },
  })

  MongoClient.connect(db.url, async (err, database) => {

    let flag = false;
    let cursor = "";
    while(true) {
        const query = gql`
            {
                products(first: 250 ${flag ? ',after: "'+cursor+'"' : ''}) {
                    edges {
                        cursor
                        node {
                            id
                            handle
                            title
                            description
                            productType
                        }
                    }
                    pageInfo {
                        hasNextPage
                    }
                }
            }
        `;  

        const data = await graphQLClient.request(query)
        if(data.products.pageInfo.hasNextPage)
        {
            let manyData = [];
            flag = true
            data.products.edges.forEach(element => {
                cursor = element.cursor
                manyData.push(element.node)
            });

            await database.collection('products').insertMany(manyData)
        } else { 
            flag = false
            console.log(flag);
            return '';
        }
    }
  })
}

main().catch((error) => console.error(error))
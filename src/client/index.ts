import { request, GraphQLClient, gql } from 'graphql-request'
const baseURL = 'https://countries.trevorblades.com'
const graphQLClient = new GraphQLClient(baseURL)
const query = gql`
    {
        countries {
            code 
            emoji
            emojiU
            native
            phone
            name
        }
   }
`

type Country = {
    code: string,
    name: string,
    emoji: string
}


const getCountries = async (page: number, size: number) => {

    const { countries }: { countries: Array<Country> } = await graphQLClient.request(query)
    return countries.slice(page * size, page * size + size)
}
export type { Country };

export {
    getCountries
}
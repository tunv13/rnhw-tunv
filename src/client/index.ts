import { GraphQLClient, gql } from 'graphql-request'
const baseURL = 'https://countries.trevorblades.com'
const graphQLClient = new GraphQLClient(baseURL)
const query = gql`
    {
        countries {
            code 
            emoji
            capital
            phone
            name
            continent {
                name
                code
            }
        }
   }
`

const queryWithContinent = gql`
    query getCountries($title: String!){
        countries(filter: {
            continent: {
                eq:$title
            }}) {
            code 
            emoji
            capital
            phone
            name
            continent {
                name
                code
            }
        }
    }
`

type Country = {
    code: string,
    phone: string,
    name: string,
    capital: string,
    emoji: string
    continent: { name: string, code: string }
}

const getCountriesWithContinent = async (title: string) => {

    const variables = {
        title
    }
    const { countries }: { countries: Array<Country> } = await graphQLClient.request(queryWithContinent, variables)
    return countries
}


const getCountries = async (page: number, size: number) => {

    const { countries }: { countries: Array<Country> } = await graphQLClient.request(query)
    return countries.slice(page * size, page * size + size)
}
export type { Country };

export {
    getCountries,
    getCountriesWithContinent
}
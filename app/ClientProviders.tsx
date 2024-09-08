"use client";

import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client";
import { ReactNode } from "react";

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: `/api/graphql`,
        fetch: async (uri, options) => {
            console.log('Fetching:', uri, options);
            const response = await fetch(uri, {
                redirect: 'follow',
                ...options
            });
            console.log('Redirected:', response.redirected);
            console.log('URL:', response.url);
            
            if (response.redirected) {
                window.location.href = response.url;
            }
            return response;
        }
    }),
});

export default function ClientProviders({ children }: { children: ReactNode }) {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

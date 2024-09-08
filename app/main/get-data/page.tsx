"use client";
import styles from './Global.module.css';
import { gql, useLazyQuery } from "@apollo/client";
import { useState } from "react";
import Link from "next/link";

export default function GetData() {
    const [products, setProducts] = useState<any[]>([]);
    const [message, setMessage] = useState<string>('');

    const [getGraphQl] = useLazyQuery(gql`
        {
            products(first: 10) {
                edges {
                    node {
                        id
                        title
                        priceRangeV2 {
                            maxVariantPrice {
                                amount
                                currencyCode
                            }
                            minVariantPrice {
                                amount
                                currencyCode
                            }
                        }
                    }
                }
            }
        }
    `, {
        onCompleted: (data) => setProducts(data.products.edges)
    });

    const getApi = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const response = await fetch('/api/hello', { method: "GET" });
        const result = await response.text();
        setMessage(result);
    };

    return (
        <div className={styles.container}>
            <Link href="/main">
                <a className={styles.back}>&larr;</a> {/* Simplified Link usage */}
            </Link>
            <main className={styles.main}>
                <h1 className={styles.title}>Get Data</h1>
                <p className={styles.description}>
                    View the examples in{' '}
                    <code className={styles.code}>app/get-data/page.tsx</code> {/* Updated reference */}
                </p>
                <div>
                    <div className={styles.card}>
                        <h2>Get Data from Shopify&apos;s GraphQL API</h2>
                        <button className={styles.button} onClick={() => getGraphQl()}>Fetch</button>
                        {
                            products.map(p => (
                                <div key={p.node.id} className={styles.listItem}>
                                    <h2>{p.node.title}</h2>
                                    <p>
                                        {parseFloat(p.node.priceRangeV2.minVariantPrice.amount).toLocaleString("en-US", {
                                            style: "currency",
                                            currency: p.node.priceRangeV2.minVariantPrice.currencyCode
                                        })}
                                    </p>
                                </div>
                            ))
                        }
                    </div>
                    <div className={styles.card}>
                        <h2>Get Data from Your Own API</h2>
                        <button className={styles.button} onClick={getApi}>Fetch</button>
                        <h2>{message}</h2>
                    </div>
                </div>
            </main>
        </div>
    );
}

"use client";

import styles from './Global.module.css';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import Link from 'next/link';

const CREATE_SUBSCRIPTION = gql`
  mutation CreateSubscription(
    $returnString: URL!
    $planName: String!
    $planPrice: Decimal!
  ) {
    appSubscriptionCreate(
      name: $planName
      returnUrl: $returnString
      test: true
      lineItems: [
        {
          plan: {
            appRecurringPricingDetails: {
              price: { amount: $planPrice, currencyCode: USD }
            }
          }
        }
      ]
    ) {
      userErrors {
        field
        message
      }
      confirmationUrl
      appSubscription {
        id
        status
      }
    }
  }
`;

const GET_ACTIVE_SUBSCRIPTIONS = gql`
  {
    appInstallation {
      activeSubscriptions {
        name
        status
        lineItems {
          plan {
            pricingDetails {
              ... on AppRecurringPricing {
                __typename
                price {
                  amount
                  currencyCode
                }
                interval
              }
            }
          }
        }
        test
      }
    }
  }
`;

export default function Subscriptions() {
  const [createSubscriptionMutation] = useMutation(CREATE_SUBSCRIPTION, {
    onCompleted: (data) => {
      if (data.appSubscriptionCreate.confirmationUrl) {
        window.location.href = data.appSubscriptionCreate.confirmationUrl; // Ensuring the redirection works correctly
      }
    },
  });

  const returnString = `${process.env.SHOPIFY_APP_URL}/main/subscriptions`;

  const createSubscription = async (name: string, price: number) => {
    await createSubscriptionMutation({
      variables: {
        returnString,
        planName: name,
        planPrice: price,
      },
    });
  };

  const [activeSubscriptions, setActiveSubscriptions] = useState<any[]>([]);

  const [getActiveSubscriptions] = useLazyQuery(GET_ACTIVE_SUBSCRIPTIONS, {
    onCompleted: (data) =>
      setActiveSubscriptions(data.appInstallation.activeSubscriptions),
    fetchPolicy: 'network-only',
  });

  return (
    <div className={styles.container}>
      <Link href="/main">
        <a className={styles.back}>&larr;</a> {/* Simplified Link usage */}
      </Link>
      <main className={styles.main}>
        <h1 className={styles.title}>Manage Subscriptions</h1>
        <p className={styles.description}>
          View the examples in{' '}
          <code className={styles.code}>app/subscriptions/page.tsx</code> {/* Updated reference */}
        </p>
        <h2>Create a new subscription</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Starter</h2>
            <p>Create a $10 per month subscription.</p>
            <button
              className={styles.button}
              onClick={() => createSubscription('Starter', 10)}
            >
              Subscribe
            </button>
          </div>
          <div className={styles.card}>
            <h2>Advanced</h2>
            <p>Create a $30 per month subscription.</p>
            <button
              className={styles.button}
              onClick={() => createSubscription('Advanced', 30)}
            >
              Subscribe
            </button>
          </div>
          <div className={styles.card}>
            <h2>Professional</h2>
            <p>Create a $70 per month subscription.</p>
            <button
              className={styles.button}
              onClick={() => createSubscription('Professional', 70)}
            >
              Subscribe
            </button>
          </div>
        </div>
        <h2>Get active subscriptions</h2>
        <div className={styles.card}>
          <h2>Active Subscriptions</h2>
          <button
            className={styles.button}
            onClick={() => getActiveSubscriptions()}
          >
            Fetch
          </button>
          {activeSubscriptions.length > 0 && (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {activeSubscriptions.map((sub) => {
                  const price = sub.lineItems[0].plan.pricingDetails.price;
                  return (
                    <tr key={sub.name}>
                      <td>{sub.name}</td>
                      <td>{sub.status}</td>
                      <td>
                        {parseFloat(price.amount).toLocaleString('en-US', {
                          style: 'currency',
                          currency: price.currencyCode,
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}

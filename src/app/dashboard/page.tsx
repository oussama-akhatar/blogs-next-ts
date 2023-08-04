"use client"
import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import useSWR from 'swr';
import styles from './page.module.scss';
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const [data, setData] = useState<any>();
  const [err, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const session = useSession();
  const route = useRouter();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const res = await fetch("http://localhost:9000/posts", { cache: "no-store" });
      if (!res.ok) {
        setError(true);
        throw new Error('Failed to fetch data');
      }

      const data = await res.json();

      setLoading(false);

      setData(data);
    }

    getData();
  }, []);

  useEffect(() => {
    // Redirect to login if the session is unauthenticated
    if (session.status === "unauthenticated") {
      route.push('/dashboard/login');
    }
  }, [session.status, route]);

  if (session.status === "loading") {
    return <p>Loadding ...</p>;
  }

  if (session.status === "authenticated") {
    return (
      <div>Dashboard</div>
    );
  }
};

export default Dashboard;
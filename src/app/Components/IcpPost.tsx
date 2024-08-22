'use client'

import { useState, useEffect } from 'react';

interface Listing {
  date_applied: string;
  co_name: string;
  position: string;
  contact: string;
  url: string;
  notes: string;
}

export default function IcpPost() {
  const [icpList, setIcpList] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function showListings() {
      try {
        const response = await fetch('/api/listings');
        if (!response.ok) {
          throw new Error('Failed to fetch listings');
        }
        const data = await response.json();
        setIcpList(data);
      } catch (err) {
        console.error('listings error:', err);
        setError('listings unavailable');
      } finally {
        setIsLoading(false);
      }
    }

    showListings();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div>listings</div>

      {icpList.slice().reverse().map((item: Listing, index: number) => (
        <div key={index} className='icp-card border border-gray-300 rounded-lg w-[500px] mt-8 p-4 '>
          <div>{item.date_applied}</div>
          <div>{item.co_name}</div>
          <div>{item.position}</div>
          <div>{item.contact}</div>
          <div>{item.url}</div>
          <div>{item.notes}</div>
        </div>
      ))}
    </>
  )
}
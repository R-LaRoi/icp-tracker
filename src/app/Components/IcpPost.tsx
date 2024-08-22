'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { DeleteBtn } from './DeleteBtn';

interface Listing {
  _id: string;
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
        setError('Listings unavailable');
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
      <div>Listings</div>
      {icpList.slice().reverse().map((item: Listing, index: number) => {
        const dateApplied = new Date(item.date_applied);

        const formattedDate = dateApplied.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

        return (
          <div key={index} className='icp-card border border-gray-300 rounded-lg w-[500px] mt-8 p-4'>
            <div>{formattedDate}</div>
            <div>{item.co_name}</div>
            <div>{item.position}</div>
            <div>{item.contact}</div>
            <Link href={item.url}>
              <div className="text-blue-500 underline cursor-pointer">Link</div>
            </Link>
            <div>{item.notes}</div>
            {/* <DeleteBtn _id={item._id} /> */}
          </div>
        );
      })}
    </>
  );
}
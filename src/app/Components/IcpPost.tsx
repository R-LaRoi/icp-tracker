'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';

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


  async function deleteItem(_id: string) {
    console.log('Attempting to delete item with id:', _id);
    try {
      const response = await fetch(`/api/listings/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const responseText = await response.text();
      console.log('Raw response:', responseText);

      if (!response.ok) {
        throw new Error(`Failed to delete item: ${response.status} ${response.statusText}`);
      }

      const result = JSON.parse(responseText);
      console.log(result.message);
      // Update UI here
    } catch (error) {
      console.error('Error deleting item:', error);
      // Show error to user here
    }
  }

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
          <div key={index} className='icp-card h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent  w-full m-4'>
            <div className='entity p-6 m-14'>
              <div>{formattedDate}</div>
              <div>{item.co_name}</div>
              <div>{item.position}</div>
              <div>{item.contact}</div>
              <Link href={item.url}>
                <div className="cursor-pointer">

                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>


                </div>
              </Link>
              <div>{item.notes}</div>

              <button onClick={() => deleteItem(item._id)}> <svg xmlns="http://www.w3.org/2000/svg" fill="#A679FF" viewBox="0 0 24 24" strokeWidth={.8} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z" />
              </svg>

              </button> </div>

          </div>
        );
      })}
    </>
  );
}
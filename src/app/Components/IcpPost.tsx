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
                <div className="text-blue-500 underline cursor-pointer">Link</div>
              </Link>
              <div>{item.notes}</div>

              <button onClick={() => deleteItem(item._id)}>delete</button> </div>


            {/* <DeleteBtn _id={item._id} /> */}
          </div>
        );
      })}
    </>
  );
}
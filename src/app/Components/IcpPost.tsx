'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import DeleteBtn from './DeleteBtn';


interface Listing {
  _id: string;
  date_applied: string;
  co_name: string;
  position: string;
  contact: string;
  url: string;
  notes: string;
}

interface DeleteItemProps {
  _id: string;
  redirectPath: string

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
      {icpList.slice().reverse().map((item: Listing, index: number) => {
        const dateApplied = new Date(item.date_applied);
        const formattedDate = dateApplied.toLocaleDateString('en-US', { month: 'long', day: 'numeric', timeZone: 'UTC' });

        return (

          <div key={index} className='icp-card h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent  w-full m-4'>
            <div className='entity p-2 m-16'>
              <div className="entity-left">
                <div>{formattedDate}</div>
              </div>
              <div className="entity-middle">
                <div>{item.co_name}</div>
                <div>{item.position}</div>
              </div>

              <div className="entity-right">
                <div>{item.notes}</div>
                <Link href={item.url}>
                  <div className="cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </div>
                </Link>
                <DeleteBtn _id={item._id} />
              </div>
            </div>

          </div>


        );
      })}
    </>
  );
}
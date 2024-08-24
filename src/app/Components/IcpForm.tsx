'use client'

import { useState } from 'react';
import icpImg from '../../../public/icpsquares.png'
import Image from 'next/image';
export default function IcpForm() {

  const [formData, setFormData] = useState({
    company: '',
    position: '',
    companyLink: '',
    date: '',
    contact: '',
    notes: '',
  });
  const [openForm, setOpenForm] = useState(false)

  function formInput(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {

    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

  }


  function formSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    fetch('/api/listings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        co_name: formData.company,
        position: formData.position,
        url: formData.companyLink,
        date_applied: formData.date,
        contact: formData.contact,
        notes: formData.notes,
      }),
    })
      .then((response) => {

        if (!response.ok) {
          throw new Error('Failed to submit the form');
        }
        return response.json();
      })
      .then((result) => {
        console.log('Form submitted successfully:', result);

        setFormData({
          company: '',
          position: '',
          companyLink: '',
          date: '',
          contact: '',
          notes: '',
        });
      })
      .catch((error) => {

      });
  };

  function showForm() {
    console.log('show form')
    setOpenForm(!openForm)
  }

  return (
    <>
      <section className='header mt-10 pt-10 '>
        <div className='header-txt'>
          <div className="text-7xl font-bold m-4 p-5">
            <span className='text-pink-600 '>Define </span>your path and  <span className='text-orange-400 mx-2'>take action </span>
            <span className=''>today.</span>
          </div>
          <p className='text-white text-xl m-4 p-5 '>
            This application is designed to help you visualize and monitor your future opportunities. Let&aposs move closer to achieving your goals!</p>

          <button onClick={showForm}
            className='bg-gradient-to-r from-pink-500 to-violet-600 px-6 py-3 uppercase rounded-full w-[175px] ml-8'>NEW</button>
        </div>

        {openForm ? <div className="form-- p-4 rounded-lg shadow-md w-[900px] overflow-auto">
          <form className="grid grid-cols-2 gap-4" onSubmit={formSubmit}>
            <div className="col-span-2">
              <input type="text"
                className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-pink-600 bg-transparent"
                id="company"
                name="company"
                value={formData.company}
                onChange={formInput}
                placeholder="Enter company name" />
            </div>

            <div>

              <input type="text" id="position" className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-pink-600 bg-transparent"
                name="position"
                value={formData.position}
                onChange={formInput}
                placeholder="Enter position title" />
            </div>


            <div>

              <input type="url"
                id="companyLink"
                name="companyLink"
                value={formData.companyLink}
                onChange={formInput}
                className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-pink-600 bg-transparent" placeholder="url" />
            </div>

            <div>

              <input type="date" id="date" className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-pink-600 bg-transparent"
                name="date"
                value={formData.date}
                onChange={formInput} />
            </div>


            <div>

              <input type="text" id="contact" className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-pink-600 bg-transparent"
                name="contact"
                value={formData.contact}
                onChange={formInput}
                placeholder="Enter contact information" />
            </div>


            <div className="col-span-2">

              <textarea id="notes" name="notes" rows={2}
                value={formData.notes}
                onChange={formInput}
                className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-pink-600 bg-transparent" placeholder="Enter any additional information"></textarea>
            </div>


            <div className="col-span-2">
              <button type="submit" className="w-full bg-pink-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Submit</button>
            </div>
          </form>
        </div>
          :
          <Image className='icpsq' src={icpImg} alt="colored logo squares" />



        }


      </section>


    </>
  )
}
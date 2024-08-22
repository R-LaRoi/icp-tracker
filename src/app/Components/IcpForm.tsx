'use client'

import { useState } from 'react';

export default function IcpForm() {

  const [formData, setFormData] = useState({
    company: '',
    position: '',
    companyLink: '',
    date: '',
    contact: '',
    notes: '',
  });

  function formInput(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {

    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

  }


  function formSubmit(e: React.FormEvent<HTMLFormElement>) {
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
        console.error('Error submitting form:', error);
      });
  };

  return (
    <>
      <div className="bg-white p-8 rounded-lg shadow-md w-[600px] h-[500px] overflow-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">ICP TRACKER</h2>
        <form className="grid grid-cols-2 gap-4" onSubmit={formSubmit}>

          <div className="col-span-2">
            <label htmlFor="company" className="block text-gray-700 font-medium mb-1">Company</label>
            <input type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="company"
              name="company"
              value={formData.company}
              onChange={formInput}
              placeholder="Enter company name" />
          </div>

          <div>
            <label htmlFor="position" className="block text-gray-700 font-medium mb-1">Position</label>
            <input type="text" id="position" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="position"
              value={formData.position}
              onChange={formInput}
              placeholder="Enter position title" />
          </div>


          <div>
            <label htmlFor="companyLink" className="block text-gray-700 font-medium mb-1">Company Link</label>
            <input type="url"
              id="companyLink"
              name="companyLink"
              value={formData.companyLink}
              onChange={formInput}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter company website URL" />
          </div>

          <div>
            <label htmlFor="date" className="block text-gray-700 font-medium mb-1">Date</label>
            <input type="date" id="date" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="date"
              value={formData.date}
              onChange={formInput} />
          </div>


          <div>
            <label htmlFor="contact" className="block text-gray-700 font-medium mb-1">Contact</label>
            <input type="text" id="contact" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="contact"
              value={formData.contact}
              onChange={formInput}
              placeholder="Enter contact information" />
          </div>


          <div className="col-span-2">
            <label htmlFor="notes" className="block text-gray-700 font-medium mb-1">Additional Information</label>
            <textarea id="notes" name="notes" rows={2}
              value={formData.notes}
              onChange={formInput}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter any additional information"></textarea>
          </div>


          <div className="col-span-2">
            <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Submit</button>
          </div>
        </form>
      </div>
    </>
  )
}
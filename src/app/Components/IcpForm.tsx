

export default async function IcpForm() {



  return (
    <>
      <div className="bg-white p-8 rounded-lg shadow-md w-[600px] h-[500px] overflow-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">ICP TRACKER</h2>
        <form className="grid grid-cols-2 gap-4">

          <div className="col-span-2">
            <label htmlFor="company" className="block text-gray-700 font-medium mb-1">Company</label>
            <input type="text" id="company" name="company" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter company name" />
          </div>

          <div>
            <label htmlFor="position" className="block text-gray-700 font-medium mb-1">Position</label>
            <input type="text" id="position" name="position" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter position title" />
          </div>


          <div>
            <label htmlFor="companyLink" className="block text-gray-700 font-medium mb-1">Company Link</label>
            <input type="url" id="companyLink" name="companyLink" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter company website URL" />
          </div>

          <div>
            <label htmlFor="date" className="block text-gray-700 font-medium mb-1">Date</label>
            <input type="date" id="date" name="date" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>


          <div>
            <label htmlFor="contact" className="block text-gray-700 font-medium mb-1">Contact</label>
            <input type="text" id="contact" name="contact" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter contact information" />
          </div>


          <div className="col-span-2">
            <label htmlFor="additionalInfo" className="block text-gray-700 font-medium mb-1">Additional Information</label>
            <textarea id="additionalInfo" name="additionalInfo" rows={1} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter any additional information"></textarea>
          </div>


          <div className="col-span-2">
            <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Submit</button>
          </div>
        </form>
      </div>
    </>
  )
}
import { useState } from "react";

import Modal from "./Modal";

interface DeleteItemProps {
  _id: string;

}

export default function DeleteBtn({ _id }: DeleteItemProps) {

  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')

  async function deleteItem() {

    try {
      const response = await fetch(`/api/listings/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const responseText = await response.text();
      setShowModal(true)
      setModalMessage('✅ Your listing was deleted.')

      setTimeout(() => {
        window.location.reload()
      }, 1500);

      if (!response.ok) {
        throw new Error(`Failed to delete item: ${response.status} ${response.statusText}`);
      }

      const result = JSON.parse(responseText);
      console.log(result.message);

    } catch (error) {
      console.error('Error deleting item:', error);

    }
  }; return (

    <>

      <button className="hover:bg-pink-600 p-1 rounded-full" onClick={deleteItem}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>

      </button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        {modalMessage}
      </Modal>
    </>

  )



}



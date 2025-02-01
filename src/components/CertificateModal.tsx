import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CertificateModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [certificateUrl, setCertificateUrl] = useState('');

  useEffect(() => {
    const handleOpenModal = (event: CustomEvent<{ certificateUrl: string }>) => {
      setCertificateUrl(event.detail.certificateUrl);
      setIsOpen(true);
    };

    document.addEventListener('openCertificateModal', handleOpenModal as EventListener);

    return () => {
      document.removeEventListener('openCertificateModal', handleOpenModal as EventListener);
    };
  }, []);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg max-w-3xl max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={certificateUrl} alt="Certificate" className="w-full h-auto" />
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              onClick={closeModal}
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CertificateModal;


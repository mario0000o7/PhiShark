import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';



// Komponent modalny
const MyModal = ({ isOpen, onRequestClose, children }) => {
    const [navbarHeight, setNavbarHeight] = useState(0);

    const handleResize = () => {
        const navbar = document.getElementById('navbar');
        if (navbar) {
        setNavbarHeight(navbar.offsetHeight);
        }
    };
    const modalStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            zIndex: 1001,
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
          content: {
            padding: 0,
            margin: 0,
            left: '50%', 
            top: 0, 
            bottom: 0,
            transform: 'translate(-50%, -50%)', 
            position: 'relative',
            background: 'transparent',
            border: 'none',
            minWidth: '100vw', 
            maxHeight: '100%',
            overflow: 'auto',
          },
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleCloseModal = () => {
        document.body.style.overflow = 'scroll';
        onRequestClose();
      };
    
      const handleOpenModal = () => {
        document.body.style.overflow = 'hidden';
      };
  return (
        <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      style={modalStyles}
      contentLabel="Modal"
      onAfterOpen={handleOpenModal}
    >
      {children}
    </Modal>
  );
};

export default MyModal;
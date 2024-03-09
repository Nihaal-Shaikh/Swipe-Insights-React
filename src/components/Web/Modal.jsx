import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";

const Modal = forwardRef(function Modal({ onReset, type }, ref) {

    const dialog = useRef();
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen && type !== 'noImages') {
            const countdownInterval = setInterval(() => {
                setCountdown((prevCountdown) => (prevCountdown > 0 ? prevCountdown - 1 : 0));
            }, 1000);

            return () => {
                clearInterval(countdownInterval);
            };
        }
    }, [isOpen]);

    useEffect(() => {
        // When the countdown reaches 0, call handleReset
        if (countdown === 0) {
            handleReset();
        }
    }, [countdown]);

    useImperativeHandle(ref, () => {
        return {
            open() {
                setIsOpen(true);
                dialog.current.showModal();
            },
            close() {
                setIsOpen(false);
                dialog.current.close();
                setCountdown(5); // Reset countdown when the dialog is closed
            }
        };
    });

    const handleReset = (event) => {
        // Clear all items in localStorage
        localStorage.clear();
        // Call the provided onReset function
        onReset;
        navigate("/");
    };

    return createPortal(
        <dialog ref={dialog} className="result-modal" onClose={onReset}>
            {type !== 'noImages' ? (
                <>
                    <p>Thank you for your insights!</p>
                    <p>You will be logged out in</p>
                    <p>{countdown}</p>
                </>
            ) : (
                <>
                    <p>Sorry! There are no images available to swipe at the moment</p>
                    <p>Please try again another time</p>
                </>
            )}
            <form method="dialog" onSubmit={handleReset}>
                <button>Close</button>
            </form>
        </dialog>,
        document.getElementById('modal')
    );
})

export default Modal;
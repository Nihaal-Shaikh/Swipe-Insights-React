import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { useAuth } from "../store/AuthContext";

const FinalModal = forwardRef(function FinalModal({ onReset }, ref) {

    const dialog = useRef();
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
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
        // Invoke logout when the close button is clicked
        logout();
        // Call the provided onReset function
        onReset;
        navigate("/");
    };

    return createPortal(
        <dialog ref={dialog} className="result-modal" onClose={onReset}>
            <p>Thank you for your insights!</p>
            <p>You will be logged out in</p>
            <p>{countdown}</p>
            <form method="dialog" onSubmit={handleReset}>
                <button>Close</button>
            </form>
        </dialog>,
        document.getElementById('modal')
    );
})

export default FinalModal;
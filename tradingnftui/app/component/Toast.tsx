import { toast } from 'react-toastify';

const ShowToast = (message: string) => {
    toast.error(message, {
        position: 'top-right',
        theme: 'light',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

export default ShowToast

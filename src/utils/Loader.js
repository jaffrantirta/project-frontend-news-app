import Swal from 'sweetalert2'

export default function Loader({ title, text = 'Mohon tunggu...' }) {
    return Swal.fire({
        title: title,
        text: text,
        showConfirmButton: false,
        allowOutsideClick: false,
    })
}

// yup buat preulumpicregistration
// setting error checking disini
import * as yup from 'yup';

export const validation = yup.object().shape({
    nama: yup.string()
        .required('Tolong masukkan Nama')
        .max(255, 'Nama maksimal 255 huruf'),
    angkatan: yup.string()
        .required('Tolong masukkan Angkatan')
        .max(4, 'Tolong maasukkan Angkatan yang benar'),
    jurusan: yup.string()
        .required('Tolong masukkan Jurusan'),
    phoneNumber: yup.string()
        .required('Tolong masukkan nomor Telp Whatsapp')
        .min(11, 'Tolong masukkan nomor Telp yang benar')
        .max(14, 'Tolong masukkan nomor Telp yang benar'),
    userId: yup.string()
        .required('Tolong masukkan user Id')
        .min(4, 'Tolong masukkan user Id yang benar')
        .max(20, 'Tolong masukkan user Id yang benar'),
    userName: yup.string()
        .required('Tolong masukkan user name'),
    fotoKtm: yup.mixed()
        .required("Mohon upload fotoKTM"),
        // .test("type", "Tipe file harus JPG atau PNG", (value) => {
        //     return value &&(
        //         value[0].fileType === "image/jpeg" ||
        //         value[0].fileType === "image/png" ||
        //         value[0].fileType === "image/jpg"
        //     );
        // }),
    buktiJoin: yup.mixed()
        .required("Mohon upload file bukti join")
        // .test("fileType", "Tipe file harus JPG atau PNG", (value) => {
        //     if (value) {
        //         const fileType = value.type;
        //         return (
        //             fileType === "image/jpeg" ||
        //             fileType === "image/png" ||
        //             fileType === "image/jpg"
        //         );
        //     }
        //     return true;
        // })
});

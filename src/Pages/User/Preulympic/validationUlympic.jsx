// yup buat preulumpicregistration
// setting error checking disini
import * as yup from 'yup';

export const validation = yup.object().shape({
    teamName: yup.string()
        .required('Tolong masukkan nama Tim'),
    numberOfPlayers: yup.string()
        .required('Jumlah pemain harus diisi')
        .min(5, 'Jumlah Player minimal 5')
        .max(7, 'Jumlah Player maksimal 7')
        .test(
            'max',
            'Jumlah Player maksimal 7',
            (value) => value <= 7
        )
        .test(
            'min',
            'Jumlah Player minimal 5',
            (value) => value >= 5
        ),
});

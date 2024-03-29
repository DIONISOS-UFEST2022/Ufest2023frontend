import { useState } from 'react';
import "./Profile.scss"
import { getRequest } from '../../Service/AxiosClient';
import { useDispatch, useSelector } from 'react-redux';
import { userRoleAdded } from '../../../Redux/features/users/userRoleSlice';
import { Modal } from "@mui/material";
import { selectuserName } from '../../../Redux/features/users/userRoleSlice';
import { selectuserNim } from '../../../Redux/features/users/userRoleSlice';
import CustomButton from '../../Button/Button';
import Avatar from '@mui/material/Avatar';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { checkVerify } from '../../../Redux/features/users/userRoleSlice';
import { Button } from '../../MaterialUICoreLazy/MaterialUIMaterialLazy';

export default function Profile(props) {
    const dispatch = useDispatch();
    const Verify = useSelector(checkVerify);
    const name = useSelector(selectuserName);
    const nim = useSelector(selectuserNim);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [loading, Setloading] = useState(false);
    const navigate = useNavigate();
    async function LogOut() {
        Setloading(true);
        try {
            await getRequest("logout")
                .then((res) => {
                    console.log(res);
                    if (res.data.success === true) {
                        localStorage.removeItem('LoginID');
                        dispatch(userRoleAdded('guest'));
                        Setloading(false);
                        navigate("/");
                        window.location.reload();
                    }
                    else {
                        console.log(res.data);
                    }
                })
        } catch (error) {
            console.error(error);
            Setloading(false);
        }
    }

    function goto() {
        navigate("/verify");
        handleClose();
    }
    return (
        <>
            <Modal
                sx={{
                }}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className='Modal-Profile'>
                    <Avatar sx={{ bgcolor: "green", width: "60px", height: "60px" }}>
                    </Avatar>
                    <br />
                    <div className=''>
                        {name} ({nim})
                    </div>
                    <div className='NameDesc' style={{
                        backgroundColor: Verify !== null ? "green" : "red",
                    }}>
                        account status :
                        {Verify !== null ? " Verified" : <>
                            <Button variant="contained" color="error" onClick={goto}>
                                Not Verified, Verify Now
                            </Button>
                        </>}
                    </div>
                    <br />
                    {Verify !== null ? "" : <>

                    </>}
                    <br />
                    <div className='Desc'>
                        <CustomButton onClick={LogOut}>
                            {loading ? <CircularProgress size={20} /> : "Log Out"}
                        </CustomButton>
                    </div>
                </div>
            </Modal>
            <button onClick={handleOpen} className='Profile-Button'>
                <Avatar sx={{ bgcolor: "green", width: "40px", height: "40px" }} />
            </button>
        </>
    );
}
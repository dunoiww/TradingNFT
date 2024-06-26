import ShowToast from '@/app/component/Toast';
import { Button, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface GrantRoleProps {
    handleGrantRole: (role: string, account: string) => void;
}

export default function GrantRole({ handleGrantRole }: GrantRoleProps) {
    const [value, setValue] = React.useState('MINTER');
    const [address, setAddress] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value);
    }

    const process = () => {
        if (!address) {
            ShowToast('Address must be a real address')
            return;
        }
        handleGrantRole(value, address);
    }
    return (
        <div className="border border-gray-300 shadow-md w-full h-72 flex rounded-lg">
            <div className="p-5 w-full relative">
                <p className="font-semibold text-lg">Grant Role:</p>
                <div className="w-full mt-[2%] space-y-2">
                    <div>
                        <p className="tracking-wide text-gray-400 ml-1">Role (bytes32)</p>
                        <Select
                            sx={{
                                // backgroundColor: 'white',
                                background: 'linear-gradient(to right, #4e54c8, #8f94fb)',
                                color: 'black',
                                width: '100%',
                                height: '40px',
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'transparent',
                                },
                                borderTopLeftRadius: 12,
                                borderTopRightRadius: 12,
                                // borderRadius: 2,
                                fontSize: 18,
                            }}
                            MenuProps={{
                                PaperProps: {
                                    sx: {
                                        background: 'linear-gradient(to right, #4e54c8, #8f94fb)', // Gradient for dropdown menu
                                        marginTop: 0.2,
                                    },
                                },
                            }}
                            value={value}
                            onChange={handleChange}
                            label="Status">
                            <MenuItem value="MINTER">MINTER</MenuItem>
                            <MenuItem value="ADMIN">ADMIN</MenuItem>
                        </Select>
                    </div>
                    <div>
                        <p className="tracking-wide text-gray-400 ml-1">Account</p>
                        <input
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            type="text"
                            placeholder="account"
                            className="border border-gray-300 rounded p-2 w-full text-white"
                            style={{ backgroundColor: '#212121' }}
                        />
                    </div>
                </div>
                <div className="absolute bottom-5 w-full left-0 px-5">
                    <div className="w-full flex justify-center">
                        <Button
                            onClick={process}
                            variant="contained"
                            sx={{
                                width: '100%',
                                padding: '0.5rem',
                                backgroundColor: '#ffbf00',
                                color: 'black',
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                '&:hover': {
                                    backgroundColor: '#e6ac00',
                                },
                            }}>
                            Grant Role
                        </Button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

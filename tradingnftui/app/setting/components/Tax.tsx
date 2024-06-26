import ShowToast from '@/app/component/Toast';
import { Box, Button, Slider } from '@mui/material';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface TaxProps {
    handleSetTax: (tax: number) => void;
}

export default function Tax({ handleSetTax }: TaxProps) {
    const [tax, setTax] = React.useState<number>(0);
    const marks = [
        {
            value: 0,
            label: '0%',
        },
        {
            value: 10,
            label: '10%',
        },
        {
            value: 20,
            label: '20%',
        },
        {
            value: 30,
            label: '30%',
        },
    ];

    function valuetext(value: number) {
        return `${value}asdfsladkjfsl`;
      }

    const process = () => {
        if (tax == 0) {
            ShowToast('Tax must be greater than 0');
            return;
        }
        handleSetTax(tax);
    };
    return (
        <div className="border border-gray-300 shadow-md w-full h-72 flex rounded-lg">
            <div className="p-5 w-full relative">
                <p className="font-semibold text-lg">Tax:</p>
                <div className="w-full mt-[2%] space-y-2">
                    <div>
                        <p className="tracking-wide text-gray-400 ml-1">Tax fee (%)</p>
                        <Box>
                            <Slider
                                aria-label="Tax fee"
                                defaultValue={10}
                                getAriaValueText={valuetext}
                                step={1}
                                marks={marks}
                                valueLabelDisplay="auto"
                                max={30}
                                sx={{ color: '#ffbf00', '& .MuiSlider-markLabel': { color: '#ffbf00' } }}
                                onChange={(e, value) => setTax(value as number)}
                            />
                        </Box>
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
                            Set
                        </Button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

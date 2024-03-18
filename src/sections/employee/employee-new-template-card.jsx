import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import {alpha} from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import {fDate} from 'src/utils/format-time';
import {fShortenNumber} from 'src/utils/format-number';

import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';
import RsEmployeeProfile from "../../api/data/RsEmployeeProfile";
import {useRouter} from "../../routes/hooks";

// ----------------------------------------------------------------------

export default function EmployeeNewEventCard({onClick}) {

    const cardIcon = "/assets/icons/ic_add.svg"

    return (
        <Grid xs={12} sm={6} md={3} onClick={onClick} sx={{
            minHeight:'256px'
        }}>
            <Card sx={{
                minHeight: '100%',
            }}>
                <Box
                    component="img"
                    src={cardIcon}
                    sx={{
                        top: '25%',
                        left: '25%',
                        width: '50%',
                        height: '50%',
                        position: 'absolute'
                    }}
                />
            </Card>
        </Grid>
    );
}

EmployeeNewEventCard.propTypes = {
    onClick: PropTypes.func
};

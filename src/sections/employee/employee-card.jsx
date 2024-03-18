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

export default function EmployeeCard({employee}) {

    const router = useRouter();

    const cardBackgroundUrl = employee.cardPictureUrl ? employee.cardPictureUrl : "/assets/ai_trainers/ai_personal_trainer_1.webp"

    const handleClick = () => {
        router.push(`/employee-profile?employeeId=${employee.id}`)
    }

    const renderCover = (
        <Box
            component="img"
            alt={employee.firstName}
            src={cardBackgroundUrl}
            sx={{
                top: 0,
                width: 1,
                height: 1,
                objectFit: 'cover',
                position: 'absolute',
            }}
        />
    );


    return (
        <Grid xs={12} sm={6} md={3} onClick={handleClick}>
            <Card>
                <Box
                    sx={{
                        position: 'relative',
                        pt: 'calc(100% * 4 / 3)',
                        '&:after': {
                            top: 0,
                            content: "''",
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.1))'
                        },
                    }}
                >
                    {renderCover}
                </Box>

                <Box
                    sx={{
                        p: (theme) => theme.spacing(4, 3, 3, 3),
                        width: 1,
                        bottom: 0,
                        height: '50%',
                        position: 'absolute',
                        background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 1))'
                    }}
                >
                    <Stack direction="column-reverse" width="100%" height="100%" sx={{bottom:0}}>
                        <Link
                            color="inherit"
                            variant="h6"
                            underline="hover"
                            sx={{
                                overflow: 'hidden',
                                WebkitLineClamp: 2,
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                color: 'common.white',
                            }}
                        >
                            {`${employee.firstName} ${employee.lastName}`}
                        </Link>
                    </Stack>
                </Box>
            </Card>
        </Grid>
    );
}

EmployeeCard.propTypes = {
    employee: PropTypes.objectOf(RsEmployeeProfile)
};

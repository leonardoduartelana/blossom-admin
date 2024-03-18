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
import RsAppointmentModel from "../../api/data/RsAppointmentModel";

// ----------------------------------------------------------------------

export default function EmployeeAppointmentModelCard({appointmentModel, employee}) {

    const router = useRouter();

    const cardBackgroundUrl = appointmentModel.pictureUrl ? appointmentModel.pictureUrl : "https://blossom-public.s3.ap-southeast-2.amazonaws.com/classes/1on1.jpg"
    const totalDuration = appointmentModel.preDuration + appointmentModel.duration + appointmentModel.postDuration
    const capacity = appointmentModel.capacity ? appointmentModel.capacity : 1
    const credits = appointmentModel.creditPrice
    const avatarUrl = employee?.avatarUrl ? employee.avatarUrl : 'assets/ai_trainers/avatar/ai_personal_trainer_avatar_1.webp'

    const renderTitle = (
        <Link
            color="inherit"
            variant="h5"
            underline="hover"
            align="center"
            sx={{
                height: 44,
                overflow: 'hidden',
                WebkitLineClamp: 2,
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical'
            }}
        >
            {appointmentModel.name}
        </Link>
    );

    const renderInfo = (
        <Stack
            direction="column"
            flexWrap="wrap"
            spacing={1.5}
            alignContent="center"
            sx={{
                mt: 0,
                color: 'text.disabled',
            }}
        >
            {[
                { value: `${totalDuration} minutes`, icon: 'eva:clock-fill' },
                { value: `${credits} credits`, icon: 'eva:pricetags-fill' },
                { value: `${capacity} customer(s)`, icon: 'eva:people-fill' },
            ].map((info, _index) => (
                <Stack
                    key={_index}
                    justifySelf="center"
                    justifyContent="left"
                    justifyItems="left"
                    direction="row"
                >
                    <Iconify width={24} icon={info.icon} sx={{ mr: 1 }} />
                    <Typography variant="subtitle1">{info.value}</Typography>
                </Stack>
            ))}
        </Stack>
    );

    const renderCover = (
        <Box
            component="img"
            alt={appointmentModel.name}
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
        <Grid xs={12} sm={6} md={3}>
            <Card>
                <Box
                    sx={{
                        position: 'relative',
                        pt: 'calc(100% * 3 / 4)'
                    }}
                >
                    {renderCover}

                    <SvgColor
                        color="paper"
                        src="/assets/icons/shape-avatar.svg"
                        sx={{
                            width: 80,
                            height: 36,
                            zIndex: 9,
                            bottom: -15,
                            position: 'absolute',
                            color: 'background.paper'
                        }}
                    />

                    <Avatar
                        src={avatarUrl}
                        sx={{
                            zIndex: 9,
                            width: 32,
                            height: 32,
                            position: 'absolute',
                            left: (theme) => theme.spacing(3),
                            bottom: (theme) => theme.spacing(-2)
                        }}
                    />
                </Box>

                <Box
                    sx={{
                        p: (theme) => theme.spacing(1, 3, 3, 3),
                    }}
                >
                    {renderTitle}

                    {renderInfo}
                </Box>
            </Card>
        </Grid>
    );
}

EmployeeAppointmentModelCard.propTypes = {
    appointmentModel: PropTypes.objectOf(RsAppointmentModel)
};

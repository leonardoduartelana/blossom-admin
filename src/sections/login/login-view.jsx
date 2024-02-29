import {useEffect} from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import {useAuthState} from "react-firebase-hooks/auth";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {alpha, useTheme} from '@mui/material/styles';

import {useRouter} from 'src/routes/hooks';

import {bgGradient} from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

import {account} from "../../account";
import useViewModel from "./viewmodel/LoginViewModel"
import {auth, signInWithGooglePopup} from "./Firebase";

// ----------------------------------------------------------------------

export default function LoginView() {
    const theme = useTheme();

    const router = useRouter();

    const {getProfile, profile} = useViewModel()
    const [firebaseUser, firebaseLoading, firebaseError] = useAuthState(auth);

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }

    useEffect(() => {
        if (firebaseLoading) {
            // maybe trigger a loading screen
            return;
        }
        if (firebaseError) {
            console.log(`Error login: ${firebaseError}`)
        }
    }, [firebaseLoading, firebaseError]);

    useEffect(() => {
        if (firebaseUser) {
            // logout()
            getProfile()
        }
    }, [firebaseUser, router])

    useEffect(() => {
        if(profile) {
            account.fromProfile(profile)
            setTimeout(() => {
                router.push('/customers');
            }, 100)
        }
    }, profile)
    return (
        <Box
            sx={{
                ...bgGradient({
                    color: alpha(theme.palette.background.default, 0.9),
                    imgUrl: '/assets/background/overlay_4.jpg',
                }),
                height: 1,
            }}
        >
            <Logo
                sx={{
                    position: 'fixed',
                    top: {xs: 16, md: 24},
                    left: {xs: 16, md: 24},
                }}
            />

            <Stack alignItems="center" justifyContent="center" sx={{height: 1}}>
                <Card
                    sx={{
                        p: 5,
                        width: 1,
                        maxWidth: 420,
                    }}
                >
                    <Typography variant="h4" sx={{mt: 2, mb: 5, align: 'center'}}>Sign in</Typography>

                    <Stack direction="row" spacing={2}>
                        <Button
                            fullWidth
                            size="large"
                            color="inherit"
                            variant="outlined"
                            onClick={() => {
                                signInWithGoogle()
                            }}
                            sx={{borderColor: alpha(theme.palette.grey[500], 0.16)}}
                        >
                            <Iconify icon="eva:google-fill" color="#DF3E30"/>
                        </Button>

                    </Stack>
                </Card>
            </Stack>
        </Box>
    );
}

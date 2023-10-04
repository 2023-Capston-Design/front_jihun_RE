import { Helmet } from 'react-helmet-async';

import { Container, Typography, Stack } from '@mui/material';

import { Classroom } from '../sections/@dashboard/class';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
export default function ClassroomPage() {

    return (
        < >
            <Helmet>
                <title>클래스룸</title>
            </Helmet>

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" sx={{ mb: 5 }}>
                        클래스룸
                    </Typography>
                </Stack>
                <Classroom />
            </Container>

        </>
    );
}

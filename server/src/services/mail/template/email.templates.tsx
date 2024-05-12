import { Html } from '@react-email/html';
import { Button } from '@react-email/button';

export const EmailTemplate = (props: { message: string }) => {
    return (
        <Html>
            <Button href="https://example.com" style={{ color: 'red' }}>
                {props.message}
            </Button>
        </Html>
    );
}

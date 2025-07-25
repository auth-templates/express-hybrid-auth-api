import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
} from '@react-email/components';
import { getEmailTranslator } from '../utils/getEmailTranslator';

interface PasswordResetEmailProps {
    assetsUrl: string,
    frontendUrl: string,
    expiresInMinutes?: number;
    resetUrl?: string;
    t: (key: string, options?: any) => string;
}

export default function PasswordResetEmail({
    assetsUrl,
    frontendUrl,
    expiresInMinutes,
    resetUrl,
    t
}: PasswordResetEmailProps) {
    return (
        <Html>
            <Head />
            <Body style={main}>
                <Preview>{t('emails.password-reset-email.preview')}</Preview>
                <Container style={container}>
                    <Section style={coverSection}>
                        <Section style={imageSection}>
                            <Img
                                src={`${assetsUrl}/static/logo.png`}
                                width="75"
                                height="45"
                                alt={t('emails.password-reset-email.logoAlt', { defaultValue: 'Company Logo' })}
                            />
                        </Section>
                        <Section style={upperSection}>
                            <Heading style={h1}>
                                {t('emails.password-reset-email.heading')}
                            </Heading>
                            <Text style={mainText}>
                                {t('emails.password-reset-email.instruction', { expiresInMinutes })}
                            </Text>
                            <Text style={mainText}>
                                {t('emails.password-reset-email.message1')}
                            </Text>
                            {resetUrl && (
                                <Section style={buttonSection}>
                                    <Link href={resetUrl} style={button}>
                                        {t('emails.password-reset-email.ctaButton')}
                                    </Link>
                                </Section>
                            )}
                            <Text style={secondaryText}>
                                {t('emails.password-reset-email.message2')}
                            </Text>
                        </Section>
                        <Hr />
                        <Section style={lowerSection}>
                            <Text style={cautionText}>
                                {t('emails.password-reset-email.securityTip')}
                            </Text>
                        </Section>
                    </Section>
                    <Text style={footerText}>
                        {t('emails.password-reset-email.footer')}{' '}
                        <Link href={`${frontendUrl}/privacy`} target="_blank" style={link}>
                            {t('emails.password-reset-email.privacyLink')}
                        </Link>
                        .
                    </Text>
                </Container>
            </Body>
        </Html>
    );
}
    

PasswordResetEmail.PreviewProps = {
    assetsUrl: 'http://localhost:3001',
    frontendUrl: 'http://localhost:3001',
    expiresInMinutes: 30,
    resetUrl: 'http://localhost:3001/reset-password?token=abc123',
    t: getEmailTranslator(),
} satisfies PasswordResetEmailProps;

const main = {
    backgroundColor: '#fff',
    color: '#212121',
};

const container = {
    padding: '20px',
    margin: '0 auto',
    backgroundColor: '#eee',
};

const h1 = {
    color: '#333',
    fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '15px',
};

const link = {
    color: '#2754C5',
    fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: '14px',
    textDecoration: 'underline',
};

const text = {
    color: '#333',
    fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: '14px',
    margin: '24px 0',
};

const imageSection = {
    backgroundColor: '#252f3d',
    display: 'flex',
    padding: '20px 0',
    alignItems: 'center',
    justifyContent: 'center',
};

const coverSection = { backgroundColor: '#fff' };

const upperSection = { padding: '25px 35px' };

const lowerSection = { padding: '25px 35px' };

const footerText = {
    ...text,
    fontSize: '12px',
    padding: '0 20px',
};

const mainText = { ...text, marginBottom: '14px' };

const secondaryText = { ...text, marginTop: '14px' };

const cautionText = { ...text, margin: '0px' };

const buttonSection = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
};

const button = {
    display: 'inline-block',
    backgroundColor: '#2754C5',
    color: '#fff',
    padding: '12px 24px',
    fontSize: '14px',
    fontWeight: 'bold',
    textDecoration: 'none',
    borderRadius: '6px',
    textAlign: 'center' as const,
};

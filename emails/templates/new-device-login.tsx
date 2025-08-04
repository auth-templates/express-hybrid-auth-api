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
import { getEmailTranslator } from '../utils/getEmailTranslator.js';

interface NewDeviceLoginEmailProps {
    assetsUrl: string,
    frontendUrl: string,
    userEmail?: string;
    location?: string;
    device?: string;
    ipAddress?: string;
    loginTime?: string;
    t: (key: string, options?: any) => string;
}

export default function NewDeviceLoginEmail({
    assetsUrl,
    frontendUrl,
    userEmail,
    location,
    device,
    ipAddress,
    loginTime,
    t
}: NewDeviceLoginEmailProps) {
    return (
        <Html>
            <Head />
            <Body style={main}>
                <Preview>{t('emails.new-device-login-email.preview')}</Preview>
                <Container style={container}>
                    <Section style={coverSection}>
                        <Section style={imageSection}>
                            <Img
                                src={`${assetsUrl}/static/logo.png`}
                                width="75"
                                height="45"
                                alt={t('emails.new-device-login-email.logoAlt', { defaultValue: 'Company Logo' })}
                            />
                        </Section>
                        <Section style={upperSection}>
                            <Heading style={h1}>
                                {t('emails.new-device-login-email.heading')}
                            </Heading>
                            <Text style={mainText}>
                                {t('emails.new-device-login-email.message1', { email: userEmail })}
                            </Text>
                            <Text style={secondaryText}>
                                <strong>{t('emails.new-device-login-email.deviceLabel')}:</strong> {device}
                                <br />
                                <strong>{t('emails.new-device-login-email.locationLabel')}:</strong> {location}
                                <br />
                                <strong>{t('emails.new-device-login-email.ipLabel')}:</strong> {ipAddress}
                                <br />
                                <strong>{t('emails.new-device-login-email.timeLabel')}:</strong> {loginTime}
                            </Text>
                            <Text style={secondaryText}>
                                {t('emails.new-device-login-email.message2')}
                            </Text>
                            <Section style={buttonSection}>
                                <Link href={`${frontendUrl}/support`} style={button}>
                                    {t('emails.new-device-login-email.ctaButton')}
                                </Link>
                            </Section>
                        </Section>
                        <Hr />
                        <Section style={lowerSection}>
                            <Text style={cautionText}>
                                {t('emails.new-device-login-email.securityTip')}
                            </Text>
                        </Section>
                    </Section>
                    <Text style={footerText}>
                        {t('emails.new-device-login-email.footer')}{" "}
                        <Link href={`${frontendUrl}/support`} target="_blank" style={link}>
                            {t('emails.new-device-login-email.supportLink')}
                        </Link>.
                    </Text>
                </Container>
            </Body>
        </Html>
    );
}
    

NewDeviceLoginEmail.PreviewProps = {
    assetsUrl: 'http://localhost:3000',
    frontendUrl: 'http://localhost:3000',
    userEmail: 'user@example.com',
    location: 'San Francisco, CA, USA',
    device: 'Chrome on Windows',
    ipAddress: '192.168.1.1',
    loginTime: 'May 1, 2025 at 10:22 AM',
    t: getEmailTranslator(),
} satisfies NewDeviceLoginEmailProps;

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

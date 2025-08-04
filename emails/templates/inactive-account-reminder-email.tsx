
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

interface InactiveAccountReminderEmailProps {
    assetsUrl: string,
    frontendUrl: string,
    t: (key: string, options?: any) => string;
}

export default function InactiveAccountReminderEmail({ 
    assetsUrl,
    t, 
    frontendUrl 
}: InactiveAccountReminderEmailProps) {
    return (
        <Html>
            <Head />
            <Body style={main}>
                <Preview>{t('emails.inactive-account-reminder-email.preview')}</Preview>
                <Container style={container}>
                    <Section style={coverSection}>
                        <Section style={imageSection}>
                            <Img
                                src={`${assetsUrl}/static/logo.png`}
                                width="75"
                                height="45"
                                alt={t('emails.inactive-account-reminder-email.logoAlt', { defaultValue: 'Company Logo' })}
                            />
                        </Section>
                        <Section style={upperSection}>
                            <Heading style={h1}>
                                {t('emails.inactive-account-reminder-email.heading')}
                            </Heading>
                            <Text style={mainText}>
                                {t('emails.inactive-account-reminder-email.message1')}
                            </Text>
                            <Text style={secondaryText}>
                                {t('emails.inactive-account-reminder-email.message2')}
                            </Text>
                            <Section style={ctaSection}>
                                <Link href={`${frontendUrl}/login`} target="_blank" style={ctaButton}>
                                    {t('emails.inactive-account-reminder-email.ctaButton')}
                                </Link>
                            </Section>
                        </Section>
                        <Hr />
                        <Section style={lowerSection}>
                            <Text style={cautionText}>
                                {t('emails.inactive-account-reminder-email.unsubscribeText')}{' '}
                                <Link href={`${frontendUrl}/unsubscribe`} target="_blank" style={link}>
                                    {t('emails.inactive-account-reminder-email.unsubscribeLink')}
                                </Link>.
                            </Text>
                        </Section>
                    </Section>
                    <Text style={footerText}>
                        {t('emails.inactive-account-reminder-email.footer')}
                    </Text>
                </Container>
            </Body>
        </Html>
    );
}    

InactiveAccountReminderEmail.PreviewProps = {
    assetsUrl: 'http://localhost:3000',
    frontendUrl: 'http://localhost:3000',
    t: getEmailTranslator(),
} satisfies InactiveAccountReminderEmailProps;

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

const ctaSection = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
};

const ctaButton: React.CSSProperties = {
    backgroundColor: '#2754C5',
    color: '#fff',
    padding: '12px 20px',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '5px',
    textAlign: 'center',
};

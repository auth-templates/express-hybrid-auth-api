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

interface AccountReactivationEmailProps {
    t: (key: string, options?: any) => string;
}

const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : '';

export default function AccountReactivationEmail({ t }: AccountReactivationEmailProps) {
    return (
        <Html>
            <Head />
            <Body style={main}>
                <Preview>{t('emails.account-reactivation-email.preview')}</Preview>
                <Container style={container}>
                    <Section style={coverSection}>
                        <Section style={imageSection}>
                            <Img
                                src={`${baseUrl}/static/logo.png`}
                                width="75"
                                height="45"
                                alt={t('emails.account-reactivation-email.logoAlt', { defaultValue: 'Company Logo' })}
                            />
                        </Section>
                        <Section style={upperSection}>
                            <Heading style={h1}>
                                {t('emails.account-reactivation-email.heading')}
                            </Heading>
                            <Text style={mainText}>
                                {t('emails.account-reactivation-email.message1')}
                            </Text>
                            <Text style={secondaryText}>
                                {t('emails.account-reactivation-email.message2')}
                            </Text>
                            <Section style={ctaSection}>
                                <Link href="https://example.com/reactivate" target="_blank" style={ctaButton}>
                                    {t('emails.account-reactivation-email.reactivateButton')}
                                </Link>
                            </Section>
                        </Section>
                        <Hr />
                        <Section style={lowerSection}>
                            <Text style={cautionText}>
                                {t('emails.account-reactivation-email.caution')}{' '}
                                <Link href="https://example.com/contact-us" target="_blank" style={link}>
                                    {t('emails.account-reactivation-email.contactLink')}
                                </Link>.
                            </Text>
                        </Section>
                    </Section>
                    <Text style={footerText}>
                        {t('emails.account-reactivation-email.footer')}
                    </Text>
                </Container>
            </Body>
        </Html>
    );
}
    

AccountReactivationEmail.PreviewProps = {
    t: getEmailTranslator('en'),
} satisfies AccountReactivationEmailProps;

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
